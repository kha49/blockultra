import { Flex } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';

const TopData = (props: any) => {
  const { title, data } = props;
  return (
    <Flex className='flex-1 flex-col gap-4'>
      <h4 className='font-bold text-[#333747] text-[20px] tracking-[0] leading-[28px] whitespace-nowrap'>
        {title}
      </h4>
      <div className='overflow-x-auto'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ['none'] }}
          rowKey='id'
        />
      </div>
    </Flex>
  );
};

export default TopData;

const columns: ColumnsType<any> = [
  {
    key: 'id',
    title: '#',
    width: 56,
    align: 'left',
    render: (_, value, index) => {
      return index + 1;
    },
  },
  {
    key: 'name',
    title: 'Name',
    width: 248,
    align: 'left',
    render: (_, value) => {
      return (
        <p className='inline-flex items-center'>
          <img src={value.image.icon} width={32} />
          <span className='ml-2'>{value.name}</span>
        </p>
      );
    },
  },

  {
    key: 'price',
    title: 'Price',
    width: 151,
    align: 'right',
    render: (_, value) => {
      return value.price.USD;
    },
  },
  {
    key: 'period',
    title: '24h %',
    width: 167,
    align: 'right',
    render: (_, value) => {
      return (
        <p
          style={{ color: value.graph === 'increase' ? '#1AB369' : '#FA3363' }}
        >
          {value.average24}
        </p>
      );
    },
  },
  {
    key: 'volume',
    title: 'Volume (24h)',
    width: 186,
    align: 'right',
    render: (_, value) => {
      return value.volume24h;
    },
  },
];
