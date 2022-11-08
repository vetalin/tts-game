import { Application, IPointData, Sprite, Ticker } from "pixi.js";
import { wait } from "../helper";

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
  public id: string = Math.random().toString(36).substr(2, 9);

  constructor(
    private app: Application,
    public props: MainPersonProps = initialProps,
    public isSelected: boolean = false
  ) {}
  private person: Sprite | null = null;

  private futurePosition = {
    x: this.props.startX || 0,
    y: this.props.startY || 0,
  };

  selectedColor = 0xff0000;
  normalColor = 0xffffff;

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

    this.app.stage.addChild(person);
    this.person = person;

    this.initListeners();
  }

  public async selectPerson(): Promise<void> {
    // wait before change position
    await wait(0);
    if (this.person === null) {
      throw new Error("Person is not created");
    }
    this.isSelected = !this.isSelected;
    this.person.tint = this.isSelected ? this.selectedColor : this.normalColor;
  }

  public unselectPerson(): void {
    if (this.person === null) {
      throw new Error("Person is not created");
    }
    this.isSelected = false;
    this.person.tint = this.normalColor;
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
    this.app.stage.on("click", (event) => {
      if (!this.isSelected) {
        return;
      }
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

  containsPoint(point: IPointData): boolean {
    if (this.person === null) {
      throw new Error("Person is not created");
    }

    return this.person.containsPoint(point);
  }
}
