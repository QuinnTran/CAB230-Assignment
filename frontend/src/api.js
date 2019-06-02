import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom"

// export const baseURL = "http://localhost:3000";
export const baseURL = "https://cab230.hackhouse.sh";
/**
 * Authentication
 * @param {*} email 
 * @param {*} password 
 */
export function regBtn(email, password) {
    return fetch(`${baseURL}/register`, {
        method: "POST",
        body: `email=${email}&password=${password}`,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
        .then(res => res.json())
        .then(function (result) {
            let appDiv = document.getElementById("app");
            appDiv.innerHTML = JSON.stringify(result);
            regBtn.disabled = true;
        })
        .catch(function (error) {
            console.log(
                "There has been a problem with your fetch operation: ",
                error.message
            );
        });
}

export function logBtn(email, password) {
    fetch(`${baseURL}/login`, {
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
            let appDiv = document.getElementById("app");
            appDiv.innerHTML = JSON.stringify(result);
            document.cookie = `token=${result.token}`;
            document.location.href = "/search";
        })
        .catch(function (error) {
            console.log("There has been a problem with your fetch operation: ", error.message);
        });
}

/**
 * Helpers
 */
function getOffences() {
    return fetch(`${baseURL}/offences`)
        .then(res => res.json())
        .then(res => res.offences)
}
export function useOffences() {
    const [offLoading, setOffLoading] = useState(true);
    const [offError, setOffError] = useState(null);
    const [offences, setOffences] = useState([]);

    useEffect(() => {
        getOffences()
            .then(offences => {
                setOffences(offences);
                setOffLoading(false);
            })
            .catch(e => {
                setOffError(e);
                setOffLoading(false);
            });
    }, []);
    return {
        offences,
        offLoading,
        offError
    };
}
function getAreas() {
    return fetch(`${baseURL}/areas`)
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
        areas,
        areaLoading,
        areaError
    };
}
function getAges() {
    return fetch(`${baseURL}/ages`)
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
        ages,
        ageLoading,
        ageError
    };
}
function getGenders() {
    return fetch(`${baseURL}/genders`)
        .then(res => res.json())
        .then(res => res.genders)
}
export function useGens() {
    const [genLoading, setGenLoading] = useState(true);
    const [genError, setGenError] = useState(null);
    const [genders, setGen] = useState([]);

    useEffect(() => {
        getGenders()
            .then(genders => {
                setGen(genders);
                setGenLoading(false);
            })
            .catch(e => {
                setGenError(e);
                setGenLoading(false);
            });
    }, []);
    return {
        genders,
        genLoading,
        genError
    };
}
function getYears() {
    return fetch(`${baseURL}/years`)
        .then(res => res.json())
        .then(res => res.years)
}
export function useYears() {
    const [yearLoading, setYearLoading] = useState(true);
    const [yearError, setYearError] = useState(null);
    const [years, setYear] = useState([]);

    useEffect(() => {
        getYears()
            .then(years => {
                setYear(years);
                setYearLoading(false);
            })
            .catch(e => {
                setYearError(e);
                setYearLoading(false);
            });
    }, []);
    return {
        years,
        yearLoading,
        yearError
    };
}

/**
 * Search filter
 * @param {*} search 
 */
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
    const oldURL = `${baseURL}/search?` + input;

    return fetch(encodeURI(oldURL), getParam)
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

export function getCookie(cname) {
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

export function filBtn() {
    let getParam = { method: "GET" };
    let head = { Authorization: `Bearer ${getCookie("token")}` };
    getParam.headers = head;

    var data = `offence=${window.inputOff}`;

    if (window.inputArea != undefined) {
        url += `&area=${window.inputArea}`;
    }
    if (window.inputAge != undefined) {
        url += `&age=${window.inputAge}`;
    }
    if (window.inputGen != undefined) {
        url += `&gender=${window.inputGen}`;
    }
    if (window.inputYear != undefined) {
        url += `&year=${window.inputYear}`;
    }

    const url = `${baseURL}/search?` + data;
    console.log(url)
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
            window.filterBtn = res;
            console.log(window.filterBtn);
            return res;
        })
        .catch(function (error) {
            console.log(
                "There has been a problem with your fetch operation: ",
                error.message
            );
        })
}