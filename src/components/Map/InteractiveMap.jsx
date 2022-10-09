import * as React from 'react';
import Map from 'react-map-gl';


export default function InteractiveMap() {
    return (
        <Map
        mapboxAccessToken={}
        initialViewState={{
            longitude: -8.2245,
            latitude: 39.3999,
            zoom: 1
        }}
        style={{width: 600, height: 400}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        />
    );
}