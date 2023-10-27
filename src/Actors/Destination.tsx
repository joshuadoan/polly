import { Actor, Engine, randomInRange, Color } from "excalibur";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";

export enum DestinationKind {
  Home = "home",
  Trader = "trader",
}

const DESTINATION_COLORS = {
  [DestinationKind.Home]: Color.Magenta,
  [DestinationKind.Trader]: Color.ExcaliburBlue,
};

export class Destination extends Actor {
  public kind: DestinationKind = DestinationKind.Home;
  public health: number = 100;
  public stuff: number = 100;

  constructor({ kind = DestinationKind.Home }) {
    super({
      name: `Destination - ${randomInRange(1, 100)}`,
      width: 8,
      height: 8,
      color: Color.Cyan,
    });

    this.kind = kind;
    this.color = DESTINATION_COLORS[kind];
  }

  onInitialize(_engine: Engine): void {
    this.pos = getRandomScreenPosition(_engine);
    this.graphics.opacity = 0.5;
  }

  transact() {
    if (this.stuff < 1) {
      return;
    }

    this.stuff -= 1;
  }
}
