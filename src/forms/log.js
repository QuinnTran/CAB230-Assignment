import React from 'react';
import { logBtn} from "../api"
import userLocalStorage from "./local-storage";

const Log = () => {
  const [value, setValue] = userLocalStorage(
    'myValueInLocalStorage'
  );

  const onChange = event => setValue(event.target.value);

  return (
    <div className="container">
        <h2>Welcome, please sign in!</h2>
        <label className="email">Email: </label>
        <input value={value} type="email" onChange={onChange} />
        <br></br><br></br>
        <label className="password">Password: </label>
        <input type="password"/>
        <br></br><br></br>
        <button onClick={logBtn}>Login</button>
    </div>
  );
}

export default Log;  