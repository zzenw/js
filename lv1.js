class lv1 extends Phaser.Scene {

  constructor() {
    super({ key: "lv1" });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player
    this.inventory = data.inventory
  }

  preload() {

    // this is the exported JSON map file
    this.load.tilemapTiledJSON("lv1", "assets/tileLv1.tmj");

    this.load.image("pipoyaIMG", "assets/pipoya.png");

    this.load.image("lightIMG", "assets/lightLv1.png");

  } //end of preload

  create() {
    // console.log('*** lv1 scene');

    // Create the map from main
    let map = this.make.tilemap({
      key: "lv1",
    });

    //black bar
    var rect = new Phaser.Geom.Rectangle(0, 800, 600, 800);
    var graphics = this.add.graphics({ fillStyle: { color: '#F2B600' } });
    graphics.fillRectShape(rect).setScrollFactor('0').setAlpha(0.5);

    // Load the game tiles
    let pipoyaTiles = map.addTilesetImage("pipoya", "pipoyaIMG");

    let tilesArray = [pipoyaTiles];

    // Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);

    //mc collider//
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // Load in items
    let light1 = map.findObject("ObjectLayer", (obj) => obj.name === "light1");
    let light2 = map.findObject("ObjectLayer", (obj) => obj.name === "light2");
    let light3 = map.findObject("ObjectLayer", (obj) => obj.name === "light3");


    this.light1 = this.physics.add.sprite(light1.x, light1.y, "lightIMG").play("lightAnim")
    this.light2 = this.physics.add.sprite(light2.x, light2.y, "lightIMG").play("lightAnim")
    this.light3 = this.physics.add.sprite(light3.x, light3.y, "lightIMG").play("lightAnim")

    // glow effect
    this.light1.postFX.addGlow(0xffffff, 2, 0, false, 0.1, 20);
    this.light2.postFX.addGlow(0xffffff, 2, 0, false, 0.1, 20);
    this.light3.postFX.addGlow(0xffffff, 2, 0, false, 0.1, 20);

    let start = map.findObject("ObjectLayer", (obj) => obj.name === "start");

    // zen is the alias in preload 
    this.player = this.physics.add.sprite(start.x, start.y, "zen");
    this.player.setCollideWorldBounds(true)

    // // debug player
    // window.player = this.player

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    //add collider//
    this.wallLayer.setCollisionByExclusion(-1, true)
    this.physics.add.collider(this.player, [this.wallLayer])

    //jump to room
    let cDown = this.input.keyboard.addKey('C');
    cDown.on('down', function () {
      // console.log("C pressed (lv1 game）");
      this.scene.start("lv2");
    }, this);


    // Call to update inventory items
    this.time.addEvent({
      delay: 100,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
    });

    // start another scene in parallel
    this.scene.launch("showInventory");

    // Call globalFunction globalCollectLight on overlap
    this.physics.add.overlap(this.player, [this.light1, this.light2, this.light3], globalCollectLight, null, this);

    this.groundLayer.setPipeline("Light2D").setAlpha(0.5);
    this.wallLayer.setPipeline("Light2D").setAlpha(0.5);
    
    this.lights.enable();
    this.lights.setAmbientColor(0x080808);

    this.spotlight = this.lights
    .addLight(this.player.x, this.player.y)
    .setRadius(5, 5)
    .setIntensity(5);

  } //end of create

  update() {
    let speed = 200;

    this.spotlight.x = this.player.x + 8;
    this.spotlight.y = this.player.y - 5;

    this.spotlight.setRadius(150*window.lightIMG,150*window.lightIMG)

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

    if (
      this.player.x > 1024 &&
      this.player.x < 1088 &&
      this.player.y > 47 &&
      this.player.y < 111
    ){
      // console.log("Go to lv2_intro function");
      this.lv2_intro();
    }

  } //end of update

  // Function room1
  lv2_intro(player, tile) {
    // console.log("Function to jump to lv2_intro scene");
    this.scene.start("lv2_intro",);
  }
} //end of class lv1
