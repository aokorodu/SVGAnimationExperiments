class Windmill {
  constructor(x, y, w, thickness, matterbody = null) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.bladeHeight = thickness;
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
    const horizontalBlade = this.getBlade(this.w, this.bladeHeight);
    const verticalBlade = this.getBlade(this.bladeHeight, this.w);

    holder.appendChild(horizontalBlade);
    holder.appendChild(verticalBlade);
  }

  getBlade(w, h) {
    const blade = document.createElementNS(this.namespace, "rect");
    blade.setAttribute("x", -w / 2);
    blade.setAttribute("y", -h / 2);
    blade.setAttribute("ry", 5);
    blade.setAttribute("rx", 5);
    blade.setAttribute("width", w);
    blade.setAttribute("height", h);
    blade.setAttribute("fill", "#FFFFFF");

    return blade;
  }

  update() {
    const angle = (this.matterbody.angle * 180) / Math.PI;
    const pos = this.matterbody.position;
    this.x = pos.x;
    this.y = pos.y;
    this.graphicHolder.setAttribute(
      "transform",
      `translate(${this.x} ${this.y}) rotate(${angle})`
    );
  }
}
