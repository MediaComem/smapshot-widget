import {
  GeographicTilingScheme,
  Rectangle
} from 'cesium';

const countryCode = 'CH';

/*
 * ANY CHANGES NEED TO BE REPLICATE ON li.js
 */

const imageryLayers = [
  {
    id: 'swisstopo.swissimage-product',
    iconUrl: require('@/assets/images/mapProviders/swisstopo_swissimage-product.jpg'),
    associatedTerrain: 'swissalti3d',
    imageryProvider: {
      cesiumType: 'UrlTemplateImageryProvider',
      url: 'https://wmts{s}.geo.admin.ch/1.0.0/ch.swisstopo.swissimage-product/default/current/4326/{z}/{x}/{y}.jpeg',
      subdomains: '56789',
      availableLevels: [8, 10, 12, 14, 15, 16, 17, 18],
      minimumRetrievingLevel: 8,
      maximumLevel: 17,
      tilingScheme: new GeographicTilingScheme({
        numberOfLevelZeroTilesX: 2,
        numberOfLevelZeroTilesY: 1
      }),
      rectangle: Rectangle.fromDegrees(5.013926957923385, 45.35600133779394, 11.477436312994008, 48.27502358353741),
      credit: '<a target="new" href="//www.swisstopo.admin.ch/internet/swisstopo/en/home.html">swisstopo</a>'
    }
  },
  {
    id: 'swisstopo.swissimage-product_1946',
    iconUrl: require('@/assets/images/mapProviders/swisstopo_swissimage-product_1946.jpg'),
    associatedTerrain: 'swissalti3d',
    imageryProvider: {
      cesiumType: 'UrlTemplateImageryProvider',
      url: '//wmts{s}.geo.admin.ch/1.0.0/ch.swisstopo.swissimage-product_1946/default/1946/4326/{z}/{x}/{y}.jpeg',
      subdomains: '56789',
      availableLevels: [8, 10, 12, 14, 15, 16, 17, 18],
      minimumRetrievingLevel: 8,
      maximumLevel: 17,
      tilingScheme: new GeographicTilingScheme({
        numberOfLevelZeroTilesX: 2,
        numberOfLevelZeroTilesY: 1
      }),
      rectangle: Rectangle.fromDegrees(5.013926957923385, 45.35600133779394, 11.477436312994008, 48.27502358353741),
      credit: '<a target="new" href="//www.swisstopo.admin.ch/internet/swisstopo/en/home.html">swisstopo</a>'
    }
  },
  {
    id: 'swisstopo.pixelkarte-grau',
    iconUrl: require('@/assets/images/mapProviders/swisstopo_pixelkarte-grau.jpg'),
    associatedTerrain: 'swissalti3d',
    imageryProvider: {
      cesiumType: 'UrlTemplateImageryProvider',
      url: '//wmts{s}.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/4326/{z}/{x}/{y}.jpeg',
      subdomains: '56789',
      availableLevels: [8, 10, 12, 14, 15, 16, 17, 18],
      minimumRetrievingLevel: 8,
      maximumLevel: 17,
      tilingScheme: new GeographicTilingScheme({
        numberOfLevelZeroTilesX: 2,
        numberOfLevelZeroTilesY: 1
      }),
      rectangle: Rectangle.fromDegrees(5.013926957923385, 45.35600133779394, 11.477436312994008, 48.27502358353741),
      credit: '<a target="new" href="//www.swisstopo.admin.ch/internet/swisstopo/en/home.html">swisstopo</a>'
    }
  },
  {
    id: 'swisstopo.pixelkarte-farbe',
    iconUrl: require('@/assets/images/mapProviders/swisstopo_pixelkarte-farbe.jpg'),
    associatedTerrain: 'swissalti3d',
    imageryProvider: {
      cesiumType: 'UrlTemplateImageryProvider',
      url: '//wmts{s}.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/4326/{z}/{x}/{y}.jpeg',
      subdomains: '56789',
      availableLevels: [8, 10, 12, 14, 15, 16, 17, 18],
      minimumRetrievingLevel: 8,
      maximumLevel: 17,
      tilingScheme: new GeographicTilingScheme({
        numberOfLevelZeroTilesX: 2,
        numberOfLevelZeroTilesY: 1
      }),
      rectangle: Rectangle.fromDegrees(5.013926957923385, 45.35600133779394, 11.477436312994008, 48.27502358353741),
      credit: '<a target="new" href="//www.swisstopo.admin.ch/internet/swisstopo/en/home.html">swisstopo</a>'
    }
  },
  {
    id: 'swisstopo.hiks-dufour',
    iconUrl: require('@/assets/images/mapProviders/swisstopo_hiks-dufour.jpg'),
    associatedTerrain: 'swissalti3d',
    imageryProvider: {
      cesiumType: 'UrlTemplateImageryProvider',
      url: '//wmts{s}.geo.admin.ch/1.0.0/ch.swisstopo.hiks-dufour/default/18650101/4326/{z}/{x}/{y}.png',
      subdomains: '56789',
      availableLevels: [8, 10, 12, 14, 15, 16, 17, 18],
      minimumRetrievingLevel: 8,
      maximumLevel: 17,
      tilingScheme: new GeographicTilingScheme({
        numberOfLevelZeroTilesX: 2,
        numberOfLevelZeroTilesY: 1
      }),
      rectangle: Rectangle.fromDegrees(5.013926957923385, 45.35600133779394, 11.477436312994008, 48.27502358353741),
      credit: '<a target="new" href="//www.swisstopo.admin.ch/internet/swisstopo/en/home.html">swisstopo</a>'
    }
  },
  {
    id: 'swisstopo.hiks-siegfried',
    iconUrl: require('@/assets/images/mapProviders/swisstopo_hiks-siegfried.jpg'),
    associatedTerrain: 'swissalti3d',
    imageryProvider: {
      cesiumType: 'UrlTemplateImageryProvider',
      url: '//wmts{s}.geo.admin.ch/1.0.0/ch.swisstopo.hiks-siegfried/default/19260101/4326/{z}/{x}/{y}.png',
      subdomains: '56789',
      availableLevels: [8, 10, 12, 14, 15, 16, 17, 18],
      minimumRetrievingLevel: 8,
      maximumLevel: 17,
      tilingScheme: new GeographicTilingScheme({
        numberOfLevelZeroTilesX: 2,
        numberOfLevelZeroTilesY: 1
      }),
      rectangle: Rectangle.fromDegrees(5.013926957923385, 45.35600133779394, 11.477436312994008, 48.27502358353741),
      credit: '<a target="new" href="//www.swisstopo.admin.ch/internet/swisstopo/en/home.html">swisstopo</a>'
    }
  }
];

const overlayLayers = [
  {
    id: 'swisstopo.swisstlm3d',
    type: 'Cesium3DTileset',
    options: {
      url: 'https://vectortiles0.geo.admin.ch/3d-tiles/ch.swisstopo.swisstlm3d.3d/20180716/tileset.json',
      dynamicScreenSpaceError: true,
      preferLeaves: true,
      maximumScreenSpaceError: 8
    }
  }
];

const terrainLayers = [
  {
    name: 'swissalti3d',
    terrainProvider: {
      url: '//3d.geo.admin.ch/1.0.0/ch.swisstopo.terrain.3d/default/20180601/4326/',
      availableLevels: [8, 9, 10, 12, 14, 16, 17],
      rectangle: Rectangle.fromDegrees(5.013926957923385, 45.35600133779394, 11.477436312994008, 48.27502358353741)
    }
  }
];

export {
  countryCode,
  imageryLayers,
  overlayLayers,
  terrainLayers
};
