class storyline_1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'storyline_1'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("storyline01IMG", "assets/Pg_storyline_1.png");
    
      } //end of preload
    
    
      create() {
        this.scene.bringToTop("storyline_1")
        console.log('*** storyline_1 scene');
    
        // Add image and detect spacebar keypress
        this.add.image(0, 0, "storyline01IMG").setOrigin(0, 0);
    
        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey("SPACE");
    
        // On spacebar event, call the world scene
        spaceDown.on("down", function () {
          console.log("Jump to storyline_2 scene");
        //   window.lifeIMG = 3;
        //   window.lightIMG = 0;
        //   window.weaponIMG = 0;
        //   window.sprayIMG = 0;
    
          this.scene.start("storyline_2");
        },
        this
        );
      } //end of create
    

}// end of main