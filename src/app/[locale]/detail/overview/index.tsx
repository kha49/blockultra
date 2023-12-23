import React from 'react';
import InfoCharts from './info';
import CoinCompare from '../compare/Compare';
import { dataCompare } from '@/helpers/const_variables';

export const Overview = () => {
  return (
    <div className='overview fade-top'>
      <InfoCharts />
      <CoinCompare data={dataCompare} />
    </div>
  );
};
