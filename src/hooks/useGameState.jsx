import { isHost, Joystick, onPlayerJoin, useMultiplayerState } from "playroomkit";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const gameStateContext= createContext();

const NEXT_STAGE={
    lobby:"countdown",
    countdown:"game",
    game:"winner",
    winner:"lobby",
};

const TIMER_STAGE={
    lobby:-1,
    countdown:3,
    game:0,
    winner:5,
}

export const GameStateProvider = ({children})=>{
    const [stage,setStage]=useMultiplayerState("gameStage", "lobby");
    const [timer,setTimer]=useMultiplayerState("timer", TIMER_STAGE.lobby);
    const [players,setPlayers]=useState([]);
    const [soloGame,setSoloGame]=useState(false);

    const host =isHost();
    const isInit=useRef(false);
    useEffect(()=>{
        if (isInit.current) {return;}
        isInit.current=true;

        onPlayerJoin((state)=>{
            const controls = new Joystick(state,{
                type:"angular",
                buttons:[{id:"jump",label:"jump"}]
            });
            const newPlayer={state,controls};
            setPlayers((players)=>[...players,newPlayer]);
            state.onQuit(()=>{
                setPlayers((players)=>players.filter((pl)=>pl.state.id!==state.id));
            });
        });
    },[]);


    useEffect(()=>{
        if(!host){return;}

        if(stage==="lobby"){
            return;
        }

        const timeout= setTimeout(()=>{
            let newTime =stage==="game"?timer+1:timer-1;
            if(newTime===0){
                const newStage=NEXT_STAGE[stage];
                setStage(newStage,true);
                newTime=TIMER_STAGE[newStage];
            }
            setTimer(newTime,true);
        },1000);
        return ()=>clearTimeout(timeout);
    },[host,timer,stage,soloGame]);


const startGame =()=>{
setStage("countdown");
setTimer(TIMER_STAGE.countdown);
setSoloGame(players.length===1);

};


return(
    <gameStateContext.Provider 
    value={{
        stage,
        timer,
        players,
        host,
       startGame,
    }}>
        {children}
    </gameStateContext.Provider>
)
}

export const useGameState = () => {
    const context = useContext(gameStateContext);
    if (!context) {
        throw new Error("useGameState must be used within a GameStateProvider");
    }
    return context;
}