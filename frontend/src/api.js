import React, { useState, useEffect } from 'react';

// ------------------------ AUTHENTICATION ----------------------------
export function regBtn(email, password) {
    return fetch("https://cab230.hackhouse.sh/register", {
        method: "POST",
        body: `email=${email}&password=${password}`,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
        .then(res => res.json())
        .then(function (result) {
            console.log("Register successfully")
        })
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
            console.log("Login Success!")
            document.cookie = `token=${result.token}`;
        })
        .catch(function (error) {
            console.log("There has been a problem with your fetch operation: ", error.message);
        });
}

// ------------------------ AREAS ----------------------------
function getAreas() {
    return fetch("https://cab230.hackhouse.sh/areas")
        .then(res => res.json())
        .then(res => res.areas)
}

export function useAreas() {
    const [areaLoading, setAreaLoading] = useState(true);
    const [areaError, setAreaError] = useState(null);
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        getAreas()
            .then(areas => {
                setAreas(areas);
                setAreaLoading(false);
            })
            .catch(e => {
                setAreaError(e);
                setAreaLoading(false);
            });
    }, []);
    return {
        areaLoading,
        areas,
        areaError
    };
}

// ------------------------ AGES ----------------------------
function getAges() {
    return fetch("https://cab230.hackhouse.sh/ages")
        .then(res => res.json())
        .then(res => res.ages)
}
export function useAges() {
    const [ageLoading, setAgeLoading] = useState(true);
    const [ageError, setAgeError] = useState(null);
    const [ages, setAge] = useState([]);

    useEffect(() => {
        getAges()
            .then(ages => {
                setAge(ages);
                setAgeLoading(false);
            })
            .catch(e => {
                setAgeError(e);
                setAgeLoading(false);
            });
    }, []);
    return {
        ageError,
        ages,
        ageLoading
    };
}
// ------------------------ GENDERS ----------------------------
function getGenders() {
    return fetch("https://cab230.hackhouse.sh/genders")
        .then(res => res.json())
        .then(res => res.areas)
}

// ------------------------ YEARS ----------------------------
function getYears() {
    return fetch("https://cab230.hackhouse.sh/years")
        .then(res => res.json())
        .then(res => res.areas)
}

// ------------------------ SEARCH ----------------------------
export function useSearchBtn(search) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState([]);

    useEffect(() => {
        serBtn(search)
            .then(query => {
                setQuery(query);
                setLoading(false);
            })
            .catch(e => {
                setError(e);
                setLoading(false);
            });
    }, [search]);
    return {
        loading,
        query,
        error
    };
}

export function serBtn(search) {
    //The parameters of the call
    let getParam = { method: "GET" };
    let head = { Authorization: `Bearer ${getCookie("token")}` };
    getParam.headers = head;

    const input = "offence=" + search;
    const baseURL = "https://cab230.hackhouse.sh/search?" + input;
    // const url = baseURL + offenceSer + areaSer + ageSer + genderSer + yearSer;

    return fetch(encodeURI(baseURL), getParam)
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
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}