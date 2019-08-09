let Play = function(game) {};
Play.prototype = {
    //should do some stuff in case its the 2nd+ level
    init: function() {

    },
    create: function() {
        //NOTE: PLAYER NEEDS TO BE A GLOBAL VARIABLE AND ALL THE GARBAGE HES GONNA 
        //DRAG WITH HIM, like difficulty, weapons, the AIs
        this.mapH = 100;
        this.mapW = this.mapH;
        this.tileSize = 16;
        this.absLimitX = this.mapH * 16;
        this.absLimitY = this.absLimitX;
        this.egroupSize = 15;
        this.counter = 0;
        this.floorRange = [129, 130, 131, 162, 163, 193, 194];
        this.floorHoles = [259];
        //removed 161 cuz i don't like that tile
        this.exitTile = [195];
        this.wall = [33, 256, 257, 288, 289];
        this.ladder = [39, 71];
        // noise.seed(Math.random());
        let cavegen = new CaveDataGenerator(this.mapH, this.mapW);
        cavegen.generate(6, this.floorHoles, this.floorRange);
        this.cave = cavegen.cells;
        console.log(this.cave);
        this.validSpots = this.createValidVectors(this.cave);
        console.log(this.validSpots);
        this.layer3 = this.makeStaticLayer(this.cave);
        this.layer3.setCollisionBetween(258, 260);
        this.base = this.makeBase(function(scene, base, row, i, j) {
            if ((i == 0 || i == scene.mapH - 1) && (j != 0 && j != scene.mapH - 1) )
                return scene.wall[0];
            else if (j == 0 && i != scene.mapH - 1) {
                return scene.wall[1];
            }
            else if (j == 0 && i == scene.mapH - 1) {
                return scene.wall[3];
            }
            else if (j == scene.mapH - 1 && i != scene.mapH - 1) {
                return scene.wall[2];
            }
            else if (j == scene.mapH - 1 && i == scene.mapH - 1) {
                return scene.wall[4];
            }
            return -1;
        }, this);
        this.layer2 = this.makeStaticLayer(this.base);
        this.layer2.setCollisionBetween(0, 512);
        this.layer2.setOrigin(0.5);
        this.layer3.setOrigin(0.5);
        let z = Phaser.Math.RND.integerInRange(Math.floor(this.validSpots.length/4), this.validSpots.length);
        this.exitPos = this.validSpots.splice(z)[0];
        z = Phaser.Math.RND.integerInRange(0, Math.floor(this.validSpots.length/4));
        this.entrancePos = this.validSpots.splice(z)[0];
        // pass the pccontroller a game reference, a scene reference and texture/frame
        //if no frame number pass null
        this.egroup = this.add.group({runChildUpdate: true});
        for (let i = 0; i < this.egroupSize; i++) {
            let x = Phaser.Math.RND.integerInRange(0, this.absLimitX);
            let y = Phaser.Math.RND.integerInRange(0, this.absLimitY);
            let c = {posx:x, posy:y, maxX:20, maxY:20, frame:50, text:"chars",  collLayers:[this.layer2]};
            let n = new EnemyController(game, this, c);
            this.egroup.add(n._npc);
        }
        //8 offset so its centered and no player adj needed
        //8 is 
        this.entrance = this.add.sprite(this.entrancePos.x-(this.tileSize/2), this.entrancePos.y-this.tileSize, "chars", this.ladder[0]);
        this.entrance1 = this.add.sprite(this.entrancePos.x-(this.tileSize/2), this.entrancePos.y, "chars", this.ladder[1]);
        
        this.exit = this.physics.add.sprite(this.exitPos.x, this.exitPos.y, "chars", this.exitTile[0]);
        game.playerConfig.egroup = [this.egroup];
        game.playerConfig.collLayers = [this.layer2, this.layer3];
        game.playerConfig.posx = this.entrance1.x;
        game.playerConfig.posy = this.entrance1.y;
        this.pc = new PCController(game, this, game.playerConfig);
    },
    update: function() {

    },
    makeStaticLayer: function(base) {
        let map = this.make.tilemap({ data: base, tileWidth: this.tileSize, tileHeight: this.tileSize });
        let tiles = map.addTilesetImage("tilemap");
        return map.createStaticLayer(0, tiles, 0, 0);
    },
    //has 2 args, the function that tells each tile what it is and the array of possible
    //tiles that this layer draws from
    makeBase: function(constructionFn, scene) {
        let base = new Array(this.mapH);
        for (let i = 0; i < base.length; i++) {
            let row = new Array(this.mapW);
            for (let j = 0; j < row.length; j++) { 
                let z = constructionFn(scene, base, row, i, j);
                row[j] = z;
            }
            base[i] = row;
        }
        return base;
    },
    createValidVectors: function(cave) {
        let toReturn = [];
        for (let y = 2; y < cave.length - 3; y++) {
            for (let x = 2; x < cave.length - 3; x++) {
                if (cave[y][x] != this.floorHoles[0]) {
                    let v = new Phaser.Math.Vector2((x+1)*this.tileSize, y*this.tileSize);
                    toReturn.push(v);
                }
            }
        }
        return toReturn;
    }
}

//IMPORTANT TILE MAP RANGES - 129 - 131 , 161 - 163, 193, 194