import * as PIXI from 'pixi.js';
import {buildLand} from "./land-builder";

export const creatingApp = () => {
  const app = new PIXI.Application({
    width: 1100,
    height: 618,
    antialias: true,
    transparent: false,
    resolution: 1,
  });
  document.body.appendChild(app.view);

  buildLand(app);
  return app;
}
