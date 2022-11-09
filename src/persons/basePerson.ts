import {
  Application,
  IPointData,
  Sprite,
  Ticker,
  AnimatedSprite,
} from "pixi.js";
import { generateId, wait } from "../helper";
import isEqual from "lodash.isequal";
import cloneDeep from "lodash.clonedeep";

export interface MainPersonProps {
  speed?: number;
  scale?: number;
  startX?: number;
  startY?: number;
  animationSpeed?: number;
}

const initialProps: MainPersonProps = {
  speed: 5,
  scale: 0.5,
  startX: 0,
  startY: 0,
  animationSpeed: 0.5,
};

interface PersonState {
  isIdle: boolean;
  isRunning: boolean;
}

const initialState: PersonState = {
  isIdle: true,
  isRunning: false,
};

export class BasePerson {
  get personRunSprite(): AnimatedSprite | null {
    return this._personRunSprite;
  }

  set personRunSprite(value: AnimatedSprite | null) {
    this._personRunSprite = value;
  }
  public id: string = generateId();

  constructor(
    private app: Application,
    public props: MainPersonProps = initialProps,
    public isSelected: boolean = false
  ) {}

  protected person: Sprite | AnimatedSprite | null = null;

  private futurePosition = {
    x: this.props.startX || 0,
    y: this.props.startY || 0,
  };

  private state: PersonState = initialState;
  private prevState: PersonState = initialState;

  private _personRunSprite: AnimatedSprite | null = null;

  selectedColor = 0x00ff00;
  normalColor = 0xffffff;

  initPerson(): void {
    this.mergeProps();

    if (this.props.scale === undefined) {
      throw new Error("Scale is not defined");
    }
    if (this.props.speed === undefined) {
      throw new Error("Speed is not defined");
    }

    const person = this.buildPersonForChild();

    this.updatePersonInStage(person);
    this.person = person;

    this.initListeners();
  }

  protected buildPersonForChild(): Sprite | AnimatedSprite {
    return this.buildPerson();
  }

  private updatePersonInStage(person: Sprite | AnimatedSprite): void {
    if (this.person !== null) {
      this.app.stage.removeChild(this.person);
    }
    this.app.stage.addChild(person);
  }

  public async selectPerson(): Promise<void> {
    // Меняет приоритет в очереди в зависимости от выбранности
    await wait(this.isSelected ? 1 : 3);
    if (this.person === null) {
      throw new Error("Person is not created");
    }
    this.isSelected = !this.isSelected;
    this.person.tint = this.isSelected ? this.selectedColor : this.normalColor;
  }

  public async unselectPerson(): Promise<void> {
    if (this.person === null) {
      throw new Error("Person is not created");
    }
    this.isSelected = false;
    this.person.tint = this.normalColor;
  }

  private buildPerson(
    sprite: AnimatedSprite | null = null
  ): Sprite | AnimatedSprite {
    if (this.props.startX === undefined) {
      throw new Error("Start x is not defined");
    }
    if (this.props.startY === undefined) {
      throw new Error("Start y is not defined");
    }

    const personImage = require("../../img/person.png");
    const person = sprite ? sprite : Sprite.from(personImage);

    person.x = this.person?.x ?? this.props.startX;
    person.y = this.person?.y ?? this.props.startY;
    person.scale.set(this.props.scale);
    person.anchor.set(0.5, 0.9);

    if (sprite instanceof AnimatedSprite) {
      (person as AnimatedSprite).animationSpeed =
        this.props.animationSpeed || 1;
      (person as AnimatedSprite).play();
    }

    return person;
  }

  private initListeners(): void {
    this.personMotion();
    this.mouseListener();
  }

  private personMotion(): void {
    const ticker = new Ticker();
    ticker.add(this.animationOfMovement.bind(this));
    debugger;
    if (
      this.person instanceof AnimatedSprite &&
      this.personRunSprite !== null &&
      this.getState().isRunning
    ) {
      ticker.add(this.animatePersonSpriteRun.bind(this));
    }
    ticker.start();
  }

  private animationOfMovement() {
    if (this.person === null) {
      throw new Error("Person is not created");
    }
    if (this.props.speed === undefined) {
      throw new Error("Speed is not defined");
    }

    if (
      this.futurePosition.x !== this.person.x ||
      this.futurePosition.y !== this.person.y
    ) {
      this.setState({
        isIdle: false,
        isRunning: true,
      });
      if (this.futurePosition.x > this.person.x) {
        this.person.x += this.props.speed;
      }
      if (this.futurePosition.x < this.person.x) {
        this.person.x -= this.props.speed;
      }
      if (this.futurePosition.y > this.person.y) {
        this.person.y += this.props.speed;
      }
      if (this.futurePosition.y < this.person.y) {
        this.person.y -= this.props.speed;
      }
    } else {
      this.setState({
        isIdle: true,
        isRunning: false,
      });
    }
  }

  private animatePersonSpriteRun() {
    if (this.person === null) {
      throw new Error("Person is not created");
    }
    const state = this.getState();

    if (
      state.isRunning &&
      !this.prevState.isRunning &&
      this.personRunSprite !== null
    ) {
      debugger;
      const runningPerson = this.buildPerson(this.personRunSprite);
      this.updatePersonInStage(runningPerson);
    }
  }

  private mouseListener(): void {
    this.app.stage.on("click", async (event) => {
      // Приоритет в очереди, должен срабатывать после события selectPerson
      await wait(2);
      if (!this.isSelected) {
        return;
      }
      if (this.person === null) {
        throw new Error("Person is not created");
      }
      this.animationSetPosition(event.clientX, event.clientY);
    });
  }

  private animationSetPosition(x: number, y: number): void {
    if (this.person === null) {
      throw new Error("Person is not created");
    }

    this.flipPersonToFuturePosition(x, y);

    this.futurePosition.x = x;
    this.futurePosition.y = y;
  }

  private flipPersonToFuturePosition(x: number, y: number) {
    if (this.person === null) {
      throw new Error("Person is not created");
    }
    if (x > this.person.x) {
      this.person.scale.x = this.props.scale || 1;
    }
    if (x < this.person.x) {
      this.person.scale.x *= -1;
    }
  }

  private mergeProps(): void {
    this.props = { ...initialProps, ...this.props };
  }

  containsPoint(point: IPointData): boolean {
    if (this.person === null) {
      throw new Error("Person is not created");
    }

    return this.person.containsPoint(point);
  }

  private setState(newState: Partial<PersonState>): void {
    if (isEqual(this.state, newState)) {
      return;
    }

    this.prevState = cloneDeep(this.state);
    this.state = {
      ...this.state,
      ...newState,
    };
  }

  private getState(): PersonState {
    return this.state;
  }
}
