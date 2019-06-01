import React, { useState, useEffect, useRef } from 'react';
import L from "leaflet"

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
            for (var row of window.queryShow) {
                markerImg.current = L.marker([row.lat, row.lng]).addTo(mapImg.current)
            }
        }
    }, [markerPosition]);
    return <div id="map" style={style} />
}

export default function MapShow() {
    const [markerPosition, setMarkerPosition] = useState({
        lat: 0, lng: 0
    });
    const { lat, lng } = markerPosition;
    return (
        <Map markerPosition={markerPosition} />

    )
}