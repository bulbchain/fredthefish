import { openDiscordInviteDialog } from "playroomkit";
import { useAudioManager } from "../hooks/useAudioManager";
import { useGameState } from "../hooks/useGameState";

export const UI = () => {
  const { audioEnabled, setAudioEnabled } = useAudioManager();

  const {timer,startGame,host,stage}=useGameState();

  return (
    <main
      className={`fixed z-10 inset-0 pointer-events-none grid place-content-center
        ${
          stage ==="lobby" ? "bg-black/40" : "bg-transparent"
        } transition-colors duration-1000`}
    >
      {timer>=0 &&( 
        <h2 className="absolute right-8 top-14 text-5xl text-white font-black">
       {timer}
      </h2>
      )}

        <a href="https://dexscreener.com/">
        <img src="images/DexLogo.png" className="pointer-events-auto absolute top-8 right-20 w-4 h-4 transition duration-300 hover:scale-110 hover:rotate-5 hover:opacity-80" />
        </a>

        <a href="https://x.com/fredthefish">
        <img src="images/xLogo.png" className="pointer-events-auto absolute top-8 right-14 w-4 h-4 transition duration-300 hover:scale-110 hover:rotate-5 hover:opacity-80" />
        </a>

        <a href="https://dexscreener.com/">
        <img src="images/teleLogo.png" className="pointer-events-auto absolute top-8 right-8 w-4 h-4 transition duration-300 hover:scale-110 hover:rotate-5 hover:opacity-80" />
        </a> 

      
      <img src="images/logo.png" className="absolute top-4 left-2 w-14 h-14 md:w-28 md:h-28 sm:w-14 sm:h-14" />
      {stage === "lobby" && (
        <>
          {host ? (
            <button
              className="pointer-events-auto 
              bg-gradient-to-br from-orange-500 to-yellow-500 
              hover:opacity-80 transition-all duration-200 
              px-12 py-4 rounded-lg font-black text-xl text-white drop-shadow-lg"
              onClick={startGame}
            >
              START
            </button>
          ) : (
            <p className="italic text-white">
              Waiting for the host to start the game...
            </p>
          )}
          {/* <button
            className="mt-4 pointer-events-auto 
            bg-gradient-to-br from-orange-500 to-yellow-500 
            hover:opacity-80 transition-all duration-200 
            px-12 py-4 rounded-lg font-black text-xl text-white drop-shadow-lg"
            onClick={openDiscordInviteDialog}
          >
            INVITE
          </button> */}
        </>
      )}
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-auto"
        onClick={() => setAudioEnabled(!audioEnabled)}
      >
        {audioEnabled ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 fill-white stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 fill-white stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>
        )}
      </button>
    </main>
  );
};
