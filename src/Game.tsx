import { Engine, Loader, Color, DisplayMode } from "excalibur";
import { Destination } from "./Destination";

export class Game extends Engine {
  constructor() {
    super({
      displayMode: DisplayMode.FitContainerAndFill,
      backgroundColor: Color.Black,
      canvasElementId: "canvas",
      width: 500,
      height: 500,
    });
  }
  initialize() {
    Array.from({ length: 100 }, () => {
      const destination = new Destination();
      this.add(destination);
    });

    const loader = new Loader([]);
    this.start(loader);
  }
}
