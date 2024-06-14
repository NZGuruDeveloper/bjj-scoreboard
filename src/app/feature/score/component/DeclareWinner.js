import React, { useContext, useEffect, useState } from "react";
import {
  CountdownContext,
  CountdownProvider,
} from "./../../../context/CountdownContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
// Declare winner
export default function DeclareWinner() {
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
