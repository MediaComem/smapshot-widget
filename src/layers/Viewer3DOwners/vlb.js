import {
  WebMercatorTilingScheme,
  Rectangle,
  Resource
} from 'cesium/Cesium';

const ownerSlug = 'vlb';

const imageryLayers = [
  {
    id: 'vlb.basemap_vlbterrain',
    iconUrl: require('@/assets/images/mapProviders/vlb_basemap_vlbterrain.jpg'),
    associatedTerrain: 'vlb.terrain',
    imageryProvider: {
      cesiumType: 'UrlTemplateImageryProvider',
      url: '//maps{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg',
      subdomains: '1234',
      maximumLevel: 18,
      tilingScheme: new WebMercatorTilingScheme(),
      rectangle: Rectangle.fromDegrees(8.782379, 46.358770, 17.5, 49.037872),
      credit: 'Tiles ⓒ <a href="http://www.basemap.at">basemap.at</a> (\'Orthofoto\')'
    }
  },
  {
    id: 'vlb.wi2015_20cm',
    iconUrl: require('@/assets/images/mapProviders/vlb_wi2015_20cm.jpg'),
    associatedTerrain: 'vlb.terrain',
    imageryProvider: {
      cesiumType: 'WebMapServiceImageryProvider',
      url: new Resource({
        url: 'http://vogis.cnv.at/mapserver/mapserv?layers=wi2015_20cm',
        proxy : {
          getURL : function(url) {
              return `${process.env.VUE_APP_SMAPSHOT_PROXY_URL}${encodeURIComponent(url)}`;
          }
        }
      }),
      parameters: { 'map': 'i_luftbilder_r_wms.map', 'TILED': 'TRUE', 'format': 'image/png' },
      rectangle: Rectangle.fromDegrees(9.33463, 46.7549, 10.333, 47.6586),
      credit: 'Land Vorarlberg – <a href="//data.vorarlberg.gv.at">data.vorarlberg.gv.at</a>'
    }
  },
  {
    id: 'vlb.ef2012_12cm',
    iconUrl: require('@/assets/images/mapProviders/vlb_ef2012_12cm.jpg'),
    associatedTerrain: 'vlb.terrain',
    imageryProvider: {
      cesiumType: 'WebMapServiceImageryProvider',
      url: new Resource({
        url: 'http://vogis.cnv.at/mapserver/mapserv?layers=ef2012_12cm',
        proxy : {
          getURL : function(url) {
              return `${process.env.VUE_APP_SMAPSHOT_PROXY_URL}${encodeURIComponent(url)}`;
          }
        }
      }),
      parameters: { 'map': 'i_luftbilder_r_wms.map', 'TILED': 'TRUE', 'format': 'image/png' },
      rectangle: Rectangle.fromDegrees(9.33463, 46.7549, 10.333, 47.6586),
      credit: 'Land Vorarlberg – <a href="//data.vorarlberg.gv.at">data.vorarlberg.gv.at</a>'
    }
  },
  {
    id: 'vlb.pe199x_25cm',
    iconUrl: require('@/assets/images/mapProviders/vlb_pe199x_25cm.jpg'),
    associatedTerrain: 'vlb.terrain',
    imageryProvider: {
      cesiumType: 'WebMapServiceImageryProvider',
      url: new Resource({
        url: 'http://vogis.cnv.at/mapserver/mapserv?layers=pe199x_25cm',
        proxy : {
          getURL : function(url) {
              return `${process.env.VUE_APP_SMAPSHOT_PROXY_URL}${encodeURIComponent(url)}`;
          }
        }
      }),
      parameters: { 'map': 'i_luftbilder_r_wms.map', 'TILED': 'TRUE', 'format': 'image/png' },
      rectangle: Rectangle.fromDegrees(9.33463, 46.7549, 10.333, 47.6586),
      credit: 'Land Vorarlberg – <a href="//data.vorarlberg.gv.at">data.vorarlberg.gv.at</a>'
    }
  },
  {
    id: 'vlb.pe198x_20cm',
    iconUrl: require('@/assets/images/mapProviders/vlb_pe198x_20cm.jpg'),
    associatedTerrain: 'vlb.terrain',
    imageryProvider: {
      cesiumType: 'WebMapServiceImageryProvider',
      url: new Resource({
        url: 'http://vogis.cnv.at/mapserver/mapserv?layers=pe198x_20cm',
        proxy : {
          getURL : function(url) {
              return `${process.env.VUE_APP_SMAPSHOT_PROXY_URL}${encodeURIComponent(url)}`;
          }
        }
      }),
      parameters: { 'map': 'i_luftbilder_r_wms.map', 'TILED': 'TRUE', 'format': 'image/png' },
      rectangle: Rectangle.fromDegrees(9.33463, 46.7549, 10.333, 47.6586),
      credit: 'Land Vorarlberg – <a href="//data.vorarlberg.gv.at">data.vorarlberg.gv.at</a>'
    }
  },
  {
    id: 'vlb.sw197x_25cm',
    iconUrl: require('@/assets/images/mapProviders/vlb_sw197x_25cm.jpg'),
    associatedTerrain: 'vlb.terrain',
    imageryProvider: {
      cesiumType: 'WebMapServiceImageryProvider',
      url: new Resource({
        url: 'http://vogis.cnv.at/mapserver/mapserv?layers=sw197x_25cm',
        proxy : {
          getURL : function(url) {
              return `${process.env.VUE_APP_SMAPSHOT_PROXY_URL}${encodeURIComponent(url)}`;
          }
        }
      }),
      parameters: { 'map': 'i_luftbilder_r_wms.map', 'TILED': 'TRUE', 'format': 'image/png' },
      rectangle: Rectangle.fromDegrees(9.33463, 46.7549, 10.333, 47.6586),
      credit: 'Land Vorarlberg – <a href="//data.vorarlberg.gv.at">data.vorarlberg.gv.at</a>'
    }
  },
  {
    id: 'vlb.sw195x_25cm',
    iconUrl: require('@/assets/images/mapProviders/vlb_sw195x_25cm.jpg'),
    associatedTerrain: 'vlb.terrain',
    imageryProvider: {
      cesiumType: 'WebMapServiceImageryProvider',
      url: new Resource({
        url: 'http://vogis.cnv.at/mapserver/mapserv?layers=sw195x_25cm',
        proxy : {
          getURL : function(url) {
              return `${process.env.VUE_APP_SMAPSHOT_PROXY_URL}${encodeURIComponent(url)}`;
          }
        }
      }),
      parameters: { 'map': 'i_luftbilder_r_wms.map', 'TILED': 'TRUE', 'format': 'image/png' },
      rectangle: Rectangle.fromDegrees(9.33463, 46.7549, 10.333, 47.6586),
      credit: 'Land Vorarlberg – <a href="//data.vorarlberg.gv.at">data.vorarlberg.gv.at</a>'
    }
  },
  {
    id: 'vlb.sw193x_25cm',
    iconUrl: require('@/assets/images/mapProviders/vlb_sw193x_25cm.jpg'),
    associatedTerrain: 'vlb.terrain',
    imageryProvider: {
      cesiumType: 'WebMapServiceImageryProvider',
      url: new Resource({
        url: 'http://vogis.cnv.at/mapserver/mapserv?layers=sw193x_25cm',
        proxy : {
          getURL : function(url) {
              return `${process.env.VUE_APP_SMAPSHOT_PROXY_URL}${encodeURIComponent(url)}`;
          }
        }
      }),
      parameters: { 'map': 'i_luftbilder_r_wms.map', 'TILED': 'TRUE', 'format': 'image/png' },
      rectangle: Rectangle.fromDegrees(9.33463, 46.7549, 10.333, 47.6586),
      credit: 'Land Vorarlberg – <a href="//data.vorarlberg.gv.at">data.vorarlberg.gv.at</a>'
    }
  }
];

const overlayLayers = [
  {
    id: 'vlb.vogisseilbahn',
    type: 'Cesium3DTileset',
    options: {
      url: `${process.env.VUE_APP_SMAPSHOT_PROXY_URL}/data/owners/10/tiles/seilbahn/tileset.json`,
      dynamicScreenSpaceError: true,
      preferLeaves: true,
      maximumScreenSpaceError: 8
    }
  },
  {
    id: 'vlb.hauptkonturflaechen',
    type: 'Cesium3DTileset',
    options: {
      url: `${process.env.VUE_APP_SMAPSHOT_PROXY_URL}/data/owners/10/tiles/hauptkonturflaechen/tileset.json`,
      dynamicScreenSpaceError: true,
      preferLeaves: true,
      maximumScreenSpaceError: 8
    }
  }
];

const terrainLayers = [
  {
    name: 'vlb.terrain',
    terrainProvider: {
      url: process.env.VUE_APP_VORARLBERG_TERRAIN_URL,
      availableLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      maximumLevel: 16,
      rectangle: Rectangle.fromDegrees(
        9.5043245,
        46.8229108,
        10.2635891,
        47.6140392
      )
    }
  }
];

export {
  ownerSlug,
  imageryLayers,
  overlayLayers,
  terrainLayers
};
