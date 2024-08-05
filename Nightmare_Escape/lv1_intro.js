class lv1_intro extends Phaser.Scene {

    constructor() {
        super({
            key: 'lv1_intro'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("lv1_introIMG", "assets/Pg_lv1.png");
    
      } //end of preload
    
    
      create() {
        this.scene.bringToTop("lv1_intro")
        // console.log('*** lv1_intro scene');
    
        // Add image and detect spacebar keypress
        this.add.image(0, 0, "lv1_introIMG").setOrigin(0, 0);
    
        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey("SPACE");
    
        // On spacebar event, call the world scene
        spaceDown.on("down", function () {
          // console.log("Jump to lv1 scene");
    
          this.scene.start("lv1");
        },
        this
        );
      } //end of create
    

}// end of main