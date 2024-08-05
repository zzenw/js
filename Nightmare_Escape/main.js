class main extends Phaser.Scene {

    constructor() {
        super({
            key: 'main'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("introIMG", "assets/Pg_intro.png");
    
      } //end of preload
    
    
      create() {
        this.scene.bringToTop("main")
        console.log('*** main scene');

        window.music.setVolume(0.09);
    
        // Add image and detect spacebar keypress
        this.add.image(0, 0, "introIMG").setOrigin(0, 0);
    
        // Check for spacebar or any key here
        var enterDown = this.input.keyboard.addKey("ENTER");
    
        // On spacebar event, call the world scene
        enterDown.on("down", function () {
          console.log("Jump to lv1 scene");
        //   window.lifeIMG = 3;
        //   window.lightIMG = 0;
        //   window.weaponIMG = 0;
        //   window.sprayIMG = 0;
    
          this.scene.start("storyline_1");
        },
        this
        );
      } //end of create
    

}// end of main