import * as THREE from "three";
import glichImage from "./girl_2.jpg";
import TouchTexture from "./TouchTexture";
import textureToParticles from "./TextureToParticles";

export default scene => {
  const group = new THREE.Group();

  const loader = new THREE.TextureLoader();
  const src = glichImage;
  let particleCount;
  let particlePositions;
  let particleCloud;
  let linesMesh;
  let linePositions;
  let lineColors;
  const minDistance = 95;
  const maxDistance = 120;
  let ofssetParticlePosition;
  let hitArea;
  let isLoadTexture = false;
  let touch = false;
  let maxConnections = 2;

  //let touchLines = false;
  const intersectRaycasterObjects = [];

  // load image
  loader.load(src, texture => {
    particleCloud = textureToParticles(texture);
    console.log(particleCloud);
    particlePositions = particleCloud.geometry.attributes.offset.array;
    particleCount = particleCloud.geometry.attributes.offset.length;
    linesMesh = makeLinesGeometry(particleCount);
    linePositions = linesMesh.geometry.attributes.position.array;
    lineColors = linesMesh.geometry.attributes.color.array;
    hitArea = makeHitArea(texture);
    initTouch(particleCloud);

    // const particlesG = new THREE.BufferGeometry();
    //
    // ofssetParticlePosition = new Float32Array(particleCount);
    //
    // for (let i = 0; i < particleCount; i++) {
    //   ofssetParticlePosition[i * 3] =
    //     particlePositions[i * 3] - texture.image.width / 2;
    //   ofssetParticlePosition[i * 3 + 1] =
    //     particlePositions[i * 3 + 1] - texture.image.height / 2;
    //   ofssetParticlePosition[i * 3 + 2] = particlePositions[i * 3 + 2];
    // }
    // particlesG.addAttribute(
    //   "position",
    //   new THREE.BufferAttribute(ofssetParticlePosition, 3).setDynamic(true)
    // );
    // const pMaterial = new THREE.PointsMaterial({
    //   color: 0xffffff,
    //   size: 2,
    //   blending: THREE.AdditiveBlending,
    //   transparent: true,
    //   sizeAttenuation: false
    // });
    // const ParticlesGPoints = new THREE.Points(particlesG, pMaterial);
    // console.log(ParticlesGPoints);
    // group.add(ParticlesGPoints);

    // for raycaster
    intersectRaycasterObjects.push(hitArea);

    group.add(particleCloud);

    group.add(linesMesh);
    group.add(hitArea);

    isLoadTexture = true;
  });

  function initTouch(mesh) {
    // create only once
    if (!touch) {
      touch = new TouchTexture();
      //touchLines = new TouchLines();
    }
    mesh.material.uniforms.uTouch.value = touch.texture;
  }

  function makeLinesGeometry(numberOfPoints) {
    const positions = new Float32Array(numberOfPoints);
    const colors = new Float32Array(numberOfPoints);

    const geometry = new THREE.BufferGeometry();

    geometry.addAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3).setDynamic(true)
    );

    geometry.addAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3).setDynamic(true)
    );

    geometry.computeBoundingSphere();

    const material = new THREE.LineBasicMaterial({
      vertexColors: THREE.VertexColors,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    return new THREE.LineSegments(geometry, material);
  }

  function makeHitArea(texture) {
    const geometry = new THREE.PlaneGeometry(
      texture.image.width,
      texture.image.height,
      1,
      1
    );
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      depthTest: false
    });
    material.visible = false;
    return new THREE.Mesh(geometry, material);
  }

  scene.add(group);

  function handlerTouch(intersectionData) {
    const uv = intersectionData.uv;
    if (touch) {
      touch.addTouch(uv);
    }
  }

  function update(time) {
    if (isLoadTexture) {
      particleCloud.material.uniforms.uTime.value += time;

      if (touch) touch.update();

      let vertexpos = 0;
      let colorpos = 0;
      for (let i = 0; i < particleCount; i++) {
        let numConnections = 0;

        // for (var j = i + 1; j < particleCount; j++) {
        //   if (numConnections > maxConnections) break;
        //   var dx =
        //     ofssetParticlePosition[i * 3] - ofssetParticlePosition[j * 3];
        //   var dy =
        //     ofssetParticlePosition[i * 3 + 1] -
        //     ofssetParticlePosition[j * 3 + 1];
        //   var dz =
        //     ofssetParticlePosition[i * 3 + 2] -
        //     ofssetParticlePosition[j * 3 + 2];
        //   var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        //   if (dist < maxDistance && dist > minDistance) {
        //   }
        //   var alpha = 1.0 - dist / minDistance;
        //   linePositions[vertexpos++] = ofssetParticlePosition[i * 3];
        //   linePositions[vertexpos++] = ofssetParticlePosition[i * 3 + 1];
        //   linePositions[vertexpos++] = ofssetParticlePosition[i * 3 + 2];
        //   linePositions[vertexpos++] = ofssetParticlePosition[j * 3];
        //   linePositions[vertexpos++] = ofssetParticlePosition[j * 3 + 1];
        //   linePositions[vertexpos++] = ofssetParticlePosition[j * 3 + 2];
        //   lineColors[colorpos++] = alpha;
        //   lineColors[colorpos++] = alpha;
        //   lineColors[colorpos++] = alpha;
        //   lineColors[colorpos++] = alpha;
        //   lineColors[colorpos++] = alpha;
        //   lineColors[colorpos++] = alpha;
        //   numConnections++;
        // }
      }
    }
  }

  return {
    intersectRaycasterObjects,
    handlerTouch,
    update
  };
};
