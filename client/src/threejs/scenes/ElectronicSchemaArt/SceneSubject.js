import * as THREE from "three";
import TextureToParticles from "./TextureToParticles";
import imageSrc from "./girl_2.jpg";

export default scene => {
  const group = new THREE.Group();
  const loader = new THREE.TextureLoader();

  let particledImage;

  loader.load(imageSrc, texture => {
    particledImage = TextureToParticles(texture);
    group.add(particledImage);
  });

  scene.add(group);
  function update(time) {}

  return {
    update
  };
};
