<template>
  <nav>
    <div
      class="controls controls--hide"
      :class="{ 'controls--show': mouseOnView || controlsFocused }"
      @focusin="controlsFocused = true"
      @focusout="controlsFocused = false"
    >
      <Layers
        class="controlLayerSwitcher controlPanel"
        :current-image="currentImage"
        :current-pose="currentPose"
        :is-cesium-loaded="isCesiumLoaded"
      />
      <ImageBar
        class="controlPanel flex items-center"
        :is-model-loaded="isModelLoaded"
      />

      <div class="controlPanel controlPanel__3dnavigation">
        <div class="flex my-2">
          <Look />

          <div class="ml-2">
            <Zoom />
            <Fullscreen />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

  <script>
  import Layers from '@/components/Viewer3DCtrlLayer';
  import ImageBar from '@/components/Viewer3DCtrlImage';

  import Look from '@/components/Viewer3DCtrlLook';

  import Zoom from '@/components/Viewer3DCtrlZoom';
  import Fullscreen from '@/components/Viewer3DCtrlFullscreen';

  import { when } from 'cesium/Cesium';

  export default {
    name: 'Viewer3DCtrl',
    components: {
      Layers,
      ImageBar,
      Look,
      Zoom,
      Fullscreen
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

      mouseOnView: {
        type: Boolean,
        default: () => false
      },

      isCesiumLoaded: {
        type: Boolean,
        default: () => false
      }
    },

    data() {
      return {
        isModelLoaded: false,
        controlsFocused: false
      };
    },

    mounted() {
      this.checkModelLoaded();
    },

    updated() {
      this.checkModelLoaded();
    },

    methods: {
      checkModelLoaded() {
        if (this.$image3D && this.$image3D.readyPromise) {
          when(this.$image3D.readyPromise).then(() => {
            this.isModelLoaded = true;
          });
        }
      }
    }
  };
  </script>

  <style lang="postcss">
  .controlPanel{
    @apply absolute z-40;
  }
  .controlLayerSwitcher{
    @apply z-50;
  }
  .controls--hide{
    opacity:0;
    transition:opacity 300ms;
  }
  .controls--show{
    opacity:1;
  }

  .controlPanel__3dnavigation{
    bottom: 50px;right:0;
  }
  </style>
