// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = -2;
var labelScore;
var welcomeText;
var player;
var pipes;

//-----------------------------------------------------------------------

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerPic", "assets/whaleright.png");
    game.load.image("playerPic2", "assets/whaleleft.png");
    game.load.audio("score", "assets/jump.mp3");
    game.load.image("pipe", "assets/sushi.png");

}

//-----------------------------------------------------------------------
/*
 * Initialises the game. This function is only called once.
 */
function create() {
    //setting the stage

    //Introducing Arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // set the background colour of the scene
    game.stage.setBackgroundColor("#0080FF");
    //setting the intro text
    welcomeText = game.add.text(180, 150, "Whale me, baby!",
        {font: "50px Open Sans", fill: "#2EFE64"});


    //creating 5 pipes on top of each other at 20px
    /*for(var count=0; count<5;count=count+1){
     game.add.sprite(40,50*count,"pipe");
     game.add.sprite(140,50*count,"pipe");
     game.add.sprite(100*count,50,"pipe");
     }*/

    //creating a horizontal line of pipes with a distance
    /*for(var count=2; count<10;count=count+2){
     game.add.sprite(40*count,50,"pipe");
     }*/

    //creating pipes on top of each other with gaps
    //for(var count=0; count<8;count++){
    //    if(count !=4){
    //        game.add.sprite(0,50*count,"pipe");
    //    }
    // }


    //setting the score counter
    labelScore = game.add.text(10, 10, "0",
        {font: "30px Open Sans", fill: "#2EFE64"});

    //these are just the deco images in the four corners
    //game.add.sprite(5,10,"playerPic");
    game.add.sprite(735, 10, "playerPic2");
    //game.add.sprite(5,355,"playerPic");
    game.add.sprite(735, 355, "playerPic2");


    //this is the player image that actually moves
    player = game.add.sprite(120, 165, "playerPic");
    game.input.onDown.add(clickHandler);
    //calling the physics within the create function
    game.physics.arcade.enable(player);

    //player.body.velocity.x = 100;
    //player.body.velocity.y = 50;

    player.body.gravity.y = 200;
    player.checkWorldBounds = true;
    player.events.onOutOfBounds.add(gameOver);


    pipes = game.add.group();

    pipeInterval = 1.75;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);

    //game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(changeScore);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);

    /*
     game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
     game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
     game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
     game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
     */

    generatePipe();

}
//-----------------------------------------------------------------------

//This function updates the scene. It is called for every new frame.
function update() {
    game.physics.arcade
        .overlap(player,
        pipes,
        gameOver);
}
//-----------------------------------------------------------------------

function addPipeBlock(x, y) {
    var pipe = pipes.create(x, y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
}

function generatePipe() {
    //calculate a random number in between 1 & 5
    var gapStart = game.rnd.integerInRange(1, 5);
    for (var count = 0; count < 8; count = count + 1) {
        if (count != gapStart && count != gapStart + 1 && count != gapStart + 2) {
            addPipeBlock(800, count * 50);
        }
    }
    changeScore();
}

function clickHandler(event) {
    //alert(event.x+":"+event.y);
    //alert(score);
    //game.add.sprite(event.x,event.y,"playerPic");
    //defines the position?
    player.x = event.x;
    player.y = event.y;
}

function changeScore() {
    score = score + 1;
    game.sound.play("score");
    labelScore.setText(score.toString());
}

//defines postion changes on x and y axes when event is triggered
function moveRight() {
    player.x = player.x + 10;
}

function moveLeft() {
    player.x = player.x - 10;
}

function moveUp() {
    player.y = player.y - 10;
}

function moveDown() {
    player.y = player.y + 10;
}

function playerJump() {
    welcomeText.setText("");
    player.body.velocity.y = -200;
}

function gameOver() {
    game.destroy();
}

function gameOver() {
    location.reload();
}