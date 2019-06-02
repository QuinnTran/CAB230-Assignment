import React, { useState, useEffect } from 'react';
import { filBtn, useOffences, useAreas, useAges, useGens, useYears } from "./api";


export default function FilterBar() {
    return (
        <div>
            <h1>Filter</h1>
            <Filters />
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

    window.inputOff = undefined;
    window.inputArea = undefined;
    window.inputAge = undefined;
    window.inputGen = undefined;
    window.inputYear = undefined;

    return (
        <table>
            <tr>
                <td>Offence</td>
                <td>Area</td>
                <td>Age</td>
                <td>Gender</td>
                <td>Year</td>
            </tr>
            <tr>
                <td>
                    <select id="offences">
                        {offences.map(offence => (<Offence key={offence.title} title={offence} />))}
                    </select>
                </td>
                <td>
                    <select id="areas">
                        {areas.map(area => (<Areas key={area.title} title={area} />))}
                    </select>
                </td>
                <td>
                    <select id="ages">
                        {ages.map(age => (<Ages key={age.title} title={age} />))}
                    </select>
                </td>
                <td>
                    <select id="genders">
                        {genders.map(gender => (<Genders key={gender.title} title={gender} />))}
                    </select>
                </td>
                <td>
                    <select>
                        {years.map(year => (<Years key={year.title} title={year} />))}
                    </select>
                </td>
                <td><button onClick={filBtn}>Filter</button></td>
            </tr>
        </table >
    );
}