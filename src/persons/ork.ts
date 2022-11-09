import { Application, Texture, AnimatedSprite } from "pixi.js";
import { MainPerson, MainPersonProps } from "./mainPerson";

interface OrkProps extends MainPersonProps {
  speed?: number;
  scale?: number;
  startX?: number;
  startY?: number;
}

const initialProps: OrkProps = {
  speed: 5,
  scale: 0.5,
  startX: 0,
  startY: 0,
};

export class Ork extends MainPerson {
  constructor(
    app: Application,
    props: OrkProps = initialProps,
    isSelected: boolean = false
  ) {
    super(app, props, isSelected);
  }

  buildPerson(): AnimatedSprite {
    const texture1 = Texture.from(
      "../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_000.png"
    );
    const texture2 = Texture.from(
      "../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_0017.png"
    );

    const person = (() => {
      try {
        return new AnimatedSprite([texture1, texture2]);
      } catch (e) {
        console.log(e);
        throw e;
      }
    })();
    person.scale.set(this.props.scale || 1);
    person.anchor.set(0.5);
    person.x = this.props.startX || 0;
    person.y = this.props.startY || 0;

    return person;
  }

  private getTextures(): Texture[] {
    return [
      require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_000.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_001.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_002.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_003.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_004.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_005.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_006.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_007.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_008.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_009.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_010.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_011.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_012.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_013.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_014.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_015.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_016.png"),
      // require("../../img/sprites/craftpix-064112-free-orc-ogre-and-goblin-chibi-2d-game-sprites/Orc/PNG/PNG Sequences/Idle/0_Orc_Idle_017.png"),
    ].map((texture) => Texture.from(texture));
  }
}
