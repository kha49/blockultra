'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { Modal, Popover, Tag } from 'antd';
import _ from 'lodash';
import { COLOR_CHART } from '@/helpers/constants';
import IconWeb from '@/assets/icons/IconWeb';
import {
  IconHexagon,
  IconInfo,
  IconTelegram,
  IconTwitter,
} from '@/assets/icons';
import DoughnutChart from '@/components/chart/Doughnut';
import { getDatasetAtEvent } from 'react-chartjs-2';
import { useDisclosure } from '@/hooks/useDisclosure';

const defaultImage =
  'https://img.cryptorank.io/coins/150x150.bitcoin1524754012028.png';

const dataChart = {
  labels: ['d1', 'd2', 'd3', 'd4'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [80, 50, 100, 20],
      backgroundColor: [
        COLOR_CHART.TURQUOISE_SURF,
        COLOR_CHART.BITTER_LEMON,
        COLOR_CHART.MALACHITE,
        COLOR_CHART.PAOLO_VERONESE_GREEN,
      ],
      hoverOffset: 10,
      borderWidth: 5,
      hoverBorderColor: 'white',
    },
  ],
};

const FundraisingDetailOverview = () => {
  const chartRef = useRef();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onClickDoughnut = (event: any) => {
    const chart = chartRef.current as any;
    const activePoints = getDatasetAtEvent(chart, event);
    if (activePoints.length > 0) {
      onOpen();
    }
  };

  return (
    <div className='w-full mx-auto'>
      <Modal
        title={<div className='text-xl'>Main Invesment Categories</div>}
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        footer={null}
      >
        <ul className='gap-3 flex flex-col mt-6'>
          {Object.values(COLOR_CHART).map((item) => (
            <li
              className='flex items-center gap-3'
              style={{
                color: item,
              }}
            >
              <IconHexagon />
              <div className='text-sm font-medium text-grey-700'>
                Blockchain Services: {(Math.random() * 100).toFixed(2)}%
              </div>
            </li>
          ))}
        </ul>
      </Modal>

      <div className='overview bg-white p-6 pb-4'>
        {/* overview top */}
        <div className='flex justify-center md:justify-start'>
          <div className='flex gap-4 flex-col md:flex-row justify-center items-center'>
            <Image alt='logo' width={76} height={76} src={defaultImage} />
            <div className='flex flex-col gap-3'>
              <h1 className='text-grey-700 text-center md:text-left text-2xl font-bold'>
                Andreessen Horowitz (a16z)
              </h1>
              <div className='flex justify-center md:justify-start item-center gap-3'>
                <div className='flex items-center gap-1'>
                  <Tag bordered={false}>Venture</Tag>
                  <Tag bordered={false}>Tier 1</Tag>
                </div>

                <span className='items-center'>
                  <Popover
                    content={
                      <div className='text-right text-zinc-700 text-xs font-medium leading-tight'>
                        America
                      </div>
                    }
                    trigger='hover'
                  >
                    <svg
                      width='32'
                      height='18'
                      viewBox='0 0 32 18'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M31.9999 0H0V18H31.9999V0Z' fill='white' />
                      <path d='M10.5215 0H0V18H10.5215V0Z' fill='#0363C7' />
                      <path
                        d='M31.9999 0H21.4784V18H31.9999V0Z'
                        fill='#EF2525'
                      />
                    </svg>
                  </Popover>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* overview body */}
        <div className='flex flex-1 flex-col-reverse md:flex-row py-2 gap-6 md:gap-0 mt-10 md:mt-0'>
          {/* body left */}
          <div className='flex flex-[2] flex-col md:flex-row gap-6 p-6'>
            <div className='flex-1 flex flex-col gap-6'>
              <div className='flex flex-col gap-2'>
                <div className='text-sm font-medium text-grey-500'>
                  Total Investments
                </div>
                <div className='text-[40px] text-grey-700 font-bold'>999</div>
              </div>

              <div className='flex flex-col gap-2 md:mt-14'>
                <div className='text-xs font-medium text-grey-500'>Links</div>
                <div className='flex items-center gap-[20px]'>
                  <IconWeb />
                  <IconTwitter />
                  <IconTelegram />
                  <div className='w-7 h-7 rounded-full font-semibold bg-grey-200 flex items-center justify-center text-sm text-grey-700'>
                    +15
                  </div>
                </div>
              </div>
            </div>
            <div className='flex-1 flex'>
              <div className='w-full flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-2'>
                      <div className='text-sm font-medium text-grey-500'>
                        Lead Rounds
                      </div>
                      <div className='text-sm text-grey-700 font-bold'>12</div>
                    </div>

                    <div className='flex flex-col gap-2'>
                      <div className='text-sm font-medium text-grey-500'>
                        Raised
                      </div>
                      <div className='text-sm text-grey-700 font-bold'>
                        $61.72B
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-2'>
                      <div className='text-sm font-medium text-grey-500'>
                        Unicorns
                      </div>
                      <div className='text-sm text-grey-700 font-bold'>14</div>
                    </div>

                    <div className='flex flex-col gap-2'>
                      <div className='text-sm font-medium text-grey-500'>
                        Total Balance
                      </div>
                      <div className='text-sm text-grey-700 font-bold'>
                        $345.42M
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='flex items-center gap-2'>
                    <IconInfo />
                    <span className='text-sm font-bold text-grey-700'>
                      About
                    </span>
                  </div>

                  <ul className='mt-2 list-disc m-0 p-0 pl-4 text-sm text-[#4F4F4F] font-medium'>
                    <li>
                      The Silicon Valley-based venture capital firm that invests
                      in projects from seed to late stages in a variety of
                      sectors.
                    </li>
                    <li>Founded: 2018</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className='h-[1px] w-full md:h-full md:w-[1px] md:px-4 bg-grey-200' />

          {/* body right */}
          <div className='flex flex-1 flex-col gap-6 py-6 md:min-w-[464px]'>
            <div className='text-base text-grey-700 font-bold text-center'>
              Main Invesment Categories
            </div>
            <div className='gap-5 md:gap-10 flex flex-col md:flex-row flex-wrap items-center justify-center flex-1'>
              <div className='w-[194px] h-[194px] relative'>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col flex items-center justify-center'>
                  <div className='text-xl font-bold text-grey-700'>Defi</div>
                  <div className='text-base font-semibold text-grey-500'>
                    11.90%
                  </div>
                </div>
                <DoughnutChart
                  data={dataChart}
                  ref={chartRef}
                  onClick={onClickDoughnut}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        enabled: false,
                      },
                    },
                    cutout: 65,
                  }}
                />
              </div>

              <ul className='gap-3 flex flex-col'>
                {dataChart.datasets[0].data.map((item, index) => (
                  <li
                    className='flex items-center gap-3'
                    style={{
                      color: dataChart.datasets[0].backgroundColor[index],
                    }}
                  >
                    <IconHexagon />
                    <div className='text-sm font-medium text-grey-700'>
                      Blockchain Services: {item}%
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraisingDetailOverview;
