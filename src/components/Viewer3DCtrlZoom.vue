<template>
  <div>
    <button
      id="label-zoomIn"
      v-tooltip.left="$t('layout.navigation.zoomIn')"
      class="btn btn__tools"
      @mousedown="zoomIn"
    >
      <IconWrap label="zoomIn">
        <IconPlus />
      </IconWrap>
    </button>
    <button
      id="label-zoomOut"
      v-tooltip.left="$t('layout.navigation.zoomOut')"
      class="btn btn__tools"
      @mousedown="zoomOut"
    >
      <IconWrap label="zoomOut">
        <IconMinus />
      </IconWrap>
    </button>
  </div>
</template>

<script>
import IconWrap from '@/assets/images/icons';

import IconPlus from '@/assets/images/icons/Plus';
import IconMinus from '@/assets/images/icons/Minus';

import * as cesiumService from '@/components/Viewer3DCtrlCommon';

export default {
  name: 'Viewer3DCtrlZoom',
  components: {
    IconWrap,
    IconPlus,
    IconMinus
  },

  methods: {
    zoomIn() {
      cesiumService.zoom(this.$viewer3D, 'In');
    },

    zoomOut() {
      cesiumService.zoom(this.$viewer3D, 'Out');
    }
  }
};
</script>
