import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


export default function FilterBar(props) {
  const [areas, setArea] = useState([]);
  var i = [];

  fetch("https://cab230.hackhouse.sh/areas")
    .then(res => res.json())
    .then(res => res.areas)
    .then(data => {
      i = data.map(areas => {
        return areas;
      });
      setArea(i);
    });
  return (
    <div>
      {/* <DropdownButton>
        {areas.map((value, index) => (
          <Dropdown.Item key={index}>{areas}</Dropdown.Item>
        ))}
      </DropdownButton> */}
    </div>
  )
}

