let Play = function(game) {};
Play.prototype = {
    preload: function() {

    },
    create: function() {
        this.mapH = 100;
        this.mapW = 100;
        //this.load.image
        noise.seed(Math.random());
        this.greeting = this.add.text(200, 200, "Hello!");
        this.base =[];
        for (let i = 0; i < this.mapW; i++) {
            let col = [];
            for (let j = 0; j < this.mapH; j++) {
                
                let z = noise.simplex2(i / 100, j / 100);
                z = Math.floor(z * 28);
                
                col.push(z);
            }
            this.base.push(col);
        }
        // When loading from an array, make sure to specify the tileWidth and tileHeight
        this.map = this.make.tilemap({ data: this.base, tileWidth: 16, tileHeight: 16 });
        this.tiles = this.map.addTilesetImage("tilemap");
        this.baseLayer = this.map.createStaticLayer(0, this.tiles, 0, 0);
        //camera follows this.player
        //this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    },
    update: function() {

    }
}
