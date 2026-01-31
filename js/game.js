const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

//  GAME INIT + CANVAS RENDER LOOP (MAP SCROLL + CAR DRAW)
function initGame() {
  //  SELECT CAR FRAMES (from sessionStorage)

  const storedPath = sessionStorage.getItem("choosenCarPath");

  let selectedCarKey = "default";
  for (const key in carAnimations) {
    if (storedPath && storedPath.includes(key)) {
      selectedCarKey = key;
      break;
    }
  }

  // get cars frame array
  const carFrames = carAnimations[selectedCarKey];

  //  CANVAS SETUP (game canvas)
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  //   CAR IMAGE SETUP
  let frameIndex = 0;
  const carImg = new Image();
  carImg.src = carFrames[0];

  //  MAP LAYERS LOADING

  const layers = [];
  let loaded = 0;

  for (let file of BAlayerFiles) {
    const img = new Image();
    img.src = file;
    img.onload = () => {
      loaded++;
      if (loaded === BAlayerFiles.length) {
        //* startGame();
      }
    };
    layers.push(img);
  }

  //  DRAW HELPERS
  function drawAll() {
    layers.forEach((img) => ctx.drawImage(img, 0, 0));
  }

  function drawCar() {
    // FYI: this is the Y/X you will change for jumping later
    ctx.drawImage(carImg, 300, 600);
  }

  //  SCROLL STATE FOR LAYERS
  let roadX = 0;
  let housesX = 0;
  let cloudsX = 0;
  let natureX = 0;
  let lammpostX = 0;

  let scrollSpeed = 200;
  let lastTime = performance.now();

  //   LAYER LOOP FUNCTION
  function loopLayer(layerImg, xPos, speed, deltaTime) {
    xPos -= speed * (deltaTime / 1000);
    if (xPos <= -canvas.width) {
      xPos = 0;
    }

    ctx.drawImage(layerImg, xPos, 0, canvas.width + 0.7, canvas.height);
    ctx.drawImage(
      layerImg,
      xPos + canvas.width,
      0,
      canvas.width,
      canvas.height,
    );

    return xPos;
  }

  //   MAIN DRAW FRAME LOOP
  function drawFrame(timestamp) {
    const deltaTime = Math.min(timestamp - lastTime, 50);
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(layers[0], 0, 0, canvas.width, canvas.height);
    natureX = loopLayer(layers[1], natureX, scrollSpeed * 0.5, deltaTime);
    housesX = loopLayer(layers[2], housesX, scrollSpeed * 0.75, deltaTime);
    lammpostX = loopLayer(layers[3], lammpostX, scrollSpeed * 1.3, deltaTime);
    roadX = loopLayer(layers[4], roadX, scrollSpeed * 1.5, deltaTime);
    cloudsX = loopLayer(layers[5], cloudsX, scrollSpeed * 0.25, deltaTime);

    ctx.drawImage(layers[6], 0, 0, canvas.width, canvas.height);

    drawCar();
    requestAnimationFrame(drawFrame);
  }

  //  OPTIONAL CAR ANIMATION (currently commented)
  // drawFrame();
  // setInterval(() => {
  //   frameIndex = (frameIndex + 1) % carFrames.length;
  //   carImg.src = carFrames[frameIndex];
  // }, 300);

  //  START LOOP WHEN CAR IMAGE LOADED

  carImg.onload = () => requestAnimationFrame(drawFrame);
}
