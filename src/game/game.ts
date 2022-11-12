import { LandBuilder } from "../land/landBuilder";
import { Application } from "pixi.js";
import { SelectPersonsService } from "./selectPersons.service";
import { Ork } from "../persons/ork";

export const creatingApp = async () => {
  const app = new Application({
    width: 1100,
    height: 618,
  });
  app.stage.interactive = true;
  document.body.appendChild(app.view as any);

  new LandBuilder(app).buildLand();

  const ork = new Ork(app);

  const selectPersonsService = new SelectPersonsService(app);
  selectPersonsService.watchToSelect(ork);
  selectPersonsService.initListeners();

  return app;
};
