class storyline_2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'storyline_2'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("storyline02IMG", "assets/Pg_storyline_2.png");
    
      } //end of preload
    
    
      create() {
        this.scene.bringToTop("storyline_2")
        // console.log('*** storyline_1 scene');
    
        // Add image and detect spacebar keypress
        this.add.image(0, 0, "storyline02IMG").setOrigin(0, 0);
    
        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey("SPACE");
    
        // On spacebar event, call the world scene
        spaceDown.on("down", function () {
          // console.log("Jump to room scene");
    
          this.scene.start("gameControls");
        },
        this
        );
      } //end of create
    

}// end of main