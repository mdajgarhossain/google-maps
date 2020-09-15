import React from "react";
import { GoogleApiWrapper, Map } from "google-maps-react";

export function MapContainer(props) {
  const mapStyles = {
    width: "100%",
    height: "100%",
  };

  return (
    <div>
      <Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 23.461024,
          lng: 91.180645,
        }}
      />
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
})(MapContainer);
