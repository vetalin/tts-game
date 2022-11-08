import { Application, Sprite } from "pixi.js";

export class LandBuilder {
  constructor(private app: Application) {}

  buildLand(): Sprite {
    const landImage = require("../../img/land.jpeg");
    const land = Sprite.from(landImage);
    land.x = 0;
    land.y = 0;
    this.app.stage.addChild(land);
    return land;
  }
}
