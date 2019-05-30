import React, { useState, useEffect } from 'react';
import { serBtn } from "../api"

export default function FilterBar() {
  const [search, setSearch] = useState("");
  return (
    <div class>
      <label>Area: </label>
      <input
        aria-labelledby="area-button"
        name="area"
        id="area"
        type="area"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <br></br>
      <label>Age: </label>
      <input
        aria-labelledby="area-button"
        name="age"
        id="age"
        type="age"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <br></br>
      <label>Gender: </label>
      <input
        aria-labelledby="gender-button"
        name="gender"
        id="gender"
        type="gender"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <br></br>
      <label>Year: </label>
      <input
        aria-labelledby="year-button"
        name="year"
        id="year"
        type="year"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button type="button" onClick={() => serBtn(search)}>
        Search
      </button>
    </div>
  );
}