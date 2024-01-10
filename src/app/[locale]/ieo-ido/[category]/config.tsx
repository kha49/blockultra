import { Flex, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import BankersModal from './components/bankers-modal';
import DataGroup from '@/components/DataGroup';
import LaunchpadModal from './components/launchpad-modal';
import { nFormatter } from '@/helpers';
import { formatDate } from '@/helpers/datetime';
import Doughnut from '@/components/DoughnutChart';

export const IeoIdoCategory = {
  upcoming: 'upcoming',
  ongoing: 'ongoing',
  ended: 'ended',
  topIeoLaunchpads: 'top-ieo-launchpads',
  topIdoLaunchpads: 'top-ido-launchpads',
  overview: 'overview',
};

export const IeoIdoApiPath = {
  [IeoIdoCategory.upcoming]: 'ieo-ido',
  [IeoIdoCategory.ongoing]: 'ieo-ido',
  [IeoIdoCategory.ended]: 'ieo-ido-ended',
  [IeoIdoCategory.topIeoLaunchpads]: 'ieo-ido',
  [IeoIdoCategory.topIdoLaunchpads]: 'ieo-ido-top-launch-pad',
  [IeoIdoCategory.overview]: 'ieo-ido',
};

const TEMP_DISABLED_TAGS = [
  IeoIdoCategory.ongoing,
  IeoIdoCategory.topIeoLaunchpads,
  IeoIdoCategory.overview,
];

export const IeoIdoCategoryLabel = {
  [IeoIdoCategory.upcoming]: 'Upcoming',
  [IeoIdoCategory.ongoing]: 'Ongoing',
  [IeoIdoCategory.ended]: 'Ended',
  [IeoIdoCategory.topIeoLaunchpads]: 'Top IEO Launchpads',
  [IeoIdoCategory.topIdoLaunchpads]: 'Top IDO Launchpads',
  [IeoIdoCategory.overview]: 'Overview',
};

export const IeoIdoCategoryPath = {
  [IeoIdoCategory.upcoming]: 'upcoming',
  [IeoIdoCategory.ongoing]: 'ongoing',
  [IeoIdoCategory.ended]: 'ended',
  [IeoIdoCategory.topIeoLaunchpads]: 'top-ieo-launchpads',
  [IeoIdoCategory.topIdoLaunchpads]: 'top-ido-launchpads',
  [IeoIdoCategory.overview]: 'overview',
};

const columnsUpcoming: ColumnsType<any> = [
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    fixed: true,
    render: (_, { name, image, tag, isSponsored }) => (
      <Flex wrap='wrap' gap={8}>
        <Image src={image} alt={'icon'} width={24} height={24} />
        <span>{name}</span>
        <Tag className={'bg-[#F1F4F7]'} bordered={false}>
          {tag}
        </Tag>
        {isSponsored && (
          <Image alt='hot' src={'/hot.svg'} width={12} height={12} />
        )}
      </Flex>
    ),
  },
  {
    title: 'Initial Cap',
    dataIndex: 'initialCap',
    key: 'initialCap',
    render: (_, { initialCap }) => nFormatter(initialCap, 2, '$'),
  },
  {
    title: 'Total Raise',
    dataIndex: 'totalRaise',
    key: 'totalRaise',
    render: (_, { totalRaise }) => nFormatter(totalRaise, 2, '$'),
  },
  {
    title: 'Backers',
    dataIndex: 'backers',
    key: 'backers',
    render: (_, { funds }) => (
      <BankersModal data={funds}>
        {({ onOpen }) => <DataGroup data={funds} onClick={onOpen} />}
      </BankersModal>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (_, { category }) => <>{category.name}</>,
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpads',
    key: 'launchpads',
    render: (_, { launchpads }) => (
      <LaunchpadModal data={launchpads}>
        {({ onOpen }) => <DataGroup data={launchpads} onClick={onOpen} />}
      </LaunchpadModal>
    ),
  },
  {
    title: 'Start Date',
    dataIndex: 'startedDate',
    key: 'startedDate',
    render: (_, { start_date }) => formatDate(start_date),
  },
];

const columnsEnded: ColumnsType<any> = [
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    render: (_, { name, image, tag }) => (
      <Flex align={'center'} gap={8}>
        <Image src={image} alt={'icon'} width={24} height={24} />
        <span>{name}</span>
        <Tag className={'bg-[#F1F4F7]'} bordered={false}>
          {tag}
        </Tag>
      </Flex>
    ),
  },
  {
    title: 'Current Price',
    dataIndex: 'price',
    key: 'price',
    render: (_, { price }) => nFormatter(price, 2, '$'),
  },
  {
    title: 'Total Raise',
    dataIndex: 'raise',
    key: 'raise',
    render: (_, { raise }) => nFormatter(raise, 2, '$'),
  },
  {
    title: 'ROI',
    dataIndex: 'roi',
    key: 'roi',
    render: (_, { roi }) => nFormatter(roi, 2, '$'),
  },
  {
    title: 'ATH ROI',
    dataIndex: 'athRoi',
    key: 'athRoi',
    render: (_, { athRoi }) => nFormatter(athRoi, 2, '$'),
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpadList',
    key: 'launchpadList',
    render: (_, { launchpads }) => (
      <LaunchpadModal data={launchpads}>
        {({ onOpen }) => <DataGroup data={launchpads} onClick={onOpen} />}
      </LaunchpadModal>
    ),
  },
  {
    title: 'End Date',
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: (_, { updated_at }) => formatDate(updated_at),
  },
];

const columnsTopIdoLaunchpads: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'project',
    key: 'project',
    render: (_, { name, image, tag }) => (
      <Flex align={'center'} gap={8}>
        <Image src={image} alt={'icon'} width={24} height={24} />
        <span>{name}</span>
        <Tag className={'bg-[#F1F4F7]'} bordered={false}>
          {tag}
        </Tag>
      </Flex>
    ),
  },
  {
    title: 'Tier',
    dataIndex: 'initialCap',
    key: 'initialCap',
    render: (_, { initialCap }) => nFormatter(initialCap, 2, '$'),
  },
  {
    title: 'ROI',
    dataIndex: 'totalRaise',
    key: 'totalRaise',
    render: (_, { totalRaise }) => nFormatter(totalRaise, 2, '$'),
  },
  {
    title: 'ATH ROI',
    dataIndex: 'totalRaise',
    key: 'totalRaise',
    render: (_, { totalRaise }) => nFormatter(totalRaise, 2, '$'),
  },
  {
    title: 'IDOs',
    dataIndex: 'totalRaise',
    key: 'totalRaise',
    render: (_, { totalRaise }) => nFormatter(totalRaise, 2, '$'),
  },
  {
    title: 'Sum Market Cap',
    dataIndex: 'totalRaise',
    key: 'totalRaise',
    render: (_, { totalRaise }) => nFormatter(totalRaise, 2, '$'),
  },
  {
    title: 'Entry',
    dataIndex: 'totalRaise',
    key: 'totalRaise',
    render: (_, { totalRaise }) => nFormatter(totalRaise, 2, '$'),
  },
  {
    title: 'Gainers',
    dataIndex: 'gainers',
    key: 'gainers',
    render: (_, {}) => (
      <div className='flex gap-3 items-center'>
        <Doughnut
          data={[30, 100 - 30]}
          colors={['green', 'red']}
          radius={24}
          hole={14}
          stroke={1}
        />
        <div className='text-sm font-semibold text-[#333747]'>{30}%</div>
      </div>
    ),
  },
];

export const getIeoIdoCategoryLabel = (category: string) => {
  return (
    IeoIdoCategoryLabel[category] ||
    IeoIdoCategoryLabel[IeoIdoCategory.upcoming]
  );
};

export const getIeoIdoBreadcrumbs = (category: string) => {
  return [
    {
      title: 'Home',
    },
    {
      title: 'IDO/IEO',
    },
    {
      title: getIeoIdoCategoryLabel(category),
    },
  ];
};

export const getIeoIdoColumns = (category: string) => {
  switch (category) {
    case IeoIdoCategory.upcoming:
      return columnsUpcoming;
    case IeoIdoCategory.ongoing:
      return columnsUpcoming;
    case IeoIdoCategory.ended:
      return columnsEnded;
    case IeoIdoCategory.topIeoLaunchpads:
      return columnsUpcoming;
    case IeoIdoCategory.topIdoLaunchpads:
      return columnsTopIdoLaunchpads;
    case IeoIdoCategory.overview:
      return columnsUpcoming;
    default:
      return columnsUpcoming;
  }
};

export const getCategoryTags = () => {
  return Object.values(IeoIdoCategory).map((category) => ({
    label: IeoIdoCategoryLabel[category],
    value: category,
    disabled: TEMP_DISABLED_TAGS.includes(category),
  }));
};

export const getIeoIdoApiPath = (category: string) => {
  return IeoIdoApiPath[category] || IeoIdoApiPath[IeoIdoCategory.upcoming];
};
