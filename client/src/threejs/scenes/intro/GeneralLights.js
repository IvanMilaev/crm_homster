import * as THREE from "three";

export default scene => {
  const lightIn = new THREE.PointLight("#FFFFFF", 30);
  const lightOut = new THREE.PointLight("#FFFFFF", 30);
  lightOut.position.set(0, 0, 20);
  lightIn.position.set(100, 100, 0);

  scene.add(lightIn);
  //scene.add(lightOut);

  const rad = 10;

  function update(time) {
    const y = rad * Math.sin(time * 0.9);
    lightOut.position.y = y;
  }

  return {
    update
  };
};
