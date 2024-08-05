class win extends Phaser.Scene {
  constructor() {
    super("win");
  }

  preload() {
    this.load.image("winIMG", "assets/Pg_win.png");

  } //end of preload


  create() {
    this.scene.bringToTop("win")
    // console.log("*** win scene");

    window.music.setVolume(0);
    this.win_music = this.sound.add("win_music").setVolume(0.3);
    // start the background music
    this.win_music.play();


    // Add image and detect spacebar keypress
    this.add.image(0, 0, "winIMG").setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on("down", function () {
      // console.log("Jump to reward scene");
      window.lifeIMG = 3;
      window.lightIMG = 1;
      window.sprayIMG = 0;
      window.weaponIMG = 0;
      window.clown1 = 2;
      window.clown2 = 2;
      window.spider =0;
      this.win_music.stop();
      this.scene.start("reward");
    },
      this
    );

  

  }// end of create

} // end of gameOver

