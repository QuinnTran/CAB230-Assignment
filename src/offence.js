import React, {useState} from "react";

export default function Offences() {
  const [offences, setOffences] = useState([]);
  var i=[];

  fetch("https://cab230.hackhouse.sh/offences")
    .then(res => res.json())
    .then(res => res.offences)
    .then(data => {
      i = data.map(offences =>{
        return offences;
      });
      setOffences(i);
    });

    return (
      <table>
      {offences.map( value => <tr><td>{value}</td></tr>)}
      </table>
    )
  }