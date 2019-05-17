import React from 'react';
import useStateWithLocalStorage from "./local-storage";
import {regBtn} from "../api"

const Reg = () => {
   const [value, setValue] = useStateWithLocalStorage(
    'myValueInLocalStorage'
  );

  const onChange = event => setValue(event.target.value);

  return (
    <div>
      <h2>Create your account here</h2>
      <form >
        <label className="email">Email: </label>
        <input value={value.username} type="email" onChange={onChange} />
        <br></br><br></br>
        <label className="password">Password: </label>
        <input value={value.password} type="password" onChange={onChange} />
        <br></br><br></br>
        <button type="submit" onClick={regBtn}>Register</button>
      </form>
    </div>
  );
};

export default Reg;