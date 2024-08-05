////////////////////////////////////////////////////////
//
// access this function using updateInventory.call(this)
// Uses a JS function to prevent repeated codes
// 
///////////////////////////////////////////////////////
function updateInventory() {
    // console.log("*** updateInventory()")
    // Emit events showInventory
    this.inventory = {}
    this.inventory.lightIMG = window.lightIMG
    this.inventory.lifeIMG = window.lifeIMG
    this.inventory.sprayIMG = window.sprayIMG
    this.inventory.weaponIMG = window.weaponIMG
    this.inventory.bubbleIMG = window.bulletIMG

    // console.log('*** updateInventory() Emit event', this.inventory)
    this.invEvent = (event, data) => {
        this.scene.get('showInventory').events.emit(event, data);
    }
    this.invEvent("inventory", this.inventory);
}

////////////////////////////////////////////////////////
//
// access this function with globalHitFire
// Uses a JS function to prevent repeated codes
// 
///////////////////////////////////////////////////////
function globalHitSpider(player, item) {
    // console.log("*** player overlap spider");

    // Shake screen
    this.cameras.main.shake(100);
    //this.hitenemySnd.play();
    this.hurtSnd = this.sound.add("hurtAUD").setVolume(0.5);
    // play the sound
    this.hurtSnd.play()

    // deduct heart
    window.lifeIMG--;
    player.x=0
    player.y=0
    //item.disableBody(true, true);

    // Call globalFunctions.js updateInventory
    updateInventory.call(this)

    if (window.lifeIMG == 0) {
        // console.log("*** player gameOver");
        this.scene.start("gameOver");
        //this.loselifeSnd.play();
    }
}

function globalHitClown(player, item) {
    // console.log("*** player overlap clown");

    // Shake screen
    this.cameras.main.shake(100);
    //this.hitenemySnd.play();
    this.hurtSnd = this.sound.add("hurtAUD").setVolume(0.5);
    // play the sound
    this.hurtSnd.play()

    // deduct heart
    window.lifeIMG--;
    player.x=item.x-100
    player.y=item.y-100
    // item.disableBody(true, true);

    // Call globalFunctions.js updateInventory
    updateInventory.call(this)

    if (window.lifeIMG == 0) {
        // console.log("*** player gameOver");
        this.scene.start("gameOver");
        //this.loselifeSnd.play();
    }
}

function globalShootSpider(player, item) {
    // console.log("*** bullet overlap spider");

    this.SpiderSnd = this.sound.add("spiderAUD").setVolume(0.5);
    // play the sound
    this.SpiderSnd.play()

    // deduct heart
    item.disableBody(true, true);

    window.spider++

    // Call globalFunctions.js updateInventory
    updateInventory.call(this)
}

function globalShootClown1(bullet, item) {
    // console.log("*** bullet overlap clown1",window.clown1);

    this.ClownSnd = this.sound.add("clownAUD").setVolume(0.5);
    // play the sound
    this.ClownSnd.play()

    bullet.disableBody(true, true);

    // deduct heart
    window.clown1--
    if (window.clown1 < 1) {
        item.disableBody(true, true);
    }

    // Call globalFunctions.js updateInventory
    updateInventory.call(this)

}

function globalShootClown2(bullet, item) {
    // console.log("*** bullet overlap clown2",window.clown2);

    this.ClownSnd = this.sound.add("clownAUD").setVolume(0.5);
    // play the sound
    this.ClownSnd.play()

    bullet.disableBody(true, true);

    // deduct heart
    window.clown2--
    if (window.clown2 < 1) {
        item.disableBody(true, true);
    }

    // Call globalFunctions.js updateInventory
    updateInventory.call(this)

}

////////////////////////////////////////////////////////
//
// access this function with globalCollectKey
// Uses a JS function to prevent repeated codes
// 
/////////////////////////////////////////////////////// 
function globalCollectLight(player, item) {
    // console.log("*** player overlap light");

    this.collectItemSnd = this.sound.add("collectAUD").setVolume(0.5);
    // play the sound
    this.collectItemSnd.play()

    // increase key count
    window.lightIMG++;
    item.disableBody(true, true);
    updateInventory.call(this)
}

function globalCollectLife(player, item) {
    // console.log("*** player overlap life");

    this.collectItemSnd = this.sound.add("collectAUD").setVolume(0.5);
    // play the sound
    this.collectItemSnd.play()

    // increase key count
    window.lifeIMG++;
    item.disableBody(true, true);
    updateInventory.call(this)
}

function globalCollectSpray(player, item) {
    // console.log("*** player overlap spray");

    this.collectItemSnd = this.sound.add("collectAUD").setVolume(0.5);
    // play the sound
    this.collectItemSnd.play()


    // increase key count
    window.sprayIMG++;
    item.disableBody(true, true);
    updateInventory.call(this)
}

function globalCollectWeapon(player, item) {
    // console.log("*** player overlap weapon");

    this.collectItemSnd = this.sound.add("collectAUD").setVolume(0.5);
    // play the sound
    this.collectItemSnd.play()

    // increase key count
    window.weaponIMG++;
    item.disableBody(true, true);
    updateInventory.call(this)
}



