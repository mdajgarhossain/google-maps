import React, { useState } from "react";
import { GoogleApiWrapper, Map, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./Map";

export function MapContainer(props) {
  const [mapOptions, setMapOptions] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    currentCoords: {},
  });

  const onMarkerClick = (props, marker, e) => {
    console.log(e);

    setMapOptions({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      currentCoords: { lat: e.latLng.lat(), lng: e.latLng.lng() },
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

  const onSubmit = (e) => {
    e.preventDefault();
    // e.target.reset();
    console.log(mapOptions.currentCoords.lat, mapOptions.currentCoords.lat);
  };

  return (
    <div>
      <CurrentLocation centerAroundCurrentLocation google={props.google}>
        <Marker onClick={onMarkerClick} name={"Current Location"} />
        <InfoWindow
          marker={mapOptions.activeMarker}
          visible={mapOptions.showingInfoWindow}
          onClose={onClose}
        >
          <div style={{ textAlign: "center" }}>
            <h2>{mapOptions.selectedPlace.name}</h2>
            <form onSubmit={onSubmit}>
              <div>
                <label>Current coordinates: </label>
                <input
                  type="text"
                  defaultValue={`${mapOptions.currentCoords.lat}, ${mapOptions.currentCoords.lng}`}
                />
              </div>
              <div>
                <label>Name: </label>
                <input type="text" defaultValue={"Ajgar Hossain Jewel"} />
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </InfoWindow>
      </CurrentLocation>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
})(MapContainer);
