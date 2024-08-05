var config = {
    type: Phaser.WEBGL,
    // pixel size * tile map size * zoom 
    width: 32 * 30,
    height: 32 * 20,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [ preload,main, storyline_1,storyline_2,gameControls,rules,room,lv1_intro,lv3, lv1, lv2,lv2_intro,lv3_intro,win,reward, gameOver,showInventory]

};

var game = new Phaser.Game(config);

// Add showInventory and any extra scenes here
// Add variables here
window.lifeIMG = 3
window.lightIMG = 1
window.sprayIMG = 0
window.weaponIMG = 0
window.clown1 = 2
window.clown2 = 2
window.spider = 0

