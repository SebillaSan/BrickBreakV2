// scenes/gameOver.js
export default class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    create() {
        this.add.text(400, 300, 'Game Over', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.input.once('pointerdown', () => {
            this.scene.start('gameScene'); // Reinicia el juego al hacer clic
        });
    }
}