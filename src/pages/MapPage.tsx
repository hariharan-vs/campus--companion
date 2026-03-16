import { motion } from "framer-motion";
import { Search, Navigation, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const campusCenter: [number, number] = [28.6139, 77.2090]; // Example: Delhi area

const buildings = [
  { id: 1, name: "Block A — Sciences", distance: "2 min", lat: 28.6145, lng: 77.2085 },
  { id: 2, name: "Block B — Engineering", distance: "5 min", lat: 28.6135, lng: 77.2095 },
  { id: 3, name: "Library", distance: "3 min", lat: 28.6142, lng: 77.2100 },
  { id: 4, name: "Student Center", distance: "1 min", lat: 28.6138, lng: 77.2082 },
  { id: 5, name: "Sports Complex", distance: "8 min", lat: 28.6150, lng: 77.2075 },
  { id: 6, name: "Hostel Block 1", distance: "10 min", lat: 28.6128, lng: 77.2088 },
];

const FlyToBuilding = ({ coords }: { coords: [number, number] | null }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 17, { duration: 1 });
  }, [coords, map]);
  return null;
};

const MapPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null);

  const filtered = buildings.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Leaflet Map */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={campusCenter}
          zoom={16}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyToBuilding coords={selectedCoords} />
          {buildings.map((b) => (
            <Marker key={b.id} position={[b.lat, b.lng]}>
              <Popup>{b.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: "50%" }}
        className="absolute bottom-0 left-0 right-0 bg-card rounded-t-[var(--card-radius)] border-t shadow-surface z-[1000]"
        style={{ height: "45%" }}
        drag="y"
        dragConstraints={{ top: -200, bottom: 100 }}
        dragElastic={0.1}
      >
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 rounded-full bg-muted" />
        </div>

        <div className="px-4 space-y-4 overflow-auto" style={{ maxHeight: "calc(100% - 40px)" }}>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search buildings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-full border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            {filtered.map((building) => (
              <motion.button
                key={building.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCoords([building.lat, building.lng])}
                className="w-full flex items-center gap-3 p-3 rounded-inner hover:bg-secondary transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-button bg-primary/10 flex items-center justify-center">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{building.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{building.distance} walk</p>
                </div>
                <Navigation size={14} className="text-muted-foreground" />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MapPage;
