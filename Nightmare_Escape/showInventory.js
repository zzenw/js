class showInventory extends Phaser.Scene {

    constructor() {
        super({
            key: 'showInventory',
            active: false
        });
    }

    init(data) {
        this.player = data.player;
        this.inventory = data.inventory;
    }

    preload() {
        //Load heart image
        this.load.image('lifeIMG', 'assets/lifespan.png');
        this.load.image('lightIMG', 'assets/lightLv1.png');
        this.load.image('sprayIMG', 'assets/sprayLv2.png');
        this.load.image('weaponIMG', 'assets/weaponLv3.png');
    }

    create() {

        //Place hearts at the top screen
        // console.log("***showInventory");
        this.scene.bringToTop("showInventory");

        //black bar
        var rect = new Phaser.Geom.Rectangle(0, 0, 970, 65);
        var graphics = this.add.graphics({ fillStyle: { color: '#F2B600' } });
        graphics.fillRectShape(rect).setScrollFactor('0').setAlpha(0.6);

        // Setup heart but visible to false
        this.lifeIMG1 = this.add.image(100, 41, 'lifeIMG').setScrollFactor(0).setVisible(false).setScale(1);
        this.lifeIMG2 = this.add.image(150, 41, 'lifeIMG').setScrollFactor(0).setVisible(false).setScale(1);
        this.lifeIMG3 = this.add.image(200, 41, 'lifeIMG').setScrollFactor(0).setVisible(false).setScale(1);

        this.lightIMG = this.add.image(670, 39, 'lightIMG').setScrollFactor(0).setVisible(true);
        this.sprayIMG = this.add.image(770, 39, 'sprayIMG').setScrollFactor(0).setVisible(true);
        this.weaponIMG = this.add.image(870, 39, 'weaponIMG').setScrollFactor(0).setVisible(true);

        // Recv an event, call the method
        this.events.on('inventory', this.updateScreen, this)

        //Setup key
        this.lightIMGNum = this.add.text(700, 23, window.lightIMG, { font: '25px AnyTakers-Regular', fill: '#FFFFFF' }).setScrollFactor(0);
        this.sprayIMGNum = this.add.text(800, 23, window.sprayIMG, { font: '25px AnyTakers-Regular', fill: '#FFFFFF' }).setScrollFactor(0);
        this.weaponIMGNum = this.add.text(900, 23, window.weaponIMG, { font: '25px AnyTakers-Regular', fill: '#FFFFFF' }).setScrollFactor(0);

    } //end of create

    updateScreen(data) {
        // console.log('Received event inventory', data);

        this.lightIMGNum.setText(data.lightIMG);
        this.sprayIMGNum.setText(data.sprayIMG);
        this.weaponIMGNum.setText(data.weaponIMG);

        switch (data.lifeIMG) {

            case 3:
                this.lifeIMG1.setVisible(true)
                this.lifeIMG2.setVisible(true)
                this.lifeIMG3.setVisible(true)
                break;

            case 2:
                this.lifeIMG1.setVisible(true)
                this.lifeIMG2.setVisible(true)
                this.lifeIMG3.setVisible(false)
                break;

            case 1:
                this.lifeIMG1.setVisible(true)
                this.lifeIMG2.setVisible(false)
                this.lifeIMG3.setVisible(false)
                break;

            case 0:
                this.lifeIMG1.setVisible(false)
                this.lifeIMG2.setVisible(false)
                this.lifeIMG3.setVisible(false)
                break;

            default:
                break;
        }

    }

} // end of class
