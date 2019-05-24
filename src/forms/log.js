import React, {useState} from 'react';

export let JWT = "null";

export default function Log() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log(username);
  console.log(password);
  console.log(JWT);
  return (
    <div className="container">
        <h2>Welcome, please sign in!</h2>
        <form
        onSubmit={event => {
          event.preventDefault();
        }}
        >
        <label htmlFor="username">Username:</label>
        <input
          type="username"
          name="username"
          id="username"
          value={username}
          onChange={event => {
            const { value } = event.target;
            setUsername(value);
          }}
        />
        <br></br><br></br>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={event => {
            const { value } = event.target;
            setPassword(value);
          }}
         />
        <br></br><br></br>
        <button onClick={() => logBtn(username, password)}>Login</button>
        </form>
    </div>
  );
}

function logBtn(username, password) {
  return fetch("https://cab230.hackhouse.sh/login", {
    method: "POST",
    body: `username=${username}&password=${password}`,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  })
    .then(res => res.json())
    .then(function(res) {
      window.JWT = res.token;
    })
    .catch(function(error) {
      console.log(
        "There has been a problem with your fetch operation: ",
        error.message
      );
    });
}  