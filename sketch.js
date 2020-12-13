var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score ;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  king_image = loadAnimation("sprite_0.png");
  
  fruitGroup = new Group();
  obstacleGroup = new Group();
}



function setup() {
 monkey = createSprite(width-300,height-100,50,50);
 monkey.addAnimation("monkey",monkey_running);
 monkey.scale = 0.2; 
 
  
 ground = createSprite(width-0,height-40,900,10);
 ground.velocityX = -4; 
 score = 0; 
 
 
}


function draw() {
background(220);  
 
if(ground.x < 400){
  ground.x = ground.width/2;
}
if(fruitGroup.isTouching(monkey)){  
 score = score+2;
 fruitGroup.destroyEach(); 
}  
  
monkey.collide(ground);  
monkey.velocityY = monkey.velocityY + 0.8;  


if(obstacleGroup.isTouching(monkey)){
  gameState = 0;
  obstacleGroup.destroyEach();
} 
if(gameState === 1){
food();
obstacle();
if(keyDown("space") && monkey.y > 150){
  monkey.velocityY = -12;
}
  
}
if(gameState === 0){
ground.velocityX = 0;  
monkey.addAnimation("king",king_image);
stroke("white");
textSize(30);
text("GAME OVER",width-300,height-200);
text("press r to restart",width-325,height-275);  
}
if(keyDown("r")&&gameState === 0){
  gameState = 1;
  score = 0;
}  
drawSprites(); 
text("score :"+score,width-350,height-350);  
}
function food(){
  if(frameCount % 80 === 0){
    banana = createSprite(width-50,height-250,10,10);
    banana.y = Math.round(random(width-350,height-200));
    banana.addImage("food",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifeTime = 100;
    fruitGroup.add(banana);
  }
}
function obstacle(){
  if(frameCount % 200 === 0){
    rock = createSprite(width-50,height-100,50,50);
    rock.addImage("stone",obstaceImage);
    rock.scale = 0.3;
    rock.velocityX = -4;
    rock.lifeTime = 100;
    obstacleGroup.add(rock);
  }
}



