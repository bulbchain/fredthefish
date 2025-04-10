
import { Spongebobfish } from "./Spongebobfish"
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";


import {
  CapsuleCollider,
  RigidBody,
  euler,
  quat,
  vec3,
} from "@react-three/rapier";
import { setState } from "playroomkit";
import { useRef, useState } from "react";
import { Vector3 } from "three";
import { Controls } from "../App";
import { useAudioManager } from "../hooks/useAudioManager";
import { useGameState } from "../hooks/useGameState";
import { FLOORS, FLOOR_HEIGHT } from "./GameArena";

const MOVEMENT_SPEED = 4.2;
const JUMP_FORCE = 8;
const ROTATION_SPEED = 2.5;
const vel = new Vector3();

export const CharacterController = ({

    player = false,
    controls,
    state,
    ...props
}) =>{
    const isDead = state.getState("dead");
    const [animation, setAnimation] = useState("idle");
    const { stage } = useGameState();
    const [,get]=useKeyboardControls();
    const rb= useRef();
    const inTheAir=useRef(true);
    const landed= useRef(false);
    

    useFrame(({camera})=>{
        if(stage==="lobby"){
            return;
        }
        if(stage!=="game"){
            return;
        }

        if (!player) {
            const pos = state.getState("pos");
            if (pos) {
              rb.current.setTranslation(pos);
            }
            const rot = state.getState("rot");
            if (rot) {
              rb.current.setRotation(rot);
            }
            const anim = state.getState("animation");
            setAnimation(anim);
            return;
          }

        const rotVel = {
            x: 0,
            y: 0,
            z: 0,
          };
      
          const curVel = rb.current.linvel();
          vel.x = 0;
          vel.y = 0;
          vel.z = 0;
      
          const angle = controls.angle();
          const joystickX = Math.sin(angle);
          const joystickY = Math.cos(angle);

          if (
            get()[Controls.forward] ||
            (controls.isJoystickPressed() && joystickY < -0.1)
          ) {
            vel.z += MOVEMENT_SPEED;
          }
          if (
            get()[Controls.back] ||
            (controls.isJoystickPressed() && joystickY > 0.1)
          ) {
            vel.z -= MOVEMENT_SPEED;
          }

          if (
            get()[Controls.left] ||
            (controls.isJoystickPressed() && joystickX < -0.1)
          ) {
            rotVel.y += ROTATION_SPEED;
          }
          if (
            get()[Controls.right] ||
            (controls.isJoystickPressed() && joystickX > 0.1)
          ) {
            rotVel.y -= ROTATION_SPEED;
          }
          rb.current.setAngvel(rotVel);

           // apply rotation to x and z to go in the right direction
    const eulerRot = euler().setFromQuaternion(quat(rb.current.rotation()));
    vel.applyEuler(eulerRot);
    if (
        (get()[Controls.jump] || controls.isPressed("Jump")) &&
        !inTheAir.current &&
        landed.current
      ) {
        vel.y += JUMP_FORCE;
        inTheAir.current = true;
        landed.current = false;
      } else {
        vel.y = curVel.y;
      }

      if (Math.abs(vel.y) > 1) {
        inTheAir.current = true;
        landed.current = false;
      } else {
        inTheAir.current = false;
      }
      rb.current.setLinvel(vel);
      state.setState("pos", rb.current.translation());
      state.setState("rot", rb.current.rotation());

    });

    return(
        <RigidBody 
        {...props} 
        colliders={false}
        canSleep={false}
    enabledRotations={[false, true, false]}
    ref={rb}
        >
          <Spongebobfish 
          scale={0.5}
          name={state.state.profile.name}
          position-y={0.2}
          />
             <CapsuleCollider args={[0.1,0.38]} position={[0,0.68,0]} />
        </RigidBody>
   
    )
}