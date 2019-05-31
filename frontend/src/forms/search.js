import React, { useState } from 'react';
import { useSearchBtn } from "../api"
import SmartDataTable from 'react-smart-data-table';
import FilterBar from './filter';

export default function Ser() {
  const [search, setSearch] = useState("");
  const { loading, query, error } = useSearchBtn(search);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }
  return (
    <div>
      <div className="container">
        <h2>Search</h2>
        <SearchBar onSubmit={setSearch} />
        <FilterBar />
      </div>
      <hr />
      <h2>Result</h2>
      <SmartDataTable data={query} sortable />
    </div>
  )
}

function SearchBar(props) {
  const [search, setSearch] = useState("");

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
      <button type="button" onClick={() => props.onSubmit(search)}>
        Search
      </button>
    </div >
  );
}

