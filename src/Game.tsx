import { Engine, Color, DisplayMode } from "excalibur";
import { Destination } from "./Actors/Destination";
import { repeatExpressionCall } from "./utils/repeatExpressionCall";
import { Ship } from "./Actors/Ship";

export class Game extends Engine {
  constructor() {
    super({
      displayMode: DisplayMode.FitScreen,
      backgroundColor: Color.Black,
      canvasElementId: "canvas",
    });
  }
  initialize() {
    repeatExpressionCall(10, () => {
      this.add(new Destination());
    });
    repeatExpressionCall(100, () => {
      this.add(new Ship());
    });
    this.start();
  }
}
