let Play = function(game) {};
Play.prototype = {
    //should do some stuff in case its the 2nd+ level
    init: function() {

    },
    create: function() {
        //NOTE: PLAYER NEEDS TO BE A GLOBAL VARIABLE AND ALL THE GARBAGE HES GONNA 
        //DRAG WITH HIM, like difficulty, weapons, the AIs
        // game.enemySize = 50;
        this.music = this.sound.add("gameLoop", {volume:0.7, loop:true});
        this.slash = this.sound.add('slash');
        this.shock = this.sound.add('electricity');
        this.music.play();
        this.mapH = 100;
        this.mapW = this.mapH;
        this.tileSize = 16;
        this.absLimitX = this.mapH * 16;
        this.absLimitY = this.absLimitX;
        this.counter = 0;
        this.timerC = 0;
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
        this.layer3 = this.makeStaticLayer(this.cave);
        this.layer3.setCollisionBetween(258, 260);
        this.createValidVectors(this.layer3);
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
        let z = Phaser.Math.RND.integerInRange(Math.floor(this.validSpots.length/4), this.validSpots.length - 1);
        this.exitPos = this.validSpots[z];
        z = Phaser.Math.RND.integerInRange(0, Math.floor(this.validSpots.length/5));
        this.entrancePos = this.validSpots[z];
        // pass the pccontroller a game reference, a scene reference and texture/frame
        //if no frame number pass null
        
        //8 offset so its centered and no player adj needed
        //8 is 
        this.entrance = this.add.sprite(this.entrancePos.x, this.entrancePos.y-this.tileSize, "chars", this.ladder[0]);
        this.entrance1 = this.add.sprite(this.entrancePos.x, this.entrancePos.y, "chars", this.ladder[1]);
        this.exit = this.physics.add.sprite(this.exitPos.x, this.exitPos.y, "chars", this.exitTile[0]);
        game.playerConfig.collLayers = [this.layer2, this.layer3];
        game.playerConfig.posx = this.entrancePos.x;
        game.playerConfig.posy = this.entrancePos.y;
        game.playerConfig.exitP = {x:this.exitPos.x, y:this.exitPos.y};
        this.pc = new PCController(game, this, game.playerConfig);
        this.egroup = this.add.group({runChildUpdate: true});
        this.pgroup = this.add.group({runChildUpdate: true});
        game.playerConfig.pGroup = this.pgroup;
        for (let i = 0; i < game.enemySize; i++) {
            let xy = Phaser.Math.RND.integerInRange(0, this.validSpots.length - 1);
            let pos = this.validSpots[xy];
            let c = {posx:pos.x, posy:pos.y, maxX:100 + game.level * 2, maxY:100 + game.level * 2, resistances: [20, 15, 0], 
                frame:50, sceneRef: this, text:"chars", playerRef:this.pc._pc, pGroup:[this.pgroup],
                collLayers:[this.layer2], aRange:100, hp:2 * game.level * 0.5};
            let n = new EnemyController(game, this, c);
            this.egroup.add(n._npc);
        }
        
        this.pc.addEnemies([this.egroup]);
        game.npcBrains.assignBrains(this.egroup.children.entries);
        this.input.mouse.disableContextMenu();
        this.mouseEvent = this.input.on('pointerdown', function (pointer) {
            if (pointer.rightButtonDown()) {
                this.pc.blink(pointer.x, pointer.y);
            }
            else {
                this.pc.attack(pointer.x, pointer.y);
            }
        }, this);
        this.uigroup = this.add.group({runChildUpdate:true});
        let hpBar = this.UIbar("chars", 44, 25,0, this.pc._pc.hp, this);
        console.log(hpBar);
        let mpBar = this.UIbar("chars", 42, 40,0, this.pc._pc.mp, this);
        this.uigroup.add(hpBar);
        this.uigroup.add(mpBar);
    },
    update: function() {
        //every 3 seconds wanna evaluate
        this.timerC++;
        if (!(this.timerC % 180)) {
            game.npcBrains.evo(this.egroup.children.entries);   
            //need to run evaluate for each 
            this.timerC = 0;
            if (this.pc._pc.hp.cur < this.pc._pc.hp.max) {
                this.pc._pc.hp.cur+= 0.2;
            }
            else {
                this.pc._pc.hp.cur = this.pc._pc.hp.max;
            }
        }
        //this should probably be done outside the player loop
        if (!(this.timerC % 60) && this.pc._pc.mp.cur < this.pc._pc.mp.max) {
            this.pc._pc.mp.cur++;
        }
         

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
    createValidVectors: function(layer) {
        this.validSpots = [];
        layer.forEachTile(function(tile) { 
            if (tile.index < 200 && tile.index != -1)
                this.validSpots.push({x:tile.pixelX + 8, y:tile.pixelY + 8});
        }, this);
    },
    UIbar: function(text, frame, w, h, cur, scene) {
        let spr = scene.add.sprite(w, h, text, frame);
        spr.bar = cur;
        spr.w = w;
        spr.h = h;
        spr.scene = scene;
        spr.displayHeight = 15;
        spr.update = function() {
            this.x = this.scene.cameras.main.scrollX + this.scene.cameras.main.width / 2;
            this.y = this.scene.cameras.main.scrollY + this.w + this.scene.cameras.main.height / 1.5;
            this.displayWidth = 200 * (this.bar.cur / this.bar.max);
        }
        return spr;
    }
}

//IMPORTANT TILE MAP RANGES - 129 - 131 , 161 - 163, 193, 194