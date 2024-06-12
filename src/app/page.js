"use client";
/*
* TODO:
    Add ability to change the second Competitor score background to
    match with band used.
*/

import React, {
  useState,
} from "react";

import {  CountdownProvider } from "./context/CountdownContext";
import Timer from "./feature/timer/component/Timer";
import SettingsDialog from "./feature/settings/component/Settings";
import Reset from "./feature/reset/component/Reset";
import DeclareWinner from "./feature/score/component/DeclareWinner";
import { PlayerOne, PlayerTwo } from "./feature/score/component/Scores";

import {Accordion, AccordionItem} from "@nextui-org/accordion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";


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
};