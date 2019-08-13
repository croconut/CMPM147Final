class LevelUpScene extends Phaser.Scene {
    constructor() {
        super({key: "LevelUp"});
    }

    create() {
        this.levelup = this.sound.add("levelup");
        this.levelup.play();
        game.level++;
        this.kills = game.kills;
        game.kills = 0;
        game.enemySize = 50 + game.level;
        game.npcBrains = new NEATPopulation(6, 1, null, game.enemySize);
        this.scene.start("Play");
    }
}