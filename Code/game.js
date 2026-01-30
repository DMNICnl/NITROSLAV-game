const canvas = document.querySelector("canvas");
let slides = document.getElementsByClassName("choose-character");
let slides2 = document.getElementsByClassName("choose-map");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
// Code for moving background img and character choosing page on the canvas

function initGame() {
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

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  let frameIndex = 0;
  const carImg = new Image();
  carImg.src = carFrames[0];

  const BAlayerFiles = [
    "../bratislava/demobratislavamap/BAsky.png", //0
    "../bratislava/demobratislavamap/BAnature3.png", // 1
    "../bratislava/demobratislavamap/BAhouses4.png", //2
    "../bratislava/demobratislavamap/BAlanterns.png", //3
    "../bratislava/demobratislavamap/BAroad.png", //4
    "../bratislava/demobratislavamap/BAclouds2.png", //5
    "../bratislava/demobratislavamap/BADayFilter.png", //6
  ];
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

  function drawAll() {
    layers.forEach((img) => ctx.drawImage(img, 0, 0));
  }

  function drawCar() {
    ctx.drawImage(carImg, 300, 600);
  }
  let roadX = 0;
  let housesX = 0;
  let cloudsX = 0;
  let natureX = 0;
  let lammpostX = 0;

  let scrollSpeed = 200;
  let lastTime = performance.now();

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
  // drawFrame();
  // setInterval(() => {
  //   frameIndex = (frameIndex + 1) % carFrames.length;
  //   carImg.src = carFrames[frameIndex];
  // }, 300);

  carImg.onload = () => requestAnimationFrame(drawFrame);
}

// animation frames for all cars
let carAnimations = {
  bmwe30: ["../Art/bmwe30_1.PNG", "../Art/bmwe30_2.PNG"],
  merc: ["../Art/merc_1.PNG", "../Art/merc_2.PNG"],
  micro: ["../Art/micro_1.PNG", "../Art/micro_2.PNG"],
  seat: ["../Art/seat_1.PNG", "../Art/seat_2.PNG"],
};

document.addEventListener("keydown", (event) => {
  console.log(event);
});

let score = 0;
let scoreDisplay = document.getElementById("score");
const btn = document.querySelector("button");

// btn.addEventListener("click", drawScore);

document.addEventListener("keydown", (event) => {
  if (event.key.startsWith("ArrowUp")) {
    score++;
    scoreDisplay.innerHTML = "Score: " + score;
  } else if (event.key.startsWith("ArrowDown")) {
    score--;
    scoreDisplay.innerHTML = "Score: " + score;
  } else {
    score = 0;
    scoreDisplay.innerHTML = "Score: " + score;
  }
  console.log(score);
});
// code for logo animation start screen
const nitroLogo = document.getElementById("nitroslavLogo");
const nitroLoop = document.getElementById("nitroslavLoop");

nitroLogo.addEventListener("ended", () => {
  console.log("loop ended");
  nitroLoop.style.display = "block";
});

// start screen car character choosing code
// First slider for selecting cars
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  const active = slides[slideIndex - 1];

  console.log("current car: " + active.dataset.name);
  console.log("current car source: " + active.dataset.src);

  dots[slideIndex - 1].className += " active";
}

// Second slider for maps
let slideIndex2 = 1;
showSlides2(slideIndex2);

function plusSlides2(n) {
  showSlides2((slideIndex2 += n));
}

function currentSlide2(n) {
  showSlides2((slideIndex2 = n));
}

function showSlides2(n) {
  let i;
  let slides2 = document.getElementsByClassName("choose-map");
  let dots = document.getElementsByClassName("dot-map");
  if (!slides2.length) return;
  if (n > slides2.length) {
    slideIndex2 = 1;
  }
  if (n < 1) {
    slideIndex2 = slides2.length;
  }
  for (i = 0; i < slides2.length; i++) {
    slides2[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides2[slideIndex2 - 1].style.display = "block";
  dots[slideIndex2 - 1].className += " active";
}
// code for selecting and storing chosen car and map

// characters
let characters = [
  "../Art/bmwe30_1.PNG",
  "../Art/merc_1.PNG",
  "../Art/micro_1.PNG",
  "../Art/seat_1.PNG",
];
let totalCharNumber = characters.length - 1;
let chosenCharNumber = 0;

let continueBtn = document.getElementById("continueBtn");
continueBtn.addEventListener("click", handleContinue);
// maps
let maps = [
  "../Art/Gemini_Generated_Image_qg1ynmqg1ynmqg1y.png",
  "hele coole",
  "",
  "",
];
let totalMapNumber = maps.length - 1;
let chosenMapNumber = 0;

let continueBtn2 = document.querySelector("#continueBtn2");
continueBtn2.addEventListener("click", handleContinueToGame);

function handleContinue() {
  // for the cars

  const active = slides[slideIndex - 1];
  let selectedCarIndex = active.dataset.name;
  let selectedcarSrc = active.dataset.src;
  sessionStorage.setItem("choosenCar", selectedCarIndex);
  sessionStorage.setItem("choosenCarPath", selectedcarSrc);

  console.log("this is the car " + sessionStorage.getItem("choosenCar"));
  console.log(
    "this is the car path" + sessionStorage.getItem("choosenCarPath"),
  );
}
function handleContinueToGame() {
  // for the maps
  const active2 = slides2[slideIndex2 - 1];
  let selectedMapIndex = active2.dataset.name;
  let selectedMapSrc = active2.dataset.src;

  sessionStorage.setItem("choosenMap", selectedMapIndex);
  sessionStorage.setItem("choosenMapPath", selectedMapSrc);
  console.log("this is the map " + sessionStorage.getItem("choosenMap"));
  console.log(
    "this is also the map path" + sessionStorage.getItem("choosenMapPath"),
  );
}
// script for hub buttons
const arrowUpBtn = document.querySelector("#arrowUp");
const nosBtn = document.querySelector("#nos");
const menuIconBtn = document.querySelector(".menuIcon");
const pauseBtnInMenu = document.querySelector("#pause");
const quitBtnInMenu = document.querySelector("#quit");
const cancelBtnInMenu = document.querySelector("#cancel");
const inGameBtnsMenu = document.querySelector("#inGameBtnsMenu");
const outGameBtnsMenu = document.querySelector("#outGameBtnsMenu");

let mmenuItems = document.querySelectorAll(".menuItems");
let settingIndexes = document.querySelectorAll(".settingIndexes");

const gameMenu = document.querySelector(".gameMenu");
// display the menu itself
function hideMenuBtns() {
  inGameBtnsMenu.classList.remove("visible");
  outGameBtnsMenu.classList.remove("visible");

  inGameBtnsMenu.classList.add("notVisible");
  outGameBtnsMenu.classList.add("notVisible");
}
// script for the popup when wanting to quit the game

menuIconBtn.addEventListener("click", () => {
  gameMenu.style.display = "block";
  if (pageIndex === 1 || pageIndex === 2 || pageIndex === 3) {
    hideMenuBtns();
    outGameBtnsMenu.classList.remove("notVisible");
    outGameBtnsMenu.classList.add("visible");
  }
  if (pageIndex === 4) {
    hideMenuBtns();
    inGameBtnsMenu.classList.remove("notVisible");
    inGameBtnsMenu.classList.add("visible");
  }
});
pauseBtnInMenu.addEventListener("click", () => {
  gameMenu.style.display = "none";
});

mmenuItems.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    mmenuItems.forEach((b) => b.classList.remove("menuBarClicked"));
    btn.classList.add("menuBarClicked");
    settingIndexes.forEach((i) => i.classList.remove("activeIndex"));
    settingIndexes[index].classList.add("activeIndex");
  });
});

mmenuItems[0].classList.add("menuBarClicked");
settingIndexes[0].classList.add("activeIndex");
// script for the music sliders in menu
let musicSlider = document.querySelectorAll(".slider");
let musicValue = document.querySelectorAll(".valueOfMusic");

musicSlider.forEach((slider, index) => {
  musicValue[index].innerHTML = slider.value;
  slider.addEventListener("input", () => {
    musicValue[index].innerHTML = slider.value;
  });
});
musicSlider.forEach((sl) => {
  sl.addEventListener("input", () => {
    let x = sl.value;
    let color =
      "linear-gradient(90deg, rgb(229, 118, 50)" +
      x +
      "%, var(--shadow-hud-buttons)" +
      x +
      "%)";
    sl.style.background = color;
  });
});
// !uncomment for bg music
//script for bg music playing
let playBgMusic = document.querySelector("#playBgMusic");
const playlist = [
  "../Audio/Atlantis   Outland 2025 remaster.mp3",
  "../Audio/Trango.mp3",
];
let musicIndex = 0;
function playNext() {
  playBgMusic.src = playlist[musicIndex];
  playBgMusic.play();
}
playBgMusic.addEventListener("ended", () => {
  musicIndex = (musicIndex + 1) % playlist.length;
  playNext();
});
playNext();
