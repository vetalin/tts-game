import { Sprite, Ticker } from "pixi.js";

export const startMainTicker = () => {
  const ticker = new Ticker();

  ticker.start();
};

const personMotion = (person: Sprite, ticker: Ticker) => {
  ticker.add(() => {
    person.x += 1;
  });
};
