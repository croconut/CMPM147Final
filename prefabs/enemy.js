let EnemyController = function(game, scene, config) {
    this._npc = scene.physics.add.sprite(config.posx, config.posy, config.text, config.frame);
    this._npc.body.setMaxVelocity(config.maxX, config.maxY);
    this._npc.frameC = 0;
    this._npc.update = function() {
        
        if (this.frameC == 0) {
            this.setVelocityX(Phaser.Math.RND.between(-this.body.maxVelocity.x,this.body.maxVelocity.x));
            this.setVelocityY(Phaser.Math.RND.between(-this.body.maxVelocity.y,this.body.maxVelocity.y));
        }
        this.frameC=(this.frameC+1)%1000;
        
    }
    
    
    // group.add(this._npc);
    //for this gonna wanna init an AI from the next AI to init from the 
    //scenes AI group, then gonna use that AI's output to determine its 
    // stats and movements
    //the group in the scene has to have s
};