
export default class Game extends Phaser.Scene {
    constructor() {
        super("gameScene");
        this.ballSpeed = 300;
        this.ballDirection = { x: 1, y: -1 };
        this.score = 0;
        this.bricks = [];
        this.rows = 5;
        this.cols = 8;
    }

    preload() {
        // Aquí cargarías los assets (imágenes, sonidos, etc.)
    }

    create() {
        this.paddle = this.add.rectangle(400, 550, 100, 20, 0x00ff00);
        this.physics.add.existing(this.paddle, true);

        this.ball = this.add.circle(400, 300, 10, 0xff0000);
        this.physics.add.existing(this.ball);
        this.ball.body.setCollideWorldBounds(true, 1, 1);
        this.ball.body.setBounce(1, 1);
        this.ball.body.setVelocity(this.ballSpeed, this.ballSpeed);

        this.physics.world.gravity.y = 0;

        this.createBricks();

        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);
    }

    createBricks() {
        const brickWidth = 75;
        const brickHeight = 30;
        const padding = 10; // Espacio entre ladrillos

        // Calcular el ancho total y la altura total de la matriz de ladrillos
        const totalWidth = (brickWidth + padding) * this.cols - padding;
        const totalHeight = (brickHeight + padding) * this.rows - padding;

        // Calcular las posiciones de inicio
        const startX = (this.cameras.main.width - totalWidth) / 2 + brickWidth / 2;
        const startY = 60; // Espacio desde la parte superior

        for (let row = 0; row < this.rows; row++) {
            this.bricks[row] = [];
            for (let col = 0; col < this.cols; col++) {
                const brickX = startX + col * (brickWidth + padding);
                const brickY = startY + row * (brickHeight + padding);
                const brick = this.add.rectangle(brickX, brickY, brickWidth, brickHeight, 0x0000ff);
                this.physics.add.existing(brick, true);
                this.bricks[row][col] = brick;

                this.physics.add.collider(this.ball, brick, this.hitBrick, null, this);
            }
        }
    }

    hitBrick(ball, brick) {
        brick.destroy();
        this.score += 10;
        this.checkBricks();
    }

    checkBricks() {
        let allBricksDestroyed = true;

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.bricks[row][col] && this.bricks[row][col].active) {
                    allBricksDestroyed = false;
                    break;
                }
            }
        }

        if (allBricksDestroyed) {
            this.resetGame();
        }
    }

    resetGame() {
        this.ballSpeed *= 1.1;
        this.scene.restart();
    }

    update() {
        this.paddle.x = Phaser.Math.Clamp(this.input.activePointer.x, 50, 750);
        this.paddle.body.updateFromGameObject();

        // Verificar si la pelota cae por debajo de la pala
        if (this.ball.y > this.cameras.main.height - 30) {
            this.scene.start('gameOverScene'); // Cambiar a la escena de Game Over
        }
    }

    hitPaddle(ball, paddle) {
        ball.body.setVelocityY(-Math.abs(this.ballSpeed));
    }
}