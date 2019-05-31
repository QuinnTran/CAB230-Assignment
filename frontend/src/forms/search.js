import React, { useState } from 'react';
import { useSearchBtn } from "../api"
import SmartDataTable from 'react-smart-data-table';
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function Ser() {
  const [search, setSearch] = useState("");
  // const { loading, query, error } = useSearchBtn(offence, area, age, gender, year);
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

      </div>
      <hr />
      <h2>Result</h2>
      <SmartDataTable data={query} sortable />
      <ChartDisplay data={query} />
    </div>
  )
}

function ChartDisplay(props) {
  var result = [];

  return (
    <BarChart width={1000} height={500} data={props.data}>
      <XAxis dataKey={"LGA"} stroke="#8884d8" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar type="monotone" dataKey="total" fill="8884d8" barSize={10} />
    </BarChart>
  )
}

function SearchBar(props) {
  const [search, setSearch] = useState("");
  const [offence, setOff] = useState([]);
  const [areas, setArea] = useState([]);
  const [ages, setAge] = useState([]);
  const [genders, setGen] = useState([]);
  const [years, setYear] = useState([]);
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
      <br></br>
      <label>Offence: </label>
      <select
        onChange={e => setOff(e.target.value)}
      >
        <option defaultValue />
        {offence}
      </select>
      <br></br>
      <label>Area: </label>
      <select
        onChange={e => setArea(e.target.value)}
      >
        <option defaultValue />
        {areas}
      </select>
      <br></br>
      <label>Age: </label>
      <select
        onChange={e => setAge(e.target.value)}
      >
        <option defaultValue />
        {ages}
      </select>
      <br></br>
      <label>Gender: </label>
      <select
        onChange={e => setGen(e.target.value)}
      >
        <option defaultValue />
        {genders}
      </select>
      <br></br>
      <label>Year: </label>
      <select
        onChange={e => setYear(e.target.value)}
      >
        <option defaultValue />
        {years}
      </select>

      <button type="button" onClick={() => props.onSubmit(search)}>
        Search
      </button>
    </div >
  );
}