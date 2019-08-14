let POptions = function(game, scene, killp, max, pos) {
    this.killp = killp;
    this.max = max;
    this.pos = pos;
    this.scene = scene;
    this.game = game;
    if (game.shots == 0) {
        this.hitp = 0;
    }
    else {
        this.hitp = game.hits / game.shots;
    }
    this.init = function() {
        let inputs = [this.killp, this.hitp];
        let output = this.brain.activate(inputs);
        this.coords = [];
        for (let i = 0; i < 10; i++) {
            this.coords.push(Phaser.Math.RND.between(0, 16));
        }
        this.range = (1 - output[0]) * (game.statMax * 20);
        this.projspeed = output[0] * (game.statMax * 18);
        this.damage = (1 - output[1]) * (game.statMax * 0.35) + (1 + game.level * 0.2);
        this.atkspeed = (1 - output[1]) * (game.statMax * 2);
        this.pierce =  (1 - output[2]) * (game.statMax * 0.2);
        //speeds up character
        this.speedboost =  (1 - output[3]) * (game.statMax * 0.3);
        this.manacost = output[3] * (game.statMax * 0.25);
        this.color = Phaser.Math.RND.frac() * 0xFFFFFF;
        let c = {
            range:this.range,pspeed:this.projspeed,damage:this.damage,aspeed:this.aspeed,
            pierce:this.pierce,size:this.size,speedboost:this.speedboost,mpcost:this.manacost,
            color:this.color, coords:this.coords
        };
        this.opt = scene.add.polygon(this.pos.x, this.pos.y, this.coords, this.color);
        let font = { fontFamily: '"Courier New", Verdana, Tahoma'};
        this.text1 = scene.add.text(this.pos.x, this.pos.y + 100, "Dmg :" + this.damage.toFixed(2) + "\nASpd:" + 
            this.atkspeed.toFixed(2) + "\nPSpd:" + this.atkspeed.toFixed(2) + "\nPrc :" + this.pierce.toFixed(2) + "\nMSpd:" + this.speedboost.toFixed(2) + 
            "\nRng :" + this.range.toFixed(2), font);
        this.text1.setFontSize(12);
        this.text1.setOrigin(0.5);
        this.opt.scale = 5;
        this.opt.config = c;
        this.opt.brain = this.brain;
        this.opt.selected = function() {
            this.brain.score += 1000 - (this.scene.hasSelected * 100);
            if (!this.scene.hasSelected) {
                game.playerConfig.damage = this.config.damage;
                game.playerConfig.aSpeed = this.config.pspeed;
                game.playerConfig.pierce = this.config.pierce;
                game.playerConfig.aRate = this.config.aspeed;
                game.playerConfig.aRange = this.config.range;
                game.playerConfig.coords = this.config.coords;
                game.playerConfig.color = this.config.color;
                game.playerConfig.maxX += this.config.speedboost;
                game.playerConfig.maxY += this.config.speedboost;
                game.playerConfig.pScale = 1;
            }
            
            // game.playerConfig = {
            //     text:"chars",frame:303,maxX:100,maxY:100,hp:10,hpMax:10,mana:50, manaMax:50, aSpeed: 300,
            //     aRange: 200, damage:1, aRate:20, pScale:0.5, pierce:0};
        }
        this.opt.scene = this.scene;
        this.opt.setInteractive();
        this.opt.on("pointerdown", function() {
            this.selected();
            this.scene.hasSelected++;
        });
    }
    
}