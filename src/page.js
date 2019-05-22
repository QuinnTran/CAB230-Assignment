import React, {useState} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Off from "./offence";
import Fil from "./forms/filter";
import Log from "./forms/log";
import Reg from "./forms/reg";
import {useSearchBtn, SearchBar} from "./forms/search"


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
  const [search, setSearch] = useState("");
  const { loading, data, error } = useSearchBtn(search);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }
  return (
    <div>
      <h2>Result</h2>
      <SearchBar onSubmit={setSearch} />
      {data.map(value => (
        <createTable key={data.offence} area={data.area} age={data.age} gender={data.gender} year={data.year} />
      ))}
    </div>
  )
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
