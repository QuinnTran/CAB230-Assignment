import React, { useState, useEffect } from 'react';
import { filBtn, useOffences, useAreas, useAges, useGens, useYears } from "./api";


export default function FilterBar() {
    return (
        <div>
            <h1>Filter</h1>
            <Filters />
            <button onClick={filBtn}>Filter</button>
        </div>
    )
}

/**
 * 
 * @param {*} props 
 */
function Offence(props) {
    return (
        <option>{props.title}</option>
    )
}
function Areas(props) {
    return (
        <option>{props.title}</option>
    )
}
function Ages(props) {
    return (
        <option>{props.title}</option>
    )
}
function Genders(props) {
    return (
        <option>{props.title}</option>
    )
}
function Years(props) {
    return (
        <option>{props.title}</option>
    )
}

function Filters() {
    const { offences, offLoading, offError } = useOffences();
    const { areas, areaLoading, areaError } = useAreas();
    const { ages, ageLoading, ageError } = useAges();
    const { genders, genLoading, genError } = useGens();
    const { years, yearLoading, yearError } = useYears();

    return (
        <table>
            <tr>
                <td>Offence</td>
                <td>Area</td>
                <td>Age</td>
                <td>Gender</td>
                <td>Year</td>
                <td>Month</td>
            </tr>
            <tr>
                <td>
                    <select id="offences">
                        {offences.map(offence => (<Offence key={offence.title} title={offence} />))}
                    </select>
                </td>
                <td>
                    <select id="areasBtn">
                        {areas.map(area => (<Areas key={area.title} title={area} />))}
                    </select>
                </td>
                <td>
                    <select id="agesBtn">
                        {ages.map(age => (<Ages key={age.title} title={age} />))}
                    </select>
                </td>
                <td>
                    <select id="genBtn">
                        {genders.map(gender => (<Genders key={gender.title} title={gender} />))}
                    </select>
                </td>
                <td>
                    <select id="yearsBtn">
                        {years.map(year => (<Years key={year.title} title={year} />))}
                    </select>
                </td>
                <td>
                    <select id="mthBtn">
                        <option>2001</option>
                        <option>2002</option>
                        <option>2003</option>
                        <option>2004</option>
                        <option>2005</option>
                        <option>2006</option>
                        <option>2007</option>
                        <option>2008</option>
                        <option>2009</option>
                        <option>2010</option>
                        <option>2011</option>
                        <option>2012</option>
                        <option>2013</option>
                        <option>2014</option>
                        <option>2015</option>
                        <option>2016</option>
                        <option>2017</option>
                        <option>2018</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <button id="offBtn" onClick={offBtn}>Apply</button>
                </td>
                <td>
                    <button id="areasBtn" onClick={areasBtn}>Apply</button>
                </td>
                <td>
                    <button id="agesBth" onClick={agesBtn}>Apply</button>
                </td>
                <td>
                    <button id="genBtn" onClick={genBtn}>Apply</button>
                </td>
                <td>
                    <button id="yearBtn" onClick={yearBtn}>Apply</button>
                </td>
                <td>
                    <button id="mthBtn" onClick={mthBtn}>Apply</button>
                </td>
            </tr>
        </table >
    );
}

function offBtn() {
    window.inputOff = document.getElementById("offences").value;
    console.log(window.inputOff);
}
function areasBtn() {
    window.inputArea = document.getElementById("areas").value;
}
function agesBtn() {
    window.inputAge = document.getElementById("ages").value;
}
function genBtn() {
    window.inputGen = document.getElementById("genders").value;
}
function yearBtn() {
    window.inputYear = document.getElementById("years").value;
}
function mthBtn() {
    window.inputMonth = document.getElementById("months").value;
}