import * as THREE from "three";
import glichImage from "assets/img/glich1.jpg";

export default scene => {
  const vertexShader = `
  // uniform float amplitude;
  // attribute float size;
  uniform float amplitude;

  attribute vec3 vertexColor;

  varying vec4 varColor;

  void main()
  {
  varColor = vec4(vertexColor, 1.0);

  vec4 pos = vec4(position, 1.0);
  pos.z *= amplitude;

  vec4 mvPosition = modelViewMatrix * pos;

  gl_PointSize = 1.0;
  gl_Position = projectionMatrix * mvPosition;
  }
`;
  const fragmentShader = `
  varying vec4 varColor;

  void main()
  {
  gl_FragColor = varColor;
  }
`;

  const particles = [];
  const imageWidth = 640;
  const imageHeight = 360;
  let imageData = null;

  var shaderUniforms, shaderAttributes;

  const animationTime = 0;
  const animationDelta = 0.03;

  const group = new THREE.Group();

  function createPixelData() {
    var image = document.createElement("img");
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    image.crossOrigin = "Anonymous";
    image.onload = function() {
      image.width = canvas.width = imageWidth;
      image.height = canvas.height = imageHeight;

      context.fillStyle = context.createPattern(image, "no-repeat");
      context.fillRect(0, 0, imageWidth, imageHeight);
      //context.drawImage(image, 0, 0, imageWidth, imageHeight);

      imageData = context.getImageData(0, 0, imageWidth, imageHeight).data;

      createPaticles();
      tick();
    };

    image.src = glichImage;
  }

  createPixelData();

  function createPaticles() {
    var colors = [];
    var weights = [0.2126, 0.7152, 0.0722];
    var c = 0;

    var geometry, material;
    var x, y;
    var zRange = 400;

    geometry = new THREE.Geometry();
    geometry.dynamic = false;

    x = imageWidth * -0.5;
    y = imageHeight * 0.5;

    shaderAttributes = {
      vertexColor: {
        type: "c",
        value: []
      }
    };

    shaderUniforms = {
      amplitude: {
        type: "f",
        value: 0.5
      }
    };

    const shaderMaterial = new THREE.ShaderMaterial({
      attributes: shaderAttributes,
      uniforms: shaderUniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });

    for (var i = 0; i < imageHeight; i++) {
      for (var j = 0; j < imageWidth; j++) {
        var color = new THREE.Color();

        color.setRGB(
          imageData[c] / 255,
          imageData[c + 1] / 255,
          imageData[c + 2] / 255
        );
        shaderAttributes.vertexColor.value.push(color);

        var weight =
          color.r * weights[0] + color.g * weights[1] + color.b * weights[2];

        var vertex = new THREE.Vector3();

        vertex.x = x;
        vertex.y = y;
        vertex.z = zRange * -0.5 + zRange * weight;

        geometry.vertices.push(vertex);

        c += 4;
        x++;
      }

      x = imageWidth * -0.5;
      y--;
    }
    console.log(geometry.vertices.length);
    const particleSystem = new THREE.ParticleSystem(geometry, shaderMaterial);
    group.add(particleSystem);
  }

  function tick() {
    requestAnimationFrame(tick);

    update();
  }

  scene.add(group);
  function update(time) {
    // shaderUniforms.amplitude.value = Math.sin(animationTime);
    //
    // animationTime += animationDelta;
  }

  return {
    update
  };
};
