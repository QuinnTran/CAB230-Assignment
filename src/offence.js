import React from "react";
import {offBtn} from "./api";

function Offences() {
  return (
    <div>
      <h1>List of Offences</h1>
      <button onclick={offBtn}>Show</button>
    </div>
  );
}

export default Offences;