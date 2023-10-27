import { Actor, Engine, randomInRange, Color } from "excalibur";
import { getRandomScreenPosition } from "./utils/getRandomScreenPosition";

export class Destination extends Actor {
  public health: number = 100;
  public stuff: number = 100;

  constructor() {
    super({
      name: `Destination - ${randomInRange(1, 100)}`,
      width: 10,
      height: 10,
      color: Color.Red,
    });
  }

  onInitialize(_engine: Engine): void {
    this.pos = getRandomScreenPosition(_engine);
  }

  transact() {
    if (this.stuff < 1) {
      return;
    }

    this.stuff -= 1;
  }
}
