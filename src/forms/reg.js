import React from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";
import {regBtn} from "../api";
import Log from "./log";
import userLocalStorage from "./local-storage";

const Reg = () => {
  const [value, setValue] = userLocalStorage(
    'myValueInLocalStorage'
  );
  const onChange = event => setValue(event.target.value);

  return (
    <div className="container">
      <div className="link-page">
        <Route path="/login" component={Log} />
      </div>
      <h2>Create your account here</h2>
      <form >
        <label className="email">Email: </label>
        <input type="email" value={value}/>
        <br></br><br></br>
        <label className="password">Password: </label>
        <input type="password" />
        <br></br><br></br>
        <button onClick={regBtn}><Link to="/login">Register</Link></button>
      </form>
    </div>
  );
}

export default Reg;