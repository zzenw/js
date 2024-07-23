class lv2 extends Phaser.Scene {
  constructor() {
    super({
      key: "lv2",
    });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player
    this.inventory = data.inventory
  }

  preload() {

    // this is the exported JSON map file
    this.load.tilemapTiledJSON("lv2", "assets/tileLv2.tmj");

    this.load.image("pipoyaIMG", "assets/pipoya.png");

    this.load.image("sprayIMG", "assets/sprayLv2.png");
    this.load.image("lifeIMG", "assets/lifespan.png");
    this.load.image("bulletIMG", "assets/bubbleLv2.png");
    
  } //end of preload


  create() {
    console.log("*** lv2 scene");

    // Create the map from main
    let map = this.make.tilemap({
      key: "lv2",
    });

    // Load the game tiles
    let pipoyaTiles = map.addTilesetImage("pipoya", "pipoyaIMG");

    let tilesArray = [pipoyaTiles];

    // Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.bricksLayer = map.createLayer("bricksLayer", tilesArray, 0, 0);
    this.decorLayer = map.createLayer("decorLayer", tilesArray, 0, 0);

    //mc collider//
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // Load in items
    let spray = map.findObject("ObjectLayer", (obj) => obj.name === "spray");
    this.spray = this.physics.add.sprite(spray.x, spray.y, "sprayIMG").play("sprayAnim")


    let spider1 = map.findObject("ObjectLayer", (obj) => obj.name === "spider1");
    this.spider1 = this.physics.add.sprite(spider1.x, spider1.y, "spiderLv2IMG")
    // spider1 anim
    this.tweens.add({
      targets: this.spider1,
      y: 180,
      flipY: false,
      yoyo: true,
      duration: 1200,
      repeat: -1,

      onYoyo: () => {
        // console.log('onYoyo, play spider1-up anims');
        this.spider1.play("spiderLv2IMG-up")

      },
      onRepeat: () => {
        // console.log('onRepeat, play spider1-down anims');
        this.spider1.play("spiderLv2IMG-down")
      },
    })

    let spider2 = map.findObject("ObjectLayer", (obj) => obj.name === "spider2");
    this.spider2 = this.physics.add.sprite(spider2.x, spider2.y, "spiderLv2IMG")
    // spider1 anim
    this.tweens.add({
      targets: this.spider2,
      y: 520,
      flipY: false,
      yoyo: true,
      duration: 2000,
      repeat: -1,

      onYoyo: () => {
        this.spider2.play("spiderLv2IMG-up")

      },
      onRepeat: () => {
        this.spider2.play("spiderLv2IMG-down")
      },
    })

    let spider3 = map.findObject("ObjectLayer", (obj) => obj.name === "spider3");
    this.spider3 = this.physics.add.sprite(spider3.x, spider3.y, "spiderLv2IMG").play("spiderLv2IMG-left")
    this.tweens.add({
      targets: this.spider3,
      x: 500,
      flipX: true,
      yoyo: true,
      duration: 1800,
      repeat: -1
    })

    let spider4 = map.findObject("ObjectLayer", (obj) => obj.name === "spider4");
    this.spider4 = this.physics.add.sprite(spider4.x, spider4.y, "spiderLv2IMG")
    this.tweens.add({
      targets: this.spider4,
      y: 185,
      flipY: false,
      yoyo: true,
      duration: 1000,
      repeat: -1,

      onYoyo: () => {
        this.spider4.play("spiderLv2IMG-up")

      },
      onRepeat: () => {
        this.spider4.play("spiderLv2IMG-down")
      },
    })

    let spider5 = map.findObject("ObjectLayer", (obj) => obj.name === "spider5");
    this.spider5 = this.physics.add.sprite(spider5.x, spider5.y, "spiderLv2IMG").play("spiderLv2IMG-left")
    this.tweens.add({
      targets: this.spider5,
      x: 1110,
      flipX: true,
      yoyo: true,
      duration: 1800,
      repeat: -1
    })

    let spider6 = map.findObject("ObjectLayer", (obj) => obj.name === "spider6");
    this.spider6 = this.physics.add.sprite(spider6.x, spider6.y, "spiderLv2IMG")
    this.tweens.add({
      targets: this.spider6,
      y: 630,
      flipY: false,
      yoyo: true,
      duration: 1500,
      repeat: -1,

      onYoyo: () => {
        this.spider6.play("spiderLv2IMG-down")

      },
      onRepeat: () => {
        this.spider6.play("spiderLv2IMG-up")
      },
    })


    let spider7 = map.findObject("ObjectLayer", (obj) => obj.name === "spider7");
    this.spider7 = this.physics.add.sprite(spider7.x, spider7.y, "spiderLv2IMG")
    this.tweens.add({
      targets: this.spider7,
      y: 630,
      flipY: false,
      yoyo: true,
      duration: 1000,
      repeat: -1,

      onYoyo: () => {
        this.spider7.play("spiderLv2IMG-up")

      },
      onRepeat: () => {
        this.spider7.play("spiderLv2IMG-down")
      },
    })


    let life1 = map.findObject("ObjectLayer", (obj) => obj.name === "life1");
    let life2 = map.findObject("ObjectLayer", (obj) => obj.name === "life2");

    this.life1 = this.physics.add.sprite(life1.x, life1.y, "lifeIMG").play("lifeAnim")
    this.life2 = this.physics.add.sprite(life2.x, life2.y, "lifeIMG").play("lifeAnim")

    
    
    let start = map.findObject("ObjectLayer", (obj) => obj.name === "start");
    // zen is the alias in preload 
    this.player = this.physics.add.sprite(start.x, start.y, "zen");
    this.player.setCollideWorldBounds(true)


    // debug player
    window.player = this.player

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

    //add collider
    this.bricksLayer.setCollisionByExclusion(-1, true)
    this.decorLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider([this.player, this.spider1, this.spider2, this.spider3, this.spider4,
    this.spider5, this.spider6, this.spider7], this.bricksLayer)
    this.physics.add.collider([this.player, this.spider1, this.spider2, this.spider3, this.spider4,
    this.spider5, this.spider6, this.spider7], this.decorLayer)

    //jump to lv3
    var dDown = this.input.keyboard.addKey('D');
    dDown.on('down', function () {
      console.log("D pressed (lv2 game)");
      this.scene.start("lv3");
    }, this);

    //enemy overlap
    this.physics.add.overlap(this.player, [this.spider1, this.spider2, this.spider3, this.spider4,
    this.spider5, this.spider6, this.spider7], globalHitSpider, null, this);

    // Call to update inventory items
    this.time.addEvent({
      delay: 100,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
    });

    // start another scene in parallel
    this.scene.launch("showInventory");

    // Call globalFunction globalHitLifeon overlap
    this.physics.add.overlap(this.player, [this.life1, this.life2], globalCollectLife, null, this);
    this.physics.add.overlap(this.player, [this.spray], globalCollectSpray, null, this);
    this.physics.add.overlap(this.bullet, [this.spider1, this.spider2, this.spider3, this.spider4,
      this.spider5, this.spider6, this.spider7], globalShootSpider, null, this);


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

  attackLeft() {
    
    console.log("attack left");

    this.bullet.x = this.player.x;
    this.bullet.y = this.player.y;

    this.bullet.setVisible(true);
    this.bullet.body.setEnable(true);

	  // speed of the bullet
    this.bullet.body.setVelocityX(-500);
  }

  attackRight() {
    
    console.log("attack right");

    this.bullet.x = this.player.x;
    this.bullet.y = this.player.y;

    this.bullet.setVisible(true);
    this.bullet.body.setEnable(true);

	  // speed of the bullet
    this.bullet.body.setVelocityX(500);
  }

} //end of world lv2
