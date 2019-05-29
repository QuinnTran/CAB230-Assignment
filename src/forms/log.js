import React, { useState } from 'react';

export let JWT = "null";

export default function Log() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container">
      <h2>Welcome, please sign in!</h2>
      <form
        onSubmit={event => {
          event.preventDefault();
        }}
      >
        <label htmlFor="email">Username:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={event => {
            const { value } = event.target;
            setEmail(value);
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
        <button type="submit" onClick={() => logBtn(email, password)}>Login</button>
      </form>
    </div>
  );
}

function logBtn(email, password) {
  return fetch("https://cab230.hackhouse.sh/login", {
    method: "POST",
    body: `email=${email}&password=${password}`,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  })
    .then(res => res.json())
    .then(result => {
      result = JSON.stringify(result);
      window.JWT = result.token;
    })
    .catch(function (error) {
      console.log(
        "There has been a problem with your fetch operation: ",
        error.message
      );
    });
}  