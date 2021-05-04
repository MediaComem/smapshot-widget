import { Cartesian3, Math as CesiumMath, Transforms, Model, sampleTerrain, when, Color, ScreenSpaceEventType } from 'cesium/Cesium';

export function getHeight(cesiumViewer) {
  return new Promise(function (resolve) {
    const cameraHeight = cesiumViewer.camera.positionCartographic.height;
    const position = [{
      longitude: cesiumViewer.camera.positionCartographic.longitude,
      latitude: cesiumViewer.camera.positionCartographic.latitude,
      height: 0
    }];
    const level = cesiumViewer.terrainProvider._availability._maximumLevel || 16;
    const promise = sampleTerrain(cesiumViewer.terrainProvider, level, position);
    when(promise, function (updatedPosition) {
      const groundHeight = updatedPosition[0].height;
      const delta = Math.abs(cameraHeight - groundHeight) / 5;
      resolve(delta);
    });
  });
}

export function lockCamera(cesiumViewer) {
  const scene = cesiumViewer.scene;
  scene.screenSpaceCameraController.enableTranslate = false;
  scene.screenSpaceCameraController.enableRotate = false;
  scene.screenSpaceCameraController.enableTilt = false;
  scene.screenSpaceCameraController.enableZoom = false;
  cesiumViewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
}

export function unlockCamera(cesiumViewer) {
  const scene = cesiumViewer.scene;
  scene.screenSpaceCameraController.enableRotate = true;
  scene.screenSpaceCameraController.enableTilt = true;
  scene.screenSpaceCameraController.enableZoom = true;
}

export function changeModelScale(cesiumViewer, model, scaleLog) {
  const scale = Math.pow(10, scaleLog);
  model.scale = scale;
  cesiumViewer.scene.requestRender();
}

export function deleteModel(cesiumViewer, model) {
  cesiumViewer.scene.primitives.remove(model);
  cesiumViewer.scene.requestRender();
}

export function computeFovToApply(cesium, imageHeight, imageWidth, focalImage) {
  // Mimic image geometry
  const ratioImage = imageHeight / imageWidth;
  const canvasHeight = cesium.canvas.height;
  const canvasWidth = cesium.canvas.width;
  const ratioCanvas = canvasHeight / canvasWidth;

  // The comparison of the ratio indicates if the canvas height or the width must be fitted
  let scale = null;
  let fCanvas = null;
  let fov = null;
  // let yCanvasOffset = null
  // let xCanvasOffset = null
  if (ratioCanvas < ratioImage) {
    // The height must be fitted
    // -------------------------
    // Compute the canvas focal
    scale = canvasHeight / imageHeight;
    fCanvas = focalImage * scale;
    if (ratioCanvas < 1) {
      // The canvas height is smaller than the widht the horizontal fov must be provided
      fov = 2 * Math.atan(canvasWidth / 2 / fCanvas);
    } else {
      // The canvas height is bigger than the widht the vertical fov must be provided
      fov = 2 * Math.atan(canvasHeight / 2 / fCanvas);
    }
  } else {
    // The width must be fitted
    // -------------------------
    // Compute the canvas focal
    scale = canvasWidth / imageWidth;
    fCanvas = focalImage * scale;
    if (ratioCanvas < 1) {
      // The canvas height is smaller than the widht the horizontal fov must be provided
      fov = 2 * Math.atan(canvasWidth / 2 / fCanvas);
    } else {
      // The canvas height is bigger than the widht the vertical fov must be provided
      fov = 2 * Math.atan(canvasHeight / 2 / fCanvas);
    }
  }
  return fov;
}

export function setCloseZoom(cesiumViewer, imageHeight, imageWidth, focalImage) {
  const fov = computeFovToApply(cesiumViewer, imageHeight, imageWidth, focalImage);
  // Set canvas fov
  cesiumViewer.camera.frustum.fov = fov;// + 8*Math.PI/180
}

export function setZoom(cesiumViewer, imageHeight, imageWidth, focalImage) {
  const fov = computeFovToApply(cesiumViewer, imageHeight, imageWidth, focalImage);
  // Set canvas fov
  cesiumViewer.camera.frustum.fov = fov + 8 * Math.PI / 180;
}

export function drawModel(cesiumViewer, image, pose) {
  const origin = Cartesian3.fromDegrees(pose.longitude, pose.latitude, pose.altitude);
  const modelMatrix = Transforms.eastNorthUpToFixedFrame(origin);

  const prim = Model.fromGltf({
    id: image.id,
    url: image.media.model_3d_url || `${process.env.VUE_APP_SMAPSHOT_API_URL}/data/collections/${image.collection?.id}/gltf/${image.id}.gltf`,
    modelMatrix: modelMatrix,
    scale: 1,
    incrementallyLoadTextures: false,
    show: true
  });

  return cesiumViewer.scene.primitives.add(prim);
}

export function hideShowModel(cesiumViewer, model) {
  model.show = !model.show;
  cesiumViewer.scene.requestRender();
}

export function changeModelTransparency(cesiumViewer, model, transparency) {
  model.color = Color.fromAlpha(Color.WHITE, transparency);
  cesiumViewer.scene.requestRender();
}

export function hideShowBuildings(cesiumViewer, buildings) {
  buildings.show = !buildings.show;
  cesiumViewer.scene.requestRender();
}
// Move camera with the buttons
// ----------------------------

export function goUp(cesiumViewer) {
  const deltaPromise = getHeight(cesiumViewer);
  deltaPromise.then(function (delta) {
    const position = cesiumViewer.camera.positionCartographic;
    cesiumViewer.camera.flyTo({
      destination: Cartesian3.fromRadians(position.longitude, position.latitude, position.height + delta),
      orientation: {
        heading: cesiumViewer.camera.heading,
        pitch: cesiumViewer.camera.pitch,
        roll: cesiumViewer.camera.roll
      },
      duration: 0.25
    });
    cesiumViewer.scene.requestRender();
  });
}

export function goDown(cesiumViewer) {
  const deltaPromise = getHeight(cesiumViewer);
  deltaPromise.then(function (delta) {
    const position = cesiumViewer.camera.positionCartographic;
    cesiumViewer.camera.flyTo({
      destination: Cartesian3.fromRadians(position.longitude, position.latitude, position.height - delta),
      orientation: {
        heading: cesiumViewer.camera.heading,
        pitch: cesiumViewer.camera.pitch,
        roll: cesiumViewer.camera.roll
      },
      duration: 0.25
    });
    cesiumViewer.scene.requestRender();
  });
}

export function goLeft(cesiumViewer) {
  const deltaPromise = getHeight(cesiumViewer);
  deltaPromise.then(function (delta) {
    cesiumViewer.camera.moveLeft(delta);
    cesiumViewer.scene.requestRender();
  });
}

export function goRight(cesiumViewer) {
  const deltaPromise = getHeight(cesiumViewer);
  deltaPromise.then(function (delta) {
    cesiumViewer.camera.moveRight(delta);
    cesiumViewer.scene.requestRender();
  });
}

export function goBackward(cesiumViewer) {
  const deltaPromise = getHeight(cesiumViewer);
  deltaPromise.then(function (delta) {
    cesiumViewer.camera.moveBackward(delta);
    cesiumViewer.scene.requestRender();
  });
}

export function goForward(cesiumViewer) {
  const deltaPromise = getHeight(cesiumViewer);
  deltaPromise.then(function (delta) {
    cesiumViewer.camera.moveForward(delta);
    cesiumViewer.scene.requestRender();
  });
}

export function turn(cesiumViewer, direction) {
  return new Promise(function (resolve) {
    const camera = cesiumViewer.camera;

    if (direction === 'Up' && camera.pitch < CesiumMath.PI / 2 - 2 * CesiumMath.PI / 20) {
      camera.flyTo({
        destination: camera.position,
        orientation: {
          heading: camera.heading,
          pitch: camera.pitch + camera.frustum.fov / 6, // +CesiumMath.PI/20,
          roll: camera.roll
        },
        duration: 0.25,
        complete: function () {
          cesiumViewer.scene.requestRender();
          resolve();
        }
      });
    } else if (direction === 'Down' && camera.pitch > -CesiumMath.PI / 2 + 2 * CesiumMath.PI / 20) {
      camera.flyTo({
        destination: camera.position,
        orientation: {
          heading: camera.heading,
          pitch: camera.pitch - camera.frustum.fov / 6, // -CesiumMath.PI/20,
          roll: camera.roll
        },
        duration: 0.25,
        complete: function () {
          cesiumViewer.scene.requestRender();
          resolve();
        }
      });
    } else if (direction === 'Right') {
      camera.flyTo({
        destination: camera.position,
        orientation: {
          heading: camera.heading + camera.frustum.fov / 6, // +CesiumMath.PI/20,
          pitch: camera.pitch,
          roll: camera.roll
        },
        duration: 0.25,
        complete: function () {
          cesiumViewer.scene.requestRender();
          resolve();
        }

      });
    } else if (direction === 'Left') {
      camera.flyTo({
        destination: camera.position,
        orientation: {
          heading: camera.heading - camera.frustum.fov / 6, // CesiumMath.PI/20,
          pitch: camera.pitch,
          roll: camera.roll
        },
        duration: 0.25,
        complete: function () {
          cesiumViewer.scene.requestRender();
          resolve();
        }
      });
    }
  });
}

export function zoom(cesiumViewer, direction) {
  const camera = cesiumViewer.camera;
  const fov = camera.frustum.fov;
  if (direction === 'In') {
    if (fov > CesiumMath.PI / 20) { // Set minimum angle
      camera.frustum.fov = fov - 0.05;
    }
  } else {
    if (fov < CesiumMath.PI * 0.75) { // Set maximum angle
      camera.frustum.fov = fov + 0.05;
    }
  }
  cesiumViewer.scene.requestRender();
}
