class room extends Phaser.Scene {

  constructor() {
    super({ key: "room" });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player
    this.inventory = data.inventory
    this.playerPos = data.playerPos;
  }


  preload() {

    // this is the exported JSON map file
    this.load.tilemapTiledJSON("room", "assets/room.tmj");

    this.load.image("bedroomIMG", "assets/4_Bedroom_32x32.png");
    this.load.image("CarpetIMG", "assets/Carpet.png");
    this.load.image("pipoyaIMG", "assets/pipoya.png");



  } //end of preload

  create() {
    this.scene.bringToTop("room")
    console.log("*** room scene");

    window.music.setVolume(0.09);

    // Create the map from main
    let map = this.make.tilemap({
      key: "room",
    });

    // Load the game tiles
    let carpetTiles = map.addTilesetImage("Carpet", "CarpetIMG");
    let pipoyaTiles = map.addTilesetImage("pipoya", "pipoyaIMG");
    let bedroomTiles = map.addTilesetImage("4_Bedroom_32x32", "bedroomIMG");

    let tilesArray = [carpetTiles, pipoyaTiles, bedroomTiles];

    // Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);
    this.rugLayer = map.createLayer("rugLayer", tilesArray, 0, 0);
    this.furnitureLayer = map.createLayer("furnitureLayer", tilesArray, 0, 0);
    this.toyLayer1 = map.createLayer("toyLayer1", tilesArray, 0, 0);
    this.toyLayer2 = map.createLayer("toyLayer2", tilesArray, 0, 0);

    //mc collider//
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    let start = map.findObject("ObjectLayer", (obj) => obj.name === "start");

    // zen is the alias in preload 
    this.player = this.physics.add.sprite(start.x, start.y, "zen");
    this.player.setCollideWorldBounds(true)

    this.player.body.setSize(this.player.width*0.6,this.player.height*0.6)

    // // debug player
    // window.player = this.player

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    //add collider
    this.wallLayer.setCollisionByExclusion(-1, true)
    this.furnitureLayer.setCollisionByExclusion(-1, true)
    this.toyLayer1.setCollisionByExclusion(-1, true)
    this.toyLayer2.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, [this.wallLayer])
    this.physics.add.collider(this.player, [this.furnitureLayer])
    this.physics.add.collider(this.player, [this.toyLayer1])
    this.physics.add.collider(this.player, [this.toyLayer2])

    //jump to lv1
    let bDown = this.input.keyboard.addKey('B');
    bDown.on('down', function () {
      console.log("B pressed (room）");
      this.scene.start("lv1");
    }, this);

    // Create the tint overlay with the specified fillStyle
    this.tintOverlay = this.add.graphics({ x: 0, y: 0 });
    this.tintOverlay.fillStyle(0x120016  , 0.4); // Set color to black and alpha to 0.3 (30% opacity)
    this.tintOverlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    this.tintOverlay.setScrollFactor(0); // Make sure it stays in place with the cam

  } //end of create

  update() {
    let speed = 200;

    if (
      this.player.x > 288 &&
      this.player.x < 352 &&
      this.player.y > 233 &&
      this.player.y < 297
    ) {
      console.log("Go to lv1_intro function");
      this.lv1_intro();
    }

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
      this.player.anims.play("zen-left", true); // walk left
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
      this.player.anims.play("zen-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
      this.player.anims.play("zen-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
      this.player.anims.play("zen-down", true);
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
    }
  } //end of update

  lv1_intro(player, tile) {
    console.log("function to jump to lv1_intro")
    this.scene.start("lv1_intro")
  }

} //end of class room