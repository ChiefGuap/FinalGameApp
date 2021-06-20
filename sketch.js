//The GameState Variables
var PLAY = 1;
var END = 0;
var gameState = PLAY; 

//Variables needed for the game to function
var mainc_IMG, mainc_dead, mainc;
var coin_IMG, supercoin_IMG, powerup_IMG, backgroundImg, invisibleBackground, obsatcle1_IMG, obstacle2_IMG, obstacle3_IMG;
var gameOverImg, restartImg;
var backg, score;
var gameOver, restart; 


//The groups that are needed for the game
var obstaclesGroup;
var coinGroup;
var superGroup; 

//Function preload, loading all the images needed for the game
function preload() {
    mainc_IMG = loadImage("Images/Jetpackmaincharater.png");
    coin_IMG = loadImage("Images/game_coins.png");
    supercoin_IMG = loadImage("Images/superstarcoin.png");
    powerup_IMG = loadImage("Images/powerup.png") 
    backgroundImg = loadImage("Images/game_background.jpg")

    obsatcle1_IMG = loadImage("Images/obstacle1.png");
    obsatcle2_IMG = loadImage("Images/obstacle2.png");
    obsatcle3_IMG = loadImage("Images/obstacle3.png");

    restartImg = loadImage("Images/restart.png");
    gameOverImg = loadImage("Images/gave_over.png"); 
}

//Setting up the background and main charater varibles and sprites which are then needed for the main function draw
function setup() {
    createCanvas(1000, 1000);
    backg = createSprite(500, 300, 1000, 1000);
    backg.addImage("background", backgroundImg);
    backg.scale = 1.5; 
    backg.velocityY = -5;
    if (backg.y > 45) {
        backg.y = backg.height/2; 
    }

    mainc = createSprite(500, 980, 50, 500);
    mainc.addImage("player", mainc_IMG);
    mainc.velocityY = -4; 
    mainc.scale = 0.1; 

    gameOver = createSprite(500, 500, 20, 20);
    gameOver.addImage("done", gameOverImg);
    gameOver.visible = false;
    gameOver.scale = 0.5; 

    restart = createSprite(490, 610, 20, 20);
    restart.addImage("Restarting", restartImg);
    restart.visible = false; 
    restart.scale = 0.05; 

    obstaclesGroup = new Group();
    coinGroup = new Group(); 
    superGroup = new Group(); 

    score = 0; 
}

function draw() {
    background(220);
    
      //make the ball bounce off the top and bottom walls
    createEdgeSprites();
    if (mainc.isTouching(edges[2]) || mainc.isTouching(edges[3]) || mainc.isTouching(edges[1]) || mainc.isTouching(edges[4])){
        gameState = END; 
    }
  

    if(gameState === PLAY){
      if (backg.y > 45) {
          backg.y = backg.height/2; 
        } 

        //Intialing the functions that are created 
        points();
        superpoints();
        obstacles(); 
        
       

        // The movements of the main charater
        if(keyDown("RIGHT_ARROW")){
            mainc.velocityX = 5;
        }

        if(keyDown("LEFT_ARROW")){
            mainc.velocityX = -5;
        }

        if(keyDown("DOWN_ARROW")){
            mainc.velocityY = 3; 
        }

        if(keyDown("UP_ARROW")){
            mainc.velocityY = -4; 
        }


        // When the Main Charater is touching another seperateSprite in the Game
        if(coinGroup.isTouching(mainc)){
            score = score +1;
            coinGroup.destroyEach(); 
            
        }

        if(superGroup.isTouching(mainc)){
            score = score + 3; 
            superGroup.destroyEach()
            
        }

        if(obstaclesGroup.isTouching(mainc)){
            gameState = END; 
        }
    }

    else if(gameState === END){
        backg.velocityY = 0; 
        mainc.velocityX = 0;
        mainc.velocityY = 0;
        coinGroup.setVelocityYEach(0);
        superGroup.setVelocityYEach(0);
        obstaclesGroup.setVelocityYEach(0); 

        coinGroup.setLifetimeEach(-1);
        superGroup.setLifetimeEach(-1);
        obstaclesGroup.setLifetimeEach(-1); 

        gameOver.visible = true;
        restart.visible = true;

        if(mousePressedOver(restart)){
            reset(); 
        }
        
    }

   drawSprites();
   text("Score: " + score, 80, 50);  
   textSize(20); 
}


function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible= false;
    coinGroup.destroyEach();
    superGroup.destroyEach();
    obstaclesGroup.destroyEach(); 
    mainc.position.x = 500;
    mainc.position.y = 980;

    score = 0; 

}


// These are all the obstacles, and points that are needed in the game, now seperated into groups
function points() {
    if(frameCount % 100 === 0){
        var coin = createSprite(0, 1000, 50, 50);
        coin.scale = 0.03;
        coin.x = Math.round(random(20, 580))
        coin.addImage("point", coin_IMG);
        coin.velocityY = -4;
        coin.lifetime = 300;
        coinGroup.add(coin); 
    }
}

function superpoints(){
    if(frameCount % 200 === 0){
        var supercoin = createSprite(0, 1000, 70, 70);
        supercoin.scale = 0.1;
        supercoin.x = Math.round(random(330, 380))
        supercoin.addImage("points", supercoin_IMG);
        supercoin.velocityY = -4;
        supercoin.lifetime = 300;
        superGroup.add(supercoin);
    }
}

function obstacles() {
    if(frameCount % 80 === 0) {
        var obstacles = createSprite(0, 1000, 50, 50);
        obstacles.scale = 0.2;
        obstacles.x = Math.round(random(0, 600));
        obstacles.velocityY = -6; 
        obstacles.lifetime = 200;
        var rand = Math.round(random(1,3));
        switch(rand) {
          case 1: obstacles.addImage("obsatcle1", obsatcle1_IMG);
                  break;
          case 2: obstacles.addImage("obsatcle2", obsatcle2_IMG);
                  break;
          case 3: obstacles.addImage("obsatcle3", obsatcle3_IMG);
                  break;
          default: break;
        }
        obstaclesGroup.add(obstacles) 

}

}