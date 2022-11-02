<template>
  <div style="bottom: 50px;left: 50%;transform:translateX(-50%);">
    <GlobalEvents
      @keyup.i="hideShowImage"
      @keydown.up="changeDepthKeyboard('up')"
      @keydown.down="changeDepthKeyboard('down')"
      @keydown.right="changeTransparencyKeyboard('up')"
      @keydown.left="changeTransparencyKeyboard('down')"
    />
    <div
      class="flex"
    >
      <button
        id="label-hideShowImage"
        v-tooltip.top="toggleShowHideImageText"
        class="btn btn__tools h-10"
        @click="hideShowImage"
      >
        <IconWrap
          v-if="!isModelVisible"
          label="hideShowImage"
          height="28"
          width="28"
        >
          <IconImageShow />
        </IconWrap>
        <IconWrap
          v-if="isModelVisible"
          label="hideShowImage"
          height="28"
          width="28"
        >
          <IconImageHide />
        </IconWrap>
      </button>

      <div
        id="label-transparency"
        v-tooltip.top="$t('layout.navigation.transparency') + shortcutDefinition($t('generic.shortcut.arrowLeftRight'))"
        class="btn btn__tools font-normal h-10"
      >
        <IconWrap
          label="transparency"
          width="20"
          height="20"
          class="mr-1"
        >
          <IconTransparency />
        </IconWrap>
        <input
          v-model.number="transparencySlider.value"
          type="number"
          min="0"
          max="100"
          style="width: 2rem;"
          class="controlPanel__inputNumber"
          @input="changeCesiumTransparency"
          @change="changeCesiumTransparency"
        >%
        <input
          v-if="transparencySlider.show"
          v-model.number="transparencySlider.value"
          aria-hidden="true"
          type="range"
          :min="transparencySlider.min"
          :max="transparencySlider.max"
          :step="transparencySlider.step"
          class="controlPanel__slider"
          @input="changeCesiumTransparency"
          @change="changeCesiumTransparency"
        >
        <button
          aria-hidden="true"
          class="flex h-10 items-center mx-2"
          @click="transparencySlider.show = !transparencySlider.show"
        >
          <IconWrap
            width="14"
            height="14"
            class="controPanel__sliderArrow"
            :class="{ 'controPanel__sliderArrow--open': transparencySlider.show }"
          >
            <IconArrow />
          </IconWrap>
        </button>
      </div>
      <div
        id="label-depth"
        v-tooltip.top="$t('layout.navigation.depth') + shortcutDefinition($t('generic.shortcut.arrowUpDown'))"
        class="btn btn__tools h-10"
      >
        <IconWrap
          label="depth"
          width="20"
          height="20"
          class="mr-1"
        >
          <IconDepth />
        </IconWrap>
        <input
          v-if="depthSlider.show"
          id="sliderDistance"
          v-model.number="depthSlider.value"
          aria-hidden="true"
          type="range"
          :min="depthSlider.min"
          :max="depthSlider.max"
          :step="depthSlider.step"
          class="controlPanel__slider"
          @input="changeCesiumDepth"
          @change="changeCesiumDepth"
        >
        <button
          aria-hidden="true"
          class="flex h-10 items-center mx-2"
          @click="depthSlider.show = !depthSlider.show"
        >
          <IconWrap
            width="14"
            height="14"
            class="controPanel__sliderArrow"
            :class="{ 'controPanel__sliderArrow--open': depthSlider.show }"
          >
            <IconArrow />
          </IconWrap>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { changeModelScale, changeModelTransparency, hideShowModel } from '@/components/Viewer3DCtrlCommon';

import GlobalEvents from 'vue-global-events';

import IconArrow from '@/assets/images/icons/Arrow';
import IconDepth from '@/assets/images/icons/Depth';
import IconImageHide from '@/assets/images/icons/ImageHide';
import IconImageShow from '@/assets/images/icons/ImageShow';
import IconTransparency from '@/assets/images/icons/Transparency';

import IconWrap from '@/assets/images/icons';

import { shortcutDefinition } from '@/utils/style';

export default {
  name: 'Viewer3DCtrlImageBar',

  components: {
    IconWrap,
    IconArrow,
    IconImageHide,
    IconImageShow,
    IconTransparency,
    IconDepth,
    GlobalEvents
  },

  data() {
    return {
      isModelVisible: true,
      depthSlider: {
        show: false,
        min: -1,
        max: 3,
        step: 0.05,
        value: -0.1
      },

      transparencySlider: {
        show: false,
        min: 0,
        max: 100,
        step: 5,
        value: 100
      }
    };
  },

  computed: {
    toggleShowHideImageText() {
      const msg = this.isModelVisible ? this.$t('layout.navigation.hideImage') : this.$t('layout.navigation.showImage');
      return msg + this.shortcutDefinition('i');
    },

    transparencyForCesium() {
      return this.transparencySlider.value / 100;
    },
  },

  mounted() {
    this.viewer3D = this.$parent.$parent.viewer3D;
  },

  methods: {
    changeCesiumDepth() {
      const image3D = this.$parent.$parent.image3D;
      changeModelScale(this.viewer3D, image3D, this.depthSlider.value);
    },

    changeDepthKeyboard(dir) {
      if (dir === 'up') {
        this.depthSlider.value = Math.min(this.depthSlider.value + this.depthSlider.step, this.depthSlider.max);
      }
      if (dir === 'down') {
        this.depthSlider.value = Math.max(this.depthSlider.value - this.depthSlider.step, this.depthSlider.min);
      }
      this.changeCesiumDepth();
    },

    changeCesiumTransparency() {
      const image3D = this.$parent.$parent.image3D;
      changeModelTransparency(this.viewer3D, image3D, this.transparencyForCesium);
    },

    changeTransparencyKeyboard(dir) {
      if (dir === 'up') {
        this.transparencySlider.value = Math.min(this.transparencySlider.value + this.transparencySlider.step, this.transparencySlider.max);
      }
      if (dir === 'down') {
        this.transparencySlider.value = Math.max(this.transparencySlider.value - this.transparencySlider.step, this.transparencySlider.min);
      }
      this.changeCesiumTransparency();
    },

    hideShowImage() {
      const image3D = this.$parent.$parent.image3D;
      hideShowModel(this.viewer3D, image3D);
      this.isModelVisible = !this.isModelVisible;
    },

    shortcutDefinition
  }
};
</script>

<style lang="postcss">
.controlPanel__inputNumber{
  @apply pl-0 pr-1 text-right;
  /* Disabled arrow */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type=number] {
    -moz-appearance:textfield;
  }
}

.controlPanel__slider{
  @apply mx-1;
  -webkit-appearance: none;
  /* Generated with http://danielstern.ca/range.css/ */
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4.7px;
    cursor: pointer;
    background: theme('colors.gray.100');
    border-radius: 25px;
  }
  &::-webkit-slider-thumb {
    height: 12px;
    width: 12px;
    border-radius: 50px;
    background: theme('colors.gray.400');
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5.15px;
    border:0;
  }
  &:focus::-webkit-slider-runnable-track {
    background: theme('colors.gray.100');
  }
  &::-moz-range-track {
    width: 100%;
    height: 4.7px;
    cursor: pointer;
    background: theme('colors.gray.100');
    border-radius: 25px;
  }
  &::-moz-range-thumb {
    height: 12px;
    width: 12px;
    border-radius: 50px;
    background: theme('colors.gray.400');
    cursor: pointer;
    border:0;
  }
  &::-ms-track {
    width: 100%;
    height: 4.7px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: theme('colors.gray.100');
    border-radius: 50px;
  }
  &::-ms-fill-upper {
    background: theme('colors.gray.100');
    border-radius: 50px;
  }
  &::-ms-thumb {
    height: 12px;
    width: 12px;
    border-radius: 50px;
    background: theme('colors.gray.400');
    cursor: pointer;
    height: 4.7px;
  }
  &:focus::-ms-fill-lower {
    background: theme('colors.gray.100');
  }
  &:focus::-ms-fill-upper {
    background: theme('colors.gray.100');
  }
}

.controPanel__sliderArrow{
  transform: rotate(180deg);
}

.controPanel__sliderArrow--open{
  transform: rotate(0deg);
}
</style>
