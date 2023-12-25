import { IconStar } from '@/assets/icons';
import { useEffect, useState } from 'react';
import { Pagination, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FetchCoins, SearchCategoriesFilter } from '../../../usecases/home';
import type { PaginationProps } from 'antd';
import { Select } from 'antd';
import './style.scss';
import { caculatorAverage24h } from '@/helpers/functions';

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
          <img src={value.icon} width={32} />
          <span className='ml-2'>{value.name}</span>
        </p>
      );
    },
  },
  {
    key: 'rate',
    title: 'Rate',
    width: 91,
    align: 'left',
    render: (_, value) => {
      return (
        <p className='inline-flex items-center'>
          <span className='mr-1'>{value.rate}</span> <IconStar />
        </p>
      );
    },
  },
  {
    key: 'price',
    title: 'Price',
    width: 151,
    align: 'right',
    render: (_, value: any) => {
      return value.price['USD'];
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
    render: (_, value: any) => {
      return value.volume24h;
    },
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 168,
    align: 'right',
    render: (_, value) => {
      return value.marketCap;
    },
  },
  {
    key: 'graph',
    title: 'Price Graph (7d)',
    width: 261,
    align: 'right',
    render: (_, value) => {
      return (
        <div className='flex items-center justify-end'>
          <img src={`data:image/svg+xml;base64,${value.chart}`} />
        </div>
      );
    },
  },
];

const Coins = () => {
  const [params, setParams] = useState({
    search_key: '',
    sort_by: '',
    sort_order: '',
    limit: 0,
    page: 0,
  });
  const [coinsSearch, setCoinsSearch] = useState([]);
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const [coins, setCoins] = useState();
  const [total, setTotal] = useState();
  const showTotal = (total: number) => `Total ${total} items`;

  function getCoins(params: any) {
    FetchCoins(params).then((res: any) => {
      res.data.map((item: any) => {
        const average24 = caculatorAverage24h(item.price, item.histPrices);
        item.average24 = average24;
        return item;
      });
      setCoins(res.data);
      setTotal(res.total);
    });
  }

  function searchCategoriesFilter() {
    SearchCategoriesFilter({ name: '' }).then((res: any) => {
      const data = res.map((item: any) => {
        return {
          value: item.name,
          label: item.name,
        };
      });
      setCoinsSearch(data);
    });
  }

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    setParams({ ...params, page: pageNumber });
  };

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    const newParam = { ...params, page: current, limit: pageSize };
    setParams(newParam);
  };

  const onChangeSearch = (item: any) => {
    setParams({ ...params, search_key: item });
  };

  const onSearch = (item: any) => {
    setParams({ ...params, search_key: item });
  };

  useEffect(() => {
    getCoins(params);
  }, [params]);

  useEffect(() => {
    searchCategoriesFilter();
  }, []);

  return (
    <div className='coin'>
      <div className='w-full md:max-w-[250px] mb-4'>
        <Select
          showSearch
          className='w-full h-[44px]'
          placeholder='Filter coins'
          optionFilterProp='children'
          filterOption={filterOption}
          onChange={onChangeSearch}
          onSearch={onSearch}
          options={coinsSearch}
        />
      </div>
      <div className='overflow-x-auto'>
        <Table
          columns={columns}
          dataSource={coins}
          pagination={{ position: ['none'] }}
          rowKey='key'
        />
      </div>
      <div className='p-6 flex items-center justify-center'>
        <Pagination
          total={total}
          showTotal={(total) => showTotal(total)}
          showSizeChanger
          showQuickJumper
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
        />
      </div>
    </div>
  );
};

export default Coins;
