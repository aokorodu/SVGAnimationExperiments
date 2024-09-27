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
    const l = document.createElementNS(this.namespace, "rect");
    l.setAttribute("x", -this.width / 2 - 5);
    l.setAttribute("y", -this.height / 2);
    l.setAttribute("width", 10);
    l.setAttribute("height", this.height);

    const r = document.createElementNS(this.namespace, "rect");
    r.setAttribute("x", this.width / 2 + 5);
    r.setAttribute("y", -this.height / 2);
    r.setAttribute("width", 10);
    r.setAttribute("height", this.height);

    const bottom = document.createElementNS(this.namespace, "rect");
    bottom.setAttribute("x", -this.width / 2);
    bottom.setAttribute("y", this.height / 2 + 5);
    bottom.setAttribute("width", this.width);
    bottom.setAttribute("height", 10);

    this.graphicHolder.appendChild(l);
    this.graphicHolder.appendChild(r);
    this.graphicHolder.appendChild(bottom);
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
