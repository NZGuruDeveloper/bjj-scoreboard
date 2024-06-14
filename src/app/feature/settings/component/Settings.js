import React, { useState, useEffect, useContext } from "react";
import {
  CountdownContext,
  CountdownProvider,
} from "./../../../context/CountdownContext";

export default function SettingsDialog({
  isSettingDilagogOpen,
  setIsSettingDilagogOpen,
}) {
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
}
