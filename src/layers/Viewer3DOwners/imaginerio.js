const ownerSlug = 'imaginerio';

const availableYears = [1500,1700,1750,1783,1812,1843,1852,1864,1876,1900,1906,1910,1921,1922,1923,1924,1930,1932,1937,1949,1955,1965];

const imageryLayers = [
  {
    id: 'imaginerio',
    iconUrl: require('@/assets/images/mapProviders/imaginerio_default.jpg'),
    associatedTerrain: 'imaginerio_years',
    associatedYears: availableYears,
    defaultYear: 1965,
    imageryProvider: {
      cesiumType: 'UrlTemplateImageryProvider',
      url: availableYears.reduce((jsonObject, year) => {
        jsonObject[year] = `https://irio.spatialstudieslab.org/tiles/${year}/all/{z}/{x}/{y}.png`;
        return jsonObject;
      }, {}),
      maximumLevel: 18,
      credits: '<a href="https://imaginerio.org">Imaginerio</a>'
    }
  }
];

const overlayLayers = [];

const terrainLayers = [
  {
    name: 'imaginerio_years',
    associatedYears: availableYears,
    terrainProvider: {
      url: availableYears.reduce((jsonObject, year) => {
        jsonObject[year] = `${process.env.VUE_APP_IMAGINERIO_PREFIX_TERRAIN_URL}c${year}_DEM`;
        return jsonObject;
      }, {}),
      maximumLevel: 18
    }
  }
];

export {
  ownerSlug,
  imageryLayers,
  overlayLayers,
  terrainLayers
};
