import { useEffect, useState } from 'react';
import { Pagination, Select, Table } from 'antd';
import type { PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FetchUpComings } from '../../../usecases/home';
import './style.scss';

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
          <img src={value.image} width={32} />
          <span className='ml-2'>{value.name}</span>
        </p>
      );
    },
  },
  {
    key: 'initialCap',
    title: 'Initial Cap',
    width: 151,
    align: 'left',
    render: (_, value) => {
      return value.initialCap;
    },
  },
  {
    key: 'totalRaise',
    title: 'Total Raise',
    width: 151,
    align: 'right',
    render: (_, value) => {
      return value.raise;
    },
  },
  {
    key: 'bankers',
    title: 'Bankers',
    width: 167,
    align: 'right',
    render: (_, value) => {
      return value.stage;
    },
  },
  {
    key: 'category',
    title: 'Category',
    width: 186,
    align: 'right',
    render: (_, value) => {
      return value.category.name;
    },
  },
  {
    key: 'launchpad',
    title: 'Launch Pad',
    width: 168,
    align: 'right',
    render: (_, value) => {
      return value.launchpads[0]?.name;
    },
  },
  {
    key: 'startDate',
    title: 'Start Date',
    width: 261,
    align: 'right',
    render: (_, value) => {
      return value.created_at;
    },
  },
];

const UpComing = () => {
  const [total, setTotal] = useState();
  const [upcomings, setUpComings] = useState();
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

  function getUpComings(params: any) {
    FetchUpComings(params).then((res: any) => {
      setUpComings(res.data);
      setTotal(res.total);
    });
  }

  useEffect(() => {
    getUpComings(params);
  }, [params]);

  return (
    <div className='upcoming'>
      <div className='w-full md:max-w-[250px] mb-4'>
        <Select
          showSearch
          style={{ width: 282, height: 44 }}
          placeholder='Filter UpComing'
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
          dataSource={upcomings}
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

export default UpComing;
