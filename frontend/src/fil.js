import React, { useState, useEffect } from 'react';
import { Button, ButtonDropdown, DropdownItem } from 'reactstrap';

export default function FilterBar() {
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
            <ButtonDropdown>
                {areas.map((areas, index) => (
                    <DropdownItem key={index}>{areas}</DropdownItem>
                ))}
            </ButtonDropdown>
        </div>
    )
}

