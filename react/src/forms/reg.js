import React, {useState} from 'react';

export default function Reg () {
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
        <button type ="submit" onClick={() => regBtn(email, password)}>Register</button>
      </form>
    </div>
  );
}


function regBtn(email, password) {
  return fetch("https://cab230.hackhouse.sh/register", {
    method: "POST",
    body: `email=${email}&password=${password}`,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  })
  .then(res => res.json())
  .catch(function(error) {
    console.log(
      "There has been a problem with your fetch operation: ",
      error.message
    );
  });
}