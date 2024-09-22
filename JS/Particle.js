class Particle {
  constructor(x, y, r, matterball, type = "circle", isStatic = false) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.graphicHolder = null;
    this.graphic = null;
    this.matterball = matterball;
    this.type = type;
    this.namespace = "http://www.w3.org/2000/svg";
    this.isStatic = isStatic;
  }

  init(container, color = "#FF0000") {
    this.graphicHolder = this.getGraphicHolder();
    this.graphic =
      this.type == "circle" ? this.makeACircle() : this.makeARect();
    this.graphic.setAttribute("fill", color);
    this.graphic.setAttribute("fill-opacity", 0.4);
    this.graphic.setAttribute("stroke", color);
    this.graphic.setAttribute("stroke-width", "3");
    this.graphic.setAttribute("stroke-opacity", 1);
    this.graphicHolder.appendChild(this.graphic);
    container.appendChild(this.graphicHolder);
  }

  makeACircle() {
    const shape = document.createElementNS(this.namespace, "circle");
    shape.setAttribute("cx", 0);
    shape.setAttribute("cy", 0);
    shape.setAttribute("r", this.r);

    return shape;
  }

  makeARect() {
    const shape = document.createElementNS(this.namespace, "rect");
    shape.setAttribute("x", -this.r);
    shape.setAttribute("y", -this.r);
    shape.setAttribute("width", this.r * 2);
    shape.setAttribute("height", this.r * 2);

    return shape;
  }

  getGraphicHolder() {
    const namespace = "http://www.w3.org/2000/svg";
    const h = document.createElementNS(namespace, "g");
    return h;
  }

  update() {
    if (this.static) return;

    const pos = this.matterball.position;
    const angle = (180 / Math.PI) * this.matterball.angle;
    this.graphicHolder.setAttribute(
      "transform",
      `translate(${pos.x} ${pos.y}) rotate(${angle})`
    );
  }
}
