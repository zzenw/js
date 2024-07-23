class gameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  preload() {
    this.load.image("gameOverIMG", "assets/gameOver.jpg");

  } //end of preload


  create() {
    console.log("*** gameOver scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, "gameOverIMG").setOrigin(0, 0);

    // Check for spacebar or any key here
    var enterDown = this.input.keyboard.addKey("ENTER");

    // On spacebar event, call the world scene
    enterDown.on("down", function () {
      console.log("Jump to lv1 scene");
      window.lifeIMG = 3;
      window.lightIMG = 0;

      this.scene.start("room");
    },
      this
    );
  }

} // end of gameOver

