import { LandBuilder } from "../land/landBuilder";
import { Application, utils } from "pixi.js";
import { SelectPersonsService } from "./selectPersons.service";
import { Ork } from "../persons/ork";
import { AttackPersonsService } from "./attackPersons.service";

export const creatingApp = async () => {
  const app = new Application({
    width: 1100,
    height: 618,
  });
  app.stage.interactive = true;
  document.body.appendChild(app.view as any);

  new LandBuilder(app).buildLand();

  const ork1 = new Ork(app, {
    startX: 200,
    startY: 600,
  });

  const ork2 = new Ork(app, {
    startX: 800,
    startY: 600,
  });

  const selectPersonsService = new SelectPersonsService(app);
  selectPersonsService.watchToSelect(ork1);
  selectPersonsService.watchToSelect(ork2);
  selectPersonsService.initListeners();

  const attackPersonsService = new AttackPersonsService(app);
  attackPersonsService.watchToAttack(ork1);
  attackPersonsService.watchToAttack(ork2);
  attackPersonsService.initListeners();

  return app;
};
