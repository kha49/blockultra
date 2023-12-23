import React from 'react';
import { IMarqueeItemProps } from './MarqueeItem.type';

const MarqueeItem = ({ data }: IMarqueeItemProps) => {
  return (
    <div className='flex items-center gap-6'>
      <div className='flex items-center gap-1'>
        <span className='text-xs leading-5 font-semibold text text-grey-500'>
          {data.coinName}
        </span>
        <span className='text-xs leading-5 font-semibold text text-grey-700'>
          {data.coinPrice}
        </span>
        <span className='text-xs leading-5 font-semibold text text-sp-green-500'>
          {data.percent}
        </span>
      </div>
    </div>
  );
};

export default MarqueeItem;
