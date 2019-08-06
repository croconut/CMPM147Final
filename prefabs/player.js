let PCController = function(game, scene, pc) {
//pc is the sprite for PCController to control 
        this.pc = pc;
        this.pc.maxX = 100;
        this.pc.maxY = 100;
        //const
        this.pc.both = 0.71;
        //scene.cameras.main.setSize(game.width, game.height);
        scene.cameras.main.startFollow(this.pc);
        this.pc.update = function() {

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
        scene.pcGroup = scene.add.group({runChildUpdate: true});
        scene.pcGroup.add(this.pc);
};

