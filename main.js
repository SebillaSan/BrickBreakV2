import Game from './scenes/game.js';
import GameOver from './scenes/gameover.js'; // Importa la escena de Game Over

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 800,
            height: 600,
        },
        max: {
            width: 1600,
            height: 1200,
        },
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 },
            debug: false,
        },
    },
    scene: [Game, GameOver], // Agrega la escena de Game Over
};

window.game = new Phaser.Game(config);