function serBtn(search) {
    
  
    //The parameters of the call
    let getParam = { method: "GET" };
    let head = { Authorization: `Bearer ${JWT}` };
    getParam.headers = head;
    
    //The URL
    const query = "offence=" + search;
    const url = "https://cab230.hackhouse.sh/search?" + query + "&" + filter;
    return (fetch(encodeURI(url), getParam)
      .then(res => res.json())
      .then(res => res.result)
      .then(data => data.map(result => ({
        offence: result.offence,  
        area: result.area,
        age: result.age,
        gender: result.gender,
        year: result.year
      })))
    )
  }