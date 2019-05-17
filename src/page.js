import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Filter from "./FORMS/filter";
import Signin from "./FORMS/signin";
import Signup from "./FORMS/signup";
import Offences from "./offence";

import "./styles.css";

function Page() {
  return (
    <Router>
      <div className="header">
        <h1>Queensland Crime Database</h1>
      </div>
      <div id="menu" className="topnav">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/offences">Offences</Link>
        <Link to="/filter">Filter</Link>
        <div className="search-container">
          <input
            name="search"
            id="myInput"
            type="text"
            value=""
            placeholder="Search"
          />
          <button id="serBtn">Search</button>
        </div>
      </div>

      <Route exact path="/" component={Home} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/offences" component={OffencesPage} />
      <Route path="/filter" component={FilterPage} />
    </Router>
  );
}

function Home() {
  return <div className="home-page" />;
}
//REGISTER PAGE
function RegisterPage() {
  return (
    <div>
      <Signup />
    </div>
  );
}
//LOGIN PAGE
function LoginPage() {
  return (
    <div>
      <Signin />
    </div>
  );
}
//OFFENCE PAGE
function OffencesPage() {
  return (
    <div>
      <Offences />
    </div>
  );
}
//FILTER PAGE
function FilterPage() {
  return (
    <div>
      <Filter />
    </div>
  );
}

export default Page;
