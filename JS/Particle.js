class Particle {
  constructor(x, y, r, matterball, type = "circle", isStatic = false) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.graphicHolder = null;
    this.graphic = null;
    this.flower = null;
    this.matterball = matterball;
    this.type = type;
    this.namespace = "http://www.w3.org/2000/svg";
    this.isStatic = isStatic;
    this.color = `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`;
    this.popped = false;
  }

  init(container) {
    this.graphicHolder = this.getGraphicHolder();
    this.graphic = this.getCircleGraphic();
    this.flower = this.getFlowerGraphic();
    this.graphicHolder.append(this.graphic);
    this.graphicHolder.append(this.flower);
    container.appendChild(this.graphicHolder);
  }

  getCircleGraphic() {
    const circle = document.createElementNS(this.namespace, "circle");
    circle.setAttribute("cx", 0);
    circle.setAttribute("cy", 0);
    circle.setAttribute("r", this.r);
    circle.setAttribute("fill", this.color);
    circle.setAttribute("fill-opacity", 0.5);
    circle.setAttribute("stroke", this.color);
    circle.setAttribute("stroke-width", "3");
    circle.setAttribute("stroke-opacity", 0.8);

    return circle;
  }

  getFlowerGraphic() {
    const flower = document.createElementNS(this.namespace, "use");
    flower.setAttribute("fill", this.color);
    flower.setAttribute("href", "#flower");
    flower.setAttribute("transform", `scale(${this.r / 25})`);
    flower.setAttribute("opacity", 0);
    return flower;
  }

  changecolor() {
    this.flower.setAttribute("opacity", 0.9);
  }

  reset() {
    this.graphic.setAttribute("fill", this.color);
    this.graphic.setAttribute("fill-opacity", 0.5);
    this.graphic.setAttribute("stroke", this.color);
    this.graphic.setAttribute("stroke-width", "3");
    this.graphic.setAttribute("stroke-opacity", 0.8);
    this.flower.setAttribute("opacity", 0);
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
      this.changecolor();
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
          this.reset();
        }
      }
    }

    // console.log("is sleeping? ", this.matterball.isSleeping);
  }
}
