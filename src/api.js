
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

export function serBtn(search) {
  //The parameters of the call
  let getParam = { method: "GET" };
  let head = { Authorization: `Bearer ${JWT}` };
  getParam.headers = head;
  
  //The URL
  const query = "offence=" + search;
  const url = "https://cab230.hackhouse.sh/search?offence=" + query;

  fetch(encodeURI(url), getParam)
    .then(res => res.json()) 
    .then(res => res.results)
    .then(results => results.map(result => ({
      offence: result.offence,
      area: result.area,
      age: result.age,
      gender: result.gender,
      year: result.year
    })))
}

export function filBtn(search) {
  const param = "";
  const query = search;
  let filter = "";

  //Example filter strings
  if (param === "area") {
    filter = "area=" + query;
  } else if (param === "age") {
    filter = "age=" + query;
  } else if (param === "year") {
    filter = "year=" + query;
  }

  //The parameters of the call
  let getParam = { method: "GET" };
  let head = { Authorization: `Bearer ${JWT}` };
  getParam.headers = head;

  //The URL
  const url = "https://cab230.hackhouse.sh/search?offence="  + query + "&" + filter;

  return fetch(encodeURI(url), getParam)
    .then(res => res.json()
    .catch(function(error) {
      console.log(
        "There has been a problem with your fetch operation: ",
        error.message
      );
    }));
}
