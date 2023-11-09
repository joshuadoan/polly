import React from "react";
import cx from "classnames";
import { Game } from "./Game";
import { Ship, ShipState } from "./Actors/Ship";
import { zoomToActor } from "./utils/zoomToSelected";

export const App = () => {
  const [state, setState] = React.useState<{
    selected: Ship | null;
  }>({
    selected: null,
  });
  let gameRef = React.useRef<Game | null>(null);

  React.useEffect(function initGame() {
    const game = new Game();
    game.initialize();
    gameRef.current = game;

    const interval = setInterval(() => {
      if (gameRef?.current?.selected) {
        setState((prev) => ({
          ...prev,
          selected: gameRef?.current?.selected ?? null,
        }));
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  function zoomToSelected() {
    if (!gameRef.current) {
      return;
    }

    if (state.selected) {
      zoomToActor(state.selected, gameRef.current.currentScene.camera);
    }
  }

  function handleSelectionChange() {
    if (state.selected) {
      zoomToSelected();
    }
  }

  React.useEffect(handleSelectionChange, [state.selected]);

  return (
    <main className="h-screen w-screen bg-black">
      <header>
        <ShipInfo ship={state.selected} />
      </header>
      <canvas id="canvas" className="w-full h-full ml-auto mr-auto" />
    </main>
  );
};

const ShipInfo = (props: { ship: Ship | null }) => {
  if (!props.ship) {
    return null;
  }

  const { pos, state, name, labor, laborThreshold } = props.ship;

  return (
    <div className="stats stats-vertical shadow absolute top-4 left-4 opacity-80">
      <div className="stat">
        <div className="stat-title">{name}</div>
        <div className="stat-value">{state}</div>
        <div className="stat-desc mb-2">
          {Math.round(pos.y)}° - {Math.round(pos.x)}°
        </div>
        <progress
          className="progress w-56 w-full"
          value={labor}
          max={laborThreshold}
        ></progress>
      </div>
    </div>
  );
};
