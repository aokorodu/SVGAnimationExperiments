class ConveyorBelt {
  constructor(x, y, w, h, matterbody = null) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rotation = 0;
    this.wheelRadius = this.h / 2;
    this.graphicHolder = null;
    this.wheel_1 = null;
    this.wheel_2 = null;
    this.belt = null;
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

    this.makeWheels(this.graphicHolder);
    container.appendChild(this.graphicHolder);
  }

  makeWheels(holder) {
    this.wheel_1 = document.createElementNS(this.namespace, "g");
    this.wheel_1.setAttribute(
      "transform",
      `translate(${-this.w / 2 + 50} ${this.wheelRadius})`
    );
    this.wheel_2 = document.createElementNS(this.namespace, "g");
    this.wheel_1.setAttribute(
      "transform",
      `translate(${this.w / 2 - 20} ${this.wheelRadius})`
    );
    const gear_1 = document.createElementNS(this.namespace, "use");
    gear_1.setAttribute("href", "#gear");
    gear_1.setAttribute("x", 0);
    gear_1.setAttribute("y", 0);

    const gear_2 = document.createElementNS(this.namespace, "use");
    gear_2.setAttribute("href", "#gear");
    gear_2.setAttribute("x", 0);
    gear_2.setAttribute("y", 0);

    this.belt = document.createElementNS(this.namespace, "rect");
    this.belt.setAttribute("x", `${-this.w / 2}`);
    this.belt.setAttribute("y", `${-this.h / 2}`);
    this.belt.setAttribute("rx", `${50}`);
    this.belt.setAttribute("ry", `${50}`);
    this.belt.setAttribute("width", `${this.w + 30}`);
    this.belt.setAttribute("height", `${this.h * 2}`);
    this.belt.setAttribute("stroke", `white`);
    this.belt.setAttribute("stroke-opacity", `0.5`);
    this.belt.setAttribute("stroke-width", `5`);
    this.belt.setAttribute("stroke-dasharray", `20 5`);
    this.belt.setAttribute("stroke-dashoffset", `0`);
    this.belt.setAttribute("fill", `none`);

    this.wheel_1.appendChild(gear_1);
    this.wheel_2.appendChild(gear_2);
    holder.appendChild(this.belt);
    holder.appendChild(this.wheel_1);
    holder.appendChild(this.wheel_2);
  }

  update() {
    this.rotation += 1;
    this.wheel_1.setAttribute(
      "transform",
      `translate(${-this.w / 2 + 50} ${this.wheelRadius}) rotate(${
        this.rotation
      })`
    );

    this.wheel_2.setAttribute(
      "transform",
      `translate(${this.w / 2 - 20} ${this.wheelRadius}) rotate(${
        this.rotation
      })`
    );

    this.belt.setAttribute("stroke-dashoffset", `${-this.rotation}`);
  }
}
