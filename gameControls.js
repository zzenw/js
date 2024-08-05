class gameControls extends Phaser.Scene {

    constructor() {
        super({
            key: 'gameControls'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("gameControlsIMG", "assets/Pg_gameControls.png");
    
      } //end of preload
    
    
      create() {
        // console.log('*** gameControls scene');
    
        // Add image and detect spacebar keypress
        this.add.image(0, 0, "gameControlsIMG").setOrigin(0, 0);
    
        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey("SPACE");
    
        // On spacebar event, call the world scene
        spaceDown.on("down", function () {
          // console.log("Jump to rules scene");
    
          this.scene.start("rules");
        },
        this
        );
      } //end of create
    

}// end of main