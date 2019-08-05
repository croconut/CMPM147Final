class PlayScene extends Phaser.Scene {
    constructor() {
        super({key: "Play"});
    }

    preload() {
        //this.load.image
        
    }

    create() {
        this.greeting = this.add.text(200, 200, "Hello!");
    }

    update() {

    }
}
