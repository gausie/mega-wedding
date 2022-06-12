import { Text } from "@chakra-ui/react";
import Map, { Layer, LayerProps, Marker, Source } from "react-map-gl";

const geojson: GeoJSON.Feature<GeoJSON.Geometry> = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "LineString",
    coordinates: [
      [-2.7792507, 55.930328],
      [-3.0, 55.92],
      [-3.2021022, 55.9485947],
    ],
  },
};

const lineLayer: LayerProps = {
  id: "routelayer",
  type: "line",
  paint: {
    "line-blur": 2,
    "line-width": 4,
    "line-dasharray": [4, 2],
  },
  layout: {
    "line-join": "round",
  },
};

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
      attributionControl={false}
      mapboxAccessToken="pk.eyJ1IjoiZ2F1c2llIiwiYSI6ImNrcGNocWN5ZjFhNTUydnQ3ODI3eGM2ajcifQ.fNcw7n-ZBtPX-zZg3zXmDg"
    >
      <Source id="route" type="geojson" data={geojson}>
        <Layer {...lineLayer} />
      </Source>
      <Marker longitude={-2.7792507} latitude={55.930328} anchor="center">
        {/** Coulston */}
        <Text
          fontFamily="serif"
          fontStyle="italic"
          fontSize="2xl"
          textShadow="-1px -1px  #cfb5a5,-1px -1px  #cfb5a5, 1px -1px  #cfb5a5, 1px 1px  #cfb5a5, -1px 1px #cfb5a5"
        >
          X
        </Text>
      </Marker>
    </Map>
  );
}
