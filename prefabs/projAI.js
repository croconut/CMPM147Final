let POptions = function(game, scene, killp, max, config, pos) {
    this.killp = killp;
    this.max = max;
    this.pos = pos;
    if (game.shots == 0) {
        this.hitp = 0;
    }
    else {
        this.hitp = game.hits / game.shots;
    }
    this.init = function() {
        let inputs = [this.killp, this.hitp];
        let output = this.brain.activate(inputs);
        this.coords = output.slice(0, 10);
        for (let i of this.coords) {
            i *= 16;
        }
        this.range = (1 - output[10]) * (game.statMax * 10);
        this.projspeed = output[10] * (game.statMax * 25);
        this.damage = ( 1 - output[11]) * (game.statMax * 0.15);
        this.atkspeed = (1 - output[11]) * (game.statMax * 2);
        this.pierce =  (1 - output[12]) * (game.statMax * 1);
        this.size = output[12] * (game.statMax * 0.1);
        //speeds up character
        this.speedboost =  (1 - output[13]) * (game.statMax * 10);
        this.manacost = output[13] * (game.statMax * 0.25);
        this.color = output[14] * 0xFFFFFF;
        this.opt = scene.add.polygon(this.pos.x, this.pos.y, this.coords, this.color);
        this.opt.setScale(4,4);
        this.opt.setInteractive();
        this.opt.on("pointerdown", function() {
            this.selected();
            scene.hasSelected = true;
        });
    }
    this.selected = function() {

    }
}