import { vec } from "excalibur";
import { Game } from "../Game";

export function getCenterVec(game: Game) {
  let center = vec(
    (game.drawWidth / 2) * game.currentScene.camera.zoom,
    (game.drawHeight / 2) * game.currentScene.camera.zoom
  );

  return center;
}
