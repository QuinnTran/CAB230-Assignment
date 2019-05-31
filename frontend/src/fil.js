import React, { useState, useEffect } from 'react';
import { Button, ButtonDropdown, DropdownItem } from 'reactstrap';

export default function FilterBar() {
    const [areas, setArea] = useState([]);
    var i = [];


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