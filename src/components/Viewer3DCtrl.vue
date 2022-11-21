<template>
  <nav>
    <div
      class="controls controls--hide"
      :class="{ 'controls--show': mouseOnView || controlsFocused }"
      @focusin="controlsFocused = true"
      @focusout="controlsFocused = false"
    >
      <ControlLayerSwitcher
        v-if="isViewerLoaded && currentImage"
        class="controlLayerSwitcher controlPanel"
        :current-image="currentImage"
        :current-pose="currentPose"
      />
      <ControlImageBar
        v-if="isImageLoaded"
        class="controlPanel flex items-center"
      />

      <div
        v-if="isViewerLoaded"
        class="controlPanel controlPanel__3dnavigation"
      >
        <cesium-view-cube
          v-if="modeDev.gizmo"
          :scene.prop="viewer3D.scene"
        />

        <div class="flex my-2">
          <ControlLook />
          <div class="ml-2">
            <ControlZoom />
            <ControlFullscreen />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

  <script>
  import '@geoblocks/cesium-view-cube'; //litElement Component

  import ControlFullscreen from '@/components/Viewer3DCtrlFullscreen';
  import ControlImageBar from '@/components/Viewer3DCtrlImageBar';
  import ControlLayerSwitcher from '@/components/Viewer3DCtrlLayer';
  import ControlLook from '@/components/Viewer3DCtrlLook';
  import ControlZoom from '@/components/Viewer3DCtrlZoom';

  export default {
    name: 'Viewer3DCtrl',
    components: {
      ControlImageBar,
      ControlLayerSwitcher,
      ControlLook,
      ControlZoom,
      ControlFullscreen
    },

    props: {
      mouseOnView: {
        type: Boolean,
        default: () => false
      },

      isImageLoaded: {
        type: Boolean,
        default: () => false
      },

      isViewerLoaded: {
        type: Boolean,
        default: () => false
      },

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
        modeDev: false,
        controlsFocused: false
      };
    },

    mounted() {
      this.viewer3D = this.$parent.viewer3D;
    },

  };
  </script>

<style lang="postcss">
:root{
  --cesium-view-cube-fill-color: rgba(255,255,255,.95);
  --cesium-view-cube-stroke-color: theme('colors.gray.500');
}

.nyancat{
  @apply absolute z-50;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

.controlPanel{
  @apply absolute z-40;
}

.controlLayerSwitcher{
  @apply z-50;
}

.controls--hide{
  opacity:0;
}

.controls--show{
  opacity:1;
}

.controlPanel__3dnavigation{
  bottom: 50px;right:0;
}
</style>
