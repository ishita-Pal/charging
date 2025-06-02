// src/Components/MapView.jsx
import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
  marginTop: "20px",
};

const mapCenter = {
  lat: 28.6139,
  lng: 77.2090,
};

const MapView = ({ stations }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [selected, setSelected] = useState(null);

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={5}>
      {stations.map((station) => (
        <Marker
          key={station.id || station._id}
          position={{
            lat: parseFloat(station.latitude),
            lng: parseFloat(station.longitude),
          }}
          onClick={() => setSelected(station)}
        />
      ))}

      {selected && (
        <InfoWindow
          position={{
            lat: parseFloat(selected.latitude),
            lng: parseFloat(selected.longitude),
          }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h3>{selected.name}</h3>
            <p>Status: {selected.status}</p>
            <p>Power: {selected.powerOutput} kW</p>
            <p>Connector: {selected.connectorType}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapView;
