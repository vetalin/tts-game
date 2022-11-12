import { Application, IPointData, Ticker, AnimatedSprite } from "pixi.js";
import { generateId, wait } from "../helper";
import { Store } from "../service/store";
import { PersonSprites, PersonSpriteState } from "./interface";

export interface MainPersonProps {
  speed: number;
  scale: number;
  startX: number;
  startY: number;
  animationSpeed: number;
  anchor: number[];
}

const initialProps: MainPersonProps = {
  speed: 5,
  scale: 0.5,
  startX: 0,
  startY: 0,
  animationSpeed: 0.5,
  anchor: [0.5, 0.9],
};

export interface PersonState {
  personSpriteState: PersonSpriteState | null;
  personProps: MainPersonProps;
  sprites: PersonSprites | null;
  isSelected: boolean;
  futurePosition: IPointData | null;
  selectedColor: number;
  normalColor: number;
}

const initialState: PersonState = {
  personSpriteState: null,
  sprites: null,
  isSelected: false,
  futurePosition: null,
  selectedColor: 0x00ff00,
  normalColor: 0xffffff,
  personProps: initialProps,
};

export class BasePerson {
  public id: string = generateId();

  protected store = new Store(
    this.protectedStore ? this.protectedStore : initialState
  );

  constructor(
    private app: Application,
    public protectedStore: PersonState | null,
    public protectedProps: MainPersonProps | null
  ) {}

  initPerson(): void {
    const sprites = this.store.getStoreValue("sprites");
    if (sprites === null) {
      return;
    }

    this.store.setStoreValue(
      "personProps",
      this.protectedProps ? this.protectedProps : initialProps
    );

    this.buildPersonsSprites();

    this.initListeners();
  }

  public async selectPerson(): Promise<void> {
    const isSelected = this.store.getStoreValue("isSelected");
    const selectedColor = this.store.getStoreValue("selectedColor");
    const normalColor = this.store.getStoreValue("normalColor");
    // Меняет приоритет в очереди в зависимости от выбранности
    await wait(isSelected ? 1 : 3);
    this.store.setStoreValue("isSelected", !isSelected);
    const currentSprite = this.getCurrentSprite();
    currentSprite.tint = isSelected ? normalColor : selectedColor;
  }

  public async unselectPerson(): Promise<void> {
    const normalColor = this.store.getStoreValue("normalColor");
    const currentSprite = this.getCurrentSprite();

    this.store.setStoreValue("isSelected", false);
    currentSprite.tint = normalColor;
  }

  private buildPersonsSprites(): void {
    const sprites = this.store.getStoreValue("sprites");
    if (sprites === null) {
      throw new Error("Sprites is not created");
    }

    const personProps = this.store.getStoreValue("personProps");

    Object.values(sprites).map((sprite) => {
      if (!sprite) {
        return;
      }
      sprite.visible = true;
      sprite.x = personProps.startX;
      sprite.y = personProps.startY;
      sprite.scale.set(personProps.scale);
      sprite.animationSpeed = personProps.animationSpeed;
      sprite.anchor.set(...personProps.anchor);
      sprite.play();
      this.app.stage.addChild(sprite);
    });
  }

  private initListeners(): void {
    this.personMotion();
    this.mouseListener();
  }

  private personMotion(): void {
    const ticker = new Ticker();
    ticker.add(this.animationOfMovement.bind(this));
    ticker.start();
  }

  private animationOfMovement() {
    const futurePosition = this.store.getStoreValue("futurePosition");
    const currentSprite = this.getCurrentSprite();
    const speed = this.store.getStoreValue("personProps").speed;

    if (futurePosition === null) {
      return;
    }

    if (
      futurePosition.x !== currentSprite.x ||
      futurePosition.y !== currentSprite.y
    ) {
      this.store.setStoreValue("personSpriteState", "run");
      if (futurePosition.x > currentSprite.x) {
        currentSprite.x += speed;
      }
      if (futurePosition.x < currentSprite.x) {
        currentSprite.x -= speed;
      }
      if (futurePosition.y > currentSprite.y) {
        currentSprite.y += speed;
      }
      if (futurePosition.y < currentSprite.y) {
        currentSprite.y -= speed;
      }
    } else {
      this.store.setStoreValue("personSpriteState", "idle");
    }
  }

  private mouseListener(): void {
    this.app.stage.on("click", async (event) => {
      const isSelected = this.store.getStoreValue("isSelected");

      // Приоритет в очереди, должен срабатывать после события selectPerson
      await wait(2);
      if (!isSelected) {
        return;
      }
      this.animationSetPosition(event.clientX, event.clientY);
    });
  }

  private animationSetPosition(x: number, y: number): void {
    this.flipPersonToFuturePosition(x, y);

    this.store.setStoreValue("futurePosition", { x, y });
  }

  private flipPersonToFuturePosition(x: number, y: number) {
    const currentSprite = this.getCurrentSprite();
    const personProps = this.store.getStoreValue("personProps");

    if (x > currentSprite.x) {
      currentSprite.scale.x = personProps.scale || 1;
    }
    if (x < currentSprite.x) {
      currentSprite.scale.x *= -1;
    }
  }

  containsPoint(point: IPointData): boolean {
    const currentSprite = this.getCurrentSprite();

    return currentSprite.containsPoint(point);
  }

  private getCurrentSprite(): AnimatedSprite {
    const sprites = this.store.getStoreValue("sprites");
    const spriteState = this.store.getStoreValue("personSpriteState");

    if (sprites === null) {
      throw new Error("Sprites is not created");
    }
    if (spriteState === null) {
      throw new Error("Sprite state is not created");
    }
    if (sprites[spriteState] === null) {
      throw new Error("Sprite is not created");
    }

    return sprites[spriteState] as AnimatedSprite;
  }
}
