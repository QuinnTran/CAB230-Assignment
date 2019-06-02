import React, { useState, useEffect, useRef } from 'react';
import { useSearchBtn } from "./api";
import FilterBar from './filter';

//tab
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
//table
import SmartDataTable from 'react-smart-data-table';
//chart
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
//map
import L from "leaflet";
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

  return (
    <div>
      <div className="container">
        <h2>Search</h2>
        <SearchBar onSubmit={setSearch} />
        <FilterBar onSubmit={setSearch} />

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

/**
 * SEARCH
 * @param {*} props 
 */
function SearchBar(props) {
  const [search, setSearch] = useState("");
  return (
    <table>
      <tr>
        <td>Offence</td>
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
          <button type="button" onClick={() => props.onSubmit(search)}>
            Search
          </button>
        </td>
      </tr>
    </table>
  );
}

/**
 * CHART
 */
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

/**
 * MAP
 */
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

