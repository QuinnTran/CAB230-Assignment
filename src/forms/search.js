import React, {useState, useEffect} from 'react';
import {JWT} from "./log";


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
        <CreateTable 
          offence={value.offence} 
          lga={value.lga} 
          total={value.total} 
          lat={value.lat} 
          lng={value.lng} 
        />
      )}
    </div>
  )
}

function CreateTable(props){
  return(
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

function SearchBar(props){
  const [innerSearch, setInnerSearch] = useState("");
  return (
    <div class>
      <label>Offence: </label>
      <input
        aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        value={innerSearch}
        onChange={e => setInnerSearch(e.target.value)}
      />
      <label>Area: </label>
      <input
        aria-labelledby="search-button"
        name="area"
        id="area"
        type="area"
        value={innerSearch}
        onChange={e => setInnerSearch(e.target.value)}
      />
      <br></br><br></br>
      <label>Age: </label>
      <input
        aria-labelledby="search-button"
        name="age"
        id="age"
        type="age"
        value={innerSearch}
        onChange={e => setInnerSearch(e.target.value)}
      />
      <label>Year: </label>
      <input
        aria-labelledby="search-button"
        name="year"
        id="year"
        type="year"
        value={innerSearch}
        onChange={e => setInnerSearch(e.target.value)}
      />
      <br></br><br></br>
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
  console.log(data)
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

function serBtn(search) {
  // let filter = "";
  //   onsubmit = (event) =>{
  //     const param = event.target.innerSearch;
  //   };
  
  //    //Example filter strings
  //   if (param === "area") {
  //     filter = "area=" + search;
  //   } else if (param === "age") {
  //     filter = "age=" + search;
  //   } else if (param === "year") {
  //     filter = "year=" + search;
  //   }

  //The parameters of the call
  let getParam = { method: "GET" };
  let head = { Authorization: `Bearer ${JWT}` };
  getParam.headers = head;
  
  //The URL
  const query = "offence=" + search;
  const url = "https://cab230.hackhouse.sh/search?" + query;
  // const url = "https://cab230.hackhouse.sh/search?" + query + "&" + filter;

  return (fetch(encodeURI(url), getParam)
    .then(res => res.json())
    .then(res => res.result)
    .then(data => data.map(result => ({
      offence: result.offence,
      LGA: result.LGA,
      total: result.total,
      lat: result.lat,
      lng: result.lng
    })))
  )
}