import { Box } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { getState } from "playroomkit";
import { useEffect } from "react";
import { useAudioManager } from "../hooks/useAudioManager";
import { useGameState } from "../hooks/useGameState";
import { Character } from "./Character";
import { Spongebobfish } from "./Spongebobfish";

export const Podium = () => {
  const { winner } = useGameState();
  const winnerProfile = winner || getState("lastDead");
  const camera = useThree((state) => state.camera);
  const { playAudio } = useAudioManager();
  useEffect(() => {
    camera.position.set(5, 4, 12);
    camera.lookAt(0, 2, 0);
    playAudio("Kids Cheering", true);
    return () => {
      camera.position.set(0, 16, 10);
      camera.lookAt(0, 0, 0);
    };
  }, []);
  return (
    <group>
      <Spongebobfish
        name={winnerProfile?.name}
        color={winnerProfile?.color}
        position-y={0.5}
      />
      <Box scale-x={4} scale-z={2}>
        <meshStandardMaterial color="white" />
      </Box>
    </group>
  );
};
