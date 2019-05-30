import React, { useState } from 'react';
import { logBtn } from "../api";

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