//create variables.
var background_img;
var boy, boy_img;
var diamond, diamond_img, diamondGroup;
var bluediamond;
var purplediamond;
var violetdiamond;
var diamond2;
var invisiblegr;
var bomb, bomb_img;
var life, life_img, livesGroup;
var ground;
var bombGroup;
var life1 = 5;
var gameState = "wait";
var gameOverImage;
var score = 0;
var reset, play;
var bg;
var thief, thief_img;
function preload() {
  //load images.
  bluediamond = loadImage("images/blue_diamond.png");
  purplediamond = loadImage("images/purple_diamond.png");
  violetdiamond = loadImage("images/violetdiamond.png");
  boy_img = loadAnimation("images/kid1.png", "images/kid2.png", "images/kid3.png");
  diamond2 = loadImage("images/diamond.png");
  background_img = loadImage("images/forest background.jpg");
  bomb_img = loadImage("images/bomb.png");
  life_img = loadImage("images/life.png");
  gameOverImage = loadImage("images/go.gif");
  thief_img = loadImage("images/theif.png");
}


function setup() {
  createCanvas(displayWidth * 10, displayHeight - 200);
  //create boy sprite.
  boy = createSprite(160, 300, 50, 50);
  boy.addAnimation("car", boy_img);
  boy.scale = 0.5;
  //create invisible ground.
  invisiblegr = createSprite(displayWidth * 4, 420, displayWidth * 11, 20);
  invisiblegr.visible = false;
  //create theif.
  thief = createSprite(displayWidth * 10 - 200, displayHeight - 450, 50, 50);
  thief.addImage("the", thief_img);
  thief.scale = 0.5;
  bombGroup = new Group();
  diamondGroup = new Group();
  livesGroup = new Group();
  //spawn Diamonds & Bombs.
  spawnDiamonds();
  spawnBombs();

}

function draw() {
  background(background_img);

  //set gamestate to wait.
  if (gameState === "wait") {
    //change canvas size
    resizeCanvas(600, 600);
    //change background
    background("#ff0066");
    //add instruction for player
    //text command
    fill("yellow");
    textSize(25);
    text("Hey Welcome🤚!Let's see some instruction👇", 50, 100);
    fill("White");
    text("👉 A thief has stolen diamonds from the jewellery shop.", 5, 180);
    text("👉 The forest officer has to go find the thief.", 5, 230);
    text("👉 Forest Officer needs to collects all the diamonds", 5, 280);
    text("dropped by the thief.", 5, 330);
    text("👉 You have 5 lives.", 5, 380);
    text("👉 You can move right side and jump.", 5, 430);
    text("👉 So Are you ready to play the game??", 5, 480);
    text("👉 If you are ready So please press S Key", 5, 530);
    text("👉 Let's Play the Game.", 5, 580);
    //text("OR press play key", 5, 580)
    /*//create play button.
    play = createButton("PLAY");
    play.position(540, 580);
    play.style('width', '100px');
    play.style('height', '35px');
    play.style('color', 'black');
    play.style('font-size', '20px');
    play.style('background', 'yellow');
    play.mousePressed(playgame);*/
    //play the game.
    if (keyDown("S")) {
      gameState = "play";
    }
  }
  //change gameState to play.
  if (gameState === "play") {
    //change canvas size 
    resizeCanvas(displayWidth * 10, displayHeight - 200);
    background(background_img);
    //set camera on the boy.
    camera.position.x = boy.x;
    camera.position.y = boy.y;
    //show score.
    fill("white");
    textSize(25);
    text("Collect Diamonds : " + score, boy.x + 200, 50);
    //use right arrow to move the boy
    if (keyIsDown(RIGHT_ARROW)) {
      boy.x = boy.x + 20;
    }
    //use up arrow to move the boy
    if (keyIsDown(UP_ARROW)) {
      boy.velocityY = -10;

    }
    boy.velocityY = boy.velocityY + 0.3;


    //when boy collide with diamonds increase score and score as well
    for (var i = 0; i < diamondGroup.length; i++) {
      if (diamondGroup.get(i).isTouching(boy)) {
        diamondGroup.get(i).destroy();
        score = score + 1;
      }
    }
    //when boy collide withbomb decrease lives andlives as well
    bombGroup.collide(boy, decLife);
    boy.collide(invisiblegr);
    //if life is equal to 0 chang gameState to end.
    if (life1 === 0) {
      gameState = "end";
    }
  }
  //create end gamestate.
  if (gameState === "end") {
    //change the canvas size.
    resizeCanvas(500, 500);
    //change bg img.
    background(gameOverImage);
    /*//create reset button.
    reset = createButton("Replay");
    reset.position(250, 350);
    reset.style('width', '100px');
    reset.style('height', '45px');
    reset.style('color', 'black');
    reset.style('font-size', '20px');
    reset.style('background', 'cyan');
    reset.mousePressed(rePlay)0*/;
  }
  //show sprites when gameState is not equal to wait & end.
  if (gameState != "wait" && gameState != "end") {

    drawSprites();
  }
}
//create spawndiamonds function.
function spawnDiamonds() {
  for (var i = 500; i < displayWidth * 10; i = i + 700) {
    diamond = createSprite(i, random(50, 400), 50, 40);
    diamond.scale = 0.2;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1: diamond.addImage("diamond", diamond2);
        diamond.scale = 0.2;
        break;
      case 2: diamond.addImage("diamond", bluediamond);
        diamond.scale = 0.1;
        break;
      case 3: diamond.addImage("diamond", purplediamond);
        diamond.scale = 0.2;
        break;
      case 4: diamond.addImage("diamond", violetdiamond);
        diamond.scale = 0.2;
        break;
    }
    diamondGroup.add(diamond);
  }
}
//create spawnbombs function.
function spawnBombs() {
  for (var i = 700; i < displayWidth * 10; i = i + 1000) {
    bomb = createSprite(i, random(100, 500), 50, 50);
    bomb.addImage("bomb", bomb_img);
    bomb.scale = 0.2;
    bombGroup.add(bomb);
  }
}
//create declife function.
function decLife(bomb, car) {
  for (var i = 1; i <= life1; i = i + 1) {
    life = createSprite(i * 50, 50, 50, 50);
    life.addImage("life", life_img);
    life.scale = 0.08;
  }
  life1 = life1 - 1;

  life.remove();
  console.log(life1);
  if (life1 > 0) {
    //change gameState to play.
    gameState = "play";
  }
  else {
    gameState = 'end';
  }
  bomb.remove();
}
/*//create playgame function.
function playgame() {
  gameState = "play";
  play.hide();
}
//create hide function.
function hide() {
  reset.hide();
  play.hide()
}
//create replay function.
function rePlay() {
  gameState = "wait";
  reset.visible = false;
}*/