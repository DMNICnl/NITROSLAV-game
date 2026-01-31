let slides = document.getElementsByClassName("choose-character");
let slides2 = document.getElementsByClassName("choose-map");
const nitroLogo = document.getElementById("nitroslavLogo");
const nitroLoop = document.getElementById("nitroslavLoop");

nitroLogo.addEventListener("ended", () => {
  console.log("loop ended");
  nitroLoop.style.display = "block";
});

//  CAR SELECTION SLIDER (CHOOSE-CHARACTER)
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

//  MAP SELECTION SLIDER (CHOOSE-MAP)
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
//  DEBUG KEYDOWN LOGGER (you have this twice total) ///////////////////
document.addEventListener("keydown", (event) => {
  console.log(event);
});

//  SCORE SYSTEM (ArrowUp/ArrowDown changes score) ///////////////////

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

//  DATA ARRAYS (currently used as “lists” for selection)

let totalCharNumber = characters.length - 1;
let chosenCharNumber = 0;

let totalMapNumber = maps.length - 1;
let chosenMapNumber = 0;

// CONTINUE BUTTONS: SAVE SELECTED CAR + MAP TO SESSIONSTORAGE   ///////////////////

let continueBtn = document.getElementById("continueBtn");
continueBtn.addEventListener("click", handleContinue);

let continueBtn2 = document.querySelector("#continueBtn2");
continueBtn2.addEventListener("click", handleContinueToGame);

function handleContinue() {
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

//   MENU DISPLAY HELPERS ///////////////////
function hideMenuBtns() {
  inGameBtnsMenu.classList.remove("visible");
  outGameBtnsMenu.classList.remove("visible");

  inGameBtnsMenu.classList.add("notVisible");
  outGameBtnsMenu.classList.add("notVisible");
}

//  MENU OPEN/CLOSE LOGIC   ///////////////////
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

//  MENU TABS / SETTINGS INDEX SWITCHING ///////////////////
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

//  MUSIC SLIDERS (UI) ///////////////////
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

//  BACKGROUND MUSIC PLAYLIST ///////////////////
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
