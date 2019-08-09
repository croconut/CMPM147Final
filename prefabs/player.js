let PCController = function(game, scene, config) {
        //_pc is the sprite for PCController to control 
        this._pc = scene.physics.add.sprite(config.posx, config.posy, config.text, config.frame);
        this._pc.maxX = config.maxX;
        this._pc.maxY = config.maxY;
        this._pc.hp = config.hp;
        //const
        this._pc.both = 0.71;
        //scene.cameras.main.setSize(game.width, game.height);
        scene.cameras.main.startFollow(this._pc);
        scene.cameras.main.zoom = 2;
        this._pc.update = function() {

            //WASD MOVEMENT BEGIN
            if (scene.input.keyboard.addKey('W').isDown) {
                if (scene.input.keyboard.addKey('A').isDown) {
                    this.setVelocityX(-this.maxX * this.both);
                    this.setVelocityY(-this.maxY * this.both);

                }
                else if (scene.input.keyboard.addKey('D').isDown) {
                    this.setVelocityX(this.maxX * this.both);
                    this.setVelocityY(-this.maxY * this.both);
                }
                else {
                    this.setVelocityX(0);
                    this.setVelocityY(-this.maxY);
                }
            } 
            else if (scene.input.keyboard.addKey('S').isDown) {
                if (scene.input.keyboard.addKey('A').isDown) {
                    this.setVelocityX(-this.maxX * this.both);
                    this.setVelocityY(this.maxY * this.both);

                }
                else if (scene.input.keyboard.addKey('D').isDown) {
                    this.setVelocityX(this.maxX * this.both);
                    this.setVelocityY(this.maxY * this.both);
                }
                else {
                    this.setVelocityX(0);
                    this.setVelocityY(this.maxY);
                }
            }
            else {
                if (scene.input.keyboard.addKey('A').isDown) {
                    this.setVelocityX(-this.maxX);
                }
                else if (scene.input.keyboard.addKey('D').isDown) {
                    this.setVelocityX(this.maxX);
                }
                else {
                    this.setVelocityX(0);
                }
                this.setVelocityY(0);
            }
            // WASD MOVEMENT END
            
        } 
        // this._pc.setCollideWorldBounds(true);
        scene.pcGroup = scene.add.group({runChildUpdate: true});
        scene.pcGroup.add(this._pc);
        this.getPlayer = function() {
            return this._pc;
        };
        this.onEnemyCollision = function(pc, baddie) {
            pc.hp -= baddie.damage | 1;
            baddie.destroy();
            console.log(pc.hp);
            if (!(pc.hp > 0)) {
                this.scene.start("GameOver");
            }
        };
        this.leaveLevel = function(pc, exit) {
            this.scene.start("Play");
        }
        for (let i = 0; i < config.egroup.length; i++) {
            scene.physics.add.collider(this._pc, config.egroup[i], this.onEnemyCollision, null, scene);
        }
        for (let i = 0; i < config.collLayers.length; i++) {
            scene.physics.add.collider(this._pc, config.collLayers[i]);
        }
        scene.physics.add.overlap(this._pc, scene.exit, this.leaveLevel, null, scene);

};

