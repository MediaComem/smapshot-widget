<template>
  <div>
    <button
      id="label-zoomIn"
      v-tooltip.left="$t('layout.navigation.zoomIn')"
      class="btn btn__tools"
      @mousedown="zoom(viewer3D, 'In')"
    >
      <IconWrap label="zoomIn">
        <IconPlus />
      </IconWrap>
    </button>
    <button
      id="label-zoomOut"
      v-tooltip.left="$t('layout.navigation.zoomOut')"
      class="btn btn__tools"
      @mousedown="zoom(viewer3D, 'Out')"
    >
      <IconWrap label="zoomOut">
        <IconMinus />
      </IconWrap>
    </button>
  </div>
</template>

<script>
import IconMinus from '@/assets/images/icons/Minus';
import IconPlus from '@/assets/images/icons/Plus';
import IconWrap from '@/assets/images/icons';

import { zoom } from '@/components/Viewer3DCtrlCommon';

export default {
  name: 'Viewer3DCtrlZoom',
  components: {
    IconWrap,
    IconPlus,
    IconMinus
  },

  mounted() {
    this.viewer3D = this.$parent.$parent.viewer3D;
  },

  methods:{
    zoom
  }
};
</script>
