import React, { useState } from "react";
import { GoogleApiWrapper, Map, InfoWindow, Marker } from "google-maps-react";

export function MapContainer(props) {
  const [mapOptions, setMapOptions] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  });

  const onMarkerClick = (props, marker, e) => {
    setMapOptions({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  const onClose = (props) => {
    if (mapOptions.showingInfoWindow) {
      setMapOptions({
        ...mapOptions,
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

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
      >
        <Marker onClick={onMarkerClick} name={"Kandirpar, Cumilla"} />
        <InfoWindow
          marker={mapOptions.activeMarker}
          visible={mapOptions.showingInfoWindow}
          onClose={onClose}
        >
          <div>
            <h2>{mapOptions.selectedPlace.name}</h2>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
})(MapContainer);
