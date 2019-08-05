class GameOverScene extends Phaser.Scene {
    constructor() {
        super({key: "GameOver"});
    }

    preload() {
        //this.load.image
    }

    create() {
        

    }

    update() {
        game.scene.start("Title");
    }
}
