const canvas = document.querySelector("canvas");
let slides = document.getElementsByClassName("choose-character");
let slides2 = document.getElementsByClassName("choose-map")


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

function initGame(){
let img = new Image();
img.src =  sessionStorage.getItem("choosenCarPath");
img.onload = function() {
  ctx.imageSmoothingEnabled = false; 
  ctx.drawImage(img, 300, 600, );
  console.log(ctx);
  
};
}


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
// Code for moving background img and character choosing page on the canvas


// start screen car character choosing code
// First slider for selecting cars
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

// Second slider for maps
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
  let slides2 = document.getElementsByClassName("choose-map");
  let dots = document.getElementsByClassName("dot-map");
  if (!slides2.length) return;
 if (n > slides2.length) { slideIndex2 = 1 }
  if (n < 1) { slideIndex2 = slides2.length }
  for (i = 0; i < slides2.length; i++) {
    slides2[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides2[slideIndex2-1].style.display = "block";
  dots[slideIndex2-1].className += " active";
}
// code for selecting and storing chosen car and map

// characters
let characters = ["../Art/bmwe30_1.PNG", "../Art/merc_1.PNG", "../Art/micro_1.PNG", "../Art/seat_1.PNG"];
let totalCharNumber = characters.length - 1;
let chosenCharNumber = 0;

let continueBtn = document.getElementById("continueBtn");
continueBtn.addEventListener("click", handleContinue);
// maps
let maps = ["../Art/Gemini_Generated_Image_qg1ynmqg1ynmqg1y.png","hele coole","","",]
let totalMapNumber = maps.length -1;
let chosenMapNumber = 0;

let continueBtn2 = document.querySelector("#continueBtn2");
continueBtn2.addEventListener("click", handleContinueToGame);

function handleContinue(){
  // for the cars
  
  const active = slides[slideIndex - 1];
  let selectedCarIndex = active.dataset.name;
  let selectedcarSrc = active.dataset.src;
  sessionStorage.setItem("choosenCar", selectedCarIndex);
  sessionStorage.setItem("choosenCarPath", selectedcarSrc);
 
  console.log("this is the car " + sessionStorage.getItem("choosenCar"));
  console.log("this is the car path" + sessionStorage.getItem("choosenCarPath"));
  
  
}
function handleContinueToGame(){
  // for the maps
  const active2 = slides2[slideIndex2 -1];
  let selectedMapIndex = active2.dataset.name;
  let selectedMapSrc = active2.dataset.src;

   sessionStorage.setItem("choosenMap", selectedMapIndex);
  sessionStorage.setItem("choosenMapPath", selectedMapSrc);
  console.log("this is the map " + sessionStorage.getItem("choosenMap"));
  console.log("this is also the map path" + sessionStorage.getItem("choosenMapPath"));
}
// code for switching images the animation

const bmw = ["../Art/bmwe30_1.PNG", "../Art/bmwe30_2.PNG"];

const bmwElement =  sessionStorage.getItem("choosenCarPath");
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

