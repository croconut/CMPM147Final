
let game;
window.onload = function() {
    let title = new TitleScene();
    let boot = new BootScene();
    let gameover = new GameOverScene();
    let config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        }
    };
    game = new Phaser.Game(config);
    game.scene.add("Boot", boot);
    game.scene.add("Title", title);
    game.scene.add("Play", Play);
    game.scene.add("GameOver", gameover);
    game.scene.start("Boot");
}