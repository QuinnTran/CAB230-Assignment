import React, { useState, useEffect } from 'react';
// import FilterBar from "../forms/filter";
import { serBtn } from "../api"
import SmartDataTable from 'react-smart-data-table';

export default function Ser() {
  const [search, setSearch] = useState("");
  const { loading, query, error } = useSearchBtn(search);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  var data = [];
  for (var row of query) {
    if (row.total > 0) {
      data.push({
        LGA: row.LGA,
        total: row.total,
        lat: row.lat,
        lng: row.lng
      })
    }
  }
  return (
    <div>
      <div className="container">
        <h2>Search</h2>
        <SearchBar onSubmit={setSearch} />
      </div>
      <hr />
      <h2>Result</h2>
      <SmartDataTable data={data} sortable />
    </div>
  )
}

function SearchBar() {
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");

  return (
    <div class>
      <label>Offence: </label>
      <input
        aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <br></br><br></br>
      <label>Area: </label>
      <input
        aria-labelledby="area-button"
        name="area"
        id="area"
        type="area"
        value={area}
        onChange={e => setArea(e.target.value)}
      />
      <br></br><br></br>
      <label>Age: </label>
      <input
        aria-labelledby="area-button"
        name="age"
        id="age"
        type="age"
        value={age}
        onChange={e => setAge(e.target.value)}
      />
      <br></br><br></br>
      <label>Gender: </label>
      <input
        aria-labelledby="gender-button"
        name="gender"
        id="gender"
        type="gender"
        value={gender}
        onChange={e => setGender(e.target.value)}
      />
      <br></br><br></br>
      <label>Year: </label>
      <input
        aria-labelledby="year-button"
        name="year"
        id="year"
        type="year"
        value={year}
        onChange={e => setYear(e.target.value)}
      />
      <button type="button" onClick={() => serBtn(search)}>
        Search
      </button>
    </div>
  );
}

function useSearchBtn(search) {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    serBtn(search)
      .then(query => {
        setQuery(query);
        setLoading(false);
      })
      .catch(e => {
        setError(e);
        setLoading(false);
      });
  }, [search]);
  return {
    loading,
    query,
    error
  };
}