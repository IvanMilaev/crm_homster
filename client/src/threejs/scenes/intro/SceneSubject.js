import * as THREE from "three";
import TextureToParticles from "./TextureToParticles";
import imageSrc from "./img/dan_03.jpg";
import { fragmentShader } from "./shaders/fbm_02.frag.js";
import { vertexShader } from "./shaders/defaultVertexShader.vert.js";
export default scene => {
  const group = new THREE.Group();
  const loader = new THREE.TextureLoader();

  let isLoadTexture = false;
  let particledImage;

  loader.load(imageSrc, texture => {
    //particledImage = TextureToParticles(texture);
    //group.add(particledImage);
    //isLoadTexture = true;
  });

  //Create a sine-like wave
  // let xy = [];
  // for (let i = 0; i < 20; i++) {
  //   xy.push(new THREE.Vector2(i, Math.sin(i)));
  // }
  // console.log(xy);
  // var curve = new THREE.SplineCurve(xy);
  const thick = 0.1;
  const radialsegmets = 8;
  function CustomCircleCurve(radius) {
    THREE.Curve.call(this);

    this.radius = radius === undefined ? 1 : radius;
  }
  CustomCircleCurve.prototype = Object.create(THREE.Curve.prototype);
  CustomCircleCurve.prototype.constructor = CustomCircleCurve;
  CustomCircleCurve.prototype.getPoint = function(t) {
    var tx = this.radius * Math.sin(2 * Math.PI * t);
    var ty = this.radius * Math.cos(2 * Math.PI * t);
    var tz = 0;

    return new THREE.Vector3(tx, ty, tz);
  };

  let material = new THREE.MeshBasicMaterial({ color: 0x8a8a8a });

  const shapes = [];
  shapes.push(
    {
      radius: 10,
      vertices: 25,
      positionY: 0,
      thick: 0.5,
      rotationZ: 0,
      radialsegmets: radialsegmets
    },
    {
      radius: 10,
      vertices: 3,
      positionY: -60,
      thick: 0.5,
      rotationZ: 0,
      radialsegmets: radialsegmets
    },
    {
      radius: 10,
      vertices: 25,
      positionY: -60,
      thick: thick,
      rotationZ: 0,
      radialsegmets: radialsegmets
    },
    {
      radius: 10,
      vertices: 25,
      positionY: -50,
      thick: thick,
      rotationZ: 0,
      radialsegmets: radialsegmets
    },
    {
      radius: 40,
      vertices: 50,
      positionY: 0,
      thick: thick,
      rotationZ: 0,
      radialsegmets: radialsegmets
    },
    {
      radius: 50,
      vertices: 50,
      positionY: 0,
      thick: thick,
      rotationZ: 0,
      radialsegmets: radialsegmets
    },
    {
      radius: 20,
      vertices: 30,
      positionY: -45,
      thick: thick,
      rotationZ: 0,
      radialsegmets: radialsegmets
    },
    {
      radius: 70,
      vertices: 50,
      positionY: 0,
      thick: thick,
      rotationZ: 0,
      radialsegmets: radialsegmets
    },
    {
      radius: 30,
      vertices: 3,
      positionY: 80,
      thick: 0.5,
      rotationZ: Math.PI,
      radialsegmets: radialsegmets
    },
    {
      radius: 30,
      vertices: 50,
      positionY: 80,
      thick: thick,
      rotationZ: 0,
      radialsegmets: radialsegmets
    },
    {
      radius: 7.5,
      vertices: 50,
      positionY: 19.5,
      thick: 0.5,
      rotationZ: 0,
      radialsegmets: radialsegmets
    },
    {
      radius: 5,
      vertices: 25,
      positionY: 33.5,
      thick: 0.5,
      rotationZ: 0,
      radialsegmets: radialsegmets
    },
    {
      radius: 2,
      vertices: 10,
      positionY: -16,
      thick: 0.5,
      rotationZ: 0,
      radialsegmets: radialsegmets
    },
    {
      radius: 1,
      vertices: 10,
      positionY: -25,
      thick: 0.5,
      rotationZ: 0,
      radialsegmets: radialsegmets
    },
    {
      radius: 1,
      vertices: 50,
      positionY: -40,
      thick: 0.5,
      rotationZ: 0,
      radialsegmets: radialsegmets
    }
  );

  // for (let i = 0; i < shapes.length; i++) {
  //   let path = new CustomCircleCurve(shapes[i].radius);
  //
  //   let geometry = new THREE.TubeBufferGeometry(
  //     path,
  //     shapes[i].vertices,
  //     shapes[i].thick,
  //     shapes[i].radialsegmets,
  //     true
  //   );
  //
  //   let mesh = new THREE.Mesh(geometry, material);
  //   mesh.position.setY(shapes[i].positionY);
  //   mesh.rotation.set(0, 0, shapes[i].rotationZ);
  //
  //   group.add(mesh);
  // }

  const uniforms = {
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2(1, 1) },
    u_resolution: { value: new THREE.Vector2(2000, 1000) }
  };

  let geometry = new THREE.PlaneBufferGeometry(400, 200);
  material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  });
  let mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);

  scene.add(group);
  function update(elapsedTime, delta) {
    if (isLoadTexture) {
      particledImage.material.uniforms.uTime.value += elapsedTime;
    }
    uniforms.u_time.value = 200.0 + elapsedTime;
  }

  return {
    update
  };
};
