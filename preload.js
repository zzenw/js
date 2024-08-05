class preload extends Phaser.Scene {
  constructor() {
    super({
      key: "preload",
    });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player
    this.inventory = data.inventory
    // this.playerPos = data.playerPos;
  }

  preload() {

    //character
    this.load.spritesheet("zen", "assets/MC.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("spiderLv2IMG", "assets/spiderLv2.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("ClownIMG", "assets/Clown.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    //element
    this.load.spritesheet("lightIMG", "assets/lightLv1Anim.png", {
      frameWidth: 35,
      frameHeight: 35,
    });

    this.load.spritesheet("lifeIMG", "assets/lifespanAnim.png", {
      frameWidth: 35,
      frameHeight: 35,
    });

    this.load.spritesheet("sprayIMG", "assets/sprayLv2Anim.png", {
      frameWidth: 35,
      frameHeight: 35,
    });

    this.load.spritesheet("weaponIMG", "assets/weaponLv3Anim.png", {
      frameWidth: 35,
      frameHeight: 35,
    });


    // audio
    this.load.audio("bg_music", "assets/Bg-music.mp3");
    this.load.audio("collectAUD","assets/CollectAUD.mp3");
    this.load.audio("clownAUD","assets/Ouch-Man.mp3");
    this.load.audio("spiderAUD","assets/Ouch-Spider.mp3");
    this.load.audio("hurtAUD","assets/Ouch-MC.mp3");
    this.load.audio("win_music","assets/Win-HereComesTheSun_Kalimba.mp3");
    this.load.audio("lose_music","assets/Lose-RequiemForADream_Kalimba.mp3");

  } //end of preload


  create() {

    // console.log('*** preload scene');

    // Load in player
    this.anims.create({
      key: "zen-up",
      frames: this.anims.generateFrameNumbers("zen", { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "zen-left",
      frames: this.anims.generateFrameNumbers("zen", { start: 118, end: 125 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "zen-down",
      frames: this.anims.generateFrameNumbers("zen", { start: 131, end: 138 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "zen-right",
      frames: this.anims.generateFrameNumbers("zen", { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1,
    });

    // Load in enemy
    this.anims.create({
      key: "spiderLv2IMG-up",
      frames: this.anims.generateFrameNumbers("spiderLv2IMG", { start: 11, end: 14 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "spiderLv2IMG-left",
      frames: this.anims.generateFrameNumbers("spiderLv2IMG", { start: 2, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "spiderLv2IMG-down",
      frames: this.anims.generateFrameNumbers("spiderLv2IMG", { start: 11, end: 14 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "spiderLv2IMG-right",
      frames: this.anims.generateFrameNumbers("spiderLv2IMG", { start: 2, end: 7 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "clown1-up",
      frames: this.anims.generateFrameNumbers("ClownIMG", { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "clown1-left",
      frames: this.anims.generateFrameNumbers("ClownIMG", { start: 118, end: 125 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "clown1-down",
      frames: this.anims.generateFrameNumbers("ClownIMG", { start: 131, end: 138 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "clown1-right",
      frames: this.anims.generateFrameNumbers("ClownIMG", { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "clown2-up",
      frames: this.anims.generateFrameNumbers("ClownIMG", { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "clown2-left",
      frames: this.anims.generateFrameNumbers("ClownIMG", { start: 118, end: 125 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "clown2-down",
      frames: this.anims.generateFrameNumbers("ClownIMG", { start: 131, end: 138 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "clown2-right",
      frames: this.anims.generateFrameNumbers("ClownIMG", { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1,
    });

    // load in item
    this.anims.create({
      key: "lightAnim",
      frames: this.anims.generateFrameNumbers("lightIMG", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "lifeAnim",
      frames: this.anims.generateFrameNumbers("lifeIMG", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "sprayAnim",
      frames: this.anims.generateFrameNumbers("sprayIMG", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "weaponAnim",
      frames: this.anims.generateFrameNumbers("weaponIMG", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });


    // turn on loop, adjust the volume
    window.music = this.sound.add("bg_music", { loop: true }).setVolume(0.09);
    // start the background music
    window.music.play();

    this.scene.start("main")
  

  } //end of create


} //end of world lv2

