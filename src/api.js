import React, {useState} from "react";

let JWT ="null";

export function regBtn(email, password) {
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

export function logBtn(username, password) {
  return fetch("https://cab230.hackhouse.sh/login", {
    method: "POST",
    body: `email=${username}&password=${password}`,
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

export default function Ser() {
  //The parameters of the call
  let getParam = { method: "GET" };
  let head = { Authorization: `Bearer ${JWT}` };
  getParam.headers = head;
  
  //The URL
  const[query]=useState("");
  const url = "https://cab230.hackhouse.sh/search?offence="  + query;

  fetch(encodeURI(url), getParam)
    .then(res => res.json())   
}

export function filBtn() {
  const [param, userInput] = useState("");
  let filter = "";

  //Example filter strings
  if (param === "area") {
    filter = "area=" + userInput;
  } else if (param === "age") {
    filter = "age=" + userInput;
  } else if (param === "year") {
    filter = "year=" + userInput;
  }

  //The parameters of the call
  let getParam = { method: "GET" };
  let head = { Authorization: `Bearer ${JWT}` };
  getParam.headers = head;

  //The URL
  const url = "https://cab230.hackhouse.sh/search?offence="  + userInput + "&" + filter;

  return fetch(encodeURI(url), getParam)
    .then(res => res.json()
    .catch(function(error) {
      console.log(
        "There has been a problem with your fetch operation: ",
        error.message
      );
    }));
}
