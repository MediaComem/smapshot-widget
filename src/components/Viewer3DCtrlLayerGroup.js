export function hasGroupActiveBaseLayer(imageryLayers, layerIdActive) {
  return imageryLayers.some(layer => layer.id === layerIdActive);
}

export function sendImageryAndTerrain(layer, terrainLayers) {
  const associatedTerrain = layer.associatedTerrain;

  // Retrieve proper terrain and switch
  const terrain = terrainLayers.find(terrainLayer => terrainLayer.name === associatedTerrain);
  return { imagery: layer, terrain: terrain.terrainProvider };
}

export function getClassFormattedFrom(id) {
  return id.split('.').join('');
}
