import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Reg from "./reg";
import Log from "./login";
import Off from "./offence";
import Ser from "./search"
import { Logout } from "./logout";
import "./styles.css";

export default function Page() {
  if (document.cookie) {
    return (
      <Router>
        <div className="header">
          <h1>Queensland Crime Database</h1>
        </div>
        <div id="menu" className="topnav">
          <Link to="/">Home</Link>
          <Link to="/offences">Offences</Link>
          <Link to="/search">Search</Link>
          <Link to="/logout">Logout</Link>
        </div>

        <Route exact path="/" component={Home} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/offences" component={OffencesPage} />
        <Route path="/search" component={SearchPage} />
      </Router>
    )
  } else {
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
        </div>

        <Route exact path="/" component={Home} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/offences" component={OffencesPage} />
        <Route path="/search" component={SearchPage} />
      </Router>
    )
  }
}

function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to Crime Database</h1>
      <p>You can find any offences here</p>
    </div>
  )
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
      <Off />
    </div>
  );
}

//SEARCH PAGE
function SearchPage() {
  return (
    <div>
      <Ser />
    </div>
  );
}

function LogoutPage() {
  return (
    <div>
      <Logout />
    </div>
  );
}

