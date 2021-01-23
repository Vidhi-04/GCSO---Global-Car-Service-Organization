var road, roadImage;
var stop, stopImage;
var car, white, red, green, yellow;
var speed, weight, deformation;
var PLAY = 0;
var END = 1;
var gameState;
var restart, restartImage;

function preload(){
  roadImage = loadImage("Road.jpg");
  stopImage = loadImage("stop.png");
  white = loadImage("White Car.png");
  red = loadImage("Red Car.png");
  green = loadImage("Green Car.png");
  yellow = loadImage("Yellow Car.png")
  restartImage = loadImage("replay.png")
}

function setup() {
  createCanvas(1200,300);
  road = createSprite(600, 150);
  road.addImage(roadImage);
  road.scale = 3;
  stop = createSprite(1000, 150);
  stop.addImage(stopImage);
  stop.scale = 0.4;
  car = createSprite(100, 150);
  car.addImage(white);
  car.scale = 0.4;
  car.debug = false;
  car.setCollider("rectangle", 0, 0, 500, 250);
  gameState = PLAY;
  restart = createSprite(600, 150);
  restart.addImage(restartImage);
  restart.scale = 0.2;
}

function draw() {
  background("black");
  if(gameState === PLAY)
  {
    car.addImage(white)
    restart.visible = false;
    speed = random(55, 90)
    weight = random(400, 1500);
    deformation = (0.5*weight*speed*speed)/22500;
    car.velocityX = speed/10;
    if(car.x - stop.x < car.width/4.5 + stop.width/4.5 &&
       stop.x - car.x < car.width/4.5 + stop.width/4.5 &&
       car.y - stop.y < car.height/4.5 + stop.height/4.5 &&
       stop.y - car.y < car.height/4.5 + stop.height/4.5)
    {
      car.velocityX = 0;
      //car.x = 100;
     
      if(deformation > 180)
      {
        car.addImage(red);
      }
      if(deformation > 100 && deformation < 180)
      {
        car.addImage(yellow)
      }
      if(deformation < 100)
      {
        car.addImage(green)
      }
      gameState = END;
    }
  }
  if(gameState === END)
  {
    restart.visible = true;
    if(mousePressedOver(restart)){
      gameState = PLAY;
      car.x = 100;
    }
  }
  drawSprites();
}