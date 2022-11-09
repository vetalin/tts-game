import { LandBuilder } from "../land/landBuilder";
import { BasePerson } from "../persons/basePerson";
import { Application } from "pixi.js";
import { SelectPersonsService } from "./selectPersons.service";
import { Ork } from "../persons/ork";

export const creatingApp = () => {
  const app = new Application({
    width: 1100,
    height: 618,
  });
  app.stage.interactive = true;
  document.body.appendChild(app.view as any);

  new LandBuilder(app).buildLand();
  // const mainPerson = new BasePerson(app, {
  //   startX: 100,
  //   startY: 100,
  // });
  // mainPerson.initPerson();
  // const secondMainPerson = new BasePerson(app, {
  //   speed: 10,
  //   scale: 0.3,
  //   startX: 200,
  //   startY: 200,
  // });
  // secondMainPerson.initPerson();

  const ork = new Ork(app, {
    startX: 500,
    startY: 500,
  });
  ork.initPerson();

  const selectPersonsService = new SelectPersonsService(app);
  // selectPersonsService.watchToSelect(mainPerson);
  // selectPersonsService.watchToSelect(secondMainPerson);
  selectPersonsService.watchToSelect(ork);
  selectPersonsService.initListeners();

  return app;
};
