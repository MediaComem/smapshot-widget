<template>
  <div
    v-click-outside="closeMenu"
    class="layerSwitcher3d"
  >
    <button
      v-if="filteredLayers && filteredLayers.length > 0"
      v-lazy-container="{ selector: 'img' }"
      class="layerSwitcher3d__mainButton"
      :class="{'layerSwitcher3d__mainButton--close': menuOpen}"
      @click="openMenu"
    >
      <div class="layerSwitcher3d__wrapMainPreview">
        <img :data-src="mainPreviewIconUrl">
      </div>
    </button>

    <div
      ref="layerSwitcher3d__menu"
      class="layerSwitcher3d__menu scroll-y"
      :class="{ 'layerSwitcher3d__menu--close': !menuOpen }"
      tabindex="0"
      @keyup.escape="closeMenu"
    >
      <button
        id="label-closeLayerSwitcher"
        v-tooltip.right="$t('generic.close')"
        class="layerSwitcher3d__closeMenu"
        @click="closeMenu"
      >
        <IconWrap
          class="pl-1 text-gray-300"
          label="closeLayerSwitcher"
        >
          <IconClose />
        </IconWrap>
      </button>

      <keep-alive>
        <LayersCountries
          v-if="menuOpen && countryWithLayers"
          :current-pose="currentPose"
          :country-with-layers="countryWithLayers"
          :active-layer="activeLayer"
          :active-overlays-ids="activeOverlaysIds"
          @switch-base-layer="switchBaseLayer"
          @toggle-overlay="toggleOverlay"
        />
      </keep-alive>
      <keep-alive>
        <LayersOwners
          v-if="menuOpen && ownerWithLayers"
          :current-image="currentImage"
          :owner-with-layers="ownerWithLayers"
          :active-layer="activeLayer"
          :active-overlays-ids="activeOverlaysIds"
          @switch-base-layer="switchBaseLayer"
          @toggle-overlay="toggleOverlay"
        />
      </keep-alive>
      <keep-alive>
        <LayersWorld
          v-if="menuOpen && worldWithLayers"
          :world-with-layers="worldWithLayers"
          :active-layer="activeLayer"
          @switch-base-layer="switchBaseLayer"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import {
  BingMapsImageryProvider,
  Cesium3DTileset,
  CesiumTerrainProvider,
  PrimitiveCollection,
  UrlTemplateImageryProvider,
  WebMapServiceImageryProvider
} from 'cesium';

import ClickOutside from 'vue-click-outside';

import CountriesActivatedJson from '@/layers/Viewer3DCountries/Activated';
import CountriesFallbackJson from '@/layers/Viewer3DCountries/Fallback';

import IconClose from '@/assets/images/icons/Close';
import IconWrap from '@/assets/images/icons';

import LayersCountries from '@/components/Viewer3DCtrlLayerCountries';
import LayersOwners from '@/components/Viewer3DCtrlLayerOwners';
import LayersWorld from '@/components/Viewer3DCtrlLayerWorld';

import OwnersActivatedJson from '@/layers/Viewer3DOwners/Activated';

export default {
  name: 'Viewer3DCtrlLayer',

  directives: {
    ClickOutside
  },

  components: {
    IconWrap,
    IconClose,
    LayersWorld,
    LayersOwners,
    LayersCountries
  },

  props: {
    currentImage: {
      type: Object,
      default: () => {}
    },

    currentPose: {
      type: Object,
      default: () => {}
    }
  },

  static() {
    return {
      reloadImagesDebounced: null,
      ownersActivated: OwnersActivatedJson,
      countriesActivated: CountriesActivatedJson,
      countriesFallback: CountriesFallbackJson,
      overlaysPrimitives: new PrimitiveCollection()
    };
  },

  data() {
    return {
      menuOpen: false,
      activeLayer: {
        id: null,
        year: null
      },

      activeOverlaysIds: [],
      overlayIndex: [],
      layersUpdate: 0,
      mainPreviewIconUrl: null,
      ownerWithLayers: null,
      countryWithLayers: null,
      worldWithLayers: null,
      currentLayers:{
        imageryId: null,
        terrainId: null
      }
    };
  },

  computed: {
    filteredLayers() {
      this.layersUpdate; // To force refresh
      return this.viewer3D?.scene?.imageryLayers?._layers || [];
    }
  },

  watch: {
    currentImage:  function () {
      this.init();
    }
  },

  created() {
    this.viewer3D = this.$parent.$parent.viewer3D;
    // Ensure that we have an owner list to show translation of owner slug in Menu
    const loadOwners = this.owners.length === 0 ? this.loadOwners() : Promise.resolve();
    Promise.all([loadOwners]).then(() => { this.init(); });
  },

  methods: {
    init(){
      // Empty Layers (used when route change)

      this.ownerWithLayers = null;
      this.countryWithLayers = null;

      // Match image metadata with activated layers

      const HasOwnerLayers = this.ownersActivated.find(item => item === this.currentImage.owner.slug);
      const HasCountryLayers = this.countriesActivated.find(item => item === this.currentPose.country_iso_a2);
      const HasCountryFallbackLayers = Object.prototype.hasOwnProperty.call(this.countriesFallback, this.currentPose.country_iso_a2); // Special case for example Liechstenstein will fallback to Swiss imagery as their are providing also for them

      // Import layers

      const layersPromise = Promise.all([
        ...(HasOwnerLayers ? [this.importGroup('Owners', this.currentImage.owner.slug).then(res => { this.ownerWithLayers = res; })] : []),
        ...(HasCountryLayers ? [this.importGroup('Countries', this.currentPose.country_iso_a2).then(res => { this.countryWithLayers = res; })] : []),
        ...(HasCountryFallbackLayers ? [this.importGroup('Countries', this.countriesFallback[this.currentPose.country_iso_a2]).then(res => { this.countryWithLayers = res; })] : []),
        this.importGroup('World', 'World').then(res => { this.worldWithLayers = res; })
      ]);

      // Select default Layer by priority : 1) Owner 2) Country 3) World

      layersPromise.then(() => {
        if (HasOwnerLayers) {
          this.addFirstLayer(this.ownerWithLayers.imageryLayers[0], this.ownerWithLayers.terrainLayers);
        } else if (HasCountryLayers || HasCountryFallbackLayers) {
          this.addFirstLayer(this.countryWithLayers.imageryLayers[0], this.countryWithLayers.terrainLayers);
        } else {
          this.addFirstLayer(this.worldWithLayers.imageryLayers[0], this.worldWithLayers.terrainLayers);
        }
      });
    },

    addFirstLayer(layer, terrainLayers) {
      const associatedTerrain = layer.associatedTerrain;

      // Retrieve proper terrain and switch
      const terrain = terrainLayers.find(terrainLayer => terrainLayer.name == associatedTerrain);
      this.switchBaseLayer({ imagery: layer, terrain: terrain.terrainProvider });
    },

    switchBaseLayer({ imagery, terrain }) {
      const imageryLayer = { ...imagery };
      const terrainProvider = { ...terrain };
      const { cesiumType, ...imageryProvider } = imageryLayer.imageryProvider;

      const viewerLayers = this.viewer3D.scene.imageryLayers;

      let year = null;

      // When layer and terrain has multiple years URL use the choosen one from layer switcher
      if(imageryLayer.associatedYears){
        const year_min_image = (new Date(this.currentImage.date_shot_min)).getFullYear();
        year = imageryLayer.chosenYear
          ? imageryLayer.chosenYear
          : this.getClosestYear(year_min_image, imageryLayer.associatedYears);

        imagery.chosenYear = year; // Shortcut, I know it's bad to play with mutability…
        imageryProvider.url = imageryProvider.url[year.toString()];
        terrainProvider.url = terrainProvider.url[year.toString()];
      }

      const imageryId = imageryLayer.id + (year ? year : '');
      const terrainId = terrainProvider.name + (year ? year : '');

      // Switch only if different combo of base and terrain layers
      if (this.currentLayers.imageryId !== imageryId || this.currentLayers.terrainId !== terrainId) {
        let imageryConstruct;

        // Construct imagery
        switch (cesiumType) {
            case 'WebMapServiceImageryProvider':
              imageryConstruct = new WebMapServiceImageryProvider(imageryProvider);
              break;
            case 'BingMapsImageryProvider':
              imageryConstruct = new BingMapsImageryProvider(imageryProvider);
              break;
            default: //default with the most common constructor
              imageryConstruct = new UrlTemplateImageryProvider(imageryProvider);
        }
        // Remove layers
        viewerLayers.removeAll();

        // Add imagery layer to Cesium
        viewerLayers.addImageryProvider(imageryConstruct);

        // Set terrain
        this.viewer3D.scene.terrainProvider = new CesiumTerrainProvider(terrainProvider);

        // Force filteredLayer to refresh
        this.layersUpdate++;

        // Set selected layer
        this.activeLayer = { id: imageryLayer.id, year };

        // Set Main preview iconUrl
        this.mainPreviewIconUrl = imageryLayer.iconUrl;

        // Save current combo to check on switch if the request is the same combo
        this.currentLayers = { imageryId, terrainId };
      }
    },

    getClosestYear(givenYear, availableYears){
      const year = givenYear || (new Date()).getFullYear();

      // Find the closer year but not higher than the image year itself
      return availableYears.reduce(function(prev, curr) {
        return (Math.abs(curr - year) < Math.abs(prev - year) && curr <= year ? curr : prev);
      });
    },

    toggleOverlay({ visible, layer }) {
      const layerId = layer.id;

      const layerPrimitives = new Cesium3DTileset(layer.options);

      // Init Overlays primitives collection if doesn't exist
      if (!this.viewer3D.scene.primitives.contains(this.overlaysPrimitives)) {
        this.viewer3D.scene.primitives.add(this.overlaysPrimitives);
      }

      // Check if primitives was previously added
      const isPrimitivesAlreadyHere = this.overlaysPrimitives._primitives.some(overlay => overlay._url === layer.options.url);

      // Show layer
      if (visible) {
        if (isPrimitivesAlreadyHere) {
          // Show layer
          const primitivesInScene = this.overlayIndex.find(overlay => overlay.id === layerId);
          const primitive = this.overlaysPrimitives.get(primitivesInScene.index);
          primitive.show = true;
        } else {
          // Add layer
          if (layer.type === 'Cesium3DTileset') {
            this.overlaysPrimitives.add(layerPrimitives);
          }

          // Save index
          const primitivesIndex = this.overlaysPrimitives._primitives.length - 1;
          this.overlayIndex.push({
            id: layerId,
            index: primitivesIndex
          });
        }

        // Add to list of active overlays
        this.activeOverlaysIds.push(layerId);
      }
      // Hide Layer
      if (!visible) {
        const primitivesInScene = this.overlayIndex.find(overlay => overlay.id === layerId);
        const primitive = this.overlaysPrimitives.get(primitivesInScene.index);
        primitive.show = false;

        // Remove layer from active overlays
        this.activeOverlaysIds = this.activeOverlaysIds.filter(id => id !== layerId);
      }
      // Refresh Cesium
      this.viewer3D.scene.requestRender();
    },

    async importGroup(type, groupInview) {
      return await new Promise((resolve, reject) => {
        import(/* webpackChunkName: "layers-[request]" */ `@/layers/Viewer3D${type}/${groupInview}.js`)
          .then(response => resolve({ ...response }))
          .catch(error => reject(error));
      });
    },

    openMenu() {
      this.menuOpen = true;
      this.$nextTick(() => {
        this.$refs.layerSwitcher3d__menu.focus();
      });
    },

    closeMenu() {
      if (this.menuOpen) {
        this.menuOpen = false;
      }
    }
  }
};
</script>

<style lang="postcss">
.layerSwitcher3d{
    @apply absolute left-0 my-2 mx-3;
    bottom: 20px;
}

/* Default sytle for menu with group of layers */

.layerSwitcher3d__menu{
    @apply flex flex-col rounded px-6 py-6 bg-white shadow overflow-y-auto;
    max-height: calc(100vh - var(--sliderHeight) - 20px - 1rem);

    & li{
       @apply mt-2;
    }

    & li:not(:last-child){
        @apply mr-2;
    }
}

.layerSwitcher3d__closeMenu{
  @apply absolute;
  right:1rem;
}

.layerSwitcher3d__menu--close{
  @apply hidden;
}

/* Categories: Countries, Owners, World */

.layerSwitcher3d__category{
  @apply my-2;
}
.layerSwitcher3d__categoryTitle{
  @apply mb-6 text-gray-300 text-lg capitalize;
}
.layerSwitcher3d__categoryTitle:not(:first-child){
  @apply mt-6;
}

/* Group */

.layerSwitcher3d__group{
  @apply mr-8;
}
.layerSwitcher3d__groupTitle{
  @apply font-title font-semibold my-2 cursor-pointer;
}

.layerSwitcher3d__baseLayersList{
  @apply flex flex-wrap mt-4;

    & li {
      @apply flex flex-col items-center;
    }

    & button {
        @apply w-24;
    }

    & button span{
        @apply text-sm font-bold inline-block mt-2;
        line-height: 130%;
    }
}

/* Overlays */

.layerSwitcher3d__overlaysList{
  @apply mt-4 mb-8;

    & .checkboxWrapper{
      @apply mt-2 mb-4 flex items-center text-xs;
    }

    & .checkboxWrapper input{
      @apply mr-2 leading-tight;
    }

    & .checkboxWrapper label {
      @apply text-sm font-bold mb-0;
    }

    & .checkboxWrapper label::before{
      width:20px;
      height:20px;
    }

    & .checkboxWrapper label::after{
      height: 6px;
      width: 11px;
      top: 14px;
      left: 3px;
    }
}

/* Preview */

.layerSwitcher3d__wrapMainPreview,
.layerSwitcher3d__wrapPreview{
    @apply w-24 h-24 border rounded-lg border-white border-opacity-90 shadow;
    border-width:4.1px; /* Weird transparent border on chrome with 4px */

    & img{
      @apply rounded bg-white; /* Some layer are transparent */
      object-fit:cover;
      object-position: 0 0;
      height:100%;
    }
}
.layerSwitcher__mainButton:hover .layerSwitcher__wrapMainPreview{
  @apply bg-opacity-100;
}

/* Current Preview */
.layerSwitcher3d__wrapPreview--current{
    @apply border-teal-400;
}
.modeContribute .layerSwitcher3d__wrapPreview--current{
    @apply border-orange-400;
}

/* Hide */
.layerSwitcher3d__mainButton--close,
.layerSwitcher3d__menu--close{
    display:none;
}

@media only screen and (max-width: 800px) {
    .layerSwitcher3d__menu{
      max-height:320px;
    }

    .layerSwitcher3d__wrapMainPreview{
        @apply w-16 h-16;
    }

    .layerSwitcher3d__wrapPreview{
        @apply w-20 h-20;
    }

    .layerSwitcher3d__baseLayersList{

      & button {
          @apply w-20;
      }

      & button > *{
          @apply text-xs;
      }
    }
}
</style>
