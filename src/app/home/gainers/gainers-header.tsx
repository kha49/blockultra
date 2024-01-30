import { Dropdown, Space } from 'antd';
import { useState } from 'react';
import IconSelectArrow from '@/assets/icons/IconSelectArrow';
import { TIME_FILTER_ALL } from '@/helpers/constants';

const allCoin = [
  {
    key: 'all',
    label: 'All Coins',
  },
  {
    key: '100',
    label: 'Top 100',
  },
  {
    key: '300',
    label: 'Top 300',
  },
  {
    key: '1000',
    label: 'Top 1000',
  },
];

type GainersHeaderProps = {
  onFilterCoins: (coin: string) => void;
  onFilterTime: (time: string) => void;
};

const GainersHeader = ({ onFilterCoins, onFilterTime }: GainersHeaderProps) => {
  const [coinSelected, setCoinSelected] = useState({
    key: 'all',
    label: 'All Coins',
  });

  const [timeSelected, setTimeSelected] = useState({
    key: '1d',
    label: '24h',
  });

  const _onChangeCoin = ({ key }: { key: string }) => {
    const item = allCoin.find((a) => a?.key === key);
    if (!item) return;
    setCoinSelected({
      ...item,
    });
    onFilterCoins(item.key);
  };

  const _onChangeTime = ({ key }: { key: string }) => {
    const item = TIME_FILTER_ALL.find((a) => a?.key === key);
    if (!item) return;
    setTimeSelected({
      ...item,
    });
    onFilterTime(item.key);
  };

  return (
    <div className='flex flex-col md:flex-row xl:flex-row items-start justify-between gap-3 mb-3'>
      <h3 className='font-bold text-black text-lg md:text-[28px] tracking-[0] leading-[28px] whitespace-nowrap'>
        Top Coin Gainers & Losers
      </h3>
      <div
        className={
          'flex items-center justify-between md:justify-end w-full md:gap-4'
        }
      >
        <Dropdown
          overlayClassName='overlay-menu-center'
          menu={{
            items: allCoin,
            onClick: _onChangeCoin,
          }}
          arrow
          trigger={['click']}
          className='justify-center h-9 w-28 rounded border hover:cursor-pointer'
        >
          <div className='flex justify-between items-center py-2 px-4 text-sm font-medium font-jm'>
            {coinSelected.label} <IconSelectArrow />
          </div>
        </Dropdown>
        <Dropdown
          overlayClassName='overlay-menu-center'
          menu={{
            items: TIME_FILTER_ALL,
            onClick: _onChangeTime,
          }}
          arrow
          trigger={['click']}
          className='justify-center h-9 w-28 rounded border hover:cursor-pointer'
        >
          <div className='flex justify-between items-center py-2 px-4 text-sm font-medium font-jm'>
            {timeSelected.label} <IconSelectArrow />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default GainersHeader;
