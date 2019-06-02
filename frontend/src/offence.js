import React, { useState } from "react";
import { baseURL } from "./api";

export default function Off() {
  const [offences, setOffences] = useState([]);
  var i = [];

  fetch(`${baseURL}/offences`)
    .then(res => res.json())
    .then(res => res.offences)
    .then(data => {
      i = data.map(offences => {
        return offences;
      });
      setOffences(i);
    });

  return (
    <table>
      {offences.map(value => (
        <tr><td>{value}</td></tr>
      ))}
    </table>
  )
}