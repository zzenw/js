class lv3_intro extends Phaser.Scene {

    constructor() {
        super({
            key: 'lv3_intro'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("lv3_introIMG", "assets/Pg_lv3.png");
    
      } //end of preload
    
    
      create() {
        this.scene.bringToTop("lv3_intro")
        // console.log('*** lv3_intro scene');
    
        // Add image and detect spacebar keypress
        this.add.image(0, 0, "lv3_introIMG").setOrigin(0, 0);
    
        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey("SPACE");
    
        // On spacebar event, call the world scene
        spaceDown.on("down", function () {
          // console.log("Jump to lv3 scene");
    
          this.scene.start("lv3");
        },
        this
        );
      } //end of create
    

}// end of main