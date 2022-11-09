import { Application } from "pixi.js";
import { BasePerson } from "../persons/basePerson";

export class SelectPersonsService {
  constructor(private app: Application) {}

  private persons: BasePerson[] = [];

  public watchToSelect(person: BasePerson): void {
    this.persons.push(person);
  }

  public selectPerson(selectedPerson: BasePerson): void {
    this.persons.forEach((currentPerson) => {
      if (currentPerson.id === selectedPerson.id) {
        currentPerson.selectPerson();
        this.persons.map((person) => {
          if (person.id !== currentPerson.id) {
            person.unselectPerson();
          }
        });
      }
    });
  }

  public initListeners(): void {
    this.app.stage.on("click", (event) => {
      this.persons.forEach((currentPerson) => {
        if (currentPerson.containsPoint(event.data.global)) {
          this.selectPerson(currentPerson);
        }
      });
    });
  }
}
