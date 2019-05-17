import React from "react";
import hook from "./hook";
import {regBtn} from "../api";

//REGISTER PAGE
const Signup = () => {
  const { inputs, handleInputChange, handleSubmit } = hook({
    email: "",
    password: ""
  });

  return (
    <div className="container">
      <h2>Create account here</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="field">
          <label className="email">Email: </label>
          <input
            className="input"
            type="email"
            name="email"
            onChange={handleInputChange}
            value={inputs.email}
            required
          />
        </div>
        <div className="field">
          <label className="password">Password: </label>
          <input
            className="input"
            type="password"
            name="password"
            onChange={handleInputChange}
            value={inputs.password}
          />
        </div>
        <button
          className="register-button"
          type="submit"
          onSubmit={handleSubmit}
          onClick={regBtn}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
