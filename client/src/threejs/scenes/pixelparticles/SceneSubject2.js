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
  const group = new THREE.Group();
  const imageWidth = 640;
  const imageHeight = 360;
  // load image image data
  const img = document.createElement("img");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  let imageData = null;

  img.onload = () => {
    img.width = canvas.width = imageWidth;
    img.height = canvas.height = imageHeight;
    context.fillStyle = context.createPattern(img, "no-repeat");
    context.fillRect(0, 0, imageWidth, imageHeight);
    imageData = context.getImageData(0, 0, imageWidth, imageHeight).data;

    const geometry = new THREE.Geometry();

    const shaderAttributes = {
      vertexColor: {
        type: "c",
        value: []
      }
    };

    const shaderUniforms = {
      amplitude: {
        type: "f",
        value: 0.5
      }
    };

    let c = 0;
    let x = imageWidth * -0.5;
    let y = imageHeight * 0.5;
    let weights = [0.2126, 0.7152, 0.0722];
    let zRange = 400;

    for (var i = 0; i < imageHeight; i++) {
      for (var j = 0; j < imageWidth; j++) {
        let color = new THREE.Color();

        color.setRGB(
          imageData[c] / 255,
          imageData[c + 1] / 255,
          imageData[c + 2] / 255
        );
        shaderAttributes.vertexColor.value.push(color);
        let weight =
          color.r * weights[0] + color.g * weights[1] + color.b * weights[2];
        let vertex = new THREE.Vector3();

        vertex.x = x;
        vertex.y = y;
        vertex.z = zRange * -0.5 + zRange * weight;

        geometry.vertices.push(vertex);
        c += 4;
        x++;
      }
    }

    const shaderMaterial = new THREE.ShaderMaterial({
      attributes: shaderAttributes,
      uniforms: shaderUniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });
  };
  img.src = glichImage;

  scene.add(group);
  function update(time) {}

  return {
    update
  };
};
