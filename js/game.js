const canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// GAME INIT + CANVAS RENDER LOOP
function initGame() {
  /* ===============================
     SELECT CAR FROM cars[]
     =============================== */

  // You stored this in UI
  const selectedCarId = sessionStorage.getItem("choosenCar"); 
  // fallback if nothing selected
  const selectedCar =
    cars.find((car) => car.id === selectedCarId) ?? cars[0];

  const carFrames = selectedCar.frames;

  /* ===============================
     CAR IMAGE SETUP
     =============================== */
  let frameIndex = 0;
  const carImg = new Image();
  carImg.src = carFrames[0];

  /* ===============================
     MAP LAYERS LOADING
     =============================== */
  const layers = [];
  let layersLoaded = 0;

  for (let file of gameMapFiles) {
    const img = new Image();
    img.src = file;
    img.onload = () => {
      layersLoaded++;
      tryStart();
    };
    layers.push(img);
  }

  /* ===============================
     START GAME ONLY WHEN READY
     =============================== */
  let carLoaded = false;
  carImg.onload = () => {
    carLoaded = true;
    tryStart();
  };

  function tryStart() {
    if (!carLoaded) return;
    if (layersLoaded !== gameMapFiles.length) return;
    requestAnimationFrame(drawFrame);
  }

  /* ===============================
     DRAW HELPERS
     =============================== */
  function drawCar() {
    ctx.drawImage(
      carImg,
      300,
      600,
      selectedCar.width,
      selectedCar.height
    );
  }

  /* ===============================
     SCROLL STATE
     =============================== */
  let roadX = 0;
  let housesX = 0;
  let cloudsX = 0;
  let natureX = 0;
  let lamppostX = 0;

  let scrollSpeed = 200;
  let lastTime = performance.now();

  function loopLayer(layerImg, xPos, speed, deltaTime) {
    xPos -= speed * (deltaTime / 1000);
    if (xPos <= -canvas.width) xPos = 0;

    ctx.drawImage(layerImg, xPos, 0, canvas.width, canvas.height);
    ctx.drawImage(
      layerImg,
      xPos + canvas.width,
      0,
      canvas.width,
      canvas.height
    );

    return xPos;
  }

  /* ===============================
     MAIN DRAW LOOP
     =============================== */
  function drawFrame(timestamp) {
    const deltaTime = Math.min(timestamp - lastTime, 50);
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(layers[0], 0, 0, canvas.width, canvas.height);
    natureX   = loopLayer(layers[1], natureX,   scrollSpeed * 0.5,  deltaTime);
    housesX   = loopLayer(layers[2], housesX,   scrollSpeed * 0.75, deltaTime);
    lamppostX = loopLayer(layers[3], lamppostX, scrollSpeed * 1.3,  deltaTime);
    roadX     = loopLayer(layers[4], roadX,     scrollSpeed * 1.5,  deltaTime);
    cloudsX   = loopLayer(layers[5], cloudsX,   scrollSpeed * 0.25, deltaTime);
    ctx.drawImage(layers[6], 0, 0, canvas.width, canvas.height);

    
    drawCar();
    requestAnimationFrame(drawFrame);
  }
}
