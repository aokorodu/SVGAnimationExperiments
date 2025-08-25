class Cup {
  constructor(x, y, width, height, speed, matterbody = null) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.graphicHolder = null;
    this.matterbody = matterbody;
    this.namespace = "http://www.w3.org/2000/svg";
  }

  init(container) {
    this.graphicHolder = document.createElementNS(this.namespace, "g");
    this.graphicHolder.setAttribute("fill", "white");
    this.graphicHolder.setAttribute("stroke", "none");
    container.appendChild(this.graphicHolder);
    this.graphicHolder.setAttribute(
      "transform",
      `translate(${this.x} ${this.y})`
    );

    this.makeBlades();
  }

  makeBlades() {
    const l = document.createElementNS(this.namespace, "path");

    l.setAttribute(
      "d",
      `M${-this.width / 2},${-this.height / 2} v${this.height} h${
        this.width
      } v${-this.height}`
    );
    l.setAttribute("stroke", "red");
    l.setAttribute("fill", "none");
    l.setAttribute("stroke-width", 20);

    this.graphicHolder.appendChild(l);
  }

  changeSpeed(newSpeed) {
    this.speed = newSpeed;
  }

  update() {
    const bodyPos = this.matterbody.position;
    Matter.Body.rotate(this.matterbody, this.speed, bodyPos, true);

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
