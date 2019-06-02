import React, { useState } from 'react';
import { regBtn } from "./api"

export default function Reg() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container">
      <h2>Create your account here</h2>
      <form
        onSubmit={event => {
          event.preventDefault();
        }}
      >
        <label htmlFor="email">Email:</label>
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
        <button type="submit" onClick={() => regBtn(email, password)}>Register</button>
      </form>
      <div id="app"></div>
    </div>
  );
}