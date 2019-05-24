import React, {useState} from 'react';

export let JWT = "null";
// let JWT ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNTA3MiwiZW1haWwiOiJkZW1vLXVzZXJAZ21haWwuY29tIn0sImlhdCI6MTU1ODY4NTI0NCwiZXhwIjoxNTU4NzcxNjQ0fQ.MIClK3F-7zS8IDiGcgKTdmm30G4AkOtHaGN1_shFOyc";

export default function Log() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(JWT);
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
        <button onClick={() => logBtn(email, password)}>Login</button>
        </form>
    </div>
  );
}

function logBtn(email, password) {
  return fetch("https://cab230.hackhouse.sh/login", {
    method: "POST",
    body: `username=${email}&password=${password}`,
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