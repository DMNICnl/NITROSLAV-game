const canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// GAME INIT + CANVAS RENDER LOOP
function initGame() {
// selct a car from menu
  const selectedCarId = sessionStorage.getItem("choosenCar"); 
  const selectedCar =
    cars.find((car) => car.id === selectedCarId) ?? cars[0];

  const carFrames = selectedCar.frames;

  /* ===============================
     CAR IMAGE SETUP (2-frame driving animation)
     =============================== */
  let frameIndex = 0;
  let frameTimer = 0;
  const frameDuration = 150; // ms per animation frame

  let carFramesLoaded = 0;
  const carImages = carFrames.map((src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      carFramesLoaded++;
      tryStart();
    };
    return img;
  });

  /* ===============================
     JUMP PHYSICS (based on car mass)
     heavier mass -> weaker jump + faster fall
     lighter mass -> higher jump + floatier fall
     =============================== */
  const REFERENCE_MASS = 1200;
  const BASE_JUMP_SPEED = 900;
  const BASE_GRAVITY = 2200;

  const groundY = 600;
  let carY = groundY;
  let velocityY = 0;
  let isJumping = false;

  const jumpSpeed = BASE_JUMP_SPEED * (REFERENCE_MASS / selectedCar.mass);
  const gravity = BASE_GRAVITY * (selectedCar.mass / REFERENCE_MASS);

  function jump() {
    if (isJumping) return;
    isJumping = true;
    velocityY = -jumpSpeed;
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") jump();
  });

  const arrowUpBtn = document.querySelector("#arrowUp");
  if (arrowUpBtn) arrowUpBtn.addEventListener("click", jump);

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
  function tryStart() {
    if (carFramesLoaded !== carImages.length) return;
    if (layersLoaded !== gameMapFiles.length) return;
    requestAnimationFrame(drawFrame);
  }

  /* ===============================
     DRAW HELPERS
     =============================== */
  function drawCar() {
    ctx.drawImage(
      carImages[frameIndex],
      300,
      carY,
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

    frameTimer += deltaTime;
    if (frameTimer >= frameDuration) {
      frameTimer -= frameDuration;
      frameIndex = (frameIndex + 1) % carImages.length;
    }

    if (isJumping) {
      velocityY += gravity * (deltaTime / 1000);
      carY += velocityY * (deltaTime / 1000);

      if (carY >= groundY) {
        carY = groundY;
        velocityY = 0;
        isJumping = false;
      }
    }

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
