import { Engine, Color, DisplayMode } from "excalibur";
import { Destination, DestinationKind } from "./Actors/Destination";
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
      this.add(
        new Destination({
          kind: DestinationKind.Trader,
        })
      );
    });
    repeatExpressionCall(36, () => {
      this.add(
        new Destination({
          kind: DestinationKind.Home,
        })
      );
    });
    repeatExpressionCall(42, () => {
      this.add(new Ship());
    });
    this.start();
  }
}
