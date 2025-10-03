const canvas = document.querySelector("canvas");
  let slides = document.getElementsByClassName("choose-character");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

ctx.fillRect(0, 600, 500, 300);

document.addEventListener("keydown", event => {
    console.log(event);
})

let score = 0;
let scoreDisplay = document.getElementById("score");
const btn = document.querySelector("button");

// btn.addEventListener("click", drawScore);

document.addEventListener("keydown", event =>{
    if(event.key.startsWith("ArrowUp")){
        score++
        scoreDisplay.innerHTML = "Score: " + score;
    }else if(event.key.startsWith("ArrowDown")){
        score--
        scoreDisplay.innerHTML = "Score: " + score;
    } else{
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
// Code for moving background img on ncharacter choosing page
// shit code for selecting not working anyway but just in case ynk


// start screen car character choosing code
// First slider
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex-1].style.display = "block";
  const active = slides[slideIndex - 1];

  console.log(active.dataset.name);
  console.log(active.dataset.src);
  
  dots[slideIndex-1].className += " active";
}

let characters = ["../Art/bmwe30_1.PNG", "../Art/merc_1.PNG", "../Art/micro_1.PNG", "../Art/seat_1.PNG"];
let totalCharNumber = characters.length - 1;
let chosenCharNumber = 0;

let continueBtn = document.getElementById("continueBtn");
continueBtn.addEventListener("click", handleContinue);


function handleContinue(){

  const active = slides[slideIndex - 1];
let selectedCarIndex = active.dataset.name;
let selectedcarSrc = active.dataset.src;
  sessionStorage.setItem("choosenCar", selectedCarIndex);
  sessionStorage.setItem("choosenCarPath", selectedcarSrc);
}

// Second slider
let slideIndex2 = 1;
showSlides2(slideIndex2);   

function plusSlides2(n) {
  showSlides2(slideIndex2 += n);
}

function currentSlide2(n) {
  showSlides2(slideIndex2 = n);
}

function showSlides2(n) {
  let i;
  let slides = document.getElementsByClassName("choose-map");
  let dots = document.getElementsByClassName("dot-map");
  if (!slides.length) return;
 if (n > slides.length) { slideIndex2 = 1 }
  if (n < 1) { slideIndex2 = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex2-1].style.display = "block";
  dots[slideIndex2-1].className += " active";
}

// code for switching images the animation

const bmw = ["../Art/bmwe30_1.PNG", "../Art/bmwe30_2.PNG"];

const bmwElement = document.getElementById("bmw");
let currentState = 0;

function changeBmw(){
    currentState = (currentState + 1) % bmw.length;
    bmwElement.src = bmw[currentState];
}
setInterval(changeBmw, 300);
// mercedes switching
const mercedes = ["../Art/merc_1.PNG", "../Art/merc_2.PNG"];
let currentState02 = 0;
const mercedesElement = document.getElementById("mercedes");

function changeMercedes(){
    currentState02 = (currentState02 + 1) % mercedes.length;
    mercedesElement.src = mercedes[currentState02];
}
setInterval(changeMercedes, 300);
// microlino switching
const microlino = ["../Art/micro_1.PNG", "../Art/micro_2.PNG"];
let currentState03 = 0;
const microlinoElement = document.getElementById("microlino");

function changeMicrolino(){
    currentState03 = (currentState03 + 1) % microlino.length;
    microlinoElement.src = microlino[currentState03];
}
setInterval(changeMicrolino, 300);
// seat switching
const seat = ["../Art/seat_1.PNG", "../Art/seat_2.PNG"];
let currentState04 = 0;
const seatElement = document.getElementById("seat");

function changeSeat(){
    currentState04 = (currentState04 + 1) % seat.length;
    seatElement.src = seat[currentState04];
}
setInterval(changeSeat, 300);
