import { AnimatedSprite, BaseTexture, Spritesheet, utils } from "pixi.js";
import { PersonSpriteState } from "../interface";
import { ISpritesheetData } from "@pixi/spritesheet/lib/Spritesheet";

export interface SpriteFabricInput {
  pathToSpriteJson: ISpritesheetData;
  pathToSpriteImage: string;
  state: PersonSpriteState;
}

export type SpriteFabricOutput = {
  [key in Partial<PersonSpriteState>]: AnimatedSprite | null;
};

export const SpriteFabric = {
  async build(fabricInput: SpriteFabricInput[]): Promise<SpriteFabricOutput> {
    // todo: научиться работать с кешем
    utils.clearTextureCache();

    const buildedSpritePromise = await Promise.all(
      fabricInput.map(async (input) => {
        const baseTexture = BaseTexture.from(input.pathToSpriteImage);
        const spritesheet = new Spritesheet(
          baseTexture,
          input.pathToSpriteJson
        );

        return {
          state: input.state,
          pureSprite: spritesheet,
          sprite: await spritesheet.parse(),
        };
      })
    );

    return buildedSpritePromise.reduce((acc, { state, pureSprite }) => {
      acc[state] = new AnimatedSprite(pureSprite.animations[state]);
      return acc;
    }, {} as SpriteFabricOutput);
  },
};
