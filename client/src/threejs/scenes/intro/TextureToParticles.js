import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders.glsl.js";

export default texture => {
  const width = texture.image.width;
  const height = texture.image.height;
  const numPoints = width * height;

  let numVisible = 0;
  let threshold = 70;
  let originalColors;

  const img = texture.image;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;
  ctx.scale(1, -1);
  ctx.drawImage(img, 0, 0, width, height * -1);

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  originalColors = Float32Array.from(imgData.data);

  for (let i = 0; i < numPoints; i++) {
    if (originalColors[i * 4 + 0] > threshold) numVisible++;
  }

  const uniforms = {
    uTime: { value: 2.0 },
    uRandom: { value: 1.0 },
    uDepth: { value: 20.0 },
    uSize: { value: 2.0 },
    uTextureSize: { value: new THREE.Vector2(width, height) },
    uTexture: { value: texture },
    uTouch: { value: null }
  };

  const material = new THREE.RawShaderMaterial({
    uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    //vertexShader: glslify(require("./particle.vert")),
    //fragmentShader: glslify(require("./particle.frag")),
    depthTest: false,
    transparent: true
    //vertexColors: true
    // blending: THREE.AdditiveBlending
  });

  const geometry = new THREE.InstancedBufferGeometry();

  // positions
  const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
  positions.setXYZ(0, -0.5, 0.5, 0.0);
  positions.setXYZ(1, 0.5, 0.5, 0.0);
  positions.setXYZ(2, -0.5, -0.5, 0.0);
  positions.setXYZ(3, 0.5, -0.5, 0.0);
  geometry.addAttribute("position", positions);

  // uvs
  const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
  uvs.setXYZ(0, 0.0, 0.0);
  uvs.setXYZ(1, 1.0, 0.0);
  uvs.setXYZ(2, 0.0, 1.0);
  uvs.setXYZ(3, 1.0, 1.0);
  geometry.addAttribute("uv", uvs);

  // index
  geometry.setIndex(
    new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1)
  );

  const indices = new Uint16Array(numVisible);
  const offsets = new Float32Array(numVisible * 3);
  const angles = new Float32Array(numVisible);

  for (let i = 0, j = 0; i < numPoints; i++) {
    if (originalColors[i * 4 + 0] <= threshold) continue;

    offsets[j * 3 + 0] = i % width;
    offsets[j * 3 + 1] = Math.floor(i / width);

    indices[j] = i;

    angles[j] = Math.random() * Math.PI;

    j++;
  }

  geometry.addAttribute(
    "pindex",
    new THREE.InstancedBufferAttribute(indices, 1, false)
  );
  geometry.addAttribute(
    "offset",
    new THREE.InstancedBufferAttribute(offsets, 3, false)
  );
  geometry.addAttribute(
    "angle",
    new THREE.InstancedBufferAttribute(angles, 1, false)
  );

  return new THREE.Mesh(geometry, material);
};
