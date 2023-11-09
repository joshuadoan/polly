import {
  Actor,
  Color,
  Engine,
  FontUnit,
  Label,
  vec,
  Font,
  Timer,
} from "excalibur";

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

const TRANSACTION_TIME = 2000;

export enum ShipState {
  Idle = "idle",
  TravelingToWork = "traveling to work",
  Working = "working",
  TravelingHome = "traveling home",
  Home = "home",
}

export enum ShipAction {
  GoToWork = "go to work",
  GoHome = "go home",
}

const dictionaries = [
  adjectives,
  animals,
  colors,
  countries,
  languages,
  names,
  starWars,
];

export const isShip = (a: Actor) => a instanceof Ship;
export class Ship extends Actor {
  public destination: Destination | null = null;
  public labor: number = 0;
  public laborThreshold: number = 10;
  public state: ShipState = ShipState.Idle;
  public speed: number = getRandomInt(MIN_SPEED, MAX_SPEED);
  public home?: Destination;
  public game: Game | null = null;
  constructor() {
    super({
      width: 2,
      height: 2,
      color: Color.Azure,
      name: uniqueNamesGenerator({
        dictionaries,
        style: "capital",
        separator: " ",
        length: 3,
      }),
    });
  }

  onInitialize(game: Game): void {
    this.pos = getRandomScreenPosition(game);
    this.home = getDestination(game, DestinationKind.Home);
    this.game = game;

    const timer = new Timer({
      fcn: () => this.timer(this),
      repeats: true,
      interval: 1000,
    });

    game.add(timer);

    timer.start();
  }

  timer(ship: Ship): void {
    console.log(ship.labor);
    switch (this.state) {
      case ShipState.Home:
        this.labor--;
        break;
      case ShipState.TravelingToWork:
        break;
      case ShipState.Working:
        this.labor++;
        break;
    }
  }

  dispatch(action: ShipAction) {
    switch (action) {
      case ShipAction.GoToWork:
        this.setState(ShipState.TravelingToWork);
        this.travel(getDestination(this.game, DestinationKind.Shop)).callMethod(
          () => {
            this.setState(ShipState.Working);
          }
        );

        break;
      case ShipAction.GoHome:
        this.setState(ShipState.TravelingHome);
        this.travel(getDestination(this.game, DestinationKind.Home)).callMethod(
          () => {
            this.setState(ShipState.Home);
          }
        );
        break;
    }
  }

  update(): void {
    // if (!this.actions.getQueue().isComplete()) {
    //   return;
    // }
    switch (this.state) {
      case ShipState.Idle: {
        this.dispatch(ShipAction.GoToWork);
        break;
      }
      case ShipState.Working: {
        if (this.labor > this.laborThreshold) {
          this.dispatch(ShipAction.GoHome);
        }
        break;
      }
      case ShipState.Working: {
        if (this.labor < 1) {
          this.dispatch(ShipAction.GoToWork);
        }
        break;
      }
    }
  }

  setState(state: ShipState) {
    this.state = state;
  }

  travel(destination: Destination) {
    return this.actions.meet(destination, this.speed).delay(TRANSACTION_TIME);
  }
}
