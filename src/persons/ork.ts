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
  animationSpeed: 0.5,
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
  constructor(app: Application) {
    super(app, initialStore, initialProps);
    this.getSprites().then(this.initPerson.bind(this));
  }

  private async getSprites(): Promise<void> {
    const imageSprite = require("../../img/sprites/person/ork/idle/spritesheet.png");
    const idleSpritesheet = require("../../img/sprites/person/ork/idle/spritesheet.json");

    const baseTexture = BaseTexture.from(imageSprite);

    const spritesheet = new Spritesheet(baseTexture, idleSpritesheet);

    await spritesheet.parse();

    this.store.setStoreValue("sprites", {
      idle: new AnimatedSprite(spritesheet.animations.idle),
      run: null,
      attack: null,
      death: null,
    });
  }
}
