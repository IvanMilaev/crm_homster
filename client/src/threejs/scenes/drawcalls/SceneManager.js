import * as THREE from "three";
import SceneSubject from "./SceneSubject";
//import SceneSubject from "./scenes/drawcalls/SceneSubject";

import GeneralLights from "./GeneralLights";

export default canvas => {
  //const OrbitControls = OrbitControlClass(THREE);
  const clock = new THREE.Clock();

  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  };

  const mousePosition = {
    x: 0,
    y: 0
  };

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);

  const sceneSubject = new SceneSubject(scene);
  const sceneLights = new GeneralLights(scene);

  function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#202020");
    //scene.background = new THREE.Color("#ffffff");

    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    return renderer;
  }

  function buildCamera({ width, height }) {
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
    camera.position.z = 300;

    return camera;
  }

  function update() {
    sceneSubject.update(clock.getElapsedTime(), clock.getDelta());
    sceneLights.update(clock.getElapsedTime());
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    const { width, height } = canvas;

    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  function onMouseMove(x, y) {
    mousePosition.x = (x / screenDimensions.width) * 2 - 1;
    mousePosition.y = -(y / screenDimensions.height) * 2 + 1;
  }

  return {
    update,
    onWindowResize,
    onMouseMove
  };
};
