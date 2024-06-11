"use client";
//import Image from "next/image";
//import Clock from "react-live-clock";

/*
* TODO:
    Fix Settings Dialogue
    Fix the Reset button actions
    Add sounds to: start, end match, timer finished. &#x2713;
    Add ability to change the second Competitor score background to
    match with band used.
*/
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
  useRef,
} from "react";

//import useState from "react-usestateref";

import { Accordion, AccordionItem } from "@nextui-org/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

//import bellSound from "./assets/sounds/Bell.mp3";
const initialState = {
  minutes: 5,
  seconds: 0,
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
  isSettingDilagogOpen: false,
};

const CountdownContext = createContext(null);

//library.add(faCrown, faSliders, faArrowsRotate);

export const reducer = (state, action) => {
  switch (action.type) {
    // Player One Score Actions
    case "PLAYER_ONE_ADD_SCORE_ONE":
      return {
        ...state,
        playerOneScore: state.playerOneScore + 1,
      };
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
    case "PLAYER_TWO_ADD_SCORE_ONE":
      return {
        ...state,
        playerTwoScore: state.playerTwoScore + 1,
      };
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
    case "MATCH_STARTED":
      return {
        ...state,
        matchStarted: (state.matchStarted = true),
        isMatchReset: (state.isMatchReset = false),
        isRunning: (state.isRunning = true),
        isPaused: (state.isPaused = false),
        seconds: state.seconds === 0 ? 59 : state.seconds - 1,
        minutes: state.seconds === 0 ? state.minutes - 1 : state.minutes,
      };
    case "SET_COUNTDOWN_TIME":
      (initialState.minutes = action.payload.minutes),
        (initialState.seconds =
          action.payload.seconds === 0 ? 0 : action.payload.seconds);
      //console.log(initialState);
      return {
        ...state,
        matchStarted: (state.matchStarted = false),
        minutes: action.payload.minutes,
        seconds: action.payload.seconds === 0 ? 0 : action.payload.seconds,
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
    // End of Score Actions
    case "MATCH_ENDED":
      return {
        ...state,
        isRunning: (state.isRunning = false),
        matchEnded: (state.matchEnded = true),
        matchStarted: (state.matchStarted = false),
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

    // Settings
    case "OPEN_SETTINGS":
      return {
        ...state,
        isSettingDilagogOpen: (state.isSettingDilagogOpen = true),
      };
    case "CLOSE_SETTINGS":
      return {
        ...state,
        isSettingDilagogOpen: (state.isSettingDilagogOpen = false),
        //isMatchReset: (state.isMatchReset = true),
      };
    // Reset Actions
    case "RESET_STATE":
      return {
        ...initialState,
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
        isSettingDilagogOpen: false,
      }; // initialState;
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
  const [isSettingDilagogOpen, setIsSettingDilagogOpen] = useState(false);

  const handleSettingsOpen = () => {
    setIsSettingDilagogOpen(true);
  };

  return (
    <CountdownProvider>
      <main className="min-h-screen flex flex-col items-center dark:text-slate-200">
        <div className="lg:max-[1300px]:scale-[.85] dark:bg-slate-9500 p-4 lg:max-[1300px]:p-0 lg:w-70 font-san font-normal text-5xl lg:text-15xl antialiased">
          <div>
            <Timer />
          </div>
          <DeclareWinner />
          <div className="lg:flex lg:flex-col lg:items-start lg:justify-center text-xl lg:text-3xl dark:text-slate-400">
            <h3>Competitor One</h3>
            <PlayerOne />
            <h3>Competitor Two</h3>
            <PlayerTwo />
          </div>
          <div className="lg:grid lg:items-center lg:justify-center">
            <div className="flex items-center justify-center gap-4 lg:gap-8 w-full">
              <div className="bg-[#8CE5BA] w-[130px] lg:w-[150px] lg:h-[55px] p-2 text-xl lg:text-2xl flex items-center justify-center rounded text-slate-950">
                <button className="" onClick={handleSettingsOpen}>
                  <FontAwesomeIcon className="" icon={faSliders} /> Settings
                </button>
                <SettingsDialog
                  isSettingDilagogOpen={isSettingDilagogOpen}
                  setIsSettingDilagogOpen={setIsSettingDilagogOpen}
                />
                {/* Settings TODO: control timer, with default 5min control players background
      color future: add upload logo and display logo */}
              </div>
              <Reset />
            </div>
          </div>
        </div>
        <div className="ml-5 antialiased">
          <Accordion variant="shadow">
            <AccordionItem key="1" title="How To Use?" aria-label="How To Use" className="list-disc font-bold bg-slate-900 rounded p-2 text-white w-11/12"> 
              <ul className="list-disc whitespace-pre-wrap font-normal">
                <li>Click settings if you wish to change the timer</li>
                <li>
                  Click start located under the timer to start or the timer
                  itself
                </li>
                <li>
                  To pause the timer, click the pause button or the timer itself{" "}
                </li>
                <li>To reset the timer, click the reset button</li>
                <li>To add points, click the +(#) text corrosponding to the competitor, or the score 
                  itself to add points
                </li>
                <li>
                  To end the match, in the Competitor One or Competitor Two
                  control panel click the Winner word to declare that competitor
                  the winner.
                </li>
                <li>
                  If the timer ends then the app will tally the score and
                  declare the winner based on the score entered during the
                  match.
                </li>
                <li>
                  If issues start to arise, please reload the page and try
                  again!
                </li>
              </ul>
            </AccordionItem>
          </Accordion>
          <p className="italic underline decoration-sky-500 mt-2">
            Disclaimer: This is work in progress, and has a few bugs to sort out
            still before it can be fully usable.
          </p>
          <p className="text-center decoration-sky-500">
            &copy; <a href="https://hamedweb.co.nz">hamedweb.co.nz</a>
          </p>
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

  const thisState = state;

  const [audio, setAudio] = useState(null);
  useEffect(() => {
    setAudio(new Audio("/assets/sounds/StartBell.mp3"));
  }, []);

  //const audioStartMatch = new Audio("/assets/sounds/StartBell.mp3");
  const playAudioStartPauseMatch = () => {
    audio.play();
  };

  /**
   * Handles the start/pause button click. If the match hasn't started, starts the match.
   * If the match is running, pauses it. If the match is paused, unpauses it.
   */
  const handleStartPause = () => {
    if (!state.matchStarted) {
      // Start the match if it hasn't started
      {
        playAudioStartPauseMatch();
      }
      dispatch({ type: "RESET_STATE" });
      dispatch({ type: "MATCH_STARTED" });
    } else if (state.isRunning && !state.isPaused && state.matchStarted) {
      // Pause the match if it's running
      dispatch({ type: "MATCH_PAUSED" });
    } else if (state.isPaused && !state.matchEnded && state.matchStarted) {
      // Unpause the match if it's paused
      {
        playAudioStartPauseMatch();
      }
      dispatch({ type: "MATCH_UNPAUSED" });
    }
  };

  useEffect(() => {
    if (!state.matchEnded && state.matchStarted) {
      const createInterval = () => {
        state.intervalId = setInterval(() => {
          // console.log("interval running");
          dispatch({ type: "MATCH_STARTED" });
        }, 1000);
      };
      const clearSessionInterval = () => {
        if (state.intervalId) {
          clearInterval(state.intervalId);
          state.intervalId = null;
        }
      };

      //createInterval();
      if (
        !state.isRunning &&
        !state.isPaused &&
        state.matchStarted &&
        !state.matchEnded
      ) {
        console.log("match started");
        createInterval();
      }

      if (
        state.isRunning &&
        !state.isPaused &&
        state.matchStarted &&
        !state.matchEnded &&
        !state.isMatchReset
      ) {
        //console.log(state);
        //console.log("match running");
        createInterval();
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
      }

      if (
        state.isPaused &&
        !state.matchEnded &&
        !state.matchStarted &&
        state.isRunning
      ) {
        dispatch({ type: "MATCH_UNPAUSED" });
        console.log("match unpaused");
      }

      if (
        state.matchEnded &&
        state.matchStarted &&
        state.isRunning &&
        !state.isPaused
      ) {
        // match ended and tally winner
        console.log("match ended");
        if (state.intervalId) {
          clearSessionInterval();
          dispatch({ type: "MATCH_ENDED" });
        }
      }
      // Stop at 0:00 and clear the interval
      if (state.minutes <= 0 && state.seconds <= 0) {
        clearSessionInterval();
        dispatch({ type: "MATCH_ENDED" });
      }

      if (state.winner === "One" || state.winner === "Two") {
        //console.log("Winner declared!");
        clearSessionInterval();
        if (state.winner === "One" && state.matchEnded) {
          dispatch({ type: "PLAYER_ONE_WINS" });
        } else if (state.winner === "Two" && state.matchEnded) {
          dispatch({ type: "PLAYER_TWO_WINS" });
        }
      }

      // Cleanup function to clear the interval when the component unmounts
      return () => {
        //console.log("cleanup");
        clearSessionInterval();
      };
    }
  }, [
    //setInterval,
    //createInterval,
    dispatch,
    state,
  ]);

  // Handle timer expire and tally of scores
  useEffect(() => {
    if (
      state.matchEnded &&
      state.minutes <= 0 &&
      state.seconds <= 0 &&
      state.winner === null
    ) {
      //clearSessionInterval();
      console.log("Timer Expired! Tallying Scores...");
      if (state.playerOneScore > state.playerTwoScore) {
        dispatch({ type: "PLAYER_ONE_WINS" });
      } else if (state.playerTwoScore > state.playerOneScore) {
        dispatch({ type: "PLAYER_TWO_WINS" });
      } else if (state.playerOneScore === state.playerTwoScore) {
        console.log("Advantage Tallying...");
        if (state.playerTwoAdvantageScore > state.playerOneAdvantageScore) {
          if (state.playerOnePenaltyScore < state.playerTwoPenaltyScore) {
            console.log("Penalty Tallying...");
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
          state.playerOneAdvantageScore === state.playerTwoAdvantageScore
        ) {
          if (state.playerOnePenaltyScore < state.playerTwoPenaltyScore) {
            console.log("Penalty Tallying...");
            dispatch({ type: "PLAYER_ONE_WINS" });
          } else if (
            state.playerTwoPenaltyScore < state.playerOnePenaltyScore
          ) {
            dispatch({ type: "PLAYER_TWO_WINS" });
          }
        }
        if (
          state.playerOneScore === state.playerTwoScore &&
          state.playerOneAdvantageScore === state.playerTwoAdvantageScore &&
          state.playerOnePenaltyScore === state.playerTwoPenaltyScore
        ) {
          //clearSessionInterval();
          dispatch({ type: "RESULT_DRAW" });
        }
      }
    }
    return;
  }, [state, dispatch]);

  return (
    <div>
      <div
        className="lg:flex lg:items-center lg:justify-center text-center text-5xl lg:text-15xl antialiased lg:pl-60 lg:pr-60 rounded font-semibold tracking-widest "
        onClick={handleStartPause}
      >
        {minutes} : {seconds}
        <div className="flex items-center justify-center">
          {state.isPaused && (
            <p className="">
              <FontAwesomeIcon className="" icon={faPause} />
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center antialiased">
        <button
          onClick={handleStartPause}
          className="p-2 mb-2 rounded-3xl text-sm lg:text-2xl bg-gradient-to-r from-indigo-700[0.9] to-purple-600[0.3] dark:text-white shadow-none focus:ring-4  focus:ring-blue-300 font-medium  px-7 py-3 focus:outline-none dark:focus:ring-blue-800 bg-transparent"
        >
          {!state.isRunning && !state.isPaused
            ? "Start"
            : state.isPaused
            ? "Resume"
            : "Pause"}
        </button>
      </div>
    </div>
  );
}

// Declare winner
export function DeclareWinner() {
  const { state } = useContext(CountdownContext);

  //const audioDeclareWinner = new Audio("/assets/sounds/Bell.mp3");
  const [audio, setAudio] = useState(null);
  useEffect(() => {
    setAudio(new Audio("/assets/sounds/Bell.mp3"));
  }, []);
  const playAudioDeclareWinner = () => {
    audio.play();
  };

  return (
    <div>
      {state.winner === "One" || state.winner === "Two" ? (
        <div className="flex items-center justify-center font-bold uppercase text-xl px-6 py-3 rounded shadow-[inset_0_-2px_15px_#cbd5e1]">
          {playAudioDeclareWinner()}
          <p className="">Competitor {state.winner} Wins!</p>
          <FontAwesomeIcon className="fa-2xl ml-4" icon={faCrown} />{" "}
        </div>
      ) : state.winner === "Draw" ? (
        <div className="flex items-center justify-center font-bold uppercase text-xl px-6 py-3 rounded shadow-[inset_0_-2px_15px_#cbd5e1]">
          {playAudioDeclareWinner()}
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

  return (
    <div className="flex flex-col-2 justify-center mt-2 lg:m-0 lg:items-between lg:justify-between">
      <div
        className="bg-slate-300 text-black h-1/2 lg:h-full text-center w-[170px] rounded font-bold text-10xl lg:text-15xl"
        onClick={() => dispatch({ type: "PLAYER_ONE_ADD_SCORE_ONE" })}
      >
        {state.playerOneScore}
      </div>
      <div className="text-sm ml-2 text-center">
        <div className="text-[#619b7f] dark:text-[#8CE5BA] bg-slate-50 rounded p-1 dark:bg-inherit">
          Advantage
        </div>
        <div
          className="text-2xl lg:text-5xl"
          onClick={() => dispatch({ type: "PLAYER_ONE_ADD_ADVANTAGE" })}
        >
          {state.playerOneAdvantageScore}
        </div>
        <div className="text-red-600 bg-slate-50 rounded p-1 dark:bg-inherit">
          Penalty
        </div>
        <div
          className="text-2xl lg:text-5xl mb-4 text-red-800"
          onClick={() => dispatch({ type: "PLAYER_ONE_ADD_PENALTY" })}
        >
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
    <div className="flex flex-col-2 justify-center mt-2 lg:m-0 lg:items-between lg:justify-between">
      <div
        className="bg-red-300 text-black h-1/2 lg:h-full text-center w-[170px] rounded font-bold text-10xl lg:text-15xl"
        onClick={() => dispatch({ type: "PLAYER_TWO_ADD_SCORE_ONE" })}
      >
        <p className="">{state.playerTwoScore}</p>
      </div>
      <div className="text-sm ml-2 text-center">
        <div className="text-[#619b7f] dark:text-[#8CE5BA] bg-slate-50 rounded p-1 dark:bg-inherit">
          Advantage
        </div>
        <div
          className="text-2xl lg:text-5xl"
          onClick={() => dispatch({ type: "PLAYER_TWO_ADD_ADVANTAGE" })}
        >
          {state.playerTwoAdvantageScore}
        </div>
        <div className="text-red-600 bg-slate-50 rounded p-1 dark:bg-inherit">
          Penalty
        </div>
        <div
          className="text-2xl lg:text-5xl mb-4 text-red-800"
          onClick={() => dispatch({ type: "PLAYER_TWO_ADD_PENALTY" })}
        >
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

export function PlayerOneEndMatch() {
  const { state, dispatch } = useContext(CountdownContext);
  const handlPlayerOneWinning = () => {
    dispatch({ type: "PLAYER_ONE_WINS" });
  };
  return (
    <div className="flex items-center justify-center text-[#8CE5BA]">
      <button onClick={handlPlayerOneWinning} className="ml-4 mt-1">
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
      <button onClick={handlPlayerTwoWinning} className="ml-4 mt-1">
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
    <div className="text-sm size-max lg:text-xl lg:tracking-wide w-full lg:w-[700px] flex lg:flex-col-2  lg:gap-4 bg-slate-950 p-4 lg:mr-4">
      <div className="">
        <div className="text-[#8CE5BA] grid grid-rows-1 grid-flow-col gap-5">
          <button onClick={handlPlayerOneAddScoreTwo}>+2</button>
          <button onClick={handlPlayerOneAddScoreThree}>+3</button>
          <button onClick={handlPlayerOneAddScoreFoure}>+4</button>
          <button onClick={handlPlayerOneAddAdvantage}>+Advantage</button>
          <button onClick={handlPlayerOneAddPenalty}>+Penalty</button>
        </div>
        <div className="text-red-400 grid grid-rows-1 grid-flow-col gap-5 mt-2">
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
    <div className="text-sm size-max lg:text-xl lg:tracking-wide w-full lg:w-[700px] flex lg:flex-col-2  lg:gap-4 bg-slate-950 p-4 lg:mr-4">
      <div className="">
        <div className="text-[#8CE5BA] grid grid-rows-1 grid-flow-col gap-6">
          <button onClick={handlPlayerTwoAddScoreTwo}>+2</button>
          <button onClick={handlPlayerTwoAddScoreThree}>+3</button>
          <button onClick={handlPlayerTwoAddScoreFoure}>+4</button>
          <button onClick={handlPlayerTwoAddAdvantage}>+Advantage</button>
          <button onClick={handlPlayerTwoAddPenalty}>+Penalty</button>
        </div>
        <div className="text-red-400 grid grid-rows-1 grid-flow-col gap-6 mt-2">
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
    <div className="text-xl sm:flex items-start justify-between">
      <PlayerOneControls />
      <PlayerOneScore />
    </div>
  );
}

export function PlayerTwo() {
  return (
    <div className="text-xl sm:flex items-start justify-between">
      <PlayerTwoControls />
      <PlayerTwoScore />
    </div>
  );
}

export const SettingsDialog = ({
  isSettingDilagogOpen,
  setIsSettingDilagogOpen,
}) => {
  const { dispatch } = useContext(CountdownContext);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(isSettingDilagogOpen);
  }, [isSettingDilagogOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setIsSettingDilagogOpen(!isSettingDilagogOpen);
    onSetTime({ minutes: parseInt(minutes), seconds: parseInt(seconds) });
  };

  const onSetTime = (newTime) => {
    dispatch({ type: "SET_COUNTDOWN_TIME", payload: newTime }); // Dispatch new time action
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSettingDilagogOpen(!isSettingDilagogOpen);
  };

  return (
    <div>
      {isOpen && (
        <div
          aria-hidden="true"
          className="ml-[-12px] lg:ml-0 overflow-y-auto overflow-x-auto fixed flex justify-center items-center inset-0 z-50 outline-none focus:outline"
        >
          <div className="p-4 w-full max-w-md max-h-full font-semibold text-gray-900 dark:text-white">
            <div className="bg-slate-200 rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Set match time
                </h3>
                <button onClick={() => handleClose()}>Close</button>
              </div>

              <div className="p-4 md:p-5">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col justify-between gap-6"
                >
                  <div>
                    <label htmlFor="minutes">Minutes:</label>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      id="minutes"
                      className="text-black w-full"
                      value={minutes}
                      onChange={(e) => setMinutes(parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label htmlFor="seconds">Seconds:</label>
                    <input
                      type="number"
                      id="seconds"
                      min={0}
                      max={59}
                      className="text-black w-full"
                      value={seconds}
                      onChange={(e) => setSeconds(parseInt(e.target.value))}
                    />
                  </div>
                  <button type="submit" className="mt-4">
                    Set
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export function Reset() {
  const { state, dispatch } = useContext(CountdownContext);

  const handlReset = () => {
    dispatch({ type: "RESET_STATE" });
  };

  return (
    <div
      className="bg-[#8CE5BA] w-[100px] lg:w-[150px] lg:h-[55px] p-2 text-xl lg:text-2xl flex items-center justify-center rounded text-slate-950"
      onClick={() => dispatch({ type: "RESET_STATE" })}
    >
      <FontAwesomeIcon className="mt-1 mr-1" icon={faArrowsRotate} />{" "}
      <button className="" onClick={() => handlReset()}>
        Reset
      </button>
      {/* Settings TODO: control timer, with default 5min control players background
      color future: add upload logo and display logo */}
    </div>
  );
}
