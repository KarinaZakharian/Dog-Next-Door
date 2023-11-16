import { MapContainer, TileLayer } from 'react-leaflet';
import { LeafletMapProps } from '../../../@types/user';

const LeafletMap: React.FC<LeafletMapProps> = ({
  center,
  zoom,
  children,
}: LeafletMapProps) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {children}
    </MapContainer>
  );
};

export default LeafletMap;
