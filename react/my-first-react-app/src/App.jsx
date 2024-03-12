import "./App.css";
import React, { useState } from "react";

import argentinaFlag from './images/Flag_of_Argentina.svg.png'
import franceFlag from "./images/Flag_of_France.svg.png";
import russiaFlag from "./images/Flag_of_Russia.svg.png";
import taiwanFlag from "./images/Flag_of_the_Republic_of_China.svg.png";
import uruguayFlag from "./images/Flag_of_Uruguay.svg.png";


function Greeting() {
  return (
    <>
      <h1>Flags from somewhere</h1>
    </>
  );
}
function Flags() {
  // change flag depending on the selected li
  const [selectedFlag, setSelectedFlag] = useState(null)
  const showFlag = (country) => {
    const flags = {
      Argentina: argentinaFlag,
      Russia: russiaFlag,
      Uruguay: uruguayFlag,
      Taiwan: taiwanFlag,
      France: franceFlag,
    };
    const chosenFlag = flags[country];
    setSelectedFlag(chosenFlag)
  };
  return (
    <>
      <div>
        <ul>
          <li onClick={() => showFlag("Argentina")}>Argentina</li>
          <li onClick={() => showFlag("Russia")}>Russia</li>
          <li onClick={() => showFlag("Uruguay")}>Uruguay</li>
          <li onClick={() => showFlag("Taiwan")}>Taiwan</li>
          <li onClick={() => showFlag("France")}>France</li>
        </ul>
      </div>
      {selectedFlag && <img src={selectedFlag} alt="Flag" />}
    </>
  );
}
function Footer() {
  return (
    <>
      <div id='foot'>The footer for the best countries</div>
    </>
  );
}

export { Greeting, Flags, Footer };
