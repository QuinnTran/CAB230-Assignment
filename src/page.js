import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Off from "./offence";
import Fil from "./forms/filter";
import Log from "./forms/log";
import Reg from "./forms/reg";
import Ser from "./forms/search"


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
        <Link to="/search">Search</Link>
        <Link to="/filter">Filter</Link>
        <div className="search-container">
          <Ser />
        </div>
      </div>

      <Route exact path="/" component={Home} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/offences" component={OffencesPage} />
      <Route path="/search" component={SearchPage} />
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
      <Reg />
    </div>
  );
}
//LOGIN PAGE
function LoginPage() {
  return (
    <div>
      <Log />
    </div>
  );
}

//OFFENCE PAGE
function OffencesPage() {
  return (
    <div>
      <h2>List of offences</h2>
      <Off/>
    </div>
  );
}
//SEARCH PAGE
function SearchPage() {
  return (
    <div>
      <h2>Result</h2>
    </div>
  );
}
//FILTER PAGE
function FilterPage() {
  return (
    <div>
      <Fil />
    </div>
  );
}

export default Page;
