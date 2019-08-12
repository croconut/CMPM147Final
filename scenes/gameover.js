class GameOverScene extends Phaser.Scene {
    constructor() {
        super({key: "GameOver"});
    }

    preload() {
        //this.load.image
    }

    create() {
        let font = { fontFamily: '"Courier New", Verdana, Tahoma'};
        this.lostText = this.add.text(game.width/2, game.height/2, "Game Over!", font);
        this.lostText2 = this.add.text(game.width/2, game.height/1.8, "You got to level " + game.level, font);
        this.restartText = this.add.text(game.width/2, 4*game.height/5, "Press <SPACE> to restart!", font);
        this.lostText.setOrigin(0.5);
        this.lostText2.setOrigin(0.5);
        this.restartText.setOrigin(0.5);
        //stuff that needs to be reset goes here
        game.level = 0;
        game.score = 0;
        game.enemySize = 50;
        game.npcBrains = new NEATPopulation(6, 1, null, game.enemySize);
        game.playerConfig = {
            text:"chars",frame:303,maxX:100,maxY:100,hp:10 };
    }

    update() {
        if (this.input.keyboard.addKey('SPACE').isDown) {
            this.scene.start("Play");
        }
    }
}
