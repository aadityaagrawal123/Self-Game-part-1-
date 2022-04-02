var WAIT_STATE = 0;
var PLAY = 1;
var END = 2;
var life = 185;
var energy = 185;
var score = 0;
var gameState = WAIT_STATE;
var playerName, playButton, playButtonImg, restartButton, restartButtonImage, forest;
var logo, waitLogo, logoImg, ninjaText, waitNinjaText, ninjaTextImg, rivalText, waitRivalText, rivalTextImg;
var nameInput, life, lifeImage, energy, energyImage, energyshow;
var backgroundImg, chick, chickImg, cat, catImg, invisibleGround;
var coinImg, diamondImg, grainImg, cucumberImg, rockImg, woodImg;


function preload(){
  backgroundImg = loadImage("./assets/ninja_background.png");
  logoImg = loadImage("./assets/Game Logo.png");
  ninjaTextImg = loadImage("./assets/Ninja Title.png");
  rivalTextImg = loadImage("./assets/Rivals.png");
  playButtonImg = loadImage("./assets/playBtn.png");
  chickImg = loadAnimation("./assets/chick1.png","./assets/chick2.png","./assets/chick3.png");
  catImg = loadAnimation("./assets/cat1.png","./assets/cat2.png","./assets/cat3.png");
  lifeImage = loadImage("./assets/life symbol (bar).png");
  energyImage = loadImage("./assets/energy symbol (bar).png");
  coinImg = loadImage("./assets/Coin (score).png");
  diamondImg = loadImage("./assets/diamond (score).png");
  grainImg = loadImage("./assets/grain (energy).png");
  cucumberImg = loadImage("./assets/cucumber (energy).png");
  rockImg = loadImage("./assets/rock (obstacle).png");
  woodImg = loadImage("./assets/wood (obstacle).png");
  restartButtonImage = loadImage("./assets/reset button.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  /*forest = createSprite(width/2, height/2);
  forest.addImage(backgroundImg);
  forest.scale = 1.26;*/

    waitLogo = createSprite(windowWidth-1150, windowHeight-650, 1, 1);
    waitLogo.addImage("title",logoImg);
    waitLogo.scale = 0.2;

    waitNinjaText = createSprite(windowWidth-1000, windowHeight-670, 1, 1);
    waitNinjaText.addImage("ninjaTitle", ninjaTextImg);
    waitNinjaText.scale = 0.08;

    waitRivalText = createSprite(windowWidth-910, windowHeight-620, 1,1);
    waitRivalText.addImage("rivalTitle", rivalTextImg);
    waitRivalText.scale = 0.6;

    nameInput = createInput("").attribute("placeholder", "Enter your name");
    nameInput.position(windowWidth-870, windowHeight-360);
    nameInput.class("customInput");

    playerName = nameInput.value();

    playButton = createImg('./assets/playBtn.png');
    playButton.position(windowWidth-880, windowHeight-295);
    playButton.size(245,80);
  
    chick = createSprite(windowWidth-510,windowHeight-230, 1,1);
    chick.addAnimation("chickRunning",chickImg);
    chick.scale = 1.05;
    chick.visible = false;

    cat = createSprite(windowWidth-1200, windowHeight-315, 1,1);
    cat.addAnimation("catRunning",catImg);
    cat.scale= 0.95;
    cat.visible = false;

    energyshow = createSprite(width-915, height-678, 1, 1);
    energyshow.addImage(energyImage);
    energyshow.scale = 0.08;
    energyshow.visible = false;

    Logo = createSprite(windowWidth-186, windowHeight-707, 1, 1);
    Logo.addImage("title",logoImg);
    Logo.scale = 0.125;
    Logo.visible = false;

    NinjaText = createSprite(windowWidth-80, windowHeight-715, 1, 1);
    NinjaText.addImage("ninjaTitle", ninjaTextImg);
    NinjaText.scale = 0.06;
    NinjaText.visible = false;

    RivalText = createSprite(windowWidth-65, windowHeight-670, 1,1);
    RivalText.addImage("rivalTitle", rivalTextImg);
    RivalText.scale = 0.4;
    RivalText.visible = false;

    invisibleGround = createSprite(0, windowHeight-150, width*2, 10);
    invisibleGround.visible = false;

    restartButton = createImg('./assets/reset button.png');
    restartButton.position(windowWidth-1475, windowHeight-675);
    restartButton.size(70,70);
}

function draw() {
    background(189);
    image(backgroundImg, 0,0, windowWidth, windowHeight);
  
  if (gameState === WAIT_STATE){
    waitLogo.visible = true;
    waitNinjaText.visible = true;
    waitRivalText.visible = true;
    nameInput.visible = true;
    playButton.visible = true;
    playButton.mouseClicked(clickPlay);
  }

   else if(gameState === PLAY){
      showLife();
      showEnergy();
      restartButton.mouseClicked(restart);

  //    forest.velocityX = -4;

    /*  if(forest.x > width/2 ){
        forest.x = width;
      };*/

      push()
      stroke("green");
      fill("yellow");
      rect(width-1475, height-750, 275, 50);
      fill("Brown");
      textSize(30);
      text("Your Score :", width-1460, height-715);
      fill("cyan")
      text(score, width-1290, height-715);
      fill("white");
      textSize(23);
      text("Restart Game", windowWidth- 1398, windowHeight-638);
      pop()

      chick.visible = true;
      cat.visible = true;
      energyshow.visible = true;
      Logo.visible = true;
      NinjaText.visible = true;
      RivalText.visible = true;
      restartButton.visible = true;

    }
    if (keyDown("space")  && chick.y > windowHeight-250){
      chick.velocityY = -15;
    }
      chick.velocityY = chick.velocityY + 0.6

      chick.collide(invisibleGround);
    
  drawSprites();
}

function showLife() {
  push();
  image(lifeImage, width- 930, height- 725, 25, 25);
  fill("white");
  rect(width -900, height -725, 185, 20);
  fill("#f50057");
  rect(width -900, height -725, life, 20);
  noStroke();
  pop();
}

function showEnergy() {
  push();
  fill("white");
  rect(width-900, height-692, 185, 20);
  fill("#ffc400");
  rect(width-900, height-692, energy, 20);
  noStroke();
  pop();
}

function gameOver() {
    swal({
      title: `Game Over`,
      text: `Hi ${playerName}, {"\n"}Your score is: {"\n"}+${score}`,
      imageUrl:
      "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Play Again"
    },
    function(isConfirm){
      if(isConfirm) {
        window.location.reload();
      };
    });
}

function restart(){
  window.location.reload()
}

function clickPlay () {
  waitLogo.visible = false;
  waitNinjaText.visible = false;
  waitRivalText.visible = false;
  nameInput.hide();
  playButton.hide ();

  gameState = PLAY;
}