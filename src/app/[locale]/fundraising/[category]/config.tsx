import { ColumnsType } from 'antd/es/table';
import { Flex } from 'antd';
import Image from 'next/image';
import BackersModal from './components/backers-modal';
import DataGroup from '@/components/DataGroup';
import { formatDate } from '@/helpers/datetime';
import {
  getFlagCountry,
  nFormatter,
  percentFormat,
  renderSortIcon,
} from '@/helpers';

export const FundraisingCategory = {
  FundingRounds: 'funding-rounds',
  TopBackers: 'top-backers',
  Overview: 'overview',
};

const TEMP_DISABLED_TAGS = [FundraisingCategory.Overview];

export const FundraisingCategoryLabel = {
  [FundraisingCategory.FundingRounds]: 'Funding Rounds',
  [FundraisingCategory.TopBackers]: 'Top Backers',
  [FundraisingCategory.Overview]: 'Overview',
};

export const FundraisingPathApi = {
  [FundraisingCategory.FundingRounds]: 'funding-rounds',
  [FundraisingCategory.TopBackers]: 'top-backers',
  [FundraisingCategory.Overview]: 'overview',
};

export type FundraisingType = keyof typeof FundraisingCategory;

export const validFundraisingType = (type: string): type is FundraisingType => {
  return Object.keys(FundraisingCategory).includes(type);
};

export const getBreadcrumbConfig = (category?: FundraisingType) => {
  return [
    {
      title: 'Fundraising',
    },
    {
      title: (
        <a href='#'>
          {
            FundraisingCategoryLabel[
              category ?? FundraisingCategory.FundingRounds
            ]
          }
        </a>
      ),
    },
  ];
};

const roundsColumns: ColumnsType<any> = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    fixed: true,
    align: 'left',
    width: 24,
    render: (_, value, index) => {
      return (
        <div className='text-grey-700 text-sm font-jb leading-tight'>
          {index + 1}
        </div>
      );
    },
  },
  {
    title: 'Project',
    dataIndex: 'name',
    key: 'name',
    sortIcon: renderSortIcon,
    sorter: true,
    fixed: true,
    width: 163,
    render: (_, { name, icon, _id }) => (
      <Flex align={'center'} gap={8}>
        {
          icon ? (
            <img src={icon} alt={'icon'} width={32} height={32} />
          ) : ''
        }
        <span>{name}</span>
      </Flex>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'announceDate',
    key: 'announceDate',
    width: 99,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (value) => formatDate(value),
  },
  {
    title: 'Amount Raised',
    dataIndex: 'raise',
    key: 'fundsRaised',
    align: 'right',
    width: 138,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (raise) => nFormatter(raise, 2, '$'),
  },
  {
    title: 'Round',
    dataIndex: 'stage',
    key: 'stage',
    width: 135,
    sortIcon: renderSortIcon,
    sorter: true,
  },
  // {
  //   title: 'Valuation',
  //   dataIndex: 'raise',
  //   key: 'raise',
  //   sortIcon: renderSortIcon,
  //   sorter: true,
  //   render: (_, { raise }) => nFormatter(raise, 2, '$'),
  // },
  {
    title: 'Backers',
    dataIndex: 'funds',
    key: 'funds',
    width: 225,
    sortIcon: renderSortIcon,
    sorter: false,
    render: (_, { funds }) => (
      <BackersModal data={funds}>
        {({ onOpen }) => <DataGroup data={funds} onClick={onOpen} />}
      </BackersModal>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    width: 186,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { category }) => category?.name,
  },
];

const topBackersColumns: ColumnsType<any> = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    fixed: true,
    align: 'left',
    width: 24,
    render: (_, value, index) => {
      return (
        <div className='text-grey-700 text-sm font-jb leading-tight'>
          {index + 1}
        </div>
      );
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: true,
    width: 216,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { name, logo, id }) => (
      <a href={`funding-rounds/detail/${id}?name=${name}`}>
        <Flex align={'center'} gap={8}>
          {
            logo ? (
              <Image src={`data:image/png;base64,${logo}`} alt={'logo'} width={32} height={32} />
            ) : ''
          }
          <span className='text-base text-grey-700 font-bold font-jb truncate max-w-[55px] md:max-w-[160px] lg:max-w-[200px]'>{name}</span>
        </Flex>
      </a>
    ),
  },
  {
    title: 'Tier',
    dataIndex: 'tier',
    key: 'tier',
    width: 83,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: 114,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    title: 'Country',
    dataIndex: 'location',
    key: 'location',
    sortIcon: renderSortIcon,
    width: 71,
    sorter: true,
    align: 'left',
    render: (_, { country }) => {
      const flag = getFlagCountry(country);
      if (!flag) return <div className='text-center'>-</div>;
      return <img alt={country} src={flag} width={32} height={18} />;
    },
  },
  {
    title: 'Investments',
    dataIndex: 'investments',
    key: 'totalInvestments',
    sortIcon: renderSortIcon,
    width: 120,
    align: 'right',
    sorter: true,
    render: (_, { investments }) => <>{investments}</>,
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'marketCap',
    width: 134,
    sortIcon: renderSortIcon,
    sorter: false,
    align: 'right',
    render: (_, { marketCap, mCapChangeIn24h }) => (
      <Flex vertical>
        <span>{nFormatter(marketCap, 2, '$')}</span>
        {percentFormat(mCapChangeIn24h)}
      </Flex>
    ),
  },
];

export const getColumnsFundraising = (category: string) => {
  switch (category) {
    case FundraisingCategory.FundingRounds:
      return roundsColumns;
    case FundraisingCategory.TopBackers:
      return topBackersColumns;
    default:
      return [];
  }
};

export const getFundraisingTags = () => {
  return Object.values(FundraisingCategory).map((key) => ({
    label: FundraisingCategoryLabel[key],
    value: key,
    disabled: TEMP_DISABLED_TAGS.includes(key),
  }));
};

export const getFundraisingPathApi = (category: string) => {
  switch (category) {
    case FundraisingCategory.FundingRounds:
      return FundraisingPathApi[FundraisingCategory.FundingRounds];
    case FundraisingCategory.TopBackers:
      return FundraisingPathApi[FundraisingCategory.TopBackers];
    default:
      return FundraisingPathApi[FundraisingCategory.Overview];
  }
};
