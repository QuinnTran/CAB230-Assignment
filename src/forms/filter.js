import React from "react";

export default function Fil(){

    return(
        <div className="container">
            <h2>Offences Filter</h2>
            <form >
                <label className="Offences">Offences: </label>
                <input type="offences"/>
                <br></br><br></br>
                <label className="Area">Area: </label>
                <input type="area"/>
                <br></br><br></br>
                <label className="Year">Year: </label>
                <input type="year"/>
                <br></br><br></br>
                <button type="submit">Search</button>
            </form>
        </div>
    );
}