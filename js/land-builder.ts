import * as PIXI from 'pixi.js';



export const buildLand = (app: PIXI.Application) => {
  const createLandSprite = (x: number, y: number) => {
    const landImage = require('../img/8417669_orig.jpeg');
    const land = PIXI.Sprite.from(landImage);
    land.x = x;
    land.y = y;
    app.stage.addChild(land);
  }

  const createPersonSprite = (x: number, y: number) => {
    const personImage = require('../img/person.png');
    const person = PIXI.Sprite.from(personImage);
    person.x = x;
    person.y = y;
    person.scale.set(0.5);
    app.stage.addChild(person);


    const ticker = new PIXI.Ticker();
    ticker.add(() => {
      person.x += 1;
    })

    ticker.start();
  }


  createLandSprite(0, 0);
  createPersonSprite(0, 0);
}


