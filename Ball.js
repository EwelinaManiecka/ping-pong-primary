import Renderer from "./Renderer.js";

class Ball {
  constructor({ x, y, radius, speedX, speedY, speed = 5, canvas, color }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.speed = speed;
    this.color = color;
    this.canvas = canvas;

    this.Renderer = Renderer.getInstance();
  }
  reset = () => {
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;

    this.speedX = -Math.sign(this.speedX) * 3;
    this.speedY = Math.sign(this.speedY) * 3;
  };

  update = () => {
    this.x += this.speedX;
    this.y += this.speedY;
  };

  checkWallCollision = () => {
    if (this.y - this.radius < 0 || this.y + this.radius > this.canvas.height) {
      this.speedY = -this.speedY;
    }
  };

  getRect = () => {
    return {
      top: this.y - this.radius,
      bottom: this.y + this.radius,
      left: this.x - this.radius,
      right: this.x + this.radius,
    };
  };

  getBallDirection = () => {
    if (this.x + this.radius < this.canvas.width / 2) {
      return 1;
    } else {
      return -1;
    }
  };

  draw = () => {
    this.Renderer.drawCircle(this.x, this.y, this.radius, this.color);
  };
}

export default Ball;
