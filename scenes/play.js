let Play = function(game) {};
Play.prototype = {
    preload: function() {

    },
    create: function() {
        //NOTE: PLAYER NEEDS TO BE A GLOBAL VARIABLE AND ALL THE GARBAGE HES GONNA 
        //DRAG WITH HIM, like difficulty, weapons, the AIs
        this.mapH = 100;
        this.mapW = this.mapH;
        this.counter = 0;
        this.floorRange = [129, 130, 131, 162, 163, 161, 194, 193];
        //this.floorRange = [38];
        this.exit = [195];

        //this.load.image
        noise.seed(Math.random());
        this.greeting = this.add.text(200, 200, "Hello!");
        this.base = new Array(this.mapH);
        for (let i = 0; i < this.base.length; i++) {
            let row = new Array(this.mapW);
            for (let j = 0; j < row.length; j++) { 
                // let z = noise.simplex2(i / 100, j / 100);
                // z = Math.floor(z * 28);
                // let z = this.counter++;
                // idk why but simplex is constantly going negative... soooo yeah
                let z = this.floorRange[Math.floor(Math.random() * this.floorRange.length)];
                row[j] = z;
            }
            this.base[i] = row;
        }
        // When loading from an array, make sure to specify the tileWidth and tileHeight
        this.map = this.make.tilemap({ data: this.base, tileWidth: 16, tileHeight: 16 });
        this.tiles = this.map.addTilesetImage("tilemap");
        this.baseLayer = this.map.createStaticLayer(0, this.tiles, 0, 0);
        let player = this.physics.add.sprite(game.width, game.height/2, "chars", 50);
        this.pc = new PCController(game, this, player);
        console.log(this.pc);
        
    },
    update: function() {

    }
}

//IMPORTANT TILE MAP RANGES - 129 - 131 , 161 - 163, 193, 194
