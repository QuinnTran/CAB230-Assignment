import React, { useState, useEffect } from 'react';
import FilterBar from "../filter";
import { serBtn } from "../api"

export default function Ser() {
  const [search, setSearch] = useState("");
  const { loading, query, error } = useSearchBtn(search);
  console.log({ query });

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
        <h2>Filter</h2>
        <FilterBar onSubmit={setSearch} />
      </div>
      <hr />
      <h2>Result</h2>
      {/* {query.map(value =>
        <QueryTable
          key={value.id}
          lga={value.lga}
          total={value.total}
          lat={value.lat}
          lng={value.lng}
        />
      )} */}
    </div>
  )
}

function QueryTable(props) {
  return (
    <table>
      <tr>
        <td>Area</td>
        <td>Total</td>
        <td>LAT</td>
        <td>LNG</td>
      </tr>
      <tr>
        <td>{props.area}</td>
        <td>{props.total}</td>
        <td>{props.lat}</td>
        <td>{props.lng}</td>
      </tr>
    </table>
  )
}

function SearchBar() {
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