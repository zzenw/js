class lv3 extends Phaser.Scene {
  constructor() {
    super({
      key: "lv3",
    });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player;
    this.inventory = data.inventory;
  }

  preload() {

    // this is the exported JSON map file
    this.load.tilemapTiledJSON("lv3", "assets/tileLv3.tmj");

    this.load.image("CarpetIMG", "assets/Carpet.png");
    this.load.image("pipoyaIMG", "assets/pipoya.png");
    this.load.image("plantIMG", "assets/plant.png");

    this.load.image("weaponIMG", "assets/weaponLv3.png");
    this.load.image("lifeIMG", "assets/lifespan.png");
    this.load.image("bulletIMG", "assets/bubbleLv2.png");


  } //end of preload

  create() {
    // console.log("*** lv3 scene");

    // Create the map from main
    let map = this.make.tilemap({
      key: "lv3",
    });


    // Load the game tiles
    let carpetTiles = map.addTilesetImage("Carpet", "CarpetIMG");
    let pipoyaTiles = map.addTilesetImage("pipoya", "pipoyaIMG");
    let plantTiles = map.addTilesetImage("plant", "plantIMG");

    let tilesArray = [carpetTiles, pipoyaTiles, plantTiles];


    // Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.pondLayer = map.createLayer("pondLayer", tilesArray, 0, 0);
    this.fenceLayer = map.createLayer("fenceLayer", tilesArray, 0, 0);
    this.soilLayer = map.createLayer("soilLayer", tilesArray, 0, 0);
    this.soilDecorLayer = map.createLayer("soilDecorLayer", tilesArray, 0, 0);
    this.graveLayer = map.createLayer("graveLayer", tilesArray, 0, 0);
    this.driedObjLayer = map.createLayer("driedObjLayer", tilesArray, 0, 0);
    this.treeLayer = map.createLayer("treeLayer", tilesArray, 0, 0);
    this.buildingLayer = map.createLayer("buildingLayer", tilesArray, 0, 0);
    this.buildingDecor = map.createLayer("buildingDecor", tilesArray, 0, 0);
    this.decorLayer = map.createLayer("decorLayer", tilesArray, 0, 0);

    //mc collider//
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;
    // end of mc collider//       

    // Load in objectLayer
    let weapon = map.findObject("ObjectLayer", (obj) => obj.name === "weapon");
    let life1 = map.findObject("ObjectLayer", (obj) => obj.name === "life1");
    let life2 = map.findObject("ObjectLayer", (obj) => obj.name === "life2");
    let clown1 = map.findObject("ObjectLayer", (obj) => obj.name === "clown1");
    let clown2 = map.findObject("ObjectLayer", (obj) => obj.name === "clown2");


    this.weapon = this.physics.add.sprite(weapon.x, weapon.y, "weaponIMG").play("weaponAnim")
    this.life1 = this.physics.add.sprite(life1.x, life1.y, "lifeIMG").play("lifeAnim")
    this.life2 = this.physics.add.sprite(life2.x, life2.y, "lifeIMG").play("lifeAnim")
    this.clown1 = this.physics.add.sprite(clown1.x, clown1.y, "ClownIMG").play("clown1-down")
    this.clown2 = this.physics.add.sprite(clown2.x, clown2.y, "ClownIMG").play("clown2-down")


    let start = map.findObject("ObjectLayer", (obj) => obj.name === "start");


    //  zen is the alias in preload 
    this.player = this.physics.add.sprite(start.x, start.y, "zen");
    this.player.setCollideWorldBounds(true)


    // // debug player
    // window.player = this.player

    //shooting
    this.bullet = this.physics.add.sprite(this.player.x, this.player.y, "bulletIMG")
    this.bullet.setScale(0.5)
    this.bullet.setVisible(false);

    let attackLeft = this.input.keyboard.addKey("z");
    let attackRight = this.input.keyboard.addKey("x");

    attackLeft.on(
      "down",
      function () {
        this.attackLeft();
      },
      this
    );

    attackRight.on(
      "down",
      function () {
        this.attackRight();
      },
      this
    );



    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    //add collider//
    this.decorLayer.setCollisionByExclusion(-1, true)
    this.fenceLayer.setCollisionByExclusion(-1, true)
    this.buildingDecor.setCollisionByExclusion(-1, true)
    this.buildingLayer.setCollisionByExclusion(-1, true)
    this.treeLayer.setCollisionByExclusion(-1, true)
    this.graveLayer.setCollisionByExclusion(-1, true)
    this.soilDecorLayer.setCollisionByExclusion(-1, true)
    this.soilLayer.setCollisionByExclusion(-1, true)
    this.pondLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider([this.player, this.clown1, this.clown2], this.decorLayer)
    this.physics.add.collider([this.player, this.clown1, this.clown2], this.fenceLayer)
    this.physics.add.collider([this.player, this.clown1, this.clown2], this.buildingDecor)
    this.physics.add.collider([this.player, this.clown1, this.clown2], this.buildingLayer)
    this.physics.add.collider([this.player, this.clown1, this.clown2], this.treeLayer)
    this.physics.add.collider([this.player, this.clown1, this.clown2], this.graveLayer)
    this.physics.add.collider([this.player, this.clown1, this.clown2], this.soilDecorLayer)
    this.physics.add.collider([this.player, this.clown1, this.clown2], this.soilLayer)
    this.physics.add.collider([this.player, this.clown1, this.clown2], this.pondLayer)

    // Call to update inventory items
    this.time.addEvent({
      delay: 100,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
    });

    // start another scene in parallel
    this.scene.launch("showInventory");

    // Call globalFunction globalHitObject on overlap
    this.physics.add.overlap(this.player, [this.weapon], globalCollectWeapon, null, this);
    this.physics.add.overlap(this.player, [this.clown1, this.clown2], globalHitClown, null, this);
    this.physics.add.overlap(this.player, [this.life1, this.life2], globalCollectLife, null, this);
    this.physics.add.overlap(this.bullet, [this.clown1], globalShootClown1, null, this);
    this.physics.add.overlap(this.bullet, [this.clown2], globalShootClown2, null, this);

    // Create the tint overlay with the specified fillStyle
    this.tintOverlay = this.add.graphics({ x: 0, y: 0 });
    this.tintOverlay.fillStyle(0x120016, 0.5); // Set color to black and alpha to 0.3 (30% opacity)
    this.tintOverlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    this.tintOverlay.setScrollFactor(0); // Make sure it stays in place with the cam

  } // end of create

  update() {

    //enemy moving
    this.physics.moveToObject(this.clown1, this.player, 500, 1500);
    this.physics.moveToObject(this.clown2, this.player, 500, 1500);

    let speed = 200;

    if (window.clown1 ==0 && window.clown2== 0) {
      this.win()
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
  } // end of update

   // Function room1
   win(player, tile) {
    // console.log("Function to jump to win scene");
    this.scene.start("win",);
  }

  attackLeft() {

    // console.log("attack left");
    if (window.weaponIMG > 0) {

      this.ShootSnd = this.sound.add("shootAUD").setVolume(0.5);
      // play the sound
      this.ShootSnd.play()


      this.bullet.x = this.player.x;
      this.bullet.y = this.player.y;

      this.bullet.setVisible(true);
      this.bullet.body.setEnable(true);

      // speed of the bullet
      this.bullet.body.setVelocityX(-500);
    }
  }

  attackRight() {

    // console.log("attack right");
    if (window.weaponIMG > 0) {

      this.ShootSnd = this.sound.add("shootAUD").setVolume(0.5);
      // play the sound
      this.ShootSnd.play()


      this.bullet.x = this.player.x;
      this.bullet.y = this.player.y;

      this.bullet.setVisible(true);
      this.bullet.body.setEnable(true);

      // speed of the bullet
      this.bullet.body.setVelocityX(500);
    }
  }


} // end of class lv3
