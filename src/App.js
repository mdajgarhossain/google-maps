import React, { useState } from "react";
import { GoogleApiWrapper, Map, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./Map";

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

  return (
    <div>
      <CurrentLocation centerAroundCurrentLocation google={props.google}>
        <Marker onClick={onMarkerClick} name={"Current Location"} />
        <InfoWindow
          marker={mapOptions.activeMarker}
          visible={mapOptions.showingInfoWindow}
          onClose={onClose}
        >
          <div>
            <h2>{mapOptions.selectedPlace.name}</h2>
          </div>
        </InfoWindow>
      </CurrentLocation>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
})(MapContainer);
