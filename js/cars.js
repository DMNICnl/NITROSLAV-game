// for in the game car properties

// the heavier the car the lower the jumpforce
// the heavier the car the higher gravity modifier
// the heavier the car the lower acceleration
let cars=[
  {
  id: "bmwe30",
  name: "BMW E30",
  frames:  ["../Art/bmwe30_1.PNG", "../Art/bmwe30_2.PNG"],
  // appearence on canvas
  width: 64,
  height: 32,

  // physiycs n stuff
  baseSpeed: 1.2,
  speedMultiplier: 1.1,
  accelerationTrigger: 5,
  maxSpeed: 3.5,

  jumpForce: 8,
  gravityModifier: 1.0,

  boostPower: 2.2,
  boostDuration: 120,
},
  {
  id: "merc",
  name: "Mercedes Benz",
  frames:  ["../Art/merc_1.PNG", "../Art/merc_2.PNG"],
  // appearence on canvas
  width: 64,
  height: 32,

  baseSpeed: 1.0,
  speedMultiplier: 1.2,
  accelerationTrigger: 4,
  maxSpeed: 3.8,

  jumpForce: 9,
  gravityModifier: 1.1,

  boostPower: 2.5,
  boostDuration: 100,
},
  {
  id: "micro",
  name: "Microcar",
  frames:  ["../Art/micro_1.PNG", "../Art/micro_2.PNG"],

  width: 64,
  height: 32,

  baseSpeed: 1.5,
  speedMultiplier: 1.0,
  accelerationTrigger: 6,
  maxSpeed: 3.2,

  jumpForce: 7,
  gravityModifier: 0.9,

  boostPower: 1.8,
  boostDuration: 140,
},
  {
  id: "seat",
  name: "Seat leon",
  frames:  ["../Art/seat_1.PNG", "../Art/seat_2.PNG"],
  
  width: 64,
  height: 32, 

  baseSpeed: 1.3,
  speedMultiplier: 1.1,
  accelerationTrigger: 5,
  maxSpeed: 3.6,

  jumpForce: 8,
  gravityModifier: 1.0,

  boostPower: 2.0,
  boostDuration: 120,
}
];

// fot the choose car screen 
let characters = [
  "../Art/bmwe30_1.PNG",
  "../Art/merc_1.PNG",
  "../Art/micro_1.PNG",
  "../Art/seat_1.PNG",
];