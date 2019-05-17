import React from "react";
import hook from "./hook";
import logBtn from "../api";
//LOGIN PAGE
const Signin = () => {
  const { inputs, handleInputChange, handleSubmit } = hook({
    username: "",
    password: ""
  });
  return (
    <div className="container">
      <h2>Welcom, please sign in!</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="field">
          <label className="username">Username: </label>
          <input
            className="input"
            type="username"
            name="username"
            onChange={handleInputChange}
            value={inputs.username}
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
          className="login-button"
          type="submit"
          onSubmit={handleSubmit}
          onClick={logBtn}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
