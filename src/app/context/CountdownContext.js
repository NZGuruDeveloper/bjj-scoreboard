import { createContext, useReducer } from "react";

export const initialState = {
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

export const CountdownContext = createContext(null);

export function CountdownProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CountdownContext.Provider value={{ state, dispatch }}>
      {children}
    </CountdownContext.Provider>
  );
}

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
