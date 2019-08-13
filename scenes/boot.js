class BootScene extends Phaser.Scene {
    constructor() {
        super({key: "Boot"});
    }

    preload() {
        //this.load.image
        this.load.image("tilemap", "assets/tileset2.png");
        this.load.spritesheet("chars", "assets/tileset2.png", {frameWidth: 16, frameHeight: 16});
        //source  : copyc4t - https://freesound.org/people/copyc4t/sounds/141695/
        this.load.audio("levelup", "assets/levelup.wav");
        this.load.audio("slash", "assets/slash.wav");
        this.load.audio("electricity", "assets/electricity.wav");
        //source  : zagi2 - https://freesound.org/people/zagi2/sounds/234781/
        this.load.audio("titleLoop", "assets/titleLoop.wav");
        //source  : zagi2 - https://freesound.org/people/zagi2/sounds/460212/
        this.load.audio("gameLoop", "assets/gameLoop.wav");
        
    }

    create() {
        this.scene.start("Title");
    }
}
