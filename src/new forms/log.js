
import React, {useState, useEffect} from 'react';
import { logBtn} from "../api"

const useStateWithLocalStorage = localStorageKey => {
    const [value, setValue] = useState(
        localStorage.getItem(localStorageKey) || ''
    );

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
    
  return [value, setValue];
};

const Log = () => {
   const [value, setValue] = useStateWithLocalStorage(
    'myValueInLocalStorage'
  );

  const onChange = event => setValue(event.target.value);

  return (
    <div>
        <h2>Welcome, please sign in!</h2>
        <form >
            <label className="email">Email: </label>
            <input value={value.username} type="email" onChange={onChange} />
            <br></br><br></br>
            <label className="password">Password: </label>
            <input value={value.password} type="password" onChange={onChange} />
            <br></br><br></br>
            <button type="submit" onClick={logBtn}>Login</button>
        </form>
    </div>
  );
};

export default Log;
