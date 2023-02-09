import Renderer from "./Renderer.js";
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
import Net from "./Net.js";

class Game {
  constructor() {
    this.renderer = Renderer.getInstance();
    this.canvas = this.renderer.getCanvas();

    this.ball = new Ball({
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      radius: 10,
      speedX: 5,
      speedY: 5,
      speed: 5,
      canvas: this.canvas,
      color: "yellow",
    });

    this.user = new Paddle({
      score: 0,
      x: 0,
      y: this.canvas.height / 2 - 100 / 2,
      width: 20,
      height: 100,
      color: "lightgreen",
      canvas: this.canvas,
    });

    this.computer = new Paddle({
      score: 0,
      x: this.canvas.width - 20,
      y: this.canvas.height / 2 - 50,
      width: 20,
      height: 100,
      color: "lightblue",
      canvas: this.canvas,
    });

    this.net = new Net({
      x: this.canvas.width / 2,
      y: 0,
      segmentWidth: 2,
      segmentHeight: 30,
      segmentGap: 5,
      height: this.canvas.height,
      color: "blue",
    });

    this.canvas.addEventListener("mousemove", this.user.movePaddle);

    this.startGame();
  }

  startGame = () => {
    const ftp = 60;
    setInterval(this.updateGame, 1000 / ftp);
  };

  updateGame = () => {
    //logika gry
    this.checkScore();

    this.ball.checkWallCollision();
    this.ball.update();

    this.computer.computerAI(this.ball);

    //tura gracza
    let player = null;
    if (this.ball.x + this.ball.radius < this.canvas.width / 2) {
      player = this.user;
    } else {
      player = this.computer;
    }

    //WEKTOR KOLIZJI Z PALETKĄ
    if (player.checkCollision(this.ball)) {
      const collidePoint = player.getCollisionPoint(this.ball);

      //Math.PI/4 to kąt 45 st. w radianach, 2PI to 360 st.
      const angleRad = (Math.PI / 4) * collidePoint;

      const direction = this.ball.getBallDirection();

      //wektor odbicia na osi x
      this.ball.speedX = direction * this.ball.speed * Math.cos(angleRad);

      //wektor odbicia na osi y
      this.ball.speedY = this.ball.speed * Math.sin(angleRad);

      this.ball.speed += 0.3;

      if (this.ball.speed >= 20) this.ball.speed = 20;
    }

    //renderowanie
    this.render();
  };

  checkScore = () => {
    if (this.ball.x + this.ball.radius > this.canvas.width) {
      this.user.addPoint();
      this.ball.reset();
    } else if (this.ball.x - this.ball.radius < 0) {
      this.computer.addPoint();
      this.ball.reset();
    }
  };

  render = () => {
    this.renderer.drawRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
      "black"
    );
    this.renderer.drawText(
      this.user.getScore(),
      this.canvas.width / 4,
      this.canvas.height / 10,
      "white"
    );
    this.renderer.drawText(
      this.computer.getScore(),
      (3 * this.canvas.width) / 4,
      this.canvas.height / 10,
      "white"
    );

    this.ball.draw();
    this.user.draw();
    this.computer.draw();
    this.net.draw();
  };
}

const game = new Game();
