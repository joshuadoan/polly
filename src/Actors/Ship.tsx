import { Actor, Color, Engine, FontUnit, Label, vec, Font } from "excalibur";

import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
  countries,
  languages,
  names,
  starWars,
} from "unique-names-generator";

import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { getRandomInt } from "../utils/getRandomInt";
import { Destination, DestinationKind } from "./Destination";
import { getDestination } from "../utils/getDestination";
import { Game } from "../Game";

const MIN_SPEED = 25;
const MAX_SPEED = 50;

const TRANSACTION_TIME = 1000;
const HOME_TIME = 5000;

export enum ShipState {
  Idle = "idle",
  Traveling = "traveling",
  Working = "working",
  Home = "home",
}

export const isShip = (a: Actor) => a instanceof Ship;
export class Ship extends Actor {
  public destination: Destination | null = null;
  public labor: number = 0;
  public state: ShipState = ShipState.Idle;
  public weight: number = getRandomInt(MIN_SPEED, MAX_SPEED);
  public home?: Destination;

  constructor() {
    super({
      width: 2,
      height: 2,
      color: Color.Azure,
      name: uniqueNamesGenerator({
        dictionaries: [
          adjectives,
          animals,
          colors,
          countries,
          languages,
          names,
          starWars,
        ],
        style: "capital",
        separator: " ",
        length: 3,
      }),
    });
  }

  onInitialize(game: Game): void {
    this.pos = getRandomScreenPosition(game);
    this.home = getDestination(game, DestinationKind.Home);
    const label = new Label({
      name: "label",
      text: "",
      pos: vec(10, 0),
      font: new Font({
        size: 12,
        unit: FontUnit.Px,
        color: Color.DarkGray,
      }),
    });

    this.addChild(label);
  }

  update(game: Engine, delta: number): void {
    if (delta < 30) {
      return;
    }

    switch (this.state) {
      case ShipState.Idle: {
        if (this.labor < 3) {
          this.goToWork(game, () => this.setState(ShipState.Working));
        } else {
          this.goHome(game, () => this.setState(ShipState.Home));
        }

        break;
      }
      case ShipState.Working: {
        this.work(() => this.setState(ShipState.Idle));
        break;
      }
      case ShipState.Home: {
        this.chillAtHome(() => this.setState(ShipState.Idle));
        break;
      }
    }
  }

  transact() {
    this.labor++;
  }

  setLabel(text: string) {
    const label = this.children.find((c) => c.name === "label") as Label;
    label.text = text;

    this.actions.delay(3000).callMethod(() => {
      label.text = "";
    });
  }

  setState(state: ShipState) {
    this.state = state;
  }

  goToWork(game: Engine, onComplete: () => void) {
    const shop = getDestination(game, DestinationKind.Shop);

    this.actions
      .meet(shop, this.weight)
      .delay(TRANSACTION_TIME)
      .callMethod(() => {
        this.transact();
        onComplete();
      });
  }

  work(onComplete: () => void) {
    this.actions.delay(TRANSACTION_TIME).callMethod(() => {
      this.transact();
      onComplete();
    });
  }

  goHome(game: Engine, onComplete: () => void) {
    if (!this.home) {
      this.home = getDestination(game, DestinationKind.Home);
    }
    this.actions.meet(this.home, this.weight).callMethod(() => {
      onComplete();
    });
  }

  chillAtHome(onComplete: () => void) {
    this.labor = 0;
    this.actions.delay(HOME_TIME).callMethod(() => {
      onComplete();
    });
  }
}
