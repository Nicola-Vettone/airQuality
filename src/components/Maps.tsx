import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const position: [number, number] = [41.9028, 12.4964];
const position1: [number, number] = [45.4654219, 9.1859243];
const position2: [number, number] = [40.8517746, 14.2681244];
const position3: [number, number] = [51.507351, -0.127758];
const position4: [number, number] = [48.856614, 2.352222];

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapComponent: React.FC = () => {
  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          <div className="popup">
            <h3>
              <span className="text-danger">Roma</span>,IT
            </h3>
            <h4>Dispositivo A9B42DB6BA7E</h4>
          </div>
        </Popup>
      </Marker>
      <Marker position={position1} icon={customIcon}>
        <Popup>
          <div className="popup">
            <h3>
              <span className="text-danger">Milano</span>,IT
            </h3>
            <h4>Dispositivo D7424D811D20</h4>
          </div>
        </Popup>
      </Marker>
      <Marker position={position2} icon={customIcon}>
        <Popup>
          <div className="popup">
            <h3>
              <span className="text-danger">Napoli</span>,IT
            </h3>
            <h4>Dispositivo 02A95A996717</h4>
          </div>
        </Popup>
      </Marker>
      <Marker position={position3} icon={customIcon}>
        <Popup>
          <div className="popup">
            <h3>
              <span className="text-danger">Londra</span>,UK
            </h3>
            <h4>Dispositivo 94BD842D82D3</h4>
          </div>
        </Popup>
      </Marker>
      <Marker position={position4} icon={customIcon}>
        <Popup>
          <div className="popup">
            <h3>
              <span className="text-danger">Parigi</span>,FR
            </h3>
            <h4>Dispositivo 588B62663ED8</h4>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
