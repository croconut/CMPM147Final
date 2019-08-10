var Neat = neataptic.Neat;
var Methods = neataptic.Methods;
var Config  = neataptic.Config;
var Architect = neataptic.Architect;

class NEATPopulation {
    constructor(player, mouse, sprites) {
        //need to pass the sprite itself to the class so it can get a reference and make
        //changes as it sees fit
        this.mouse = mouse;
        this.player = player;
        this.sprites = sprites;
    }
    init() {
        //inputs are npc pos x/y vel x/y, pc pos x/y vel x/y, mouse pos x/y (10 total)
        //outputs are acceleration (0 - 1) and angle (0 - 360) (2 total)
        let options = {
            popsize: this.sprites.length,
            mutation: [
                Methods.Mutation.ADD_NODE,
                Methods.Mutation.SUB_NODE,
                Methods.Mutation.ADD_CONN,
                Methods.Mutation.SUB_CONN,
                Methods.Mutation.MOD_WEIGHT,
                Methods.Mutation.MOD_BIAS,
                Methods.Mutation.MOD_ACTIVATION,
                Methods.Mutation.ADD_GATE,
                Methods.Mutation.SUB_GATE,
                Methods.Mutation.ADD_SELF_CONN,
                Methods.Mutation.SUB_SELF_CONN,
                Methods.Mutation.ADD_BACK_CONN,
                Methods.Mutation.SUB_BACK_CONN
              ],
            elitism: Math.round(this.sprites.length * 0.1)
        };
        //if setting fitnessFunction to null instead need to manually update score
        //when performing fitness checks to evolve
        this.ai = new Neat(10, 2, null, options);
        for (let i in this.sprites) {
            this.sprites[i].brain = this.ai.population[i];
        }
    }

    run(npc) {
        if (Phaser.Math.Distance.between(npc.x, npc.y, this.player.x, this.player.y) < 250) {
            //can run the brain, else do nothing
        } 
    }

}