import { Application, Sprite, Ticker } from "pixi.js";

export class MainPerson {
  constructor(private app: Application) {}
  private person: Sprite | null = null;
  private speed = 10;

  buildPerson(): void {
    const personImage = require("../../img/person.png");
    const person = Sprite.from(personImage);
    person.x = 0;
    person.y = 0;
    person.scale.set(0.5);
    this.app.stage.addChild(person);
    this.person = person;
  }

  personMotion(): void {
    const ticker = new Ticker();
    ticker.add(() => {
      if (this.person === null) {
        throw new Error("Person is not created");
      }
      this.person.x += 1;
    });

    ticker.start();
  }

  keyboardListener(): void {
    window.addEventListener("keydown", (event) => {
      if (this.person === null) {
        throw new Error("Person is not created");
      }
      if (event.key === "ArrowRight") {
        this.person.x += this.speed;
      }

      if (event.key === "ArrowLeft") {
        this.person.x -= this.speed;
      }

      if (event.key === "ArrowUp") {
        this.person.y -= this.speed;
      }

      if (event.key === "ArrowDown") {
        this.person.y += this.speed;
      }
    });
  }
}
