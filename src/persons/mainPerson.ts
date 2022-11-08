import { Application, Sprite, Ticker, Graphics } from "pixi.js";

export class MainPerson {
  constructor(private app: Application) {}
  private person: Sprite | null = null;
  private speed = 10;

  private futurePosition = {
    x: 0,
    y: 0,
  };

  buildPerson(): void {
    const personImage = require("../../img/person.png");
    const person = Sprite.from(personImage);
    person.x = 0;
    person.y = 0;
    person.scale.set(0.5);
    person.anchor.set(0.5, 0.9);

    setInterval(() => {
      person.tint = Math.random() * 0xffffff;
    }, 1000);
    this.app.stage.addChild(person);
    this.person = person;

    this.initListeners();
  }

  private initListeners(): void {
    this.personMotion();
    this.keyboardListener();
    this.mouseListener();
  }

  private personMotion(): void {
    const ticker = new Ticker();
    ticker.add(this.animationOfMovement());
    ticker.start();
  }

  private animationOfMovement() {
    return () => {
      if (this.person === null) {
        throw new Error("Person is not created");
      }

      if (
        this.futurePosition.x !== this.person.x ||
        this.futurePosition.y !== this.person.y
      ) {
        if (this.futurePosition.x > this.person.x) {
          this.person.x += this.speed;
        }
        if (this.futurePosition.x < this.person.x) {
          this.person.x -= this.speed;
        }
        if (this.futurePosition.y > this.person.y) {
          this.person.y += this.speed;
        }
        if (this.futurePosition.y < this.person.y) {
          this.person.y -= this.speed;
        }
      }
    };
  }

  private keyboardListener(): void {
    window.addEventListener("keydown", (event) => {
      if (this.person === null) {
        throw new Error("Person is not created");
      }
      if (event.key === "ArrowRight") {
        this.animationSetPosition(this.person.x + this.speed, this.person.y);
      }

      if (event.key === "ArrowLeft") {
        this.animationSetPosition(this.person.x - this.speed, this.person.y);
      }

      if (event.key === "ArrowUp") {
        this.animationSetPosition(this.person.x, this.person.y - this.speed);
      }

      if (event.key === "ArrowDown") {
        this.animationSetPosition(this.person.x, this.person.y + this.speed);
      }
    });
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

    this.futurePosition.x = x;
    this.futurePosition.y = y;
  }
}
