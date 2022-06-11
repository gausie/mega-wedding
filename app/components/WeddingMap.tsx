import { Text } from "@chakra-ui/react";
import Map, { Marker } from "react-map-gl";

export default function WeddingMap() {
  return (
    <Map
      style={{ width: "100%", height: "400px" }}
      mapStyle="mapbox://styles/gausie/cl4adr758000z14odoh4bf1rd"
      initialViewState={{
        longitude: -3,
        latitude: 55.930328,
        zoom: 8,
      }}
      mapboxAccessToken="pk.eyJ1IjoiZ2F1c2llIiwiYSI6ImNrcGNocWN5ZjFhNTUydnQ3ODI3eGM2ajcifQ.fNcw7n-ZBtPX-zZg3zXmDg"
    >
      <Marker longitude={-2.7792507} latitude={55.930328} anchor="bottom" >
        <Text fontSize="4xl">🏡</Text>
      </Marker>
      <Marker longitude={-3.2021022} latitude={55.9485947} anchor="bottom" >
        <Text fontSize="4xl">🏰</Text>
      </Marker>
    </Map>
  );
}
