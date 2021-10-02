import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-contextmenu';

import {
  setLocation, setSelected,
  useAppDispatch, useAppSelector
} from '../state';
import { filter } from '../search';
import SetMapRef, { MapHandle } from './SetMapRef';
import HandleMapClick from './HandleMapClick';
import CircleMarker from './CircleMarker';
import LocationMarker from './LocationMarker';
import RemoveMapOnUnmount from './RemoveMapOnUnmount';
import AreaFilter from './AreaFilter';
import Geocoder from './Geocoder';

// Option: whether to use raster instead of vector graphics?
// If true, renders markers using an HTML canvas element.
// If false, renders markers using a SVG layer.
const PREFER_CANVAS = false;

interface Props {
  center: L.LatLngExpression;
  zoom: number;
}

const MapView = (
  { center, zoom }: Props,
  ref: React.Ref<MapHandle>
) => {
  // For debugging memory consumption
  React.useEffect(() => {
    console.log('Mounted MapView');
    return () => {
      console.log('Unmounting MapView');
    }
  }, []);

  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.poiList.data);
  const country = useAppSelector(state => state.poiList.country);
  const facets = useAppSelector(state => state.facets);
  const selected = useAppSelector(state => state.ui.selected);
  const location = useAppSelector(state => state.location);

  console.log('Rendering MapView');

  const filteredData = filter(data, country, facets);

  console.log('filteredData.length:', filteredData.length);

  const contextmenuItems = [
    {
      text: 'Set location',
      callback: (e: L.LeafletMouseEvent) => {
        dispatch(setLocation(e.latlng.lat, e.latlng.lng));
      }
    }
  ];

  const tileProps = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  };

  return (
    <MapContainer
      id='map-container'
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      preferCanvas={PREFER_CANVAS}
      contextmenu={true}
      contextmenuItems={contextmenuItems}
    >
      <SetMapRef ref={ref} />
      <HandleMapClick
        handleMapClick={() => dispatch(setSelected(null))} />
      <Geocoder />
      <AreaFilter />

      <TileLayer {...tileProps} />

      {filteredData.map(e =>
        <CircleMarker
          key={`${e.type}-${e.id}`}
          e={e}
          isSelected={e.id === selected}
          handleClick={() => dispatch(setSelected(e.id))}
        />
      )}

      <LocationMarker
        lat={location.lat}
        lon={location.lon} />

      <RemoveMapOnUnmount />
    </MapContainer>
  );
};

export default React.forwardRef(MapView);
