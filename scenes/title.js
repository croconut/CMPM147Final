class TitleScene extends Phaser.Scene {
    constructor() {
        super({key: "Title"});
    }

    preload() {
        //this.load.image
    }

    create() {
        game.playerConfig = {
            text:"chars",frame:303,maxX:100,maxY:100,hp:20 };
    }

    update() {
        this.scene.start("Play");
    }
}
