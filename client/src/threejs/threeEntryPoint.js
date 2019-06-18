import SceneManager from "./scenes/pixelparticles/SceneManager";

export default container => {
  const canvas = createCanvas(document, container);
  const sceneManager = new SceneManager(canvas);

  bindEventListeners();
  render();

  function createCanvas(document, container) {
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    return canvas;
  }

  function bindEventListeners() {
    window.onresize = resizeCanvas;
    canvas.onmousemove = mouseMove;
    resizeCanvas();
  }

  function resizeCanvas() {
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    sceneManager.onWindowResize();
  }

  function mouseMove(e) {
    sceneManager.onMouseMove(e.offsetX, e.offsetY);
  }

  function render(time) {
    requestAnimationFrame(render);
    sceneManager.update();
  }
};
