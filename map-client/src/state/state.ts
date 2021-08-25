import { Poi } from '../types';

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface PoiState {
  status: Status;
  data: Poi[];
}

export interface UiState {
  selected: Poi | null;
  hover: Poi | null;
}

export interface FacetState {
  name: string;
  brand: string;
}

export interface State {
  poiList: PoiState;
  ui: UiState;
  facets: FacetState;
}

export const initialState: State = {
  poiList: {
    status: 'idle',
    data: []
  },
  ui: {
    selected: null,
    hover: null
  },
  facets: {
    name: '',
    brand: ''
  }
};
