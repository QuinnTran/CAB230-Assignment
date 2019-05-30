import React, { useState, useEffect } from 'react';
import { serBtn } from "../src/api"

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
      <button type="button" onClick={() => serBtn(search)}>
        Search
      </button>

      <label>Age: </label>
      <input
        aria-labelledby="area-button"
        name="age"
        id="age"
        type="age"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button type="button" onClick={() => ageBtn(search)}>
        age
      </button>

      <label>Gender: </label>
      <input
        aria-labelledby="gender-button"
        name="gender"
        id="gender"
        type="gender"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button type="button" onClick={() => genBtn(search)}>
        gender
      </button>

      <label>Year: </label>
      <input
        aria-labelledby="year-button"
        name="year"
        id="year"
        type="year"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button type="button" onClick={() => yearBtn(search)}>
        year
      </button>
    </div>
  );
}

function areaBtn(search) {
  return (fetch("https://cab230.hackhouse.sh/areas")
    .then(res => res.json())
    .then(res => res.areas)
    .then(data => {
      data.map(result => ({
        id: result.id,
        area: result.area
      }))
    })
  )
}

function ageBtn(search) {
  return (fetch("https://cab230.hackhouse.sh/ages")
    .then(res => res.json())
    .then(res => res.ages)
    .then(data => {
      data.map(result => ({
        id: result.id,
        age: result.age
      }))
    })
  )
}

function genBtn(search) {
  return (fetch("https://cab230.hackhouse.sh/genders")
    .then(res => res.json())
    .then(res => res.genders)
    .then(data => {
      data.map(result => ({
        id: result.id,
        gender: result.gender
      }))
    })
  )
}

function yearBtn(search) {
  return (fetch("https://cab230.hackhouse.sh/years")
    .then(res => res.json())
    .then(res => res.years)
    .then(data => {
      data.map(result => ({
        id: result.id,
        year: result.year
      }))
    })
  )
}