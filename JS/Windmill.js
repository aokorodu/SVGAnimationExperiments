class Windmill {
  constructor(x, y, w, matterbody = null) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.bladeHeight = 20;
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

    this.makeBlades(this.graphicHolder);
    container.appendChild(this.graphicHolder);
  }

  makeBlades(holder) {
    const horizontalBlade = document.createElementNS(this.namespace, "rect");
    horizontalBlade.setAttribute("x", -this.w / 2);
    horizontalBlade.setAttribute("y", -this.bladeHeight / 2);
    horizontalBlade.setAttribute("width", this.w);
    horizontalBlade.setAttribute("height", this.bladeHeight);
    horizontalBlade.setAttribute("fill", "#FFFFFF");

    const verticalBlade = document.createElementNS(this.namespace, "rect");
    verticalBlade.setAttribute("x", -this.bladeHeight / 2);
    verticalBlade.setAttribute("y", -this.w / 2);
    verticalBlade.setAttribute("width", this.bladeHeight);
    verticalBlade.setAttribute("height", this.w);
    verticalBlade.setAttribute("fill", "white");

    holder.appendChild(horizontalBlade);
    holder.appendChild(verticalBlade);
  }
  update() {
    const angle = (this.matterbody.bodies[0].angle * 180) / Math.PI;
    this.graphicHolder.setAttribute(
      "transform",
      `translate(${this.x} ${this.y}) rotate(${angle})`
    );
    // Matter.Composite.rotate(this.matterbody, 0.01, { x: 500, y: 500 });
  }
}
