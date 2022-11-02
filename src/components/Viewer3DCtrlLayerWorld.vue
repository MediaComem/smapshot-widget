<template>
  <div class="layerSwitcher3d__category">
    <h4 class="layerSwitcher3d__categoryTitle">
      {{ $t('layout.navigation.mapLayers.world') }}
    </h4>
    <ul class="layerSwitcher3d__baseLayersList">
      <li
        v-for="layer in worldWithLayers.imageryLayers"
        :key="layer.id"
      >
        <button
          v-lazy-container="{ selector: 'img' }"
          @click="$emit('switch-base-layer', sendImageryAndTerrain(layer, worldWithLayers.terrainLayers))"
        >
          <div
            class="layerSwitcher3d__wrapPreview"
            :class="{ 'layerSwitcher3d__wrapPreview--current': layer.id === activeLayer.id }"
          >
            <img
              :data-src="layer.iconUrl"
              alt=""
            >
          </div>
          <span v-html="$t('layout.navigation.mapLayers.' + layer.id)" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { sendImageryAndTerrain } from '@/components/Viewer3DCtrlLayerGroup';

export default {
  name: 'Viewer3DCtrlLayerWorld',

  props: {
    worldWithLayers: {
      type: Object,
      default: () => {}
    },

    activeLayer: {
      type: Object,
      default: () => ({ id: null, year: null })
    }
  },

  methods: {
    sendImageryAndTerrain
  }
};
</script>
