import { AnimatedSprite, Application, BaseTexture, Spritesheet } from "pixi.js";
import { BasePerson, MainPersonProps, PersonState } from "./basePerson";
import { SpriteFabric } from "./fabric/spriteFabric";
import { Loader, LoaderResource } from "@pixi/loaders";
import { Dict } from "@pixi/utils";

interface OrkProps extends MainPersonProps {}
interface OrkState extends PersonState {}

const initialProps: OrkProps = {
  speed: 5,
  scale: 0.5,
  startX: 200,
  startY: 500,
  animationSpeed: 0.6,
  anchor: [0.5, 0.9],
};

const initialStore: OrkState = {
  personSpriteState: "idle",
  sprites: null,
  isSelected: false,
  futurePosition: null,
  selectedColor: 0x00ff00,
  normalColor: 0xffffff,
  personProps: initialProps,
};

export class Ork extends BasePerson {
  constructor(app: Application, props?: Partial<OrkProps>) {
    const mergedProps = {
      ...initialProps,
      ...props,
    };
    super(app, initialStore, mergedProps);
    this.getSprites().then(this.initPerson.bind(this));
  }

  private async getSprites(): Promise<void> {
    const sprites = await SpriteFabric.build([
      {
        pathToSpriteJson: require("../../img/sprites/person/ork/idle/spritesheet.json"),
        pathToSpriteImage: require("../../img/sprites/person/ork/idle/spritesheet.png"),
        state: "idle",
      },
      {
        pathToSpriteJson: require("../../img/sprites/person/ork/attack/spritesheet.json"),
        pathToSpriteImage: require("../../img/sprites/person/ork/attack/spritesheet.png"),
        state: "attack",
      },
      {
        pathToSpriteJson: require("../../img/sprites/person/ork/run/spritesheet.json"),
        pathToSpriteImage: require("../../img/sprites/person/ork/run/spritesheet.png"),
        state: "run",
      },
    ]);

    if (this.store.getStoreValue("sprites") !== null) {
      console.log("sprites already exist");
    }

    this.store.setStoreValue("sprites", sprites);
  }
}
