import { Application, Sprite, Ticker } from "pixi.js";

interface MainPersonProps {
  speed?: number;
  scale?: number;
  startX?: number;
  startY?: number;
}

const initialProps: MainPersonProps = {
  speed: 5,
  scale: 0.5,
  startX: 0,
  startY: 0,
};

export class MainPerson {
  constructor(
    private app: Application,
    public props: MainPersonProps = initialProps
  ) {}
  private person: Sprite | null = null;

  private futurePosition = {
    x: this.props.startX || 0,
    y: this.props.startY || 0,
  };

  buildPerson(): void {
    this.mergeProps();

    if (this.props.startX === undefined) {
      throw new Error("Start x is not defined");
    }
    if (this.props.startY === undefined) {
      throw new Error("Start y is not defined");
    }
    if (this.props.scale === undefined) {
      throw new Error("Scale is not defined");
    }
    if (this.props.speed === undefined) {
      throw new Error("Speed is not defined");
    }

    const personImage = require("../../img/person.png");
    const person = Sprite.from(personImage);

    person.x = this.props.startX;
    person.y = this.props.startY;
    person.scale.set(this.props.scale);
    person.anchor.set(0.5, 0.9);

    person.tint = Math.random() * 0xffffff;

    this.app.stage.addChild(person);
    this.person = person;

    this.initListeners();
  }

  private initListeners(): void {
    this.personMotion();
    this.mouseListener();
  }

  private personMotion(): void {
    const ticker = new Ticker();
    ticker.add(this.animationOfMovement.bind(this));
    ticker.start();
  }

  private animationOfMovement() {
    if (this.person === null) {
      throw new Error("Person is not created");
    }
    if (this.props.speed === undefined) {
      throw new Error("Speed is not defined");
    }

    if (
      this.futurePosition.x !== this.person.x ||
      this.futurePosition.y !== this.person.y
    ) {
      if (this.futurePosition.x > this.person.x) {
        this.person.x += this.props.speed;
      }
      if (this.futurePosition.x < this.person.x) {
        this.person.x -= this.props.speed;
      }
      if (this.futurePosition.y > this.person.y) {
        this.person.y += this.props.speed;
      }
      if (this.futurePosition.y < this.person.y) {
        this.person.y -= this.props.speed;
      }
    }
  }

  private mouseListener(): void {
    window.addEventListener("click", (event) => {
      if (this.person === null) {
        throw new Error("Person is not created");
      }
      this.animationSetPosition(event.clientX, event.clientY);
    });
  }

  private animationSetPosition(x: number, y: number): void {
    if (this.person === null) {
      throw new Error("Person is not created");
    }

    this.flipPersonToFututePosition(x, y);

    this.futurePosition.x = x;
    this.futurePosition.y = y;
  }

  private flipPersonToFututePosition(x: number, y: number) {
    if (this.person === null) {
      throw new Error("Person is not created");
    }
    if (x > this.person.x) {
      this.person.scale.x = this.props.scale || 1;
    }
    if (x < this.person.x) {
      this.person.scale.x *= -1;
    }
  }

  private mergeProps(): void {
    this.props = { ...initialProps, ...this.props };
  }
}
