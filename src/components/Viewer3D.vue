<template>
  <div
    id="cesiumContainer"
    class="w-full"
    @mouseenter="mouseOnView = true"
    @mouseleave="mouseOnView = false"
  >
    <loading
      :active.sync="loading"
      :is-full-page="false"
      :opacity="0"
      color="#fff"
    />
    <Controls
      :mouse-on-view="mouseOnView"
      :is-viewer-loaded="isViewerLoaded"
      :is-image-loaded="isImageLoaded"
      :current-image="currentImage"
      :current-pose="currentPose"
      :current-pose-apriori="currentPoseApriori"
    />
    <InfoBar
      :mouse-on-view="mouseOnView"
      :pose="currentPoseApriori || currentPose"
    >
      <div id="cesiumCredits" />
    </InfoBar>
  </div>
</template>

<script>

import 'cesium/Build/Cesium/Widgets/widgets.css';

import { Cartesian3, Cartographic, Color, Math as MathCesium, sampleTerrain, Viewer, when } from 'cesium';
import { deleteModel, drawModel, setCloseZoom } from '@/components/Viewer3DCtrlCommon';

import Controls from '@/components/Viewer3DCtrl';
import InfoBar from '@/components/Viewer3DInfoBar';

import ViewerDefaultOptions from './Viewer3DDefaultOptions.json';

export default {
  name: 'Viewer3D',

  components: {
    Controls,
    InfoBar
  },

  props: {
    currentImage: {
      type: Object,
      default: () => {}
    },

    currentPose: {
      type: Object,
      default: () => {}
    },

    currentPoseApriori: {
      type: Object,
      default: () => {}
    },

    currentPoses: { //recieve currentPoses only from viewer visit and store/explorer.js
      type: Array,
      default: () => {}
    },
  },

  static() {
    return {
      viewer3D: null,
      image3D: null,
      checkCameraHeightTimeout: null
    };
  },

  data() {
    return {
      loading: false,
      mouseOnView: false,
      isViewerLoaded: false,
      isImageLoaded: false,
      altitude: 0,
      latitude: 0,
      longitude: 0
    };
  },

  mounted() {
    // Init Viewer
    const viewerOptions = { ...ViewerDefaultOptions };
    this.viewer3D = new Viewer('cesiumContainer', viewerOptions);

    this.isViewerLoaded = true;
    this.$emit('ready');

    // Scene Options
    this.viewer3D.scene.globe.baseColor = new Color.fromCssColorString('#DDD');
    this.viewer3D.scene.globe.maximumScreenSpaceError = 1.3;
    this.viewer3D.scene.globe.showGroundAtmosphere = false;
    this.viewer3D.scene.globe.depthTestAgainstTerrain = true; // Required to hide primitives and model with the terrain
    this.viewer3D.scene.fog.enabled = true;
    this.viewer3D.scene.fog.density = 0.0001;
    this.viewer3D.scene.fog.screenSpaceErrorFactor = 2;
    this.viewer3D.scene.screenSpaceCameraController.enableCollisionDetection = true;
    this.viewer3D.scene.screenSpaceCameraController.minimumCollisionTerrainHeight = 10000;
    this.viewer3D.scene.backgroundColor = new Color(0, 0, 0, 0);


    // Performance optimization (by default full resolution)
    this.viewer3D.resolutionScale = 1;
  },

  beforeDestroy() {
    if (this.checkCameraHeightTimeout) {
      clearTimeout(this.checkCameraHeightTimeout);
    }
    if (this.viewer3D) {
      this.viewer3D.entities.removeAll();
      this.viewer3D.destroy();
    }
  },

  methods: {
    setZoomPose() {
      // If the focal is computed adapt the zoom to the image
      const offsetImage = 600;// Add an offset around the image
      if (this.currentPose.focal && this.currentImage.height && this.currentImage.width) {
        setCloseZoom(this.viewer3D, this.currentImage.height + offsetImage, this.currentImage.width + offsetImage, this.currentPose.focal);
      }
    },

    flyToPose() {
      // Move the globe to the provided location
      this.viewer3D.camera.flyTo({
        destination: Cartesian3.fromDegrees(this.currentPose.longitude, this.currentPose.latitude, this.currentPose.altitude),
        orientation: {
          heading: MathCesium.toRadians(this.currentPose.azimuth),
          pitch: MathCesium.toRadians(this.currentPose.tilt),
          roll: MathCesium.toRadians(this.currentPose.roll)
        }
      });
    },

    async getGroundAltitude(lat, long) {
        const position = [Cartographic.fromDegrees(long, lat)];
        const level = this.viewer3D.terrainProvider?._availability?._maximumLevel;
        if (!level) {
          return 0;
        }
        try {
          const updatedPosition = await sampleTerrain(this.viewer3D.terrainProvider, level, position);
          // Get altitude of the ground
          const demZ = updatedPosition[0].height;
          return demZ;
        } catch (e) {
          return 0;
        }

    },

    checkCameraHeight() {
      const terrainProviderReady = this.viewer3D.terrainProvider._ready;
      if (!terrainProviderReady) {
        // Terrain provider was not yet loaded - retry to check terrain height in 1 sec
        // we cannot use readyPromise since cesium assumes terrain provider ready apparently even when _ready not true
        this.checkCameraHeightTimeout = setTimeout(() => this.checkCameraHeight(), 1000);
      } else {
        // Terrain provider
        this.setViewToPose();
      }
    },

    setViewToPose() {
      if (this.viewer3D.canvas.height === 0 ||
          this.viewer3D.canvas.width === 0) {
        console.log('Viewer 3D canvas not ready');
        return;
      }
      this.setZoomPose();
      // Choose the apropriate altitude (always ensure camera is above ground level)
      const terrainProviderReady = this.viewer3D.terrainProvider._ready; // ready seems to always return true while _ready is correct
      this.getGroundAltitude(this.currentPose.latitude, this.currentPose.longitude).then(altitudeOfTheGround => {
        if (this.currentPose.altitude) {
          // The altitude is known (computed or provided by owner)
          const altitude = Math.max(this.currentPose.altitude, altitudeOfTheGround + 1);
          this.viewer3D.camera.setView({
            destination: Cartesian3.fromDegrees(this.currentPose.longitude, this.currentPose.latitude, altitude),
            orientation: {
              heading: MathCesium.toRadians(this.currentPose.azimuth ?? 0),
              pitch: MathCesium.toRadians(this.currentPose.tilt ?? 0),
              roll: MathCesium.toRadians(this.currentPose.roll ?? 0)
            }
          });
        } else if (this.currentPose.heightAboveGround) {
          // The altitude is unknown but a default height above ground is defined from the view type
          // The altitude is computed from the default heightAboveGround + altitudeOfTheGround
          const altitude = this.currentPose.heightAboveGround + altitudeOfTheGround;
          this.viewer3D.camera.setView({
            destination: Cartesian3.fromDegrees(this.currentPose.longitude, this.currentPose.latitude, altitude),
            orientation: {
              heading: MathCesium.toRadians(this.currentPose.azimuth ?? 0),
              pitch: MathCesium.toRadians(this.currentPose.tilt ?? 0),
              roll: MathCesium.toRadians(this.currentPose.roll ?? 0)
            }
          });
        }

        // If Terrain provider was not ready - check regularly to update
        if (altitudeOfTheGround === 0 && !terrainProviderReady) {
          // Terrain provider was not yet loaded - retry to check terrain height in 1 sec
          // we cannot use readyPromise since cesium assumes terrain provider ready apparently even when _ready not true
          this.checkCameraHeightTimeout = setTimeout(() => this.checkCameraHeight(), 1000);
        }
      });
    },

    async loadGltf(currentImage) {
      this.deleteLastGltf();
      this.loading = true;

      //currentPoses should exist only for composite_image in visit mode.
      const pose = this.currentPoses ? this.currentPoses : this.currentPose;
      this.image3D = drawModel(this.viewer3D, currentImage, pose);
      this.viewer3D.scene.requestRender();

      return when(this.image3D.readyPromise).then(() => {
        this.loading = false;
        this.isImageLoaded = true;
      });
    },

    deleteLastGltf() {
      if (this.viewer3D !== null && this.image3D !== null) {
        deleteModel(this.viewer3D, this.image3D);
      }
    }
  }
};
</script>

<style lang="postcss">
#cesiumContainer {
  @apply relative h-full;
}

.slider--open #cesiumContainer {
  height: calc(100% - var(--sliderHeight));
}
</style>
