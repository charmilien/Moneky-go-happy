
var monkey , monkey_running, mcollide;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground, groundImage,iground,a;
var gameState="Play";
var sound1, sound2;

function preload()
{  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("ground2.png");
  
  sound1=loadSound("pooth.mp3")
  sound2=loadSound("moca.mp3")
  
}



function setup() 
{
  createCanvas(500,400);
  ground=createSprite(250,300,600,40);
  ground.addImage(groundImage);
  iground=createSprite(250,320,500,40)
  iground.visible=false;
  monkey=createSprite(50,250,20,20)
  monkey.addAnimation("running M", monkey_running)
  monkey.scale=0.2;
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  //monkey.debug=true;
  monkey.setCollider("circle",0,00,100)
 // obstacleGroup.debug=true;
 // obstacleGroup.setColliderEach("circle",0,0,20)
}


function draw() 
{
  background("pink")
  monkey.collide(iground);
  score=score+ Math.round(getFrameRate()/60);
 // console.log(monkey.y)
  if(gameState==="Play")
  {
    
        if (keyDown("space") && monkey.y>259)
          {
           sound1.play();
            monkey.velocityY=-15;
          }
        monkey.velocityY=monkey.velocityY + 0.5;

        ground.velocityX=-(5+ score/100)
        if(ground.x<0)
          {
            ground.x=ground.width/2;
          }

        spwanBanana();

        if(FoodGroup.isTouching(monkey))
          {
            FoodGroup.destroyEach();
            score++;
          }

        spwanObstacles();

        if(obstacleGroup.isTouching(monkey))
          {
            //monkey.collide(obstacleGroup)
            sound2.play();
            gameState="END"
            a=score;
          }
  } else if(gameState==="END")
    {
        sound1.stop();
        ground.velocityX=0;
        monkey.velocityY=0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
      score=a;
      
    } 
  drawSprites();
  fill("blue")
  text("Survivle Time:  "+ score,350,10)
}


function spwanBanana()
{
  if(frameCount%70===0)
    {
  banana=createSprite(600,random(10,250),10,10)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-5;
  banana.lifetime=130;
  banana.depth=monkey.depth;
  monkey.depth++;
  FoodGroup.add(banana);
    }
}
  
function spwanObstacles()
{
  if(frameCount%100===0)
    {
  obstacle=createSprite(600,290,10,10)
  obstacle.addImage(obstacleImage);
  obstacle.scale=random(0.1,0.3)
  obstacle.velocityX=-(7 +score/100)
  obstacle.lifetime=130;
 //obstacle.depth=monkey.depth;
 // monkey.depth++;
  obstacleGroup.add(obstacle);
    }
}
