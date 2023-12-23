import { IconStar } from '@/assets/icons';
import { useEffect } from 'react';
import './style.scss';
import { Pagination, Select, Table } from 'antd';
import type { PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FetchFundraisings } from '../../../usecases/home';

interface IData {
  id: number;
  project: string;
  date: Date;
  amountRaised: string;
  round: string;
  valuation: string;
  backers: string;
  category: string;
}

const columns: ColumnsType<IData> = [
  {
    key: 'id',
    title: '#',
    width: 56,
    align: 'left',
    render: (_, value) => {
      return value.id;
    },
  },
  {
    key: 'project',
    title: 'Project',
    width: 248,
    align: 'left',
    render: (_, value) => {
      return value.project;
    },
  },
  {
    key: 'date',
    title: 'Date',
    width: 91,
    align: 'left',
    render: (_, value) => {
      return (
        <p className='inline-flex items-center'>
          <span className='mr-1'>{value.date.toLocaleDateString()}</span>{' '}
          <IconStar />
        </p>
      );
    },
  },
  {
    key: 'amountRaised',
    title: 'Amount Raised',
    width: 151,
    align: 'right',
    render: (_, value) => {
      return value.amountRaised;
    },
  },
  {
    key: 'round',
    title: 'Round',
    width: 167,
    align: 'right',
    render: (_, value) => {
      return value.round;
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
      return value.category;
    },
  },
];

const data: IData[] = [
  {
    id: 1,
    project: 'Bitcoin',
    date: new Date(),
    amountRaised: '$1.5B',
    round: 'Series A',
    valuation: '$10B',
    backers: '1',
    category: 'Cryptocurrency',
  },
];

const Fundraising = () => {
  const showTotal: PaginationProps['showTotal'] = (total) =>
    `Total ${total} items`;

  function getFundraisings() {
    const params = {
      filters: {},
      limit: 2000,
      skip: 2000,
      sortingColumn: 'date',
      sortingDirection: 'DESC',
    };
    FetchFundraisings(params).then((res: any) => {
      console.log(res);
    });
  }

  useEffect(() => {
    getFundraisings();
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      <Select
        showSearch
        style={{ width: 282, height: 44 }}
        placeholder='Filter Fundraising'
        optionFilterProp='children'
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
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
      <div className='overflow-x-auto'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ['none'] }}
          rowKey='id'
        />
        <div className='p-6 flex items-center justify-center'>
          <Pagination
            total={500}
            showTotal={showTotal}
            showSizeChanger
            showQuickJumper
          />
        </div>
      </div>
    </div>
  );
};

export default Fundraising;
