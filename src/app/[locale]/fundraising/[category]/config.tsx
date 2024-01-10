import { ColumnsType } from 'antd/es/table';
import { IFundingRoundsData } from './types';
import { Avatar, Flex, Tag } from 'antd';
import Image from 'next/image';
import moment from 'moment';
import BackersModal from './components/backers-modal';
import DataGroup from '@/components/DataGroup';
import { formatDate } from '@/helpers/datetime';
import { nFormatter } from '@/helpers';

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
    title: 'Project',
    dataIndex: 'name',
    key: 'name',
    fixed: true,
    render: (_, { name, icon }) => (
      <Flex align={'center'} gap={8}>
        <Image src={icon} alt={'icon'} width={24} height={24} />
        <span>{name}</span>
      </Flex>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (value) => formatDate(value),
  },
  {
    title: 'Amount Raised',
    dataIndex: 'raise',
    key: 'raise',
    render: (raise) => nFormatter(raise, 2, '$'),
  },
  {
    title: 'Round',
    dataIndex: 'stage',
    key: 'stage',
  },
  {
    title: 'Valuation',
    dataIndex: 'raise',
    key: 'raise',
    render: (_, { raise }) => nFormatter(raise, 2, '$'),
  },
  {
    title: 'Backers',
    dataIndex: 'funds',
    key: 'funds',
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
    render: (_, { category }) => category?.name,
  },
];

const topBackersColumns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: true,
    render: (_, { name, logo }) => (
      <Flex align={'center'} gap={8}>
        <Image src={logo} alt={'icon'} width={24} height={24} />
        <span>{name}</span>
      </Flex>
    ),
  },
  {
    title: 'Tier',
    dataIndex: 'tier',
    key: 'tier',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    render: (_, { location }) => <>{location}</>,
  },
  {
    title: 'Investments',
    dataIndex: 'investments',
    key: 'investments',
    render: (_, { totalInvestments }) => <>{totalInvestments}</>,
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'marketCap',
    render: (_, { market_cap }) => (
      <Flex vertical className='font-bold'>
        <span>${market_cap}M</span>
        <span className={'text-[#1AB369]'}>{market_cap}%</span>
      </Flex>
    ),
  },
  // {
  //   title: 'Resources',
  //   dataIndex: 'resources',
  //   key: 'resources',
  //   render: (_, { resources }) => (
  //     <>
  //       <Avatar.Group maxCount={3}>
  //         {resources.map((resource: any) => (
  //           <Avatar key={resource.icon} src={resource.icon} alt={'resource'} />
  //         ))}
  //       </Avatar.Group>
  //     </>
  //   ),
  // },
  // {
  //   title: 'Gainers',
  //   dataIndex: 'gainers',
  //   key: 'gainers',
  //   render: (_, { gainers }) => (
  //     <div className='flex gap-3 items-center'>
  //       <Doughnut
  //         data={[gainers, 100 - gainers]}
  //         colors={['green', 'red']}
  //         radius={24}
  //         hole={14}
  //         stroke={1}
  //       />
  //       <div className='text-sm font-semibold text-[#333747]'>{gainers}%</div>
  //     </div>
  //   ),
  // },
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
