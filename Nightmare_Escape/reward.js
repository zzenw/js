class reward extends Phaser.Scene {
  constructor() {
    super("reward");
  }

  preload() {
    this.load.image("rewardIMG", "assets/Pg_reward.png");
    this.win_music = this.sound.add("win_music").setVolume(0.09);

  } //end of preload


  create() {
    this.scene.bringToTop("reward")
    // console.log("*** reward scene");

    window.music.setVolume(0);
    this.win_music = this.sound.add("win_music").setVolume(0.3);
    // start the background music
    this.win_music.play();

    // Add image and detect spacebar keypress
    this.add.image(0, 0, "rewardIMG").setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on("down", function () {
      // console.log("Jump to main scene");

      this.scene.start("main");
      this.win_music.stop();
    },
      this
    );
  }// end of create

} // end of gameOver

