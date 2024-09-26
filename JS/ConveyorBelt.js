class ConveyorBelt {
  constructor(x, y, r, matterbody = null) {
    this.x = x;
    this.y = y;
    this.r = r;
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
    wheel.setAttribute("stroke", "#D9D9D9");
    wheel.setAttribute("stroke-width", 8);
    wheel.setAttribute("stroke-opacity", 0.5);

    const gear = document.createElementNS(this.namespace, "use");
    gear.setAttribute("href", "#gear");
    gear.setAttribute("transform", `scale(${this.r / 55})`);

    holder.appendChild(wheel);
    holder.appendChild(gear);
  }

  update() {
    const angle = (this.matterbody.angle * 180) / Math.PI;
    this.graphicHolder.setAttribute(
      "transform",
      `translate(${this.x} ${this.y}) rotate(${angle})`
    );
  }
}
