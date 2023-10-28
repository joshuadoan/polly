import React from "react";
import { Game } from "./Game";
import { Ship } from "./Actors/Ship";
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
  }, []);

  React.useEffect(
    function zoomToSelected() {
      if (!gameRef.current) {
        return;
      }

      if (state.selected) {
        zoomToActor(state.selected, gameRef.current.currentScene.camera);
      }
    },
    [state.selected]
  );

  React.useEffect(function syncState() {
    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        selected: gameRef?.current?.selected ?? null,
      }));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="h-screen w-screen bg-black">
      <header className=" bg-neutral-500">
        <button
          onClick={() => {
            console.log(gameRef.current?.selected);
          }}
        >
          click
        </button>
        {state.selected?.name} {state?.selected?.labor} {state?.selected?.state}
      </header>
      <canvas id="canvas" className="w-full h-full ml-auto mr-auto" />
    </main>
  );
};
