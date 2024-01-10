'use client';

import HexagonItem from '@/components/Hexa/Hexagon';
import { COLOR_CHART } from '@/helpers/constants';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const columns: ColumnsType<ITokenomics> = [
  {
    key: 'round',
    title: 'Round',
    width: 200,
    align: 'left',
    render: (_, value) => {
      return (
        <div className='flex items-center gap-3'>
          <HexagonItem color={value.round.color} />
          <span className='text-grey-700 text-sm font-jm font-semibold'>
            {value.round.label}
          </span>
        </div>
      );
    },
  },
  {
    key: 'allowcationPercent',
    title: 'Allocation (%)',
    width: 150,
    align: 'left',
    render: (_, value) => {
      return value.allowcationPercent;
    },
  },
  {
    key: 'allowcationToken',
    title: 'Allocation (Token)',
    width: 150,
    align: 'left',
    render: (_, value) => {
      return value.allowcationToken;
    },
  },
  {
    key: 'tgeUnlock',
    title: 'TGE Unlock',
    width: 150,
    align: 'left',
    render: (_, value) => {
      return value.tgeUnlock;
    },
  },
  {
    key: 'tokenReleaseSchedule',
    title: 'Token Release Schedule',
    align: 'left',
    render: (_, value) => {
      return value.tokenReleaseSchedule;
    },
  },
];

const TokenomicsInfo = () => {
  const data = [
    {
      id: 0,
      round: {
        color: COLOR_CHART.BITTER_LEMON,
        label: 'Private',
      },
      allowcationPercent: '25%',
      allowcationToken: '250,000,000',
      tgeUnlock: '20%',
      tokenReleaseSchedule: '20.0% TGE, 12 months cliff, 5.0% quaterly',
    },
    {
      id: 0,
      round: {
        color: COLOR_CHART.BITTER_LEMON,
        label: 'Private',
      },
      allowcationPercent: '25%',
      allowcationToken: '250,000,000',
      tgeUnlock: '20%',
      tokenReleaseSchedule: '20.0% TGE, 12 months cliff, 5.0% quaterly',
    },
    {
      id: 0,
      round: {
        color: COLOR_CHART.BITTER_LEMON,
        label: 'Private',
      },
      allowcationPercent: '25%',
      allowcationToken: '250,000,000',
      tgeUnlock: '20%',
      tokenReleaseSchedule: '20.0% TGE, 12 months cliff, 5.0% quaterly',
    },
    {
      id: 0,
      round: {
        color: COLOR_CHART.BITTER_LEMON,
        label: 'Private',
      },
      allowcationPercent: '25%',
      allowcationToken: '250,000,000',
      tgeUnlock: '20%',
      tokenReleaseSchedule: '20.0% TGE, 12 months cliff, 5.0% quaterly',
    },
    {
      id: 0,
      round: {
        color: COLOR_CHART.BITTER_LEMON,
        label: 'Private',
      },
      allowcationPercent: '25%',
      allowcationToken: '250,000,000',
      tgeUnlock: '20%',
      tokenReleaseSchedule: '20.0% TGE, 12 months cliff, 5.0% quaterly',
    },
    {
      id: 0,
      round: {
        color: COLOR_CHART.BITTER_LEMON,
        label: 'Private',
      },
      allowcationPercent: '25%',
      allowcationToken: '250,000,000',
      tgeUnlock: '20%',
      tokenReleaseSchedule: '20.0% TGE, 12 months cliff, 5.0% quaterly',
    },
    {
      id: 0,
      round: {
        color: COLOR_CHART.BITTER_LEMON,
        label: 'Private',
      },
      allowcationPercent: '25%',
      allowcationToken: '250,000,000',
      tgeUnlock: '20%',
      tokenReleaseSchedule: '20.0% TGE, 12 months cliff, 5.0% quaterly',
    },
    {
      id: 0,
      round: {
        color: COLOR_CHART.BITTER_LEMON,
        label: 'Private',
      },
      allowcationPercent: '25%',
      allowcationToken: '250,000,000',
      tgeUnlock: '20%',
      tokenReleaseSchedule: '20.0% TGE, 12 months cliff, 5.0% quaterly',
    },
    {
      id: 0,
      round: {
        color: COLOR_CHART.BITTER_LEMON,
        label: 'Private',
      },
      allowcationPercent: '25%',
      allowcationToken: '250,000,000',
      tgeUnlock: '20%',
      tokenReleaseSchedule: '20.0% TGE, 12 months cliff, 5.0% quaterly',
    },
  ];

  return (
    <div className='tokenomics-info grid grid-cols-12 gap-4 mb-6'>
      <div className='col-span-12 lg:col-span-3'>
        <div className='box-shadow-common p-6 h-full rounded-lg'>
          <div className='border-b border-grey-300 pb-5 mb-6'>
            <div className='text-sm font-bold text-grey-700 mb-6'>
              Basic Metrics
            </div>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-grey-500 text-sm'>Total Supply</div>
              <div className='text-grey-700 text-sm'>NBIT 1,000,000,000</div>
            </div>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-grey-500 text-sm'>Max Supply</div>
              <div className='text-grey-700 text-sm'>NBIT 1,000,000,000</div>
            </div>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-grey-500 text-sm'>Initial Circ. Supply</div>
              <div className='text-grey-700 text-sm'>NBIT 1,000,000,000</div>
            </div>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-grey-500 text-sm'>Initial Maket Cap</div>
              <div className='text-grey-700 text-sm'>$164,686</div>
            </div>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-grey-500 text-sm'>Inflation</div>
              <div className='text-grey-700 text-sm'>-</div>
            </div>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-grey-500 text-sm'>Burn</div>
              <div className='text-grey-700 text-sm'>-</div>
            </div>
          </div>
          <div>
            <div className='text-sm font-bold text-grey-700 mb-6'>
              Token Use Case
            </div>
            <div className='text-grey-700 text-sm'>Updating...</div>
          </div>
        </div>
      </div>
      <div className='col-span-12 lg:col-span-9'>
        <div className='box-shadow-common p-6 rounded-lg'>
          <div className='overflow-x-auto hide-scroll'>
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ position: ['none'] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsInfo;
