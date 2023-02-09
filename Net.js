import Renderer from "./Renderer.js";

export default class Net {
  constructor({
    x,
    y,
    height,
    segmentWidth,
    segmentHeight,
    segmentGap,
    color,
  }) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.segmentWidth = segmentWidth;
    this.segmentHeight = segmentHeight;
    this.segmentGap = segmentGap;
    this.color = color;

    this.renderer = Renderer.getInstance();
  }

  draw = () => {
    let yPos = this.y;

    while (yPos < this.height) {
      this.renderer.drawRect(
        this.x,
        yPos,
        this.segmentWidth,
        this.segmentHeight,
        this.color
      );

      yPos += this.segmentGap + this.segmentHeight;
    }
  };
}
