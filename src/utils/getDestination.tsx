import {
  Destination,
  DestinationKind,
  isDestination,
} from "../Actors/Destination";
import { randomArrayItem } from "./randomArrayItem";
import { Game } from "../Game";

export function getDestination(game: Game | null, kind: DestinationKind) {
  if (!game) {
    throw new Error("game is required");
  }

  const { actors } = game.currentScene;
  const destinations = actors.filter(isDestination) as Destination[];
  return randomArrayItem(
    destinations.filter((a: Destination) => a.kind === kind)
  );
}
