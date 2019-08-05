// import TitleScene from "./scenes/title"
// import PlayScene from "./scenes/play"


let game;
window.onload = function() {
    let title = new TitleScene();
    let play = new PlayScene();
    let boot = new BootScene();
    let config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        // physics: {
        //     default: 'arcade',
        //     arcade: {
        //         gravity: { y: 200 }
        //     }
        // }
    };
    game = new Phaser.Game(config);
    game.scene.add("Boot", boot);
    game.scene.add("Title", title);
    game.scene.add("Play", play);
    game.scene.start("Boot");
}