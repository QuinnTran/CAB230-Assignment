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


// import React, { useState, useEffect } from 'react';
// import { serBtn } from "../api"

// export default function FilterBar() {
//   const [search, setSearch] = useState("");
//   const [area, setArea] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [year, setYear] = useState("");
//   return (
//     <div class>
//       <label>Area: </label>
//       <input
//         aria-labelledby="area-button"
//         name="area"
//         id="area"
//         type="area"
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />
//       <br></br>
//       <label>Age: </label>
//       <input
//         aria-labelledby="area-button"
//         name="age"
//         id="age"
//         type="age"
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />
//       <br></br>
//       <label>Gender: </label>
//       <input
//         aria-labelledby="gender-button"
//         name="gender"
//         id="gender"
//         type="gender"
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />
//       <br></br>
//       <label>Year: </label>
//       <input
//         aria-labelledby="year-button"
//         name="year"
//         id="year"
//         type="year"
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />
//       <button type="button" onClick={() => serBtn(search)}>
//         Search
//       </button>
//     </div>
//   );
// }