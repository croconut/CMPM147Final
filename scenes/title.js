class TitleScene extends Phaser.Scene {
    constructor() {
        super({key: "Title"});
    }

    preload() {
        //this.load.image
    }

    create() {

    }

    update() {
        this.scene.start("Play");
    }
}
