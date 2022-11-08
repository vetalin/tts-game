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
  const mainPerson = new MainPerson(app);
  mainPerson.buildPerson();
  return app;
};
