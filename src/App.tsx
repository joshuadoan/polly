import React, { useEffect } from "react";
import { Game } from "./Game";

export const App = () => {
  useEffect(() => {
    const game = new Game();
    game.initialize();
  }, []);
  return (
    <main className="h-screen w-screen bg-black">
      <header className=" bg-neutral-500">Header</header>
      <canvas id="canvas" className="w-full h-full ml-auto mr-auto" />
    </main>
  );
};
