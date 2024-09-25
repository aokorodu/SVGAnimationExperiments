class Wheel {
  constructor(x, y, r, matterbody = null) {
    this.x = x;
    this.y = y;
    this.r = r - 10;
    this.graphicHolder = null;
    this.matterbody = matterbody;
    this.namespace = "http://www.w3.org/2000/svg";
  }

  init(container) {
    this.graphicHolder = document.createElementNS(this.namespace, "g");
    container.appendChild(this.graphicHolder);
    this.graphicHolder.setAttribute(
      "transform",
      `translate(${this.x} ${this.y})`
    );

    this.makeWheelGraphic(this.graphicHolder);
    container.appendChild(this.graphicHolder);
  }

  makeWheelGraphic(holder) {
    const wheel = document.createElementNS(this.namespace, "circle");
    wheel.setAttribute("cx", 0);
    wheel.setAttribute("cy", 0);
    wheel.setAttribute("r", this.r);
    wheel.setAttribute("fill", "none");
    wheel.setAttribute("stroke", "white");
    wheel.setAttribute("stroke-width", "white");
    wheel.setAttribute("stroke-dasharray", "10 10");

    holder.appendChild(wheel);
  }

  update() {
    const angle = (this.matterbody.angle * 180) / Math.PI;
    this.graphicHolder.setAttribute(
      "transform",
      `translate(${this.x} ${this.y}) rotate(${angle})`
    );
  }
}
