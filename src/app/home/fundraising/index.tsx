import { useEffect, useState } from 'react';
import './style.scss';
import { Pagination, Select, Table } from 'antd';
import type { PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FetchFundraisings } from '../../../usecases/home';

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
    key: 'project',
    title: 'Project',
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
    key: 'date',
    title: 'Date',
    width: 91,
    align: 'left',
    render: (_, value) => {
      return value.date;
    },
  },
  {
    key: 'amountRaised',
    title: 'Amount Raised',
    width: 151,
    align: 'right',
    render: (_, value) => {
      return value.raise;
    },
  },
  {
    key: 'round',
    title: 'Round',
    width: 167,
    align: 'right',
    render: (_, value) => {
      return value.stage;
    },
  },
  {
    key: 'valuation',
    title: 'Valuation',
    width: 186,
    align: 'right',
    render: (_, value) => {
      return value.valuation;
    },
  },
  {
    key: 'backers',
    title: 'Backers',
    width: 168,
    align: 'right',
    render: (_, value) => {
      return value.backers;
    },
  },
  {
    key: 'category',
    title: 'Category',
    width: 261,
    align: 'right',
    render: (_, value) => {
      return value.category.name;
    },
  },
];

const Fundraising = () => {
  const [total, setTotal] = useState();
  const [fundraisings, setFundraisings] = useState();
  const showTotal = (total: number) => `Total ${total} items`;
  const [params, setParams] = useState({
    search_key: '',
    filters: {},
    limit: 0,
    page: 0,
    sort_by: '',
    sort_order: '',
  });

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

  function getFundraisings(params: any) {
    FetchFundraisings(params).then((res: any) => {
      setFundraisings(res.data);
      setTotal(res.total);
    });
  }

  useEffect(() => {
    getFundraisings(params);
  }, [params]);

  return (
    <div className='fundraising'>
      <div className='w-full md:max-w-[250px] mb-4'>
        <Select
          showSearch
          style={{ width: 282, height: 44 }}
          placeholder='Filter Fundraising'
          optionFilterProp='children'
          filterOption={(input, option) =>
            (option?.label ?? '').includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={[
            {
              value: '1',
              label: 'Mirage',
            },
            {
              value: '2',
              label: 'Celestia',
            },
            {
              value: '3',
              label: 'Avalon',
            },
            {
              value: '4',
              label: 'Phi',
            },
            {
              value: '5',
              label: 'Suberra',
            },
          ]}
        />
      </div>
      <div className='overflow-x-auto'>
        <Table
          columns={columns}
          dataSource={fundraisings}
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

export default Fundraising;
