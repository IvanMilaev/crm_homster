import * as THREE from "three";

export default scene => {
  const r = 1000;
  const rHalf = r / 2;
  const particlesData = [];
  const controls = {};
  const maxConnections = 20;
  const limitConnections = false;
  const maxParticleCount = 1000;
  const particleCount = 200;
  const minDistance = 100;

  const group = new THREE.Group();

  ////Particles

  const segments = maxParticleCount * maxParticleCount;

  const particles = new THREE.BufferGeometry();
  const pMaterial = new THREE.PointsMaterial({
    //vertexColors: THREE.VertexColors,
    color: 0xffffff,
    size: 0,
    blending: THREE.AdditiveBlending,
    transparent: true,
    sizeAttenuation: false
  });

  const particlePositions = new Float32Array(maxParticleCount * 3);
  const particleColors = new Float32Array(maxParticleCount * 3);

  const color = new THREE.Color();

  for (var i = 0; i < maxParticleCount; i++) {
    let x = Math.random() * r - r / 2;
    let y = Math.random() * r - r / 2;
    let z = Math.random() * r - r / 2;
    particlePositions[i * 3] = x;
    particlePositions[i * 3 + 1] = y;
    particlePositions[i * 3 + 2] = z;

    // let vx = 0;
    // let vy = 0;
    // let vz = 1;
    //
    // color.setRGB(vx, vy, vz);
    //
    // particleColors[i * 3] = color.r;
    // particleColors[i * 3 + 1] = color.g;
    // particleColors[i * 3 + 2] = color.b;

    // add it to the geometry
    particlesData.push({
      velocity: new THREE.Vector3(
        -1 + Math.random() * 2,
        -1 + Math.random() * 2,
        -1 + Math.random() * 2
      ),
      numConnections: 0
    });
  }

  particles.setDrawRange(0, particleCount);

  particles.addAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3).setDynamic(true)
  );

  // particles.addAttribute(
  //   "color",
  //   new THREE.BufferAttribute(particleColors, 3).setDynamic(true)
  // );

  particles.computeBoundingSphere();

  const pointCloud = new THREE.Points(particles, pMaterial);
  console.log(pointCloud);
  group.add(pointCloud);

  ////TargetFigure
  const geometry = new THREE.DodecahedronBufferGeometry(200);
  const geo = new THREE.EdgesGeometry(geometry);

  const wireframemat = new THREE.LineBasicMaterial({
    color: 0x4286f4,
    linewidth: 10
  });

  const geometryVertices = geometry.attributes.position.array;

  // Lines

  const linePositions = new Float32Array(segments * 3);
  const lineColors = new Float32Array(segments * 3);
  const linesGeometry = new THREE.BufferGeometry();

  linesGeometry.addAttribute(
    "position",
    new THREE.BufferAttribute(linePositions, 3).setDynamic(true)
  );

  linesGeometry.addAttribute(
    "color",
    new THREE.BufferAttribute(lineColors, 3).setDynamic(true)
  );
  linesGeometry.computeBoundingSphere();
  linesGeometry.setDrawRange(0, 50);

  const lMaterial = new THREE.LineBasicMaterial({
    vertexColors: THREE.VertexColors,
    blending: THREE.AdditiveBlending,
    transparent: true
  });

  const linesMesh = new THREE.LineSegments(linesGeometry, lMaterial);
  group.add(linesMesh);
  console.log(linesMesh);
  scene.add(group);

  function update(time) {
    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    for (var i = 0; i < particleCount; i++) particlesData[i].numConnections = 0;
    for (let i = 0; i < particleCount; i++) {
      // get the particle
      let particleData = particlesData[i];
      particlePositions[i * 3] += particleData.velocity.x;
      particlePositions[i * 3 + 1] += particleData.velocity.y;
      particlePositions[i * 3 + 2] += particleData.velocity.z;
      if (
        particlePositions[i * 3 + 1] < -rHalf ||
        particlePositions[i * 3 + 1] > rHalf
      )
        particleData.velocity.y = -particleData.velocity.y;
      if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf)
        particleData.velocity.x = -particleData.velocity.x;
      if (
        particlePositions[i * 3 + 2] < -rHalf ||
        particlePositions[i * 3 + 2] > rHalf
      )
        particleData.velocity.z = -particleData.velocity.z;

      if (limitConnections && particleData.numConnections >= maxConnections)
        continue;

      for (let j = 0; j < geometryVertices.length; j++) {
        let dx = particlePositions[i * 3] - geometryVertices[j * 3];
        let dy = particlePositions[i * 3 + 1] - geometryVertices[j * 3 + 1];
        let dz = particlePositions[i * 3 + 2] - geometryVertices[j * 3 + 2];
        let dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < minDistance) {
          particleData.numConnections++;

          let alpha = 1.0 - dist / minDistance;
          // linePositions[vertexpos++] = particlePositions[i * 3];
          // linePositions[vertexpos++] = particlePositions[i * 3 + 1];
          // linePositions[vertexpos++] = particlePositions[i * 3 + 2];
          linePositions[vertexpos++] = geometryVertices[j * 3];
          linePositions[vertexpos++] = geometryVertices[j * 3 + 1];
          linePositions[vertexpos++] = geometryVertices[j * 3 + 2];
          linePositions[vertexpos++] = geometryVertices[(j + 1) * 3];
          linePositions[vertexpos++] = geometryVertices[(j + 1) * 3 + 1];
          linePositions[vertexpos++] = geometryVertices[(j + 1) * 3 + 2];
          linePositions[vertexpos++] = geometryVertices[(j + 2) * 3];
          linePositions[vertexpos++] = geometryVertices[(j + 2) * 3 + 1];
          linePositions[vertexpos++] = geometryVertices[(j + 2) * 3 + 2];
          // lineColors[colorpos++] = alpha / 20;
          // lineColors[colorpos++] = alpha / 20;
          // lineColors[colorpos++] = alpha / 20;
          lineColors[colorpos++] = alpha / 20;
          lineColors[colorpos++] = alpha / 20;
          lineColors[colorpos++] = alpha / 20;
          lineColors[colorpos++] = alpha;
          lineColors[colorpos++] = alpha;
          lineColors[colorpos++] = alpha;

          numConnected++;
        }
      }
    }
    linesMesh.geometry.setDrawRange(0, numConnected * 2);
    linesMesh.geometry.attributes.position.needsUpdate = true;
    linesMesh.geometry.attributes.color.needsUpdate = true;
    pointCloud.geometry.attributes.position.needsUpdate = true;
  }

  return {
    update
  };
};
