var Neat = neataptic.Neat;
var Methods = neataptic.methods;
var Config  = neataptic.config;
var Architect = neataptic.architect;

class NEATPopulation {
    constructor(inp, outp, fitnessFn, enemySize) {
        //need to pass the sprite itself to the class so it can get a reference and make
        //changes as it sees fit
        this.in = inp;
        this.out = outp;
        this.fitnessFn = fitnessFn;
        this.enemySize = enemySize;
        //inputs are npc pos x/y vel x/y, pc pos x/y vel x/y, mouse pos x/y (10 total)
        //outputs are acceleration (0 - 1) and angle (0 - 360) (2 total)
        let options = {
            popsize: this.enemySize,
            mutation: [
                Methods.mutation.ADD_NODE,
                Methods.mutation.SUB_NODE,
                Methods.mutation.ADD_CONN,
                Methods.mutation.SUB_CONN,
                Methods.mutation.MOD_WEIGHT,
                Methods.mutation.MOD_BIAS,
                Methods.mutation.MOD_ACTIVATION,
                Methods.mutation.ADD_GATE,
                Methods.mutation.SUB_GATE,
                Methods.mutation.ADD_SELF_CONN,
                Methods.mutation.SUB_SELF_CONN,
                Methods.mutation.ADD_BACK_CONN,
                Methods.mutation.SUB_BACK_CONN
              ],
            elitism: Math.round(this.enemySize * 0.1),
            network: new Architect.Random(
                this.in,
                1,
                this.out
              )
        };
        //if setting fitnessFunction to null instead need to manually update score
        //when performing fitness checks to evolve
        this.ai = new Neat(this.in, this.out, this.fitnessFn, options);
        this.ai.mutate();

    }

    assignBrains(sprites) {
        for (let i in sprites) {
            let sprite = sprites[i];
            sprite.brain = this.ai.population[i];
            sprite.brain.score = 0;
        }
    }
    
    evo(sprites) {
        //this is pretty similar to the target-seeking example for neataptic
        this.ai.sort();
        var newPop = [];
        //no elitism for now
        for(let i = 0; i < this.ai.elitism; i++) {
            newPop.push(this.ai.population[i]);
        }
        
        for(let i = this.ai.elitism; i < this.ai.population.length; i++) {
            newPop.push(this.ai.getOffspring());
        }
        this.ai.population = newPop;
        this.ai.mutate();
        this.ai.generation++;
        game.npcBrains.assignBrains(sprites);
    }
}