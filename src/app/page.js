"use client";
//import Image from "next/image";
//import Clock from "react-live-clock";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
  useRef,
} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";

const CountdownContext = createContext();

//library.add(faCrown, faSliders, faArrowsRotate);

const initialState = {
  minutes: 0,
  seconds: 5,
  playerOneScore: 0,
  playerOneAdvantageScore: 0,
  playerOnePenaltyScore: 0,
  playerTwoScore: 0,
  playerTwoAdvantageScore: 0,
  playerTwoPenaltyScore: 0,
  matchStarted: false,
  isRunning: false,
  matchEnded: false,
  isPaused: false,
  winner: null,
  isMatchReset: false,
  intervalId: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "MATCH_STARTED":
      return {
        ...state,
        matchStarted: (state.matchStarted = true),
        isRunning: (state.isRunning = true),
        isPaused: (state.isPaused = false),
        seconds: state.seconds <= 0 ? 59 : state.seconds - 1,
        minutes: state.seconds <= 0 ? state.minutes - 1 : state.minutes,
      };
    case "SET_COUNTDOWN_TIME":
      return {
        ...state,
        minutes: action.payload.minutes,
        seconds: action.payload.seconds === 0 ? 0 : 59,
      };

    case "MATCH_PAUSED":
      return {
        ...state,
        isRunning: (state.isRunning = false),
        isPaused: (state.isPaused = true),
      };
    case "MATCH_UNPAUSED":
      return {
        ...state,
        isRunning: (state.isRunning = true),
        isPaused: (state.isPaused = false),
      };
    // Player One Score Actions
    case "PLAYER_ONE_ADD_SCORE_TWO":
      return {
        ...state,
        playerOneScore: state.playerOneScore + 2,
      };
    case "PLAYER_ONE_SUBTRACT_SCORE_TWO":
      if (state.playerOneScore === 0 || state.playerOneScore < 0) {
        return state;
      }
      return {
        ...state,
        playerOneScore: state.playerOneScore - 2,
      };

    case "PLAYER_ONE_ADD_SCORE_THREE":
      return {
        ...state,
        playerOneScore: state.playerOneScore + 3,
      };
    case "PLAYER_ONE_SUBTRACT_SCORE_THREE":
      if (state.playerOneScore === 0 || state.playerOneScore < 0) {
        return state;
      }
      return {
        ...state,
        playerOneScore: state.playerOneScore - 3,
      };
    case "PLAYER_ONE_ADD_SCORE_FOUR":
      return {
        ...state,
        playerOneScore: state.playerOneScore + 4,
      };
    case "PLAYER_ONE_SUBTRACT_SCORE_FOUR":
      if (state.playerOneScore === 0 || state.playerOneScore < 0) {
        return state;
      }
      return {
        ...state,
        playerOneScore: state.playerOneScore - 4,
      };
    case "PLAYER_ONE_ADD_ADVANTAGE":
      return {
        ...state,
        playerOneAdvantageScore: state.playerOneAdvantageScore + 1,
      };
    case "PLAYER_ONE_SUBTRACT_ADVANTAGE":
      if (
        state.playerOneAdvantageScore === 0 ||
        state.playerOneAdvantageScore < 0
      ) {
        return state;
      }
      return {
        ...state,
        playerOneAdvantageScore: state.playerOneAdvantageScore - 1,
      };
    case "PLAYER_ONE_ADD_PENALTY":
      return {
        ...state,
        playerOnePenaltyScore: state.playerOnePenaltyScore + 1,
      };
    case "PLAYER_ONE_SUBTRACT_PENALTY":
      if (
        state.playerOnePenaltyScore === 0 ||
        state.playerOnePenaltyScore < 0
      ) {
        return state;
      }
      return {
        ...state,
        playerOnePenaltyScore: state.playerOnePenaltyScore - 1,
      };
    // End of Player One Score Actions

    // Player Two Score Actions
    case "PLAYER_TWO_ADD_SCORE_TWO":
      return {
        ...state,
        playerTwoScore: state.playerTwoScore + 2,
      };
    case "PLAYER_TWO_SUBTRACT_SCORE_TWO":
      if (state.playerTwoScore === 0 || state.playerTwoScore < 0) {
        return state;
      }
      return {
        ...state,
        playerTwoScore: state.playerTwoScore - 2,
      };
    case "PLAYER_TWO_ADD_SCORE_THREE":
      return {
        ...state,
        playerTwoScore: state.playerTwoScore + 3,
      };
    case "PLAYER_TWO_SUBTRACT_SCORE_THREE":
      if (state.playerTwoScore === 0 || state.playerTwoScore < 0) {
        return state;
      }
      return {
        ...state,
        playerTwoScore: state.playerTwoScore - 3,
      };
    case "PLAYER_TWO_ADD_SCORE_FOUR":
      return {
        ...state,
        playerTwoScore: state.playerTwoScore + 4,
      };
    case "PLAYER_TWO_SUBTRACT_SCORE_FOUR":
      if (state.playerTwoScore === 0 || state.playerTwoScore < 0) {
        return state;
      }
      return {
        ...state,
        playerTwoScore: state.playerTwoScore - 4,
      };
    case "PLAYER_TWO_ADD_ADVANTAGE":
      return {
        ...state,
        playerTwoAdvantageScore: state.playerTwoAdvantageScore + 1,
      };
    case "PLAYER_TWO_SUBTRACT_ADVANTAGE":
      if (
        state.playerTwoAdvantageScore === 0 ||
        state.playerTwoAdvantageScore < 0
      ) {
        return state;
      }
      return {
        ...state,
        playerTwoAdvantageScore: state.playerTwoAdvantageScore - 1,
      };
    case "PLAYER_TWO_ADD_PENALTY":
      return {
        ...state,
        playerTwoPenaltyScore: state.playerTwoPenaltyScore + 1,
      };
    case "PLAYER_TWO_SUBTRACT_PENALTY":
      if (
        state.playerTwoPenaltyScore === 0 ||
        state.playerTwoPenaltyScore < 0
      ) {
        return state;
      }
      return {
        ...state,
        playerTwoPenaltyScore: state.playerTwoPenaltyScore - 1,
      };
    // End Player Two Score Actions

    // End of Score Actions
    case "MATCH_ENDED":
      return {
        ...state,
        isRunning: (state.isRunning = false),
        matchEnded: (state.matchEnded = true),
      };

    case "PLAYER_ONE_WINS":
      return {
        ...state,
        winner: (state.winner = "One"),
        //isRunning: (state.isRunning = false),
       // matchEnded: (state.matchEnded = true),
      };
    case "PLAYER_TWO_WINS":
      return {
        ...state,
        winner: (state.winner = "Two"),
        //isRunning: (state.isRunning = false),
       // matchEnded: (state.matchEnded = true),
      };
    case "RESULT_DRAW":
      return {
        ...state,
        winner: (state.winner = "Draw"),
        //isRunning: (state.isRunning = false),
        //matchEnded: (state.matchEnded = true),
      };

    // Reset Actions
    case "RESET":
      return { ...initialState, isMatchReset: (state.isMatchReset = true) }; // Reset to initialState;
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export const CountdownProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CountdownContext.Provider value={{ state, dispatch }}>
      {children}
    </CountdownContext.Provider>
  );
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isOpen, setIsOpen] = useState(false);
  //const [settings, setSettings] = useState(false);

  const setTime = (newTime) => {
    dispatch({ type: "RESET" }); // Reset timer before setting new time
    dispatch({ type: "SET_COUNTDOWN_TIME", payload: newTime }); // Dispatch new time action
    console.log("setting new time!");
    console.log(state);
  };

  const handleSettingsClose = () => {
    setIsOpen(false);
    console.log(isOpen);
  };

  return (
    <CountdownProvider>
      <main className="flex flex-col items-center justify-center p-4 text-slate-200">
        <div className="bg-slate-9500 p-4 w-70 font-san font-normal text-5xl lg:text-15xl antialiased">
          <div>
            <Timer />
          </div>
          <DeclareWinner />
          <div className="flex flex-col items-start justify-center text-3xl text-slate-400">
            <h3>Competitor One</h3>
            <PlayerOne />
            <h3>Competitor Two</h3>
            <PlayerTwo />
          </div>
          <div className="grid items-center justify-center">
            <div className="flex items-start justify-center w-full">
              <div
                className="bg-[#8CE5BA] w-50 h-35 p-2 text-2xl flex rounded m-4 text-slate-950"
                onClick={() => setIsOpen(true)}
              >
                <FontAwesomeIcon className="fa-2xl" icon={faSliders} />{" "}
                <button className="ml-2 mt-1" onClick={() => setIsOpen(true)}>
                  Settings
                </button>
                {isOpen && (
                  <SettingsDialog
                    isOpen={isOpen}
                    onClose={() => handleSettingsClose()}
                    onSetTime={() => setTime}
                  />
                )}
                {/* Settings TODO: control timer, with default 5min control players background
      color future: add upload logo and display logo */}
              </div>
              <Reset />
              <p className="text-5xl p-4 text-slate-400">
                {/* <Clock format={"h:mm A"} ticking={true} /> */}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="italic underline decoration-sky-500">
            &copy; This is work in progress, and has a few bugs to sort out
            still before it can be fully usable.
          </p>
          <ul className="list-disc">
            <p className="font-bold">TODO:</p>
            <li>Fix Settings Dialogue</li>
            <li>Fix the Reset button actions</li>
            <li>Add sounds to: start, end match, timer finished.</li>
            <li>
              Add ability to change the second Competitor score background to
              match with band used.
            </li>
          </ul>
        </div>
      </main>
    </CountdownProvider>
  );
}

/**
 * Renders a timer component with a background color, padding, and rounded corners.
 *
 * @return {JSX.Element} The timer component.
 */
export function Timer(props) {
  const { state, dispatch } = useContext(CountdownContext);

  const minutes = String(state.minutes).padStart(1, "0");
  const seconds = String(state.seconds).padStart(2, "0");

  /**
   * Handles the start/pause button click. If the match hasn't started, starts the match.
   * If the match is running, pauses it. If the match is paused, unpauses it.
   */
  const handleStartPause = () => {
    if (!state.isRunning && !state.isPaused && !state.matchStarted) {
      // Start the match if it hasn't started
      dispatch({ type: "MATCH_STARTED" });
    } else if (state.isRunning && !state.isPaused && state.matchStarted) {
      // Pause the match if it's running
      dispatch({ type: "MATCH_PAUSED" });
    } else if (state.isPaused && !state.matchEnded && state.matchStarted) {
      // Unpause the match if it's paused
      dispatch({ type: "MATCH_UNPAUSED" });
    }
  };

  
    useEffect(() => {
      if (!state.matchEnded) {
      const createInterval = () => {
        state.intervalId = setInterval(() => {
          //dispatch({ type: "DECREMENT" });
          dispatch({ type: "MATCH_STARTED" });
        }, 1000);
      };
      const clearSessionInterval = () => {
        if (state.intervalId) {
          clearInterval(state.intervalId);
          state.intervalId = null;
        }
      };

      createInterval();
      if (state.isMatchReset) {
        dispatch({ type: "RESET" });
        clearSessionInterval();
      }

      if (
        state.isRunning &&
        !state.isPaused &&
        state.matchStarted &&
        !state.matchEnded
      ) {
      } else {
        // Cleanup function to clear the interval when the component unmounts
        if (state.intervalId) {
          clearInterval(state.intervalId);
        }
      }

      if (
        state.matchStarted &&
        state.isRunning &&
        state.isPaused &&
        !state.matchEnded
      ) {
        setTimeout(() => {
          dispatch({ type: "MATCH_PAUSED" });
        });
        console.log("match paused");
      } else if (
        state.isPaused &&
        !state.matchEnded &&
        !state.matchStarted &&
        state.isRunning
      ) {
        dispatch({ type: "MATCH_UNPAUSED" });
        console.log("match unpaused");
      } else if (
        state.matchEnded &&
        state.matchStarted &&
        state.isRunning &&
        !state.isPaused
      ) {
        // match ended and tally winner
        console.log("match ended");
        if (state.intervalId) {
          clearInterval(state.intervalId);
          state.intervalId = null;
          dispatch({ type: "MATCH_ENDED" });
        }
      }
      // Stop at 0:00 and clear the interval
      if (state.minutes <= 0 && state.seconds <= 0) {
        clearInterval(state.intervalId);
        state.intervalId = null;
        dispatch({ type: "MATCH_ENDED" });
      }

      if (state.winner === "One" || state.winner === "Two") {
        //console.log("Winner declared!");
        clearInterval(state.intervalId);
        state.intervalId = null;
        if (state.winner === "One" && state.matchEnded) {
          dispatch({ type: "PLAYER_ONE_WINS" });
        } else if (state.winner === "Two" && state.matchEnded) {
          dispatch({ type: "PLAYER_TWO_WINS" });
        }
      }
    
      // Cleanup function to clear the interval when the component unmounts
      return () => {
        console.log("cleanup");
        clearSessionInterval();
      };
    }
    }, [
      //setInterval,
      //createInterval,
      dispatch,
      state,
    ]);

  useEffect(() => {
    if (state.matchEnded && state.minutes <= 0 && state.seconds <= 0 && state.winner === null) {
      // Handle timer expire and tally of scores
      //clearSessionInterval();
      console.log("Timer Expired! Tallying Scores...");
      if (state.playerOneScore > state.playerTwoScore) {
        dispatch({ type: "PLAYER_ONE_WINS" });
      } else if (state.playerTwoScore > state.playerOneScore) {
        dispatch({ type: "PLAYER_TWO_WINS" });
      } else if (state.playerOneScore === state.playerTwoScore) {
        if (state.playerTwoAdvantageScore > state.playerOneAdvantageScore) {
          if (state.playerOnePenaltyScore < state.playerTwoPenaltyScore) {
            dispatch({ type: "PLAYER_ONE_WINS" });
          } else if (
            state.playerTwoPenaltyScore < state.playerOnePenaltyScore
          ) {
            dispatch({ type: "PLAYER_TWO_WINS" });
          } else {
          }
          dispatch({ type: "PLAYER_TWO_WINS" });
        } else if (
          state.playerOneAdvantageScore > state.playerTwoAdvantageScore
        ) {
          dispatch({ type: "PLAYER_ONE_WINS" });
        } else if (
          state.playerOneScore === state.playerTwoScore &&
          state.playerOneAdvantageScore === state.playerTwoAdvantageScore &&
          state.playerOnePenaltyScore === state.playerTwoPenaltyScore
        ) {
          //clearSessionInterval();
          dispatch({ type: "RESULT_DRAW" });
        }
      }
    }
  }, [state, dispatch]);

  return (
    <div
      className="flex items-center justify-center antialiased pl-60 pr-60 rounded font-semibold tracking-widest"
      onClick={handleStartPause}
    >
      {minutes} : {seconds}
      <div className="flex items-center justify-center">
        {state.isPaused && (
          <p className="text-10xl">
            <FontAwesomeIcon className="fa-2xl" icon={faPause} />
          </p>
        )}
      </div>
    </div>
  );
}
export function DeclareWinner() {
  const { state, dispatch } = useContext(CountdownContext);
  return (
    <div>
      {state.winner === "One" || state.winner === "Two" ? (
        <div className="flex items-center justify-center font-bold uppercase text-xl px-6 py-3 rounded shadow-[inset_0_-2px_15px_#cbd5e1]">
          <p className="">Competitor {state.winner} Wins!</p>
          <FontAwesomeIcon className="fa-2xl ml-4" icon={faCrown} />{" "}
        </div>
      ) : state.winner === "Draw" ? (
        <div className="flex items-center justify-center font-bold uppercase text-xl px-6 py-3 rounded shadow-[inset_0_-2px_15px_#cbd5e1]">
          <p>Its a DRAW!</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

/**
 * Renders the score component for Player One.
 *
 * @return {JSX.Element} The score component.
 */
export function PlayerOneScore() {
  /* const matchEnded = true;
  const winner = "competitor1"; */
  const { state, dispatch } = useContext(CountdownContext);

  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerOneAdvantageScore, setPlayerOneAdvantageScore] = useState(0);
  const [playerOnePenaltyScore, setPlayerOnePenaltyScore] = useState(0);
  return (
    <div className="flex flex-col-2 items-between justify-between ">
      <div className="z-10 bg-slate-300 text-center w-[170px] rounded font-bold text-15xl text-black">
        <p className="">{state.playerOneScore}</p>
      </div>
      <div className="text-sm ml-2 text-center">
        <div className="text-[#8CE5BA]">Advantage</div>
        <div className="-[#8CE5BA] text-5xl mb-4">
          {state.playerOneAdvantageScore}
        </div>
        <div className="text-red-800">Penalty</div>
        <div className="text-5xl text-red-800">
          {state.playerOnePenaltyScore}
        </div>
      </div>
    </div>
  );
}

/**
 * Renders the player two score component with a background color, width, padding, and rounded corners.
 *
 * @return {JSX.Element} The player two score component.
 */
export function PlayerTwoScore() {
  const { state, dispatch } = useContext(CountdownContext);
  /* const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [playerTwoAdvantageScore, setPlayerTwoAdvantageScore] = useState(0);
  const [playerTwoPenaltyScore, setPlayerTwoPenaltyScore] = useState(0); */

  return (
    <div className="flex flex-col-2 items-between justify-between ">
      <div className="z-10 bg-red-300 text-center w-[170px] rounded font-bold text-15xl text-black">
        <p className="">{state.playerTwoScore}</p>
      </div>
      <div className="text-sm ml-2 text-center">
        <div className="text-[#8CE5BA]">Advantage</div>
        <div className="-[#8CE5BA] text-5xl mb-4">
          {state.playerTwoAdvantageScore}
        </div>
        <div className="text-red-800">Penalty</div>
        <div className="text-5xl text-red-800">
          {state.playerTwoPenaltyScore}
        </div>
      </div>
    </div>
  );
}

/**
 * Renders and returns an element representing an addition point.
 *
 * @return {JSX.Element} The element representing an addition point.
 */
export function AddPoint() {
  return <div className="bg-[#8CE5BA]">+</div>;
}

/**
 * Renders the SubtractPoint component with a background color and a subtract symbol.
 *
 * @return {JSX.Element} The SubtractPoint component.
 */
export function SubtractPoint() {
  return <div className="bg-[#B71B1B]">-</div>;
}

/**
 * Renders the Settings component.
 *
 * @return {JSX.Element} The Settings component.
 */
export function SettingsBtn() {
  return (
    <div
      className="bg-[#8CE5BA] w-50 h-35 p-2 text-2xl flex rounded m-4 text-slate-950"
      onClick={() => setSettings(true)}
    >
      <FontAwesomeIcon className="fa-2xl" icon={faSliders} />{" "}
      <button className="ml-2 mt-1" onClick={() => setIsOpen(true)}>
        Settings
      </button>
      {/* Settings TODO: control timer, with default 5min control players background
      color future: add upload logo and display logo */}
    </div>
  );
}

export function Reset() {
  const { state, dispatch } = useContext(CountdownContext);

  return (
    <div
      className="bg-[#8CE5BA] w-50 h-35 p-2 text-2xl flex rounded m-4 text-slate-950"
      onClick={() => dispatch({ type: "RESET" })}
    >
      <FontAwesomeIcon className="fa-2xl" icon={faArrowsRotate} />{" "}
      <button className="ml-2 mt-1" onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>
      {/* Settings TODO: control timer, with default 5min control players background
      color future: add upload logo and display logo */}
    </div>
  );
}

export function PlayerOneEndMatch() {
  const { state, dispatch } = useContext(CountdownContext);
  const handlPlayerOneWinning = () => {
    dispatch({ type: "PLAYER_ONE_WINS" });
  };
  return (
    <div className="flex items-center justify-center text-[#8CE5BA]">
      <button onClick={handlPlayerOneWinning} className="ml-2 ">
        Winner
      </button>
    </div>
  );
}

export function PlayerTwoEndMatch() {
  const { state, dispatch } = useContext(CountdownContext);
  const handlPlayerTwoWinning = () => {
    dispatch({ type: "PLAYER_TWO_WINS" });
  };
  return (
    <div className="flex items-center justify-center text-[#8CE5BA]">
      <button onClick={handlPlayerTwoWinning} className="ml-2 ">
        Winner
      </button>
    </div>
  );
}

export function PlayerOneControls() {
  const { state, dispatch } = useContext(CountdownContext);
  const handlPlayerOneAddScoreTwo = () => {
    dispatch({ type: "PLAYER_ONE_ADD_SCORE_TWO" });
  };
  const handlPlayerOneAddScoreThree = () => {
    dispatch({ type: "PLAYER_ONE_ADD_SCORE_THREE" });
  };
  const handlPlayerOneAddScoreFoure = () => {
    dispatch({ type: "PLAYER_ONE_ADD_SCORE_FOUR" });
  };

  const handlPlayerOneSubtractScoreTwo = () => {
    dispatch({ type: "PLAYER_ONE_SUBTRACT_SCORE_TWO" });
  };
  const handlPlayerOneSubtractScoreThree = () => {
    dispatch({ type: "PLAYER_ONE_SUBTRACT_SCORE_THREE" });
  };
  const handlPlayerOneSubtractScoreFoure = () => {
    dispatch({ type: "PLAYER_ONE_SUBTRACT_SCORE_FOUR" });
  };

  const handlPlayerOneAddAdvantage = () => {
    dispatch({ type: "PLAYER_ONE_ADD_ADVANTAGE" });
  };
  const handlPlayerOneAddPenalty = () => {
    dispatch({ type: "PLAYER_ONE_ADD_PENALTY" });
  };

  const handlPlayerOneSubtractAdvantage = () => {
    dispatch({ type: "PLAYER_ONE_SUBTRACT_ADVANTAGE" });
  };
  const handlPlayerOneSubtractPenalty = () => {
    dispatch({ type: "PLAYER_ONE_SUBTRACT_PENALTY" });
  };

  return (
    <div className="text-xl tracking-wide w-[700px] flex flex-col-2 gap-4 bg-slate-950 p-4 mr-4">
      <div className="">
        <div className="text-[#8CE5BA] grid grid-rows-1 grid-flow-col gap-4">
          <button onClick={handlPlayerOneAddScoreTwo}>+2</button>
          <button onClick={handlPlayerOneAddScoreThree}>+3</button>
          <button onClick={handlPlayerOneAddScoreFoure}>+4</button>
          <button onClick={handlPlayerOneAddAdvantage}>+Advantage</button>
          <button onClick={handlPlayerOneAddPenalty}>+Penalty</button>
        </div>
        <div className="text-red-800 grid grid-rows-1 grid-flow-col gap-4">
          <button onClick={handlPlayerOneSubtractScoreTwo}>-2</button>
          <button onClick={handlPlayerOneSubtractScoreThree}>-3</button>
          <button onClick={handlPlayerOneSubtractScoreFoure}>-4</button>
          <button onClick={handlPlayerOneSubtractAdvantage}>-Advantage</button>
          <button onClick={handlPlayerOneSubtractPenalty}>-Penalty</button>
        </div>
      </div>
      <div className="text-[#8CE5BA] pt-2">
        <PlayerOneEndMatch />
      </div>
    </div>
  );
}

export function PlayerTwoControls() {
  const { state, dispatch } = useContext(CountdownContext);
  const handlPlayerTwoAddScoreTwo = () => {
    dispatch({ type: "PLAYER_TWO_ADD_SCORE_TWO" });
  };
  const handlPlayerTwoAddScoreThree = () => {
    dispatch({ type: "PLAYER_TWO_ADD_SCORE_THREE" });
  };
  const handlPlayerTwoAddScoreFoure = () => {
    dispatch({ type: "PLAYER_TWO_ADD_SCORE_FOUR" });
  };

  const handlPlayerTwoSubtractScoreTwo = () => {
    dispatch({ type: "PLAYER_TWO_SUBTRACT_SCORE_TWO" });
  };
  const handlPlayerTwoSubtractScoreThree = () => {
    dispatch({ type: "PLAYER_TWO_SUBTRACT_SCORE_THREE" });
  };
  const handlPlayerTwoSubtractScoreFoure = () => {
    dispatch({ type: "PLAYER_TWO_SUBTRACT_SCORE_FOUR" });
  };

  const handlPlayerTwoAddAdvantage = () => {
    dispatch({ type: "PLAYER_TWO_ADD_ADVANTAGE" });
  };
  const handlPlayerTwoAddPenalty = () => {
    dispatch({ type: "PLAYER_TWO_ADD_PENALTY" });
  };

  const handlPlayerTwoSubtractAdvantage = () => {
    dispatch({ type: "PLAYER_TWO_SUBTRACT_ADVANTAGE" });
  };
  const handlPlayerTwoSubtractPenalty = () => {
    dispatch({ type: "PLAYER_TWO_SUBTRACT_PENALTY" });
  };

  return (
    <div className="text-xl tracking-wide w-[700px] flex flex-col-2 gap-4 bg-slate-950 p-4 mr-4">
      <div className="">
        <div className="text-[#8CE5BA] grid grid-rows-1 grid-flow-col gap-4">
          <button onClick={handlPlayerTwoAddScoreTwo}>+2</button>
          <button onClick={handlPlayerTwoAddScoreThree}>+3</button>
          <button onClick={handlPlayerTwoAddScoreFoure}>+4</button>
          <button onClick={handlPlayerTwoAddAdvantage}>+Advantage</button>
          <button onClick={handlPlayerTwoAddPenalty}>+Penalty</button>
        </div>
        <div className="text-red-800 grid grid-rows-1 grid-flow-col gap-4">
          <button onClick={handlPlayerTwoSubtractScoreTwo}>-2</button>
          <button onClick={handlPlayerTwoSubtractScoreThree}>-3</button>
          <button onClick={handlPlayerTwoSubtractScoreFoure}>-4</button>
          <button onClick={handlPlayerTwoSubtractAdvantage}>-Advantage</button>
          <button onClick={handlPlayerTwoSubtractPenalty}>-Penalty</button>
        </div>
      </div>
      <div className="text-[#8CE5BA] pt-2">
        <PlayerTwoEndMatch />
      </div>
    </div>
  );
}

export function PlayerOne() {
  return (
    <div className="text-xl md:flex items-start justify-between">
      <PlayerOneControls />
      <PlayerOneScore />
    </div>
  );
}

export function PlayerTwo() {
  return (
    <div className="text-xl md:flex items-start justify-between">
      <PlayerTwoControls />
      <PlayerTwoScore />
    </div>
  );
}

export const SettingsDialog = ({ isOpen, onClose, onSetTime }) => {
  const { state, dispatch } = useContext(CountdownContext);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetTime({ minutes, seconds });
    //dispatch({type: "SET_COUNTDOWN_TIME"});
    console.log(state);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`settings-modal ${isOpen ? "open" : ""} text-xl`}>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="minutes">Minutes:</label>
          <input
            type="number"
            id="minutes"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="seconds">Seconds:</label>
          <input
            type="number"
            id="seconds"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value))}
          />
        </div>
        <button type="submit">Set</button>
      </form>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};
