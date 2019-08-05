class BootScene extends Phaser.Scene {
    constructor() {
        super({key: "Boot"});
    }

    preload() {
        //this.load.image
    }

    create() {
        game.scene.start("Title");

    }

    update() {

    }
}
