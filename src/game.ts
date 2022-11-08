import { LandBuilder } from "./land/landBuilder";
import { MainPerson } from "./persons/mainPerson";
import { Application } from "pixi.js";

export const creatingApp = () => {
  const app = new Application({
    width: 1100,
    height: 618,
  });
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
  return app;
};
