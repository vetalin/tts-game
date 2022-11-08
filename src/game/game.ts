import { LandBuilder } from "../land/landBuilder";
import { MainPerson } from "../persons/mainPerson";
import { Application } from "pixi.js";
import { SelectPersonsService } from "./selectPersons.service";

export const creatingApp = () => {
  const app = new Application({
    width: 1100,
    height: 618,
  });
  app.stage.interactive = true;
  document.body.appendChild(app.view as any);

  new LandBuilder(app).buildLand();
  const mainPerson = new MainPerson(app, {
    startX: 100,
    startY: 100,
  });
  mainPerson.buildPerson();
  const secondMainPerson = new MainPerson(app, {
    speed: 10,
    scale: 0.3,
    startX: 200,
    startY: 200,
  });
  secondMainPerson.buildPerson();

  const selectPersonsService = new SelectPersonsService(app);
  selectPersonsService.watchToSelect(mainPerson);
  selectPersonsService.watchToSelect(secondMainPerson);
  selectPersonsService.initListeners();

  return app;
};
