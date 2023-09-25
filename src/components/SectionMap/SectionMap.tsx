// import { useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
// import { icon } from 'leaflet';
// import adressData from '../../adressData';

import './SectionMap.scss';

function SectionMap() {
  // const [activeAdress, setActiveAdress] = useState(null);
  // const data = adressData;

  return (
    <MapContainer
      className="leaflet-container"
      center={[46.116667, 3.416667]}
      zoom={12}
      scrollWheelZoom={false}
    >
      {/* {data.features.map((park) => (
        <Marker
          key={park.properties.PARK_ID}
          position={[
            park.geometry.coordinates[1],
            park.geometry.coordinates[0],
          ]}
          onClick={() => {
            setActiveAdress(park);
          }}
          icon={icon} */}
      {/* />
      ))} */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default SectionMap;
