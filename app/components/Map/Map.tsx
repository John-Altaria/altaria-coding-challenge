"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCoordinatesStore } from "@/store/coordStore";

const SetViewOnMount = ({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const Map = () => {
  const coords = useCoordinatesStore((state) => state.coordinates);

  if (!coords.every((value) => !!value)) {
    return <div>Loading map...</div>;
  }

  const defaultCenter: [number, number] = coords;
  const defaultZoom = 16;

  return (
    <MapContainer style={{ height: "100%", width: "100%" }}>
      <SetViewOnMount center={defaultCenter} zoom={defaultZoom} />
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};

export default Map;
