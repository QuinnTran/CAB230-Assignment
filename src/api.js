// import {useState} from "react";

let JWT = "null";

export function regBtn(email, password) {
  return fetch("https://cab230.hackhouse.sh/register", {
    method: "POST",
    body: `email=${email}&password=${password}`,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok");
    })
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
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(function(result) {
      JWT = result.token;
    })
    .catch(function(error) {
      console.log(
        "There has been a problem with your fetch operation: ",
        error.message
      );
    });
}

function serBtn(input) {
  //The parameters of the call
  let getParam = { method: "GET" };
  let head = { Authorization: `Bearer ${JWT}` };
  getParam.headers = head;
  
  //The URL
  const userInput = document.getElementById("myInput").value;
  const url = "https://cab230.hackhouse.sh/search?offence="  + userInput;

  return fetch(encodeURI(url), getParam)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .catch(function(error) {
      console.log(
        "There has been a problem with your fetch operation: ",
        error.message
      );
    });
}

// function filterBtn(input) {
//   const param = event.target.innerHTML;
//   let filter = "";

//   //Example filter strings
//   if (param === "area") {
//     filter = "area=Moreton Bay Regional Council";
//   } else if (param === "age") {
//     filter = "age=Juvenile";
//   } else if (param === "year") {
//     filter = "year=2006,2007,2008";
//   }

//   //The parameters of the call
//   let getParam = { method: "GET" };
//   let head = { Authorization: `Bearer ${JWT}` };
//   getParam.headers = head;

//   //The URL
//   const baseUrl = "https://cab230.hackhouse.sh/search?";
//   const query = "offence=Armed Robbery";
//   // const userInput = document.getElementById("myInput").value;

//   const url = baseUrl + query + "&" + filter;

//   return fetch(encodeURI(url), getParam)
//     .then(function(response) {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error("Network response was not ok.");
//     })
//     .catch(function(error) {
//       console.log(
//         "There has been a problem with your fetch operation: ",
//         error.message
//       );
//     });
// }
