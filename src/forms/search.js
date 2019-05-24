import React, {useState, useEffect} from 'react';
import {JWT} from "./log";

function serBtn(search) {
  const result = useState([]);
  let filter = "";
  onsubmit = (event) =>{
    const param = event.target.innerSearch;
  };

   //Example filter strings
  // if (param === "area") {
  //   filter = "area=" + search;
  // } else if (param === "age") {
  //   filter = "age=" + search;
  // } else if (param === "year") {
  //   filter = "year=" + search;
  // }

  //The parameters of the call
  let getParam = { method: "GET" };
  let head = { Authorization: `Bearer ${JWT}` };
  getParam.headers = head;
  
  //The URL
  const query = "offence=" + search;
  const url = "https://cab230.hackhouse.sh/search?" + query + "&" + filter;
  console.log(result)
  return (fetch(encodeURI(url), getParam)
    .then(res => res.json()) 
    .then(res => res.result)
    .then(result => result.map(result => ({
      offence: result.offence,  
      area: result.area,
      age: result.age,
      gender: result.gender,
      year: result.year
    })))
  )
}

export default function Ser(){
  const [search, setSearch] = useState("");
  const { loading, data, error } = useSearchBtn(search);
  console.log(data);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }
  
  return (
    <div>
      <h2>Result</h2>
      <SearchBar onSubmit={setSearch} />
      {data.map(value => 
        <createTable 
        key={value.offence} 
        area={value.area} 
        age={value.age} 
        gender={value.gender} 
        year={value.year} 
        />
      )}
    </div>
  )
}

function createTable(props){
  return(
    <table>
      <tr>
        <td>Area</td>
        <td>Age</td>
        <td>Gender</td>
        <td>Year</td>
      </tr>
      <tr>
        <td>{props.area}</td>
        <td>{props.age}</td>
        <td>{props.gender}</td>
        <td>{props.year}</td>
      </tr>
    </table>
  )
}

function SearchBar(props){
  const [innerSearch, setInnerSearch] = useState("");
  return (
    <div>
      <label>Offence:</label>
      <input
        aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        value={innerSearch}
        onChange={e => setInnerSearch(e.target.value)}
      />
      <label>Area</label>
      <input
        aria-labelledby="search-button"
        name="area"
        id="area"
        type="area"
        value={innerSearch}
        onChange={e => setInnerSearch(e.target.value)}
      />
      <label>Age</label>
      <input
        aria-labelledby="search-button"
        name="age"
        id="age"
        type="age"
        value={innerSearch}
        onChange={e => setInnerSearch(e.target.value)}
      />
      <label>Year</label>
      <input
        aria-labelledby="search-button"
        name="year"
        id="year"
        type="year"
        value={innerSearch}
        onChange={e => setInnerSearch(e.target.value)}
      />
      <button
        id="search-button"
        type="button"
        onClick={() => props.onSubmit(innerSearch)}
      >
        Search
      </button>
    </div>
  );
}

function useSearchBtn(search) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    serBtn(search)
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(e => {
        setError(e);
        setLoading(false);
      });
  }, [search]);
  return {
    loading,
    data,
    error
  };
}

