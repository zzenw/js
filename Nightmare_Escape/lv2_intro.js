class lv2_intro extends Phaser.Scene {

    constructor() {
        super({
            key: 'lv2_intro'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("lv2_introIMG", "assets/Pg_lv2.png");
    
      } //end of preload
    
    
      create() {
        this.scene.bringToTop("lv2_intro")
        // console.log('*** lv2_intro scene');
    
        // Add image and detect spacebar keypress
        this.add.image(0, 0, "lv2_introIMG").setOrigin(0, 0);
    
        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey("SPACE");
    
        // On spacebar event, call the world scene
        spaceDown.on("down", function () {
          // console.log("Jump to lv2 scene");
    
          this.scene.start("lv2");
        },
        this
        );
      } //end of create
    

}// end of main