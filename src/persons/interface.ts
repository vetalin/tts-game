import { AnimatedSprite } from "pixi.js";

export type PersonSpriteState = "idle" | "run" | "attack" | "death";

export type PersonSprites = {
  [key in Partial<PersonSpriteState>]: AnimatedSprite | null;
};
