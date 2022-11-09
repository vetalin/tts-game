import { Application, Texture, AnimatedSprite, Assets } from "pixi.js";
import { BasePerson, MainPersonProps } from "./basePerson";

interface OrkProps extends MainPersonProps {}

const initialProps: OrkProps = {
  speed: 5,
  scale: 0.5,
  startX: 0,
  startY: 0,
  animationSpeed: 0.5,
};

export class Ork extends BasePerson {
  constructor(
    app: Application,
    props: OrkProps = initialProps,
    isSelected: boolean = false
  ) {
    super(app, props, isSelected);
  }

  buildPersonForChild(): AnimatedSprite {
    const person = AnimatedSprite.fromImages(this.getTexturesIdle());
    person.scale.set(this.props.scale || 1);
    person.anchor.set(0.5);
    person.x = this.props.startX || 0;
    person.y = this.props.startY || 0;
    person.animationSpeed = this.props.animationSpeed || 1;
    person.play();

    this.setAnimationRun(person);

    return person;
  }

  private setAnimationRun(person: typeof this.person): void {
    if (person === null) {
      throw new Error("Person is not defined");
    }

    this.personRunSprite = AnimatedSprite.fromImages(this.getTexturesRun());
  }

  private getTexturesRun(): string[] {
    return [
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Run Throwing/0_Orc_Run Throwing_000.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Run Throwing/0_Orc_Run Throwing_001.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Run Throwing/0_Orc_Run Throwing_002.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Run Throwing/0_Orc_Run Throwing_003.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Run Throwing/0_Orc_Run Throwing_004.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Run Throwing/0_Orc_Run Throwing_005.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Run Throwing/0_Orc_Run Throwing_006.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Run Throwing/0_Orc_Run Throwing_007.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Run Throwing/0_Orc_Run Throwing_008.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Run Throwing/0_Orc_Run Throwing_009.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Run Throwing/0_Orc_Run Throwing_010.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Run Throwing/0_Orc_Run Throwing_011.png"),
    ];
  }

  private getTexturesIdle(): string[] {
    return [
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_000.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_001.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_002.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_003.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_004.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_005.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_006.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_007.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_008.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_009.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_010.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_011.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_012.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_013.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_014.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_015.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_016.png"),
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_017.png"),
    ];
  }
}
