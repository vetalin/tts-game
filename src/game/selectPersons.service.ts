import { Application } from "pixi.js";
import { MainPerson } from "../persons/mainPerson";

export class SelectPersonsService {
  constructor(private app: Application) {}

  private persons: MainPerson[] = [];

  public watchToSelect(person: MainPerson): void {
    this.persons.push(person);
  }

  public selectPerson(selectedPerson: MainPerson): void {
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
