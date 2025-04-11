import { Environment, OrbitControls } from "@react-three/drei";
import { Character } from "./Character";
import { Hexagon } from "./Hexagon";
import { Spongebobfish } from "./Spongebobfish";
import { GameArena } from "./GameArena";
import { useGameState } from "../hooks/useGameState";
import { myPlayer } from "playroomkit";
import { CharacterController } from "./CharacterController";
import { Podium } from "./Podium";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export const Experience = () => {

  const {players,stage}=useGameState();
  const me= myPlayer();

  const camera = useThree((state) => state.camera);
  const firstNonDeadPlayer = players.find((p) => !p.state.getState("dead"));

  useEffect(() => {
    if (stage === "countdown") {
      camera.position.set(0, 50, -50);
    }
  }, [stage]);

  return (
    <>
      <OrbitControls />
      <Environment files={"hdrs/medieval_cafe_1k.hdr"} />
      {stage === "winner" ? (
        <Podium />
      ) : ( 
        <>
        {stage !=="lobby" && <GameArena/>}
        {players.map(({state,controls})=>(
         <CharacterController
         key={state.id}
         state={state}
         controls={controls}
         player={me.id===state.id}
         firstNonDeadPlayer={firstNonDeadPlayer?.state.id === state.id}
         position-y={2}
   
         />
        ))}
        </>
       )}
    </>
  );
};
