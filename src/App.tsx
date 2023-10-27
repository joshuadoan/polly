import React, { useEffect } from "react";
import { Game } from "./Game";

// import App from "./App";
export const App = () => {
  useEffect(() => {
    const game = new Game();
    game.initialize();
  }, []);
  return (
    <main className="h-screen w-screen">
      <header className=" bg-neutral-500">Header</header>
      <canvas id="canvas" className="w-full" />
    </main>
  );
};
