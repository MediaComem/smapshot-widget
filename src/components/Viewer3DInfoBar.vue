<template>
  <div
    class="controlPanel controlPanel__infos"
    :class="{ 'controlPanel__infos--bg': mouseOnView }"
  >
    <div class="cesiumLogo">
      <slot />
    </div>
    <dl class="flex whitespace-pre">
      <dt>{{ $t('layout.navigation.altitude') }}: </dt>
      <dd>{{ altitude }}m</dd>
      |
      <dt>{{ $t('layout.navigation.coordinates') }}: </dt>
      <dd>{{ latitude }}, {{ longitude }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'Viewer3DInfoBar',

  props: {
    mouseOnView: {
      type: Boolean,
      default: () => false
    },

    pose: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    latitude(){
      return parseFloat((this.pose.latitude || 0).toFixed(4));
    },

    longitude(){
      return parseFloat((this.pose.longitude || 0).toFixed(4));
    },

    altitude(){
      return parseFloat((this.pose.altitude || 0).toFixed(4));
    }
  },
};
</script>

<style lang="postcss">
.controlPanel__infos{
  @apply bottom-0 flex items-end text-gray-100 text-xxs pb-1 px-2 leading-none;

  & .cesium-credit-expand-link{
    display:inline-block !important;

  }
  & dl,
  & .cesium-credit-expand-link{
    padding-bottom: .1rem !important;
  }
}

.controlPanel__infos--bg{
  @apply bg-black bg-opacity-20 pt-1;
  border-top-right-radius: 0.25rem;
}

.cesiumLogo{
  & .cesium-widget-credits{
    @apply relative flex text-xxs leading-none font-normal text-gray-100;
    text-shadow:none !important;
    display:inline-block !important;
  }
  & .cesiumCredits{
    @apply leading-none;
  }
  & .cesium-credit-expand-link {
    vertical-align: bottom;
  }
  & img{
    margin-bottom:-1px;
    height:20px;
  }
}

/* purgecss start ignore */

#cesiumCredits a,
.cesium-widget a,
.cesium-credit-lightbox > ul > li a{
  @apply no-underline font-normal text-gray-100;
  background:none;

  &:hover{
    @apply text-white;
  }
}

@media only screen and (max-width: 800px) {
  .controlPanel__infos{
    @apply flex-col w-full items-start;
  }

  .cesiumLogo{
    order:2;
  }

  .cesium-credit-logoContainer{
    @apply mb-1;
    display:inline-block !important;
    height:16px;
    & img{
      height:16px;
    }
  }
}

/* purgecss end ignore */
</style>
