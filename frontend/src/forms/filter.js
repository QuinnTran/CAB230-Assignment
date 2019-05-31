import React, { useState, useEffect } from 'react';
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Dropdown from 'react-bootstrap/Dropdown'


export default function FilterBar() {
  const [areas, setArea] = useState([]);
  const [ages, setAge] = useState([]);
  const [genders, setGender] = useState([]);
  const [years, setYear] = useState([]);
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

  fetch("https://cab230.hackhouse.sh/ages")
    .then(res => res.json())
    .then(res => res.ages)
    .then(data => {
      i = data.map(ages => {
        return ages;
      });
      setAge(i);
    });

    fetch("https://cab230.hackhouse.sh/genders")
    .then(res => res.json())
    .then(res => res.genders)
    .then(data => {
      i = data.map(genders => {
        return genders;
      });
      setGender(i);
    });

    fetch("https://cab230.hackhouse.sh/years")
    .then(res => res.json())
    .then(res => res.years)
    .then(data => {
      i = data.map(years => {
        return years;
      });
      setYear(i);
    });
  return (
    <div>
      <ButtonToolbar>
        {['Areas', 'Ages', 'Genders', 'Years'].map(
          variant => (
            <DropdownButton
              title={variant}
              variant={variant.toLowerCase()}
              id={`dropdown-variants-${variant}`}
              key={variant}
            >
              {areas.map((areas, index) => (
                <Dropdown.Item eventKey="1" key={index}><table><tr><td>{areas}</td></tr></table></Dropdown.Item>
              ))}
              {ages.map((ages, index) => (
                <Dropdown.Item eventKey="1" key={index}><table><tr><td>{ages}</td></tr></table></Dropdown.Item>
              ))}
               {genders.map((genders, index) => (
                <Dropdown.Item eventKey="1" key={index}><table><tr><td>{genders}</td></tr></table></Dropdown.Item>
              ))}
               {years.map((aryearseas, index) => (
                 <Dropdown.Item eventKey="1" key={index}><table><tr><td>{years}</td></tr></table></Dropdown.Item>
              ))}
            </DropdownButton>
          ),
        )}
      </ButtonToolbar>
    </div>
  )
}
