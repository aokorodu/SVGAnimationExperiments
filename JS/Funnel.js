class Funnel {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.matterbody = null;
    this.graphicHolder = null;
    this.namespace = "http://www.w3.org/2000/svg";
  }

  init(container) {
    this.initHolder(container);
    this.makePath();
    this.makeBody();
  }

  initHolder(container) {
    this.graphicHolder = this.getGraphicHolder();
    this.graphicHolder.setAttribute(
      "transform",
      `translate(${this.x},${this.y})`
    );
    container.appendChild(this.graphicHolder);
  }

  makeBody() {
    const leftShape = `0,0 100,0 ${this.w / 2},${this.h}`;
    const rightShape = `0,${this.h} ${this.w},0 ${this.w - 10},0`;

    let l_vertices = Matter.Vertices.fromPath(leftShape);
    const l = Matter.Bodies.fromVertices(0, 0, l_vertices, {
      isStatic: true,
      friction: 0,
    });

    let r_vertices = Matter.Vertices.fromPath(rightShape);
    const r = Matter.Bodies.fromVertices(0, 0, r_vertices, {
      isStatic: true,
      friction: 0,
    });

    const funnel = Matter.Body.create({
      id: `funnel`,
      friction: 0,
      restitution: 1,
      isStatic: true,
    });

    Matter.Body.setParts(funnel, [l, r]);
    Matter.Body.setPosition(l, { x: -this.width / 2, y: 0 });
    Matter.Body.setPosition(r, { x: this.width / 2, y: 0 });
    Matter.Body.setPosition(funnel, { x: this.x, y: this.y });

    this.matterbody = funnel;
  }

  makePath() {
    const p = document.createElementNS(this.namespace, "polygon");
    const p1 = { x: -this.w / 2, y: -this.h / 2 };
    const p2 = { x: -this.w / 3, y: this.h / 2 };
    const p3 = { x: this.w / 3, y: this.h / 2 };
    const p4 = { x: this.w / 2, y: -this.h / 2 };
    const pts = `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`;
    p.setAttribute("points", pts);

    //this.graphicHolder.appendChild(p);
  }

  getGraphicHolder() {
    const namespace = "http://www.w3.org/2000/svg";
    const h = document.createElementNS(namespace, "g");
    return h;
  }

  getBody() {
    return this.matterbody;
  }
}
