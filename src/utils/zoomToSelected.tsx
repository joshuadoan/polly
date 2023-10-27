import { Actor, Camera } from "excalibur";
const MAX_ZOOM = 1.2;
export function zoomToSelected(meeple: Actor, camera: Camera) {
  camera.clearAllStrategies();
  camera.strategy.elasticToActor(meeple, 0.3, 0.3);
  camera.strategy.camera.zoomOverTime(MAX_ZOOM, 1000);
}