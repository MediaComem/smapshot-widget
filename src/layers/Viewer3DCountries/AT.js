import {
  Rectangle
} from 'cesium/Cesium';

const countryCode = 'AT';

const imageryLayers = [
  {
    id: 'basemapAt.bmaporthofoto30cm',
    iconUrl: require('@/assets/images/mapProviders/basemapAt_bmaporthofoto30cm.jpg'),
    associatedTerrain: 'maptiler.terrain',
    imageryProvider:{
      cesiumType: 'UrlTemplateImageryProvider',
      url: '//maps{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg',
      subdomains: '1234',
      maximumLevel: 18,
      tileWidth: 128, // Artificially increasing resolution
      tileHeight: 128,
      rectangle: Rectangle.fromDegrees(8.782379, 46.358770, 17.5, 49.037872),
      credit: 'Tiles ⓒ <a href="http://www.basemap.at">basemap.at</a> (\'Orthofoto\')'
    }
  },
  {
    id: 'basemapAt.geolandbasemap',
    iconUrl: require('@/assets/images/mapProviders/basemapAt_geolandbasemap.jpg'),
    associatedTerrain: 'maptiler.terrain',
    imageryProvider: {
      cesiumType: 'UrlTemplateImageryProvider',
      url: '//maps{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png',
      subdomains: '1234',
      maximumLevel: 18,
      rectangle: Rectangle.fromDegrees(8.782379, 46.358770, 17.5, 49.037872),
      credit: 'Tiles ⓒ <a href="http://www.basemap.at">basemap.at</a> (\'Standard\')'
    }
  },
  {
    id: 'basemapAt.bmapoberflaeche',
    iconUrl: require('@/assets/images/mapProviders/basemapAt_bmapoberflaeche.jpg'),
    associatedTerrain: 'maptiler.terrain',
    imageryProvider: {
      cesiumType: 'UrlTemplateImageryProvider',
      url: '//maps{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg',
      subdomains: '1234',
      maximumLevel: 18,
      rectangle: Rectangle.fromDegrees(8.782379, 46.358770, 17.5, 49.037872),
      credit: 'Tiles ⓒ <a href="http://www.basemap.at">basemap.at</a> (\'Oberfläche\')'
    }
  }
];

const overlayLayers = [
  {
    id: 'vlb.hauptkonturflaechen',
    type: 'Cesium3DTileset',
    options: {
      url: `${process.env.VUE_APP_SMAPSHOT_API_URL}/data/owners/10/tiles/hauptkonturflaechen/tileset.json`,
      dynamicScreenSpaceError: true,
      preferLeaves: true,
      maximumScreenSpaceError: 8
    }
  }
];

const terrainLayers = [
  {
    name: 'maptiler.terrain',
    terrainProvider: {
      url: `https://api.maptiler.com/tiles/terrain-quantized-mesh/?key=${process.env.VUE_APP_MAPTILER_CUSTOM_TOKEN}`
    }
  }
];

export {
  countryCode,
  imageryLayers,
  overlayLayers,
  terrainLayers
};
