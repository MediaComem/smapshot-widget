import {
  BingMapsStyle
} from 'cesium/Cesium';

const imageryLayers = [
  {
    id: 'maptiler.satellite',
    iconUrl: require('@/assets/images/mapProviders/maptiler_satellite.jpg'),
    associatedTerrain: 'maptiler.terrain',
    imageryProvider: {
      cesiumType: 'UrlTemplateImageryProvider',
      url: `https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=${process.env.VUE_APP_MAPTILER_SATELLITE_TOKEN}`,
      tileWidth: 128, // Artificially increasing resolution
      tileHeight: 128,
      maximumLevel: 20
    }
  },
  {
    id: 'bing.aerial',
    iconUrl: require('@/assets/images/mapProviders/bing_aerial.jpg'),
    associatedTerrain: 'maptiler.terrain',
    imageryProvider: {
      cesiumType: 'BingMapsImageryProvider',
      url: 'https://dev.virtualearth.net',
      key: process.env.VUE_APP_BING_MAP_TOKEN,
      mapStyle: BingMapsStyle.AERIAL
    }
  }
];

const overlayLayers = [];

const terrainLayers = [
  {
    name: 'maptiler.terrain',
    terrainProvider: {
      url: `https://api.maptiler.com/tiles/terrain-quantized-mesh/?key=${process.env.VUE_APP_MAPTILER_TERRAIN_TOKEN}`
    }
  }
];

export {
  imageryLayers,
  overlayLayers,
  terrainLayers
};
