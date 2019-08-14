class LevelUpScene extends Phaser.Scene {
    constructor() {
        super({key: "LevelUp"});
    }

    create() {
        this.levelup = this.sound.add("levelup");
        this.levelup.play();
        game.level++;
        this.killP = game.kills / game.enemySize;
        game.kills = 0;
        game.enemySize = 50 + game.level;
        game.npcBrains.resetSize(game.enemySize);
        game.playerConfig.maxX += (1/(this.killP + 1)) * 10 * (1 + game.level * 0.2); 
        game.playerConfig.maxY += (1/(this.killP + 1)) * 10 * (1 + game.level * 0.2);
        game.playerConfig.damage += this.killP * 1.3;
        game.statMax += this.killP * 5;
        //statmax increases allowed range for weapons
        //pierce is interesting and the only decent way to get strong in this game
        //but to kill over 75% of enemies you'll need to spend time, which is something
        //you don't have with an enemy that is constantly evolving
        //can pierce 
        if (this.killP > 0.75) {
            game.playerConfig.pierce += this.killP * (1 + game.level * 0.3);
        }
        this.ogroup = [];
        this.ogroup1 = this.add.group({runChildUpdate:true});

        for (let i = 0; i < game.projBrains.enemySize; i++) {
            let pos = {x:(i + 1)*game.width/(game.projBrains.enemySize + 1),y:game.height/2 };
            let option = new POptions(game, this, this.killP, game.statMax, game.playerConfig, pos);
            this.ogroup.push(option);
        }
        game.projBrains.assignBrains(this.ogroup);
        for (let i of this.ogroup) {
            i.init();
        }
        game.playerConfig.hpMax += game.level;
        game.playerConfig.hp = game.playerConfig.hpMax;
        game.playerConfig.manaMax += game.level;
        game.playerConfig.mana = game.playerConfig.manaMax;
        this.hasSelected = false;
        this.music = this.sound.add("titleLoop", {volume:1, loop: true});
        this.music.play();
    }

    update() {
        if (this.input.keyboard.addKey('SPACE').isDown && this.hasSelected) {
            game.projBrains.resetSize(game.projBrains.enemySize);
            this.music.stop();
            this.scene.start("Play");
        }
    }
}