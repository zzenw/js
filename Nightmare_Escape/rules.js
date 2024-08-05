class rules extends Phaser.Scene {

    constructor() {
        super({
            key: 'rules'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("rulesIMG", "assets/Pg_rules.png");
    
      } //end of preload
    
    
      create() {
        this.scene.bringToTop("rules")
        // console.log('*** rules scene');
    
        // Add image and detect spacebar keypress
        this.add.image(0, 0, "rulesIMG").setOrigin(0, 0);
    
        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey("SPACE");
    
        // On spacebar event, call the world scene
        spaceDown.on("down", function () {
          // console.log("Jump to room scene");
    
          this.scene.start("room");
        },
        this
        );
      } //end of create
    

}// end of main