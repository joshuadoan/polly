import { Engine, Color, DisplayMode, Actor } from "excalibur";
import { Destination, DestinationKind } from "./Actors/Destination";
import { repeat } from "./utils/repeatExpressionCall";
import { Ship } from "./Actors/Ship";
import { getRandomScreenPosition } from "./utils/getRandomScreenPosition";

const NUMBER_OF_SHOPS = 32;
const NUMBER_OF_HOMES = 10;
const NUMBER_OF_SHIPS = 27;

export class Game extends Engine {
  public selected: Ship | null = null;
  constructor() {
    super({
      displayMode: DisplayMode.FitScreen,
      backgroundColor: Color.Black,
      canvasElementId: "canvas",
      antialiasing: false,
    });
  }
  setSelected(actor: Ship | null) {
    this.selected = actor;
  }
  initialize() {
    repeat(NUMBER_OF_SHOPS, () => {
      this.add(
        new Destination({
          kind: DestinationKind.Shop,
        })
      );
    });
    repeat(NUMBER_OF_HOMES, () => {
      this.add(
        new Destination({
          kind: DestinationKind.Home,
        })
      );
    });
    repeat(NUMBER_OF_SHIPS, () => {
      const ship = new Ship();
      this.setSelected(ship);
      this.add(ship);
    });

    repeat(1000, () => {
      this.add(
        new Actor({
          name: "star",
          width: 1,
          height: 1,
          color: Color.DarkGray,
          pos: getRandomScreenPosition(this),
        })
      );
    });
    this.start();
  }
}
