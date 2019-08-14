let PCController = function(game, scene, config) {
        //_pc is the sprite for PCController to control 
        this._pc = scene.physics.add.sprite(config.posx, config.posy, config.text, config.frame);
        this._pc.maxX = config.maxX;
        this._pc.maxY = config.maxY;
        this._pc.hp = {cur:config.hp, max:config.hpMax};
        this._pc.mp = {cur:config.mana, max:config.manaMax};
        this._pc.aRate = config.aRate;
        this._pc.aRange = config.aRange;
        this._pc.speed = config.aSpeed;
        this._pc.damage = config.damage;
        this._pc.pGroup = config.pGroup;
        this._pc.pScale = config.pScale;
        this._pc.exitP = config.exitP;
        this._pc.pierce = config.pierce;
        this._pc.color = config.color;
        this._pc.coords = config.coords;
        this._pc.immunityTimer = 0;
        this._pc.atkTimer = 0;
        //this should be treated as a constant :p
        this._pc.both = 0.71;
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
            if (this.immunityTimer) {
                this.immunityTimer--;
            }
            if (this.atkTimer) {
                this.atkTimer--;
            }
        } 
        scene.pcGroup = scene.add.group({runChildUpdate: true});
        scene.pcGroup.add(this._pc);
        this.getPlayer = function() {
            return this._pc;
        };
        this.onEnemyCollision = function(pc, baddie) {
            if (pc.immunityTimer) {
                return;
            }
            this.slash.play();
            pc.immunityTimer = 30;
            pc.hp.cur -= baddie.damage | 1;
            //baddie.destroy();
            console.log(pc.hp);
            if (!(pc.hp.cur > 0)) {
                this.music.stop();
                this.scene.start("GameOver");
            }
        };
        this.leaveLevel = function(pc, exit) {
            this.music.stop();
            this.scene.start("LevelUp");
        }
        this.blink = function(x, y) {
            if (this._pc.mp.cur < 25) {
                return;
            }
            let x0 = x - 400;
            let y0 = y - 300;
            if (x0 != 0) {
                x0 /= 2;
            }
            if (y0 != 0) {
                y0 /= 2;
            }
            // console.log(this._pc.body.x, this._pc.body.y);
            x0 += this._pc.body.x;
            y0 += this._pc.body.y;
            let dist = Phaser.Math.Distance.Between(x0, y0, this._pc.exitP.x, this._pc.exitP.y);
            console.log(x0, y0, dist);
            if (dist < 60) {
                scene.scene.start("LevelUp");
                // this._pc.setPosition(x0, y0);
            }
            //do stuff
        }
        this.attack = function(x, y) {
            if (this._pc.atkTimer || this._pc.mp.cur < 4) {
                return;
            }
            game.shots++;
            this._pc.mp.cur -= 5;
            console.log(this._pc.mp.cur);
            this._pc.atkTimer = this._pc.aRate;
            scene.shock.play();
            let config = {text:"chars", frame:294, destx:x, desty:y, pcx:this._pc.x, pcy:this._pc.y, 
                range:this._pc.aRange, enemies:this._pc.enemyGroups, layers:scene.layer2, 
                damage:this._pc.damage, speed:this._pc.speed, myGroup:this._pc.pGroup, 
                scale:this._pc.pScale, pierce:this._pc.pierce, coords:this._pc.coords, 
                fill:this._pc.color};
            //projectile needs to add itself to the pgroup so that its collisions get read
            //it also needs a method to deal its damage to enemy and should check distance from
            //its origin point on update
            let shoot = new Projectile(game, scene, config);
        }
        this.addEnemies = function(egroup) {
            this._pc.enemyGroups = egroup;
            for (let i = 0; i < egroup.length; i++) {
                scene.physics.add.overlap(this._pc, egroup[i], this.onEnemyCollision, null, scene);
            }
        }  
        this._pc.collLayers = config.collLayers;   
        for (let i = 0; i < config.collLayers.length; i++) {
            scene.physics.add.collider(this._pc, config.collLayers[i]);
        }
        scene.physics.add.overlap(this._pc, scene.exit, this.leaveLevel, null, scene);

};

