
export let JWT = "null";

export function logBtn(email, password) {
    return fetch("https://cab230.hackhouse.sh/login", {
        method: "POST",
        body: `email=${email}&password=${password}`,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
        .then(res => res.json())
        .then(result => {
            result = JSON.stringify(result);
            window.JWT = result.token;
            JWT = result.token;
        })
        .catch(function (error) {
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
    const input = "offence=" + search;
    const url = "https://cab230.hackhouse.sh/search?" + input;
    return fetch(encodeURI(url), getParam)
        .then(res => { console.log(res); return res })
        .then(res => res.json())
        .then(res => res.results)
        .then(data => {
            data.map(result => ({
                id: result.id,
                LGA: result.LGA,
                total: result.total,
                lat: result.lat,
                lng: result.lng
            }))
        })
        .catch(function (error) {
            console.log(
                "There has been a problem with your fetch operation: ",
                error.message
            );
        })
}