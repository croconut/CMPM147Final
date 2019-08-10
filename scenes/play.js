let Play = function(game) {};
Play.prototype = {
    preload: function() {

    },
    create: function() {
        //NOTE: PLAYER NEEDS TO BE A GLOBAL VARIABLE AND ALL THE GARBAGE HES GONNA 
        //DRAG WITH HIM, like difficulty, weapons, the AIs
        this.mapH = 100;
        this.mapW = this.mapH;
        this.absLimitX = this.mapH * 16;
        this.absLimitY = this.absLimitX;
        this.egroupSize = 15;
        this.counter = 0;
        this.floorRange = [129, 130, 131, 162, 163, 194, 193];
        //removed 161 cuz i don't like that tile
        this.exit = [195];
        this.wall = [33, 1];
        // for (let i = 260; i < 800; i+=2) {
        //     this.wall.push(i);
        // }

        console.log(this.wall);
        // noise.seed(Math.random());
        
        this.greeting = this.add.text(200, 200, "Hello!");
        this.base = this.makeBase(function(arr, base, row, i, j) {
            return arr[Phaser.Math.RND.integerInRange(0, arr.length - 1)];
        }, this.floorRange);
        this.layer1 = this.makeStaticLayer(this.base);
        // this.layer2 = this.makeStaticLayer(this.base2);
        this.egroup = this.add.group({runChildUpdate: true});
        this.allE = [];
        for (let i = 0; i < this.egroupSize; i++) {
            let x = Phaser.Math.RND.integerInRange(0, this.absLimitX);
            let y = Phaser.Math.RND.integerInRange(0, this.absLimitY);
            let c = {posx:x, posy:y, maxX:20, maxY:20, frame:50, text:"chars"};
            let n = new EnemyController(game, this, c);
            // this.allE.push(n);
            this.egroup.add(n._npc);
        }

        this.pc = new PCController(game, this, "chars", 303, {maxX:100, maxY:100, hp:20, egroup:[this.egroup]});
    },
    update: function() {

    },
    makeStaticLayer: function(base) {
        let map = this.make.tilemap({ data: base, tileWidth: 16, tileHeight: 16 });
        let tiles = map.addTilesetImage("tilemap");
        return map.createStaticLayer(0, tiles, 0, 0);
    },
    //has 2 args, the function that tells each tile what it is and the array of possible
    //tiles that this layer draws from
    makeBase: function(constructionFn, arr) {
        let base = new Array(this.mapH);
        for (let i = 0; i < base.length; i++) {
            let row = new Array(this.mapW);
            for (let j = 0; j < row.length; j++) { 
                let z = constructionFn(arr, base, row, i, j);
                row[j] = z;
            }
            base[i] = row;
        }
        return base;
    }
}

//IMPORTANT TILE MAP RANGES - 129 - 131 , 161 - 163, 193, 194
