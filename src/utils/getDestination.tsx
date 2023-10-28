import { Engine } from "excalibur";
import {
  Destination,
  DestinationKind,
  isDestination,
} from "../Actors/Destination";
import { randomArrayItem } from "./randomArrayItem";

export function getDestination(game: Engine, kind: DestinationKind) {
  const { actors } = game.currentScene;
  const destinations = actors.filter(isDestination) as Destination[];
  return randomArrayItem(
    destinations.filter((a: Destination) => a.kind === kind)
  );
}
