'use client';
import React, { useState } from 'react';
import { IMarqueeItem } from '../props';
import { nFormatter, percentFormat, secondsToHms } from '@/helpers';
import { Tooltip } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const MarqueeItem = ({ data }: { data: IMarqueeItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const _renderTextDetail = () => {
    if (!data.isGas) {
      return _renderTextNotGas();
    }
    return _renderTextGas();
  };

  const _renderTextNotGas = () => {
    return (
      <div className={'flex items-center gap-2'}>
        <span className='text-xs leading-5 font-semibold text text-grey-700'>
          {nFormatter(Number(data.coinPrice), 2, '$')}
        </span>
        {percentFormat(
          Number(data.percent),
          'text-xs leading-5 font-semibold text'
        )}
      </div>
    );
  };

  const _renderTextGas = () => {
    return (
      <div className='flex items-center gap-2 text-xs leading-5 font-semibold text text-grey-700'>
        {percentFormat(Number(data.percent))}
        Gwei
        {isOpen ? (
          <CaretUpOutlined style={{ color: '#9FA4B7' }} />
        ) : (
          <CaretDownOutlined style={{ color: '#9FA4B7' }} />
        )}
      </div>
    );
  };

  const _renderGwei = () => {
    if (!data.isGas || !data.child) return null;
    const elements: JSX.Element[] = data.child.map((item, index) => {
      return (
        <div key={item.id} className={`w-36 ${index === 1} pr-2 pl-2`}>
          <div className='text text-gray-400 font-semibold'>
            {item.coinName}
          </div>
          <div className='text text-black font-semibold'>
            {item.coinPrice} gwei
          </div>
          <div className='text text-gray-400 text-xs'>
            ~{secondsToHms(item.percent)}
          </div>
        </div>
      );
    });
    return <div className='flex'>{elements}</div>;
  };

  return (
    <Tooltip
      open={isOpen}
      onOpenChange={setIsOpen}
      overlayClassName='gas-tooltip'
      className={`flex items-center gap-2 xl:gap-6 md:gap-6 ${
        data.isGas ? 'gas' : ''
      }`}
      title={data.isGas ? _renderGwei() : null}
      color='white'
    >
      <div className='flex items-center gap-2'>
        {data.icon ? data.icon : ''}
        <div className='text-xs leading-5 font-semibold text text-grey-500'>
          {data.coinName}
        </div>
        {_renderTextDetail()}
      </div>
    </Tooltip>
  );
};

export default MarqueeItem;
