var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var foodObj;
var feedButton, nameText;
var dogName;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(700,500);

  dogName = "Hope";

  foodObj = new Chicken(database);

  feedButton = createButton("Feed ");
  feedButton.position(560, 80);
  feedButton.mousePressed(feedDog);

  addFoodButton = createButton("Add Food");
  addFoodButton.position(620, 80);
  addFoodButton.mousePressed(addFoods);

  nameText = createInput("Hope");
  nameText.position(720, 80);

  nameButton = createButton("Change Name");
  nameButton.position(870, 80);
  nameButton.mousePressed(changeName);

  dog = createSprite(500,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.25;

  textSize(20);
}

// function to display UI
function draw() {
  background(80, 134,178);

  drawSprites();
  fill(255,255,254);
  stroke("black");
  let timeString = "";
  if(foodObj.LastFed) {
    let dateObj = new Date(foodObj.LastFed);
    timeString = "" + (dateObj.getHours() > 12 ? dateObj.getHours() - 12 : dateObj.getHours()) 
                 + ":" + dateObj.getMinutes() + " " + (dateObj.getHours() > 12 ? "PM" : "AM");
  }

  text("Food remaining : "+foodObj.foodStock,170,200);
  text("Last Fed : "+ timeString,170,220);
  text(dogName, 480,420);

  textSize(13);

  foodObj.display();

  updateDogImg();
}

function feedDog(){
  foodObj.deductFood();
  dog.addImage(dogImg1);
}

function addFoods(){
  foodObj.updateFoodStock();
}

function changeName(){
  dogName = nameText.value();
  feedButton.value("Feed " + dogName);
}

function updateDogImg(){
  let dateObj = new Date(foodObj.LastFed);
  let currentTime = new Date();
  if(currentTime - dateObj > 60 * 1000){
    dog.addImage(dogImg);
  }

}