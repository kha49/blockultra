import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import { nFormatter, renderColumnId, renderSortIcon } from '@/helpers';
import { IFundraising } from '@/app/home/fundraising/props';
import moment from 'moment/moment';
import BackersModal from '@/app/[locale]/fundraising/[category]/components/backers-modal';
import DataGroup from '@/components/DataGroup';
import { CoreCellName } from '@/components/core-table/core-cell-name';
import { get } from 'lodash';

const columns: ColumnsType<IFundraising> = [
  renderColumnId(),
  {
    key: 'name',
    title: 'Project',
    width: 163,
    align: 'left',
    fixed: true,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (value) => (
      <CoreCellName
        imagesUrl={[value.icon]}
        name={value.name}
        symbol={value.symbol}
        link={`/en/detail/${value.symbol}`}
      />
    ),
  },
  {
    key: 'announceDate',
    title: 'Date',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 99,
    align: 'left',
    render: (value) => moment(value.date).format('DD MMM YYYY'),
  },
  {
    key: 'fundsRaised',
    title: 'Amount Raised',
    width: 138,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (value) => nFormatter(+value.raise, 2, '$'),
  },
  {
    key: 'stage',
    title: 'Round',
    width: 135,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (value) => value.stage,
  },
  {
    key: 'valuation',
    title: 'Valuation',
    width: 102,
    sortIcon: renderSortIcon,
    sorter: false,
    align: 'right',
    render: (value) =>
      value.valuation ? nFormatter(+value.valuation, 2, '$') : 'N/A',
  },
  {
    key: 'funds',
    title: 'Backers',
    width: 225,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: false,
    render: (value) => (
      <BackersModal data={value.funds}>
        {({ onOpen }) => <DataGroup data={value.funds} onClick={onOpen} />}
      </BackersModal>
    ),
  },
  {
    key: 'category',
    title: 'Category',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 186,
    align: 'left',
    render: (value) => value.category?.name,
  },
];

export const fundraisingMobileColumnsKey = ['name', 'announceDate'];

export default columns;
