import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import { nFormatter, renderSortIcon } from '@/helpers';
import { IFundraising } from '@/app/home/fundraising/props';
import moment from 'moment/moment';
import BackersModal from '@/app/[locale]/fundraising/[category]/components/backers-modal';
import DataGroup from '@/components/DataGroup';

const columns: ColumnsType<IFundraising> = [
  {
    key: 'id',
    title: '#',
    width: 24,
    align: 'center',
    fixed: true,
    render: (_, value, index) => {
      return index + 1;
    },
  },
  {
    key: 'name',
    title: 'Project',
    width: 163,
    align: 'left',
    fixed: true,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return (
        <p className='inline-flex items-center'>
          <img src={value.icon} width={32} />
          <Link
            href={`/en/detail/${value.symbol}`}
            className='mx-2 truncate max-w-[55px] md:max-w-[160px]'
          >
            {value.name}
          </Link>
          {value.symbol ? (
            <span className='ml-2 px-2 rounded py-0 bg-[#EEF2F6] text-[#9FA4B7] leading-5 text-xs'>
              {value.symbol}
            </span>
          ) : null}
        </p>
      );
    },
  },
  {
    key: 'announceDate',
    title: 'Date',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 99,
    align: 'left',
    render: (_, value) => {
      return moment(value.date).format('DD MMM YYYY');
    },
  },
  {
    key: 'fundsRaised',
    title: 'Amount Raised',
    width: 138,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return nFormatter(Number(value.raise), 2, '$');
    },
  },
  {
    key: 'stage',
    title: 'Round',
    width: 135,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return value.stage;
    },
  },
  {
    key: 'valuation',
    title: 'Valuation',
    width: 102,
    sortIcon: renderSortIcon,
    sorter: false,
    align: 'right',
    render: (_, value) => {
      return value.valuation
        ? nFormatter(Number(value.valuation), 2, '$')
        : 'N/A';
    },
  },
  {
    key: 'funds',
    title: 'Backers',
    width: 225,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: false,
    render: (_, value) => {
      return (
        <BackersModal data={value.funds as any}>
          {({ onOpen }) => <DataGroup data={value.funds} onClick={onOpen} />}
        </BackersModal>
      );
      // if (!value.funds || isEmpty(value.funds)) return <span>N/A</span>;
      // const image = get(value, 'funds[0].image', '');
      // const name = get(value, 'funds[0].name', '');

      // return (
      //   <p className='inline-flex items-center'>
      //     <img src={image} className='w-8 h-8' alt={name} width={32} />
      //     <span className='ml-2'>{name}</span>
      //     {value.funds.length > 1 ? (
      //       <div className='text-xs ml-2 bg-gray-200 flex pt-0.5 pb-0.5 text-center pl-2.5 pr-2.5 rounded-sm text-gray-400'>
      //         +{value.funds.length - 1}
      //       </div>
      //     ) : (
      //       ''
      //     )}
      //   </p>
      // );
    },
  },
  {
    key: 'category',
    title: 'Category',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 186,
    align: 'left',
    render: (_, value) => {
      return value.category?.name;
    },
  },
];

export const fundraisingMobileColumnsKey = ['name', 'announceDate'];

export default columns;
