class BootScene extends Phaser.Scene {
    constructor() {
        super({key: "Boot"});
    }

    preload() {
        //this.load.image
        this.load.image("tilemap", "assets/tileset.png");
        this.load.spritesheet("chars", "assets/tileset.png", {frameWidth: 16, frameHeight: 16});
    }

    create() {
        this.scene.start("Title");

    }

    update() {

    }
}
