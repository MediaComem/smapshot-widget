<template>
  <div class="layerSwitcher3d__category">
    <!-- Owner title -->
    <h4 class="layerSwitcher3d__categoryTitle">
      {{ $tc('layout.owners.owner', 2) }}
    </h4>
    <details
      class="layerSwitcher3d__group"
      :open="hasGroupActiveBaseLayer(ownerWithLayers.imageryLayers, activeLayer.id)"
    >
      <summary class="layerSwitcher3d__groupTitle">
        {{ currentImage.owner.name }}
      </summary>
      <!-- Layers list -->
      <ul class="layerSwitcher3d__baseLayersList">
        <li
          v-for="imageryLayer in ownerWithLayers.imageryLayers"
          :key="imageryLayer.id"
        >
          <button
            v-lazy-container="{ selector: 'img' }"
            @click="switchLayer(imageryLayer)"
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
          <!-- Layer year selector -->
          <div
            v-if="imageryLayer.associatedYears && imageryLayer.associatedYears.length > 0 "
            class="inline-flex overflow-x-hidden overflow-y-hidden relative"
            :class="{ 'focus-visible': imageryLayer.selectInFocus }"
            tabindex="-1"
          >
            <p
              aria-hidden="true"
              class="dropdown font-bold pointer-events-none text-xs"
            >
              {{ imageryLayer.chosenYear || (imageryLayer.id === activeLayer.id && activeLayer.year ? activeLayer.year : imageryLayer.defaultYear) }}
            </p>
            <select
              :value="imageryLayer.chosenYear || (imageryLayer.id === activeLayer.id && activeLayer.year ? activeLayer.year : imageryLayer.defaultYear)"
              :aria-label="$t('layout.navigation.selectYear')"
              class="absolute cursor-pointer left-0 opacity-0 top-0"
              @input="imageryLayer.chosenYear = parseInt($event.target.value, 10); switchLayer(imageryLayer)"
              @focus="$event.target.classList.contains('focus-visible') ? imageryLayer.selectInFocus = true : ''"
              @blur="imageryLayer.selectInFocus = false"
            >
              <option
                v-for="year in imageryLayer.associatedYears"
                :key="year"
                :value="year"
              >
                {{ year }}
              </option>
            </select>
          </div>
        </li>
      </ul>
      <!-- Owner overlays -->
      <ul
        v-if="ownerWithLayers.overlayLayers.length > 0"
        class="layerSwitcher3d__overlaysList"
      >
        <li
          v-for="overlayLayer in ownerWithLayers.overlayLayers"
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

export default {
  name: 'Viewer3DCtrlLayerOwners',
  props: {
    currentImage: {
      type: Object,
      default: () => {}
    },

    ownerWithLayers: {
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

  methods: {
    switchLayer(imageryLayer){
      this.$emit('switch-base-layer', sendImageryAndTerrain(imageryLayer, this.ownerWithLayers.terrainLayers));
    },

    hasGroupActiveBaseLayer,
    sendImageryAndTerrain,
    getClassFormattedFrom
  }
};
</script>
