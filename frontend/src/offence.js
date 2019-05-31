import React, { useState } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

export default function Off() {
  const [offences, setOffences] = useState([]);
  var i = [];

  fetch("https://cab230.hackhouse.sh/offences")
    .then(res => res.json())
    .then(res => res.offences)
    .then(data => {
      i = data.map(offences => {
        return offences;
      });
      setOffences(i);
    });

  return (
    <DropdownButton id="dropdown-basic-button" title="Offences">
      {offences.map((offences, index) => (
        <Dropdown.Item key={index}>{offences}</Dropdown.Item>
      ))}
    </DropdownButton>
  )
}