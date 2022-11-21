<template>
  <div
    v-if="countryAndBorderWithLayers.length > 0"
    class="layerSwitcher3d__category"
  >
    <h4 class="layerSwitcher3d__categoryTitle">
      {{ $tc('layout.navigation.mapLayers.country', 2) }}
    </h4>
    <details
      v-for="country in countryAndBorderWithLayers"
      :key="country.countryCode"
      class="layerSwitcher3d__group"
      :open="hasGroupActiveBaseLayer(country.imageryLayers, activeLayer.id)"
    >
      <summary class="layerSwitcher3d__groupTitle">
        {{ $t('country.' + country.countryCode) }}
      </summary>
      <ul class="layerSwitcher3d__baseLayersList">
        <li
          v-for="imageryLayer in country.imageryLayers"
          :key="imageryLayer.id"
        >
          <button
            v-lazy-container="{ selector: 'img' }"
            @click="$emit('switch-base-layer', sendImageryAndTerrain(imageryLayer, country.terrainLayers))"
          >
            <div
              class="layerSwitcher3d__wrapPreview"
              :class="{ 'layerSwitcher3d__wrapPreview--current': imageryLayer.id === activeLayer.id }"
            >
              <img
                :data-src="imageryLayer.iconUrl"
                alt=""
              >
            </div>
            <span v-html="$t('layout.navigation.mapLayers.' + imageryLayer.id)" />
          </button>
        </li>
      </ul>
      <ul
        v-if="country.overlayLayers.length > 0"
        class="layerSwitcher3d__overlaysList"
      >
        <li
          v-for="overlayLayer in country.overlayLayers"
          :key="overlayLayer.id"
          class="checkboxWrapper"
        >
          <input
            :id="`checkbox__${getClassFormattedFrom(overlayLayer.id)}`"
            type="checkbox"
            class="sr-only"
            :checked="activeOverlaysIds.includes(overlayLayer.id)"
            @change="$emit('toggle-overlay', { visible: $event.target.checked, layer: overlayLayer})"
          >
          <label
            :for="`checkbox__${getClassFormattedFrom(overlayLayer.id)}`"
            v-html="$t('layout.navigation.mapLayers.' + overlayLayer.id)"
          />
        </li>
      </ul>
    </details>
  </div>
</template>

<script>
import { getClassFormattedFrom, hasGroupActiveBaseLayer, sendImageryAndTerrain } from '@/components/Viewer3DCtrlLayerGroup';

import BorderCountriesJson from '@/layers/Viewer3DCountries/Borders';
import CountriesActivatedJson from '@/layers/Viewer3DCountries/Activated';

export default {
  name: 'Viewer3DCtrlLayerCountries',
  props: {
    currentPose: {
      type: Object,
      default: () => {}
    },

    countryWithLayers: {
      type: Object,
      default: () => {}
    },

    activeLayer: {
      type: Object,
      default: () => ({ id: null, year: null })
    },

    activeOverlaysIds: {
      type: Array,
      default: () => []
    }
  },

  static() {
    return {
      listCountriesActivated: CountriesActivatedJson,
      listBorderCountries: BorderCountriesJson
    };
  },

  data() {
    return {
      borderCountriesWithLayers: []
    };
  },

  computed: {
    countryAndBorderWithLayers() { // Set is used to ensure no duplicate key with special case for example Liechstenstein which use CH imagery as fallback
      return [...new Set([...(typeof this.countryWithLayers !== 'undefined' ? [this.countryWithLayers] : []), ...this.borderCountriesWithLayers])];
    }
  },

  created() {
    this.getCountryAndBorderCountries();
  },

  methods: {
    getCountryAndBorderCountries() {
      // Check if borders countries are defined for given country
      const currentBorderCountries = this.listBorderCountries[this.currentPose.country_iso_a2];
      if (!currentBorderCountries) {
        return [];
      }

      // Filter countries which aren't activated (=available)
      const currentBorderCountriesActivated = currentBorderCountries.filter(countryCode => this.listCountriesActivated.includes(countryCode));

      for (let i = 0; i < currentBorderCountriesActivated.length; i++) {
        // Import only if layers aren't already loaded
        const isGroupInArray = typeof currentBorderCountriesActivated[i] !== 'undefined' && this.borderCountriesWithLayers.some(group => group[this.idKey] === currentBorderCountriesActivated[i]);
        if (!isGroupInArray) {
          new Promise((resolve, reject) => {
            import(/* webpackChunkName: "layers-[request]" */ `@/layers/Viewer3DCountries/${currentBorderCountriesActivated[i]}.js`)
              .then(
                response => {
                  this.borderCountriesWithLayers.push({ ...response });
                  resolve();
                }
              )
              .catch(error => {
                reject(error);
              });
          });
        }
      }
    },

    hasGroupActiveBaseLayer,
    sendImageryAndTerrain,
    getClassFormattedFrom
  }
};
</script>
