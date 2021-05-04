<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 18 18"
    :aria-labelledby="labelProvided"
    role="presentation"
    focusable="false"
  >
    <title v-if="name !== ''">{{ name }}</title>
    <g :fill="color">
      <slot></slot>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  },
  computed: {
    labelProvided() {
      return this.label !== '' ? 'label-' + this.label : false;
    }
  }
};
</script>

<style lang="postcss" scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
</style>
