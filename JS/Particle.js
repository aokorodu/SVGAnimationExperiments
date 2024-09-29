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
    this.color = `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`;
    this.popped = false;
  }

  init(container, color = "#FF0000") {
    this.graphicHolder = this.getGraphicHolder();
    // this.graphic =
    //   this.type == "circle" ? this.makeACircle() : this.makeARect();
    this.graphic = this.makeACircle();
    this.graphic.setAttribute("fill", "#fff");
    this.graphic.setAttribute("fill-opacity", 0.6);
    this.graphic.setAttribute("stroke", "#000");
    this.graphic.setAttribute("stroke-width", "3");
    this.graphic.setAttribute("stroke-opacity", 0.8);
    this.graphicHolder.appendChild(this.graphic);
    container.appendChild(this.graphicHolder);
  }

  changecolor(newColor) {
    const c = newColor == null ? this.color : newColor;
    this.graphic.setAttribute("fill", c);
    this.graphic.setAttribute("fill-opacity", 0.8);
    this.graphic.setAttribute("stroke", c);
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

    // if (this.matterball.position.y > 2100) {
    //   Matter.Body.setPosition(this.matterball, {
    //     x: 400 + Math.random() * 200,
    //     y: 0,
    //   });
    //   Matter.Body.setSpeed(this.matterball, 0);
    //   this.changecolor(true);
    // }
    if (this.matterball.position.x > 1500 && !this.popped) {
      this.popped = true;
      this.changecolor("yellow");
      //Matter.Body.applyForce(this.matterball, pos, { x: 0.005, y: -0.05 });
      const vel = Matter.Body.getVelocity(this.matterball);
      Matter.Body.setVelocity(this.matterball, {
        x: Math.random() * 5,
        y: -Math.random() * 20 - 30,
      });
      // Matter.Body.setPosition(this.matterball, {
      //   x: 400 + Math.random() * 200,
      //   y: 0,
      // });
      // Matter.Body.setSpeed(this.matterball, 0);
    } else {
      if (this.popped) {
        if (this.matterball.position.y > 2100) {
          this.popped = false;
          Matter.Body.setPosition(this.matterball, {
            x: 400 + Math.random() * 200,
            y: 0,
          });
          Matter.Body.setSpeed(this.matterball, 0);
          this.changecolor("white");
        }
      }
    }

    // console.log("is sleeping? ", this.matterball.isSleeping);
  }
}
