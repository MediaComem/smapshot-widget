<template>
  <main
    v-if="attributesLoaded"
    id="main"
    class="grid h-full"
  >
    <ImageViewer
      v-if="isImageGeoreferenced"
      :current-image="currentImage"
      :current-pose="currentPose"
      :current-poses="currentPoses"
    />
    <div
      v-else-if="Number(currentImage.id)"
      class="embedMessage"
    >
      <p
        class="mb-2"
        v-html="$t('general.imageIsNotGelocalised')"
      />
      <p>
        <a
          :href="contributePath"
          class="btn__fitMode"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t('general.contribute') }}
        </a>
      </p>
    </div>
    <p
      v-else
      class="embedMessage"
    >
      {{ $t('generic.error') }}
    </p>
  </main>
</template>

<script>
const ImageViewer = () => import('@/components/Viewer3D');

export default {
  name: 'App',
  components: {
    ImageViewer
  },

  data(){
    return {
      attributesLoaded: false,
      currentImage: {},
      currentPose: {},
      currentPoses: []
    };
  },

  computed: {
    contributePath(){
      return window.location.origin + '/contribute/' + this.currentImage.id;
    },

    isImageGeoreferenced(){
      return ['waiting_validation', 'validated'].includes(this.currentImage.state);
    }
  },

  created(){
    const imageParams = this.parseURL();
    this.getImage(imageParams);
  },

  methods: {
    parseURL(){
      const location = window.location.pathname;
      const pathArray = location.split('/');
      const owner_id_slug = pathArray[3];
      const original_id = pathArray[5];

      return {
        owner_id_slug,
        original_id
      };
    },

    getImage({ owner_id_slug, original_id }) {
      fetch(`${process.env.VUE_APP_SMAPSHOT_API_URL}/owners/${owner_id_slug}/original_images/${original_id}/attributes`)
        .then(response => response.json())
        .then(data => {
          const { pose, poses, ...otherAttributes } = data;

          this.currentPose = pose;
          this.currentPoses = poses;
          this.currentImage = otherAttributes;
        })
        .finally(() => {
          this.attributesLoaded = true;
        });
    }
  }
};
</script>

<style lang="postcss">
@import "assets/styles/index.postcss";
#main{
  background:#435774;
}
.embedMessage{
  @apply text-white m-auto text-center;
  max-width:24rem;
}
.btn__fitMode{
  @apply inline-block bg-orange-500 rounded my-2 mr-2 py-3 px-5;
  &:hover{
    @apply bg-orange-400;
  }
}
</style>
