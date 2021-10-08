import { Poi } from '../types';
import { Country, initialState, PoiState, QueryStatus } from './state';
import { Action, AppThunk } from './actions';

import { fetchOverpass, overpass2Poi, PoiDecorator } from '../overpass';

export const queryOverpass = (query: string): AppThunk => {
  return async dispatch => {
    dispatch(setStatus('loading'));
    const overpassJson = await fetchOverpass(query);
    if (overpassJson === null) {
      return dispatch(setStatus('failed'));
    }

    const newData1 = overpass2Poi(overpassJson);
    const newData2 = PoiDecorator.extend(newData1);
    dispatch(setPoiList(newData2));
    dispatch(setStatus('succeeded'));
  };
};

export const clearPoiList = (): AppThunk => {
  return async dispatch => {
    dispatch(setPoiList([]));
    dispatch(setStatus('idle'));
  };
};

const setPoiList = (pois: Poi[]): Action => {
  return {
    type: 'poiList/setData',
    data: pois
  };
};

const setStatus = (status: QueryStatus): Action => {
  return {
    type: 'poiList/setStatus',
    data: status
  };
};

export const setCountry = (country: Country): Action => {
  return {
    type: 'poiList/setCountry',
    data: country
  };
};

export const poiReducer = (
  state: PoiState = initialState.poiList,
  action: Action
): PoiState => {
  switch (action.type) {
    case 'poiList/setData':
      return {
        ...state,
        data: action.data
      };
    case 'poiList/setStatus':
      return {
        ...state,
        status: action.data
      };
    case 'poiList/setCountry':
      return {
        ...state,
        country: action.data
      };
    default:
      return state;
  }
};
