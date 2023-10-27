import { Actor, Engine, randomInRange, Color } from "excalibur";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { getRandomInt } from "../utils/getRandomInt";
import { Destination } from "./Destination";

const MAX_SPEED = 42;

function getRandomFromList<L>(list: Array<L>) {
  return list[Math.floor(Math.random() * list.length)];
}

export class Ship extends Actor {
  public weight: number = getRandomInt(MAX_SPEED, 0);
  public stuff: number = 0;

  constructor() {
    super({
      name: `Destination - ${randomInRange(1, 100)}`,
      width: 2,
      height: 2,
      color: Color.Cyan,
    });
  }

  onInitialize(_engine: Engine): void {
    this.pos = getRandomScreenPosition(_engine);
    this.actions.repeatForever((repeatContext) => {
      const destination = getRandomFromList(
        _engine.currentScene.actors.filter((a) => a instanceof Destination)
      );

      if (destination) {
        repeatContext.meet(destination, MAX_SPEED - this.weight);
      }
    });
  }
}
