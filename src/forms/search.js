import React, {useState, useEffect} from 'react';
import {serBtn } from '../api';

// export default function Ser(){
//   const [search, setSearch] = useState("");
//   const { loading, data, error } = useSearchBtn(search);
//   if (loading) {
//     return <p>Loading...</p>;
//   }
//   if (error) {
//     return <p>Something went wrong: {error.message}</p>;
//   }
//   return (
//     <div>
//       <h2>Result</h2>
//       <SearchBar onSubmit={setSearch} />
//       {data.map(value => (
//         <createTable key={data.offence} area={data.area} age={data.age} gender={data.gender} year={data.year} />
//       ))}
//     </div>
//   )
// }

export function createTable(props){
  return(
    <table>
      <td>
        <tr>Area</tr>
        <tr>Age</tr>
        <tr>Gender</tr>
        <tr>Year</tr>
      </td>
    </table>
  )
}

export function SearchBar(props){
  const [innerSearch, setInnerSearch] = useState("");
  return (
    <div>
      <input
        aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
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

export function useSearchBtn(search) {
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
  }, [useSearchBtn]);
  return {
    loading,
    data,
    error
  };
}

