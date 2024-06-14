/**
 * Renders a timer component with a background color, padding, and rounded corners.
 *
 * @return {JSX.Element} The timer component.
 */
import React, { useState, useEffect, useContext } from "react";

import {
  CountdownContext,
  CountdownProvider,
} from "./../../../context/CountdownContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

export default function Timer() {
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
    <CountdownProvider>
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
    </CountdownProvider>
  );
}
