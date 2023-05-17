var bg,bgimg
var player,shooterimg,shootershooting
var zombie,heart1,heart2,heart3
var zombieImg,heart1Img,heart2Img,heart3Img
var zombieGroup
var gameOverImg,restartImg
var bulletImg;
var bulletGroup;
var lifetime=3;
var bullets=5;
var life=3;
var score=0;
var gameStae=1;


function preload(){
  shooterimg = loadImage("assets/shooter_2.png");
  shootershooting = loadImage("assets/shooter_3.png");
 bgimg = loadImage("assets/bg.jpeg"); 
 zombieImg=loadImage("assets/zombie.png");
 heart1Img=loadImage("assets/heart_1.png");
 heart2Img=loadImage("assets/heart_2.png");
 heart3Img=loadImage("assets/heart_3.png");
 gameOverImg=loadImage("assets/gameOver.png");
 restartImg=loadImage("assets/restart.png");
 bulletImg=loadImage("assets/bullet.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  bg=createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bgimg);
  bg.scale=1.1;

  player=createSprite(displayWidth-1150,displayHeight-300,50,50);
  player.addImage(shooterimg);
  player.scale=0.3;
  player.debug=true;
  player.setCollider("rectangle",0,0,300,300);

  heart1=createSprite(displayWidth-150,40,20,20);
  heart1.addImage("heart1", heart1Img);
  heart1.scale=0.5;
  heart1.visible=false;
  heart2=createSprite(displayWidth-145,40,20,20);
  heart2.addImage("heart2",heart2Img);
  heart2.scale=0.5;
  heart2.visible= false;
  heart3=createSprite(displayWidth-155,40,20,20);
  heart3.addImage("heart3",heart3Img);
  heart3.scale=0.5;

  zombieGroup=createGroup();
  bulletGroup = createGroup();
  

}
function enemy(){
  if(frameCount%50===0){
    zombie=createSprite(random(500,1100),random(100,500),50,50);
    zombie.addImage("zombie",zombieImg);
    zombie.scale=0.15;
    zombie.velocityX=-3;
    zombie.setCollider("rectangle",0,0, 400,400)
    zombie.lifetime=400;
    zombieGroup.add(zombie);
  }
}
function shootbullet(){
  //if condition to check if we have any remaining bullets
  bullet=createSprite(150,width/2,50,20);
  bullet.addImage(bulletImg);
  bullet.scale=0.2;
  bullet.velocityX=7;

  bulletGroup.add(bullet);
  bullets = bullets - 1 ; 
}

function handleGameover(){
 lifetime=-1;
 if(lifetime <=0){
  gameState = END;
 }else {
  gameState = PLAY;
 }

}

function draw(){
  if(keyDown("UP_ARROW")){
    player.y=player.y-30

  }
  if(keyDown("DOWN_ARROW")){
    player.y=player.y+30

  }
  if(keyWentDown("SPACE")){
    player.addImage(shootershooting);
    shootbullet();
  }
  if(zombieGroup.collide(player)){
    handleGameover(zombieGroup);
  }
    //destroy the zombie when bullet touches it
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
       
        } 
  
  }
}
  


  }
  if(keyWentDown("SPACE")){
    shootbullet()
    player.addImage(shooterimg);

    
    }
    

  
  enemy();
  drawSprites()


gameOver=createSprite(400,350,160,10);
gameOver.addImage(gameOverImg);

restart=createSprite(550,140);
restart.addImage(restartImg);

gameOver.scale=0.5;
restart.scale=0.1;

gameOver.visible=false;
restart.visible=false;

zombieGroup=new Group();

function handlezombieCollision(bulletGroup) {
  if (life > 0) {
    score = score + 1;
  }

  bullet = createSprite(bullet.x + 60, bullet.y, 50, 50);

  bullet.addImage(bulletImg);

  bullet.scale = 0.3;
  bullet.life = 20;
  bulletGroup.destroyEach();
  zombieGroup.destroyEach();
}

function handleGameover(zombieGroup) {
  life = life - 1;
  zombieGroup.destroyEach();

  if (life === 0) {
    gameState = 2;
    swal({
      title: `Game Over`,
      text: "Oops you lost the game....!!!",
      text: "Your Score is " + score,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing",
    });
  }
}
