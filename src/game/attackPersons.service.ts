import { BasePerson } from "../persons/basePerson";
import { Application } from "pixi.js";

class InteractionEvent {}

export class AttackPersonsService {
  private app: Application;
  private persons: BasePerson[] = [];
  private isAttack: boolean = false;

  constructor(app: Application) {
    this.app = app;
  }

  public watchToAttack(person: BasePerson): void {
    this.persons.push(person);
  }

  public initListeners(): void {
    this.app.stage.on("pointerdown", this.onPointerDown.bind(this));
  }

  public destroyListeners(): void {
    this.app.stage.off("pointerdown", this.onPointerDown.bind(this));
  }

  private onPointerDown = async (event: any): Promise<void> => {
    if (this.isAttack) {
      return;
    }

    const { x, y } = event.data.global;
    const person = this.persons.find((person) => {
      const { x: personX, y: personY } = person.getCurrentSprite().position;
      const { width, height } = person.getCurrentSprite();
      return (
        x > personX &&
        x < personX + width &&
        y > personY &&
        y < personY + height
      );
    });

    if (!person) {
      return;
    }

    this.isAttack = true;

    await person.attack();

    this.isAttack = false;
  };
}
