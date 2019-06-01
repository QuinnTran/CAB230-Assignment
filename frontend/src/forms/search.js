import React, { useState, useEffect, useRef } from 'react';
import { useSearchBtn, useAreas, useAges } from "../api";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; //tab
import "react-tabs/style/react-tabs.css";
import SmartDataTable from 'react-smart-data-table'; //table
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'; //chart
import L from "leaflet"; //map
import 'leaflet/dist/leaflet.css';

window.showQ = [];

export default function Ser() {
  const [search, setSearch] = useState("");
  const { loading, query, error } = useSearchBtn(search);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  if (query == undefined) {
    console.log("NOTHING HERE YET");
  } else {
    window.showQ = query;
  }

  return (
    <div>
      <div className="container">
        <h2>Search</h2>
        <SearchBar onSubmit={setSearch} />

      </div>
      <hr />
      <Tabs>
        <TabList>
          <Tab>Result</Tab>
          <Tab>Chart</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <SmartDataTable data={query} sortable />
        </TabPanel>
        <TabPanel>
          <ChartDisplay data={query} />
        </TabPanel>
        <TabPanel>
          <MapShow />
        </TabPanel>
      </Tabs>
    </div>
  )
}

//--------------------------------- SEARCH - FILTERS-------------------------------------------
// function SearchBar() {
//   const { areas, areaLoading, areaError } = useAreas();
//   const { ages, ageLoading, ageError } = useAges();

//   const [hasSearched, setHasSearched] = useState(false);


//   const areasData = areas.map(area => ({
//     data: area,
//     name: area
//   }));
//   const agesData = ages.map(age => ({
//     data: age,
//     name: age
//   }));

//   const [search, setSearch] = useState("");
//   const [selectArea, setSelectArea] = useState(null);
//   const [selectAge, setSelectAge] = useState(null);

//   return (
//     <table>
//       <tr>
//         <td>Offence</td>
//         <td>Area</td>
//         <td>Age</td>
//         <td>Gender</td>
//         <td>Year</td>
//       </tr>
//       <tr>
//         <td>
//           <input
//             aria-labelledby="search-button"
//             name="search"
//             id="search"
//             type="search"
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//           />
//         </td>
//         <td>
//           <select
//             option={areasData}
//             onChange={areas => {
//               const innerArea = areas.map(area => (
//                 area.name),
//                 selectArea(innerArea)
//               )
//             }}
//           />
//         </td>
//         <td>
//           <select
//             option={agesData}
//             onChange={ages => {
//               const innerAge = ages.map(age => (
//                 age.name),
//                 selectArea(innerAge)
//               )
//             }}
//           />
//         </td>
//         <td>
//           <button type="button" onClick={() => { setHasSearched(true) }}>
//             Search
//           </button>
//         </td>
//       </tr>
//     </table >
//   );
// }

function SearchBar(props) {
  const [search, setSearch] = useState("");
  const [areas, setArea] = useState([]);
  const [ages, setAge] = useState([]);
  const [genders, setGen] = useState([]);
  const [years, setYear] = useState([]);
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
          <input
            aria-labelledby="search-button"
            name="search"
            id="search"
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </td>
        <td>
          <select onChange={e => setArea(e.target.value)}>
            {areas.map(value => (
              <option>{value}</option>))}
          </select>
        </td>
        <td>
          <select onChange={e => setAge(e.target.value)}>
            <option defaultValue />{ages}
          </select>
        </td>
        <td>
          <select onChange={e => setGen(e.target.value)}>
            <option defaultValue />{genders}
          </select>
        </td>
        <td>
          <select onChange={e => setYear(e.target.value)}>
            <option defaultValue />{years}
          </select>
        </td>
        <td>
          <button type="button" onClick={() => props.onSubmit(search)}>
            Search
          </button>
        </td>
      </tr>
    </table>
  );
}

//-------------------------------------- CHART --------------------------------------------
function ChartDisplay(props) {
  var result = [];
  return (
    <BarChart width={1000} height={500} data={props.data}>
      <XAxis dataKey={"LGA"} stroke="#0000FF" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar type="monotone" dataKey="total" fill="0000FF" barSize={10} />
    </BarChart>
  )
}

//-------------------------------------- MAP ----------------------------------------------

const style = {
  width: "100%",
  height: "45vw"
}

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  icocnUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

function Map({ markerPosition }) {
  const mapImg = useRef(null);

  useEffect(() => {
    mapImg.current = L.map("map", {
      center: [-23.467723, 143.736915],
      zoom: 5,
      layers: [L.tileLayer("http://{s}.title.osm.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href=""http://osm.org/copyright">OpenMap</a> cintributions'
      })
      ]
    });
  }, []);

  const markerImg = useRef(null);
  useEffect(() => {
    if (markerImg.current) {
      markerImg.current.setLatLng(markerPosition);
    } else {
      for (var row of window.showQ) {
        markerImg.current = L.marker([row.lat, row.lng]).addTo(mapImg.current)
      }
    }
  }, [markerPosition]);
  return <div id="map" style={style} />
}

function MapShow() {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 0, lng: 0
  });
  const { lat, lng } = markerPosition;
  return (
    <Map markerPosition={markerPosition} />

  )
}

