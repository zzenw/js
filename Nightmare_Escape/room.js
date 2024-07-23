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
    console.log("*** room scene");


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

    // debug player
    window.player = this.player

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

  } //end of create

  update() {
    let speed = 200;

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

  // // Function to jump to worldmap
  // preload(player, tile) {
  //   console.log("preload function");
  //   let playerPos = {}
  //   playerPos.x = 320
  //   playerPos.y = 285
  //   this.scene.start("preload", { player: playerPos });
  // }

} //end of class room