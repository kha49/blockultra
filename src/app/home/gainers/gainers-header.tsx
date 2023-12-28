import { Button, Dropdown, Flex, MenuProps, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ItemType } from 'antd/es/menu/hooks/useItems';

const times = [
  {
    key: '1d',
    label: '24h',
  },
  {
    key: '7d',
    label: '7d',
  },
  {
    key: '1m',
    label: '1m',
  },
  {
    key: '3m',
    label: '3m',
  },
  {
    key: '6m',
    label: '6m',
  },
  {
    key: '1y',
    label: '1y',
  },
];

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
  };

  const _onChangeTime = ({ key }: { key: string }) => {
    const item = times.find((a) => a?.key === key);
    if (!item) return;
    setTimeSelected({
      ...item,
    });
  };

  return (
    <Flex className='gainers-header items-center justify-between mx-6 bg-[#FCFCFD]'>
      <h3 className='font-bold text-black text-[28px] tracking-[0] leading-[28px] whitespace-nowrap'>
        Top Coin Gainers & Losers
      </h3>
      <Space>
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
          <Space>
            {coinSelected.label} <DownOutlined />
          </Space>
        </Dropdown>
        <Dropdown
          overlayClassName='overlay-menu-center'
          menu={{
            items: times,
            onClick: _onChangeTime,
          }}
          arrow
          trigger={['click']}
          className='justify-center h-9 w-28 rounded border hover:cursor-pointer'
        >
          <Space>
            {timeSelected.label} <DownOutlined />
          </Space>
        </Dropdown>
      </Space>
    </Flex>
  );
};

export default GainersHeader;
