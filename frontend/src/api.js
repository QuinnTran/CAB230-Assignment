
// let JWT = "null";

export function regBtn(email, password) {
    return fetch("https://cab230.hackhouse.sh/register", {
        method: "POST",
        body: `email=${email}&password=${password}`,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
        .then(res => res.json())
        .catch(function (error) {
            console.log(
                "There has been a problem with your fetch operation: ",
                error.message
            );
        });
}

export function logBtn(email, password) {
    fetch("https://cab230.hackhouse.sh/login", {
        method: "POST",
        body: `email=${email}&password=${password}`,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function (result) {
            document.cookie = `token=${result.token}`;
        })
        .catch(function (error) {
            console.log("There has been a problem with your fetch operation: ", error.message);
        });
}

export function serBtn(search) {
    //The parameters of the call
    let getParam = { method: "GET" };
    let head = { Authorization: `Bearer ${getCookie("token")}` };
    getParam.headers = head;

    console.log(getCookie("token"));

    //The URL
    const input = "offence=" + search;
    const url = "https://cab230.hackhouse.sh/search?" + input;
    return fetch(encodeURI(url), getParam)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(res => res.result)
        .then(res => {
            res.map(res => ({
                LGA: res.LGA,
                total: res.total,
                lat: res.lat,
                lng: res.lng
            }))
            console.log(res);

            return res;
        })
        .catch(function (error) {
            console.log(
                "There has been a problem with your fetch operation: ",
                error.message
            );
        })
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}