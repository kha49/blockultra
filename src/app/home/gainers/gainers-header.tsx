import { Button, Dropdown, Flex, MenuProps, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const times: MenuProps['items'] = [
  {
    key: '1',
    label: '24h',
  },
  {
    key: '2',
    label: '7d',
  },
  {
    key: '3',
    label: '30d',
  },
];

const all_coin: MenuProps['items'] = [
  {
    key: '1',
    label: 'Bitcoin',
  },
  {
    key: '2',
    label: 'Bitcoin Cash',
  },
  {
    key: '3',
    label: 'Ethereum',
  },
];

type GainersHeaderProps = {
  onFilterCoins: (coin: string) => void;
  onFilterTime: (time: string) => void;
};

const GainersHeader = ({ onFilterCoins, onFilterTime }: GainersHeaderProps) => {
  return (
    <Flex className='items-center justify-between px-6'>
      <h3 className='font-bold text-black text-[28px] tracking-[0] leading-[28px] whitespace-nowrap'>
        Top Coin Gainers & Losers
      </h3>
      <Space>
        <Dropdown
          menu={{
            items: all_coin,
            onClick: ({ key }) => onFilterCoins(key),
          }}
          arrow
          trigger={['click']}
        >
          <Button>
            All Coins <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown
          menu={{ items: times, onClick: ({ key }) => onFilterTime(key) }}
          arrow
          trigger={['click']}
        >
          <Button>
            24h
            <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
    </Flex>
  );
};

export default GainersHeader;
