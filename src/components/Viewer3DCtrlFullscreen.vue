<template>
  <button
    id="label-fullscreenCesium"
    v-tooltip.left="$t('layout.navigation.fullscreen')"
    class="btn btn__tools"
    @click="toggleFullscreen"
  >
    <IconWrap label="fullscreenCesium">
      <IconFullscreen />
    </IconWrap>
  </button>
</template>

<script>
import IconFullscreen from '@/assets/images/icons/Fullscreen';
import IconWrap from '@/assets/images/icons';

import screenfull from 'screenfull';

export default {
  name: 'Viewer3DCtrlFullscreen',

  components: {
    IconWrap,
    IconFullscreen
  },

  methods: {
    toggleFullscreen() {
      if (screenfull.isEnabled) {
        const el = document.getElementById('cesiumContainer');
        screenfull.toggle(el);
      }
    }
  }
};
</script>
