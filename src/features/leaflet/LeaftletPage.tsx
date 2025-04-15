import { Button } from "@/components/ui/button";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const position: LatLngExpression = [-25.4372, -49.2695];

export default function LeaftletPage() {
  return (
    <div className="h-100 w-100">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="h-[500px] w-full rounded-xl"
      >
        <TileLayer
          attribution='&copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <Button>E aí, Chefe!</Button>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
