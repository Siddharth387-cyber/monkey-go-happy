
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  monkey=createSprite(50,360,20,50)
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(200,380,400,20);
  ground.velocityX=-4;
  ground.x = ground.width /2;
  
  FoodGroup=createGroup();
  obstacleGroup=new Group();
}


function draw() {
  background("white");
 if(keyDown("space")){
   monkey.velocityY=-10;
 }
  monkey.velocityY=monkey.velocityY+0.8;
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  monkey.collide(ground);
  spawnFood();
  spawnObstacles();
  drawSprites();
  textSize(20);
  fill("black");
  score=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+score,100,50);
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);    
  }
  
}
function spawnFood(){
  if(frameCount%80===0){
    banana=createSprite(600,250,40,10);
    banana.addImage(bananaImage);
    banana.y=Math.round(random(120,200));
    banana.scale=0.05;
    banana.velocityX=-5;
    banana.lifetime=300;
    monkey.depth=banana.depth+1;
    FoodGroup.add(banana);
  }
}
function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(800,360,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-6;
    obstacle.lifetime=300;
    obstacleGroup.add(obstacle);
  }
}





