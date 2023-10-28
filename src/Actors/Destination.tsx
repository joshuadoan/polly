import {
  Actor,
  Engine,
  randomInRange,
  Color,
  Text,
  Label,
  vec,
  Font,
  FontUnit,
  Entity,
} from "excalibur";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { randomArrayItem } from "../utils/randomArrayItem";

export enum DestinationKind {
  Home = "home",
  Shop = "shop",
}

const DESTINATION_COLORS = {
  [DestinationKind.Home]: Color.Magenta,
  [DestinationKind.Shop]: Color.ExcaliburBlue,
};

export const isDestination = (a: Actor) => a instanceof Destination;
export const isHome = (a: Destination) => a.kind === DestinationKind.Home;
export const isShop = (a: Destination) => a.kind === DestinationKind.Shop;
export class Destination extends Actor {
  public kind: DestinationKind = DestinationKind.Home;
  public health: number = 100;
  public label: string = "Hello";

  constructor({ kind = DestinationKind.Home }) {
    super({
      name: `Destination - ${randomInRange(1, 100)}`,
      width: 4,
      height: 4,
      color: Color.LightGray,
    });

    this.kind = kind;
    this.color = DESTINATION_COLORS[kind];
  }

  onInitialize(_engine: Engine): void {
    this.pos = getRandomScreenPosition(_engine);
    this.graphics.opacity = 0.5;
  }
}
