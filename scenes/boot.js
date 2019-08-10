class BootScene extends Phaser.Scene {
    constructor() {
        super({key: "Boot"});
    }

    preload() {
        //this.load.image
        this.load.image("tilemap", "assets/tileset2.png");
        this.load.spritesheet("chars", "assets/tileset2.png", {frameWidth: 16, frameHeight: 16});
    }

    create() {
        this.scene.start("Title");

    }

    update() {

    }
}
