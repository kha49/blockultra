import type { ColumnsType } from 'antd/es/table';
import { nFormatter2, renderColumnId, renderSortIcon } from '@/helpers';
import BackersModal from '@/app/[locale]/fundraising/[category]/components/backers-modal';
import DataGroup from '@/components/DataGroup';
import LaunchpadModal from '@/app/[locale]/fundraising/[category]/components/launchpad-modal';
import moment from 'moment/moment';
import { CoreCellName } from '@/components/core-table/core-cell-name';
import { changeImageUrl } from '@/helpers/functions';

const columns: ColumnsType<any> = [
  renderColumnId(),
  {
    key: 'name',
    title: 'Project',
    width: 228,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    fixed: true,
    render: (value) => (
      <CoreCellName
        imagesUrl={[changeImageUrl(value.image)]} 
        name={value.project}
        symbol={value.symbol}
        link={`/en/detail/${value.key}`}
      />
    ),
  },
  {
    key: 'initialCap',
    title: 'Initial Cap',
    width: 123,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return nFormatter2(value.initialCap, 2, '$');
    },
  },
  {
    key: 'totalRaise',
    title: 'Total Raise',
    width: 135,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return nFormatter2(value.totalRaise, 2, '$');
    },
  },
  {
    key: 'backers',
    title: 'Backers',
    width: 200,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: false,
    render: (_, value) => {
      return (
        <BackersModal data={value.backers as any}>
          {({ onOpen }) => <DataGroup data={value.backers} onClick={onOpen} />}
        </BackersModal>
      );
      // if (!value.backers || isEmpty(value.backers)) return <span>-</span>;
      // const image = get(value, 'backers[0].image', '');
      // const name = get(value, 'backers[0].name', '');

      // return (
      //   <span className='inline-flex items-center'>
      //     <img src={image} className='w-8 h-8' alt={name} width={32} />
      //     <span className='ml-2 truncate'>{name}</span>
      //     {value.backers.length > 1 ? (
      //       <div className='text-xs ml-2 bg-gray-200 flex pt-0.5 pb-0.5 text-center pl-2.5 pr-2.5 rounded-sm text-gray-400'>
      //         +{value.backers.length - 1}
      //       </div>
      //     ) : (
      //       ''
      //     )}
      //   </span>
      // );
    },
  },
  {
    key: 'category_name',
    title: 'Category',
    width: 165,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { category_name }) => {
      return <p className='textover-ellipsis'>{category_name}</p>;
    },
  },
  {
    key: 'launchpad',
    title: 'Launchpad',
    width: 165,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: false,
    render: (_, value) => {
      const launchpad = value.launchpads.map((e: any) => ({
        ...e,
        avatarUrl: e.image,
      }));
      return (
        <LaunchpadModal data={launchpad}>
          {({ onOpen }) => <DataGroup data={launchpad} onClick={onOpen} />}
        </LaunchpadModal>
      );
      // if (!value.launchpads || isEmpty(value.launchpads)) return <span>-</span>;
      // const image = get(value, 'launchpads[0].image', '');
      // const name = get(value, 'launchpads[0].name', '');
      // return (
      //   <span className='inline-flex items-center'>
      //     <img src={image} className='w-8 h-8' alt={name} width={32} />
      //     <span className='ml-2'>{name}</span>
      //     {value.launchpads?.length > 1 ? (
      //       <div className='text-xs ml-2 bg-gray-200 flex pt-0.5 pb-0.5 text-center pl-2.5 pr-2.5 rounded-sm text-gray-400'>
      //         +{value.launchpads.length - 1}
      //       </div>
      //     ) : (
      //       ''
      //     )}
      //   </span>
      // );
    },
  },
  {
    key: 'start_date',
    title: 'Start Date',
    width: 84,
    align: 'center',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return moment(value.created_at).format('DD MMM YYYY');
    },
  },
];

export const upComingMobileColumnsKey = ['name', 'initialCap', 'totalRaise'];

export default columns;
