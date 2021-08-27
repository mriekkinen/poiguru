import React from 'react';

import { Poi } from '../types';

import { Facet } from './styles';

interface MatchCountProps {
  filteredData: Poi[];
}

const MatchCount = ({ filteredData }: MatchCountProps) => {
  const matches = filteredData.length !== 1 ? 'matches' : 'match';
  return (
    <Facet>
      <b>{filteredData.length}</b> {matches}
    </Facet>
  )
};

export default MatchCount;
