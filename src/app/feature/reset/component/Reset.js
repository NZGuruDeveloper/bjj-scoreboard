import React, { useContext } from "react";
import { CountdownContext } from "./../../../context/CountdownContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

export default function Reset() {
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