<template>
  <div
    class="btn btn__tools m-0 relative"
    style="height:90px; width:90px;border-radius:50%;"
  >
    <button
      id="label-lookUp"
      v-tooltip.left="$t('layout.navigation.lookUp')"
      class="absolute"
      style="top:5px;left:50%;transform:translateX(-50%);"
      @click="turn(viewer3D, 'Up')"
    >
      <IconWrap label="lookUp">
        <IconArrow />
      </IconWrap>
    </button>
    <button
      id="label-lookDown"
      v-tooltip.left="$t('layout.navigation.lookDown')"
      class="absolute"
      style="bottom:5px;left:50%;transform:translateX(-50%) rotate(180deg);"
      @click="turn(viewer3D, 'Down')"
    >
      <IconWrap label="lookDown">
        <IconArrow />
      </IconWrap>
    </button>

    <IconWrap
      class="absolute"
      :aria-hidden="true"
      style="top:50%;left:50%;transform:translate(-50%, -50%);"
    >
      <IconEye />
    </IconWrap>

    <button
      id="label-lookLeft"
      v-tooltip.left="$t('layout.navigation.lookLeft')"
      class="absolute"
      style="left:5px;top:50%;transform:translateY(-50%) rotate(-90deg);"
      @click="turn(viewer3D, 'Left')"
    >
      <IconWrap label="lookLeft">
        <IconArrow />
      </IconWrap>
    </button>
    <button
      id="label-lookRight"
      v-tooltip.left="$t('layout.navigation.lookRight')"
      class="absolute"
      style="right:5px;top:50%;transform:translateY(-50%) rotate(90deg);"
      @click="turn(viewer3D, 'Right')"
    >
      <IconWrap label="lookRight">
        <IconArrow />
      </IconWrap>
    </button>
  </div>
</template>

<script>
import IconArrow from '@/assets/images/icons/Arrow';
import IconEye from '@/assets/images/icons/Eye';
import IconWrap from '@/assets/images/icons';

import { turn } from '@/components/Viewer3DCtrlCommon';

export default {
  name: 'Viewer3DCtrlLook',
  components: {
    IconWrap,
    IconArrow,
    IconEye
  },

  mounted() {
    this.viewer3D = this.$parent.$parent.viewer3D;
  },

  methods:{
    turn
  }
};
</script>
