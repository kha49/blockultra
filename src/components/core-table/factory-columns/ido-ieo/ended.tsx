import LaunchpadModal from '@/app/[locale]/ieo-ido/[category]/components/launchpad-modal';
import DataGroup from '@/components/DataGroup';
import Text from '@/components/Text';
import { CoreCellName } from '@/components/core-table/core-cell-name';
import {
  nFormatter,
  nFormatter2,
  renderColumnId,
  renderSortIcon,
} from '@/helpers';
import { formatDate } from '@/helpers/datetime';
import { Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const columns: ColumnsType<any> = [
  renderColumnId(),
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'name',
    align: 'left',
    sortIcon: renderSortIcon,
    width: 194,
    sorter: true,
    fixed: true,

    render: (project, { image, key, symbol }) => (
      <CoreCellName
        imagesUrl={[image]}
        name={project}
        symbol={symbol}
        link={`/en/detail/${key}?tab=ido/ieo`}
      />
    ),
  },
  {
    title: 'Current Price',
    dataIndex: 'price',
    key: 'price',
    sortIcon: renderSortIcon,
    align: 'right',
    width: 122,
    sorter: true,
    render: (priceValue) => {
      return <Text weight='semiBold'>{nFormatter2(priceValue, 2, '$')}</Text>;
    },
  },
  {
    title: 'Total Raise',
    dataIndex: 'totalRaise',
    key: 'totalRaise',
    sortIcon: renderSortIcon,
    sorter: true,
    align: 'right',
    width: 140,
    render: (totalRaise) => (
      <Text weight='semiBold'>{nFormatter(totalRaise, 2, '$')}</Text>
    ),
  },
  {
    title: 'ROI',
    dataIndex: 'roi',
    key: 'roi',
    sortIcon: renderSortIcon,
    width: 140,
    align: 'right',
    sorter: true,
    render: (_, { roi }) => (
      <Text weight='semiBold'>{nFormatter(roi, 2, '$')}</Text>
    ),
  },
  {
    title: 'ATH ROI',
    dataIndex: 'auth_roi',
    key: 'athRoi',
    sortIcon: renderSortIcon,
    width: 140,
    align: 'right',
    sorter: true,
    render: (_, { auth_roi }) => (
      <Text weight='semiBold'>{nFormatter(auth_roi, 2, '$')}</Text>
    ),
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpadList',
    key: 'launchpads',
    sortIcon: renderSortIcon,
    width: 211,
    align: 'left',
    sorter: true,
    render: (_, { launchpads, ido_platform_id }) =>
      launchpads != null && launchpads.length > 0 ? (
        <LaunchpadModal data={launchpads} platformId={ido_platform_id}>
          {({ onOpen }) => <DataGroup data={launchpads} onClick={onOpen} />}
        </LaunchpadModal>
      ) : (
        '-'
      ),
  },
  {
    title: 'End Date',
    dataIndex: 'updated_at',
    key: 'till',
    sortIcon: renderSortIcon,
    sorter: true,
    align: 'left',
    width: 92,
    render: (_, { end_date }) => (
      <Text weight='semiBold'>{formatDate(end_date)}</Text>
    ),
  },
];

export const idoIeoEndedColumnsKey = ['project', 'price', 'totalRaise'];

export default columns;
