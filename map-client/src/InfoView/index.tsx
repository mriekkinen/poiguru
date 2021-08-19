import React from 'react';

import { setSelected, useAppDispatch, useAppSelector } from '../state';
import { MapHandle } from '../MapView/SetMapRef';
import Address from './Address';
import ReturnBtn from './ReturnBtn';
import Link from './Link';

interface Props {
  mapRef: React.RefObject<MapHandle>;
}

const InfoView = ({ mapRef }: Props) => {
  const dispatch = useAppDispatch();
  const poi = useAppSelector(state => state.selected);

  if (!poi) {
    return (
      <div className='info-container'>
        <div className='info-item'>
          <i>Nothing selected</i>
        </div>
      </div>
    );
  }

  return (
    <div className='info-container'>
      <div className='info-item'>
        <ReturnBtn
          handleClick={() => dispatch(setSelected(null))} />
      </div>
      <div className='info-item'>
        <h2>{poi.tags['name']}</h2>
        <span>Tea shop</span>
      </div>
      <div className='info-item'>
        <Address mapRef={mapRef} e={poi} />
      </div>
      <div className='info-item'>
        <Link
          href={poi.tags['website']}
          label={poi.tags['website']} />
      </div>
    </div>
  );
};

export default InfoView;
