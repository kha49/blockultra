import { ColumnsType } from 'antd/es/table';
import { IFundingRoundsData, ITopBackerData } from './types';
import { Avatar, Flex, Tag } from 'antd';
import Image from 'next/image';
import moment from 'moment';
import BackersModal from './components/backers-modal';
import DataGroup from '@/components/DataGroup';
import Doughnut from '@/components/DoughnutChart';

export const FundraisingCategory = {
  FundingRounds: 'funding-rounds',
  TopBackers: 'top-backers',
  Overview: 'overview',
};

export const FundraisingCategoryLabel = {
  [FundraisingCategory.FundingRounds]: 'Funding Rounds',
  [FundraisingCategory.TopBackers]: 'Top Backers',
  [FundraisingCategory.Overview]: 'Overview',
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
    dataIndex: 'project',
    key: 'project',
    render: (_, { project }) => (
      <Flex align={'center'} gap={8}>
        {/* <Image src={project.icon} alt={'icon'} width={24} height={24} /> */}
        <span>{project}</span>
        {/* <Tag className={'bg-[#F1F4F7]'} bordered={false}>
          {project.tag}
        </Tag> */}
      </Flex>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (_, { date }) => moment(date).format('DD MMM YYYY'),
  },
  {
    title: 'Amount Raised',
    dataIndex: 'amountRaised',
    key: 'amountRaised',
    render: (_, { amountRaised }) => <>${amountRaised}M</>,
  },
  {
    title: 'Round',
    dataIndex: 'round',
    key: 'round',
  },
  {
    title: 'Valuation',
    dataIndex: 'valuation',
    key: 'valuation',
    render: (_, { valuation }) => <>${valuation}M</>,
  },
  {
    title: 'Backers',
    dataIndex: 'backers',
    key: 'backers',
    render: (_, { backers }) => (
      <BackersModal data={backers}>
        {({ onOpen }) => <DataGroup data={backers} onClick={onOpen} />}
      </BackersModal>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
];

const topBackersColumns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, { name, logo }) => (
      <Flex align={'center'} gap={8}>
        {/* <Image src={logo} alt={'icon'} width={24} height={24} /> */}
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

export const mockDataFundingRounds: IFundingRoundsData[] = [
  {
    project: {
      name: 'Binance',
      icon: '/binance.svg',
      tag: 'BNB',
      isHot: true,
    },
    date: '2021-07-12',
    amountRaised: 200,
    round: 'Round 1',
    valuation: 200,
    backers: [
      {
        group: 'VC',
        name: 'Binance',
        avatarUrl: '/binance.svg',
      },
      {
        group: 'VC',
        name: 'Binance',
        avatarUrl: '/binance.svg',
      },
      {
        group: 'VC',
        name: 'Binance',
        avatarUrl: '/binance.svg',
      },
      {
        group: 'VC',
        name: 'Binance',
        avatarUrl: '/binance.svg',
      },
      {
        group: 'VC',
        name: 'Binance',
        avatarUrl: '/binance.svg',
      },
    ],
    category: 'Exchange',
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
