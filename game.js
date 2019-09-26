// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 100;
var veneno;
var estrella;

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  veneno=game.add.physicsGroup();
  estrella=game.add.physicsGroup();
  createItem(545, 120, 'coin');
  createItem(160, 420, 'coin');
  createItem(450, 330, 'coin');
  createItem(120, 250, 'coin');
  createItem(660, 10, 'coin');
  createItem(630, 500, 'coin');
  createItem(630, 250, 'coin');
  createItem(50, 30, 'coin');
  createItem(320, 10, 'coin');
  createItem(230, 150, 'coin');
  createPoison(200, 150, 'poison');
  createPoison(450, 300, 'poison');
  CreateEstrella(520,100,'star');
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(450, 200, 'platform');
  platforms.create(100, 500, 'platform');
  platforms.create(380, 420, 'platform');
  platforms.create(20, 300, 'platform');
  platforms.create(180, 200, 'platform');
  platforms.create(550, 550, 'platform');
   platforms.create(1, 100, 'platform');
   platforms.create(520, 300, 'platform');
   platforms.create(260, 70, 'platform');
   platforms.create(600, 65, 'platform');
  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}
function createPoison(left, top, image) {
  var item = veneno.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}
function createPoison(left, top, image) {
  var item = veneno.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}
function CreateEstrella(left, top, image) {
  var item = estrella.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}
// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  currentScore = currentScore + 10;
  if (currentScore === winningScore) {
      createBadge();
  }
}
function venenoHandler(player, veneno) {
  veneno.kill();
  currentScore = currentScore - 10;
  
}
function starHandler(player, estrella) {
  estrella.kill();
  currentScore = currentScore +50;
  
}
// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#5db1ad';
    
    //Load images
    game.load.image('platform', 'platform_1.png');
    
    //Load spritesheets
    game.load.spritesheet('player', 'mikethefrog.png', 32, 32);
    game.load.spritesheet('coin', 'coin.png', 36, 44);
    game.load.spritesheet('badge', 'badge.png', 42, 54);
    game.load.spritesheet('poison','poison.png',32,32);
    game.load.spritesheet('star','star.png',32,32);
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, veneno, venenoHandler);
    game.physics.arcade.overlap(player, estrella, starHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
    }
  }

  function render() {

  }

};
