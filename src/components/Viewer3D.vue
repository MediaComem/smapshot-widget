<template>
  <div
    id="cesiumContainer"
    @mouseenter="mouseOnView = true"
    @mouseleave="mouseOnView = false"
  >
    <Controls
      :current-image="currentImage"
      :current-pose="currentPose"
      :mouse-on-view="mouseOnView"
      :is-cesium-loaded="isCesiumLoaded"
    />
    <InfoBar
      :current-image="currentImage"
      :current-pose="currentPose"
      :mouse-on-view="mouseOnView"
      :latitude="latitude"
      :longitude="longitude"
      :altitude="altitude"
    >
      <div id="cesiumCredits" />
    </InfoBar>
  </div>
</template>

<script>
import Vue from 'vue';
import 'cesium/Widgets/widgets.css';

import { when, Viewer, Cartesian3, Math, Cartographic, sampleTerrain, Color } from 'cesium/Cesium';

import ViewerDefaultOptions from './Viewer3DDefaultOptions.json';
import { lockCamera, setCloseZoom, drawModel } from '@/components/Viewer3DCtrlCommon';

import { ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium/Cesium';

import Controls from '@/components/Viewer3DCtrl';
import InfoBar from '@/components/Viewer3DInfoBar';

Vue.prototype.$image3D = null;
Vue.prototype.$viewer3D = null;

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
    }
  },

  data() {
    return {
      cameraUnlocked: false,
      mouseOnView: false,
      isCesiumLoaded: false,
      altitude: 0,
      latitude: 0,
      longitude: 0
    };
  },

  mounted() {
    // Init Viewer
    const viewerOptions = { ...ViewerDefaultOptions };
    Vue.prototype.$viewer3D = new Viewer('cesiumContainer', viewerOptions);

    this.isCesiumLoaded = true;

    // Scene Options and performance optimisations
    this.$viewer3D.scene.backgroundColor = new Color.fromCssColorString('#435774');
    this.$viewer3D.scene.globe.baseColor = new Color.fromCssColorString('#435774');

    this.$viewer3D.scene.globe.maximumScreenSpaceError = 0.5;
    this.$viewer3D.scene.globe.showGroundAtmosphere = false;
    this.$viewer3D.scene.globe.depthTestAgainstTerrain = true; // Required to hide primitives and model with the terrain
    this.$viewer3D.scene.fog.enabled = true;
    this.$viewer3D.scene.fog.density = 0.0001;
    this.$viewer3D.scene.fog.screenSpaceErrorFactor = 2;
    this.$viewer3D.scene.screenSpaceCameraController.enableCollisionDetection = true;
    this.$viewer3D.scene.screenSpaceCameraController.minimumCollisionTerrainHeight = 10000;

    this.$viewer3D.resolutionScale = 1.2;
    this.$viewer3D.scene.postProcessStages.fxaa.enabled = false;

    // Show Controls on Pose
    this.latitude = parseFloat((this.currentPose.latitude || 0).toFixed(4));
    this.longitude = parseFloat((this.currentPose.longitude || 0).toFixed(4));
    this.altitude = parseFloat((this.currentPose.altitude || 0).toFixed(0));

    // Set Interactions
    const wheelHandler = new ScreenSpaceEventHandler(this.$viewer3D.canvas);
    wheelHandler.setInputAction(this.wheelFunction, ScreenSpaceEventType.WHEEL);

    // Load images
    lockCamera(this.$viewer3D);
    this.setViewToPose();
    this.loadGltf();
  },

  methods: {
    setZoomPose() {
      // If the focal is computed adapt the zoom to the image
      const offsetImage = 600;// Add an offset around the image
      if (this.currentPose.focal && this.currentImage.height && this.currentImage.width) {
        setCloseZoom(this.$viewer3D, this.currentImage.height + offsetImage, this.currentImage.width + offsetImage, this.currentPose.focal);
      }
    },

    getGroundAltitude(lat, long) {
      return new Promise((resolve) => {
        // Check altitude
        // --------------
        const position = [Cartographic.fromDegrees(long, lat)];
        const promise = sampleTerrain(this.$viewer3D.terrainProvider, 17, position);
        when(promise, (updatedPosition) => {
          // Get altitude of the ground
          const demZ = updatedPosition[0].height;
          resolve(demZ);
        });
      });
    },

    setViewToPose() {
      this.setZoomPose();
      // Choose the apropriate altitude
      if (this.currentPose.altitude) {
        // The altitude is known (computed or provided by owner)
        this.$viewer3D.camera.setView({
          destination: Cartesian3.fromDegrees(this.currentPose.longitude, this.currentPose.latitude, this.currentPose.altitude),
          orientation: {
            heading: Math.toRadians(this.currentPose.azimuth),
            pitch: Math.toRadians(this.currentPose.tilt),
            roll: Math.toRadians(this.currentPose.roll)
          }
        });
      } else if (this.currentPose.heightAboveGround) {
        // The altitude is unknown but a default height above ground is defined from the view type
        // The altitude is computed from the default heightAboveGround + altitudeOfTheGround
        this.getGroundAltitude(this.currentPose.latitude, this.currentPose.longitude)
          .then(altitudeOfTheGround => {
            const altitude = this.currentPose.heightAboveGround + altitudeOfTheGround;
            this.$viewer3D.camera.setView({
              destination: Cartesian3.fromDegrees(this.currentPose.longitude, this.currentPose.latitude, altitude),
              orientation: {
                heading: Math.toRadians(this.currentPose.azimuth),
                pitch: Math.toRadians(this.currentPose.tilt),
                roll: Math.toRadians(this.currentPose.roll)
              }
            });
          });
      }
    },

    loadGltf() {
      Vue.prototype.$image3D = drawModel(this.$viewer3D, this.currentImage, this.currentPose);
      this.$viewer3D.scene.requestRender();
    },

    wheelFunction(click) {
      const camera = this.$viewer3D.camera;
      if (click > 0) {
        camera.frustum.fov = camera.frustum.fov - camera.frustum.fov * 0.1;
      } else {
        if (this.$viewer3D.camera.frustum.fov < 1.5) {
          camera.frustum.fov = camera.frustum.fov + camera.frustum.fov * 0.1;
        }
      }
    }
  }
};
</script>

<style lang="postcss">
#cesiumContainer {
  @apply relative h-full w-full;
}
</style>
