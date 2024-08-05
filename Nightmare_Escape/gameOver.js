class gameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  preload() {
    this.load.image("gameOverIMG", "assets/Pg_gameOver.png");

  } //end of preload


  create() {
    this.scene.bringToTop("gameOver");
    // console.log("*** gameOver scene");

    window.music.setVolume(0);
    this.lose_music = this.sound.add("lose_music").setVolume(0.3);
    // start the background music
    this.lose_music.play();

    // Add image and detect spacebar keypress
    this.add.image(0, 0, "gameOverIMG").setOrigin(0, 0);

    // Check for spacebar or any key here
    var enterDown = this.input.keyboard.addKey("ENTER");

    // On spacebar event, call the world scene
    enterDown.on("down", function () {
      // console.log("Jump to lv1 scene");
      window.lifeIMG = 3;
      window.lightIMG = 1;
      window.sprayIMG = 0;
      window.weaponIMG = 0;
      window.clown1 = 2;
      window.clown2 = 2;
      window.spider =0;
      this.lose_music.stop();
      this.scene.start("room");
    },
      this
    );

    
  }// end of gameOver

} // end of gameOver

