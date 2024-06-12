/**
 * Renders the score component for Player One.
 *
 * @return {JSX.Element} The score component.
 */

import React, { useContext } from "react";
import { CountdownContext } from "./../../../context/CountdownContext";

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
  