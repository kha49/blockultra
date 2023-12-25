import { useEffect, useState } from 'react';
import { Pagination, Select, Table } from 'antd';
import type { PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchCoinsFilter, FetchCategories } from '@/usecases/home';

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
    width: 320,
    align: 'left',
    render: (_, value) => {
      return value.name;
    },
  },
  {
    key: 'avgPriceChange',
    title: 'Avg Price Change (24h)',
    width: 190,
    align: 'right',
    render: (_, value) => {
      return value.avgPriceChange['24H'];
    },
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 190,
    align: 'right',
    render: (_, value) => {
      return value.marketCap;
    },
  },
  {
    key: 'volume',
    title: 'Volume (24h)',
    align: 'right',
    render: (_, value) => {
      return value.volume24h;
    },
  },
  {
    key: 'dominance',
    title: 'Dominance',
    align: 'right',
    render: (_, value) => {
      return value.dominance;
    },
  },
  {
    key: 'gainers',
    title: 'Gainers',
    align: 'right',
    render: (_, value) => {
      return value.gainers;
    },
  },
];

const Categories = () => {
  const [coinsSearch, setCoinsSearch] = useState([]);
  const [params, setParams] = useState({
    search_key: '',
    sort_by: '',
    sort_order: '',
    limit: 0,
    page: 0,
  });
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const [categories, setCategories] = useState();
  const [total, setTotal] = useState();
  const showTotal = (total: number) => `Total ${total} items`;

  function getCategories(params: any) {
    FetchCategories(params).then((res: any) => {
      setCategories(res.data);
      setTotal(res.total);
    });
  }

  const onChangeSearch = (item: any) => {
    setParams({ ...params, search_key: item });
  };

  const onSearch = (item: any) => {
    setParams({ ...params, search_key: item });
  };

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    const newParam = { ...params, page: current, limit: pageSize };
    setParams(newParam);
  };

  function searchCategoriesFilter() {
    SearchCoinsFilter({ name: '' }).then((res: any) => {
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

  useEffect(() => {
    getCategories(params);
  }, [params]);

  useEffect(() => {
    searchCategoriesFilter();
  }, []);

  return (
    <div className='categories'>
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
          dataSource={categories}
          pagination={{ position: ['none'] }}
          rowKey='id'
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

export default Categories;
