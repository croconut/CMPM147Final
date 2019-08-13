let EnemyController = function(game, scene, config) {
    this._npc = scene.physics.add.sprite(config.posx, config.posy, config.text, config.frame);
    this._npc.body.setMaxVelocity(config.maxX, config.maxY);
    this._npc.maxX = config.maxX;
    this._npc.maxY = config.maxY;
    this._npc.aTimer = 0;
    this._npc.aSpeed = 60; // attacks every 60 frames 
    this._npc.aRange = config.aRange;
    this._npc.playerRef = config.playerRef;
    this._npc.sceneRef = config.sceneRef;
    this._npc.resistances = config.resistances;
    this._npc.hp = config.hp;
    this._npc.setSize(8, 16);
    this._npc.score = function(dist) {
        //offset so we can't div by zero
        return 1 / (dist + 0.0001);
    };
    this._npc.update = function() {
        let dist = Phaser.Math.Distance.Between(this.x, this.y, this.playerRef.x, this.playerRef.y);
        if (dist < 1600) {
            //the angle is 1/2 of the correct angle
            //brain'll figure it out anyways
            let angle = Phaser.Math.Angle.Between(this.x, this.y, this.playerRef.x, this.playerRef.y)/ (4 * Math.PI);
            let input = [this.x / 1600, this.y / 1600, this.playerRef.x / 1600, this.playerRef.y / 1600, 
                angle, dist / 1600];
            // AHHHHHHHHHH inputs HAVE to be between 0 and 1
            let output = this.brain.activate(input);
            //radian conversion
            output = output[0] * 2 * Math.PI;
            //face direction of movement
            this.rotation = output + (Math.PI / 2);
            //get outputs and move the npc
            let x = Math.cos(output) *this.maxX;
            let y = Math.sin(output) *this.maxX;
            this.setVelocityX(x);
            this.setVelocityY(y); 
            //reexamine the distance for the score
            dist = Phaser.Math.Distance.Between(this.x, this.y, this.playerRef.x, this.playerRef.y);
            //score should check distance to attack range and check how long was able to stay alive
            //score should increase for every second brain was able to stay alive and in attack range


            this.brain.score += this.score(dist);
        }
        else {
            this.setVelocityX(0);
            this.setVelocityY(0);
        }
        // if (dist < this.aRange) {
        //     if (!(this.aTimer % this.aSpeed)) {
        //         //spawn the attack sprite
        //         //also need to set the overlap logic from player - should just be a call to a 
        //         //new collision with player

        //         this.aTimer = 0;
        //     }
        //     this.aTimer++;
            
        // }
        
    };
    this.onWallCollision = function(npc, wall) {
        // npc.setVelocityX(-npc.body.velocity.x);
        // npc.setVelocityY(-npc.body.velocity.y);
        // if (npc.frameC > 15) {
        //     npc.frameC = 0;
        // }
    }
    this.ouch = function(npc, proj) {
        npc.hp -= proj.damage;
        this.pgroup.remove(proj, true, true);
        console.log(npc.hp);
        if (npc.hp <= 0) {
            this.egroup.remove(npc, true, true);
            game.enemySize--;
            game.npcBrains.evo(this.egroup.children.entries);
        }
    }
    for (let layer of config.collLayers) {
        scene.physics.add.collider(this._npc, layer, this.onWallCollision, null, scene);
    }
    for (let proj of config.pGroup ) {
        scene.physics.add.overlap(this._npc, proj, this.ouch, null, scene);
    }
    // group.add(this._npc);
    //for this gonna wanna init an AI from the next AI to init from the 
    //scenes AI group, then gonna use that AI's output to determine its 
    // stats and movements
    //the group in the scene has to have s
};