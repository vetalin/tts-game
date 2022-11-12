import { AnimatedSprite, Assets } from "pixi.js";
import { PersonSpriteState } from "../interface";

type FileNameCreator = (spriteNumber: number) => string;

export interface SpriteFabricInput {
  directory: string;
  filename: (spriteNumber: number) => string;
  filesCount: number;
  state: PersonSpriteState;
}

export type SpriteFabricOutput = {
  [key in Partial<PersonSpriteState>]: AnimatedSprite | null;
};

type Textures = {
  [key in Partial<PersonSpriteState>]: string[];
};

export const SpriteFabric = {
  async build(inputs: SpriteFabricInput[]): Promise<SpriteFabricOutput> {
    const textures = await this.getTextures(inputs);

    return Object.entries(textures).reduce(
      (acc, [keyTexture, valueTexture]) => {
        acc[keyTexture as keyof SpriteFabricOutput] =
          AnimatedSprite.fromImages(valueTexture);
        return acc;
      },
      {} as SpriteFabricOutput
    );
  },

  async getTextures(inputs: SpriteFabricInput[]): Promise<Textures> {
    const spriteStates = inputs.map((input) => input.state);
    const texturesForStates = await Promise.all(
      spriteStates.map((state, index) => {
        const currentSprite = inputs[index];
        return this.getTexture(
          currentSprite.directory,
          currentSprite.filename,
          currentSprite.filesCount
        );
      })
    );

    return texturesForStates.reduce((acc, value, index) => {
      acc[spriteStates[index]] = value;
      return acc;
    }, {} as Textures);
  },

  getTexture(
    directory: string,
    filename: FileNameCreator,
    count: number
  ): Promise<string[]> {
    return Promise.all(
      Array.from({ length: count }, (_, index) => {
        return Assets.load(`${directory}/${filename(index)}`);
      })
    );
  },
};
