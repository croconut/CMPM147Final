class TitleScene extends Phaser.Scene {
    constructor() {
        super({key: "Title"});
    }

    preload() {
        //this.load.image
    }

    create() {
        game.level = 0;
        game.score = 0;
        game.enemySize = 50;
        game.npcBrains = new NEATPopulation(6, 1, null, game.enemySize);
        game.playerConfig = {
            text:"chars",frame:303,maxX:100,maxY:100,hp:10 };

        let font = { fontFamily: '"Courier New", Verdana, Tahoma'};

        this.lostText = this.add.text(game.width/2, game.height/4, "STABBED TO DEATH", font);
        this.lostText.setFontSize(48);
        this.lostText2 = this.add.text(game.width/2, game.height/1.7, "CONTROLS: WASD to move\n\n          Left-Click to attack\n\n          Right-Click to teleport", font);
        this.restartText = this.add.text(game.width/2, 4*game.height/5, "Press <SPACE> to play!", font);
        this.otherText = this.add.text(game.width/2, game.height/2.5, "Get to the next level by finding the ladder. Good Luck...", font);
        this.otherText.setOrigin(0.5);
        this.otherText.setFontSize(22);
        this.lostText2.setFontSize(22);
        this.restartText.setFontSize(30);
        this.lostText.setOrigin(0.5);
        this.lostText2.setOrigin(0.5);
        this.restartText.setOrigin(0.5);
        //stuff that needs to be reset goes here
        game.level = 0;
        game.score = 0;
        game.enemySize = 50;
        game.npcBrains = new NEATPopulation(6, 1, null, game.enemySize);
        game.playerConfig = {
            text:"chars",frame:303,maxX:100,maxY:100,hp:10, mana:50, manaMax:50, aSpeed: 300,
            aRange: 200, damage:1, aRate:20, pScale:0.5};
        this.music = this.sound.add("titleLoop", {volume:1, loop: true});
        this.music.play();

    }

    update() {
        if (this.input.keyboard.addKey('SPACE').isDown) {
            this.music.stop();
            this.scene.start("Play");
        }
    }
}
