'use client';

import React, { useEffect, useRef, useState } from 'react';
import _, { get } from 'lodash';
import { COLOR_CHART } from '@/helpers/constants';
import { IconHexagon } from '@/assets/icons';
import DoughnutChart from '@/components/chart/Doughnut';
import { getDatasetAtEvent } from 'react-chartjs-2';
import { useDisclosure } from '@/hooks/useDisclosure';
import { Modal } from 'antd';
import { ItemCategoryBanker } from '../../../../types';
import ReactECharts from 'echarts-for-react';

interface IChartData {
  labels: string[];
  datasets: Dataset[];
}
interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  hoverOffset: number;
  borderWidth: number;
  hoverBorderColor: string;
}

const ModalChart = ({ data }: { data: ItemCategoryBanker[] }) => {
  const chartRef = useRef();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [dataChart, setDataChart] = useState<IChartData>();
  const [labelFocus, setLabelFocus] = useState({
    label: '',
    value: '',
  });
  let dataClone = []

  useEffect(() => {
    if (!data) return;
    console.log('data', data)
    dataClone = []
    dataClone = data.map((d) => d.count > 0)
    const length = data.length;
    const colorChart = Object.keys(COLOR_CHART)
      .splice(0, length)
      .map((e: string) => COLOR_CHART[e as keyof typeof COLOR_CHART]);
    const dataChart = {
      labels: data.map((d) => d.name),
      datasets: [
        {
          label: 'aaa',
          data: data.map((d) => d.count),
          backgroundColor: colorChart,
          hoverOffset: 10,
          borderWidth: 5,
          hoverBorderColor: 'white',
        },
      ],
    };
    setDataChart(dataChart);

    setLabelFocus({
      label: data[0].name,
      value: data[0].count + '',
    });
  }, [data]);

  const onClickDoughnut = (event: any) => {
    const chart = chartRef.current as any;
    const activePoints = getDatasetAtEvent(chart, event);
    if (activePoints.length > 0) {
      onOpen();
    }
  };

  const _renderChart = () => {
    if (!dataChart || dataClone.length === 0) return <></>;
    return (
      <>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col flex items-center justify-center'>
          <div className='text-xl font-bold text-grey-700'>
            {labelFocus.label}
          </div>
          <div className='text-base font-semibold text-grey-500'>
            {labelFocus.value}%
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
            onHover: (e: any, activeElements: any, chart: any) => {
              if (activeElements[0]) {
                let ctx = activeElements[0].element.$context;
                let label = chart.data.labels[ctx.dataIndex];
                let value = chart.data.datasets[0].data[ctx.dataIndex];
                setLabelFocus({ label, value }); 
              }
            },
          }}
        />
      </>
    );
  };

  const _renderLabels = () => {
    if (!dataChart || dataClone.length === 0) return null;
    const { datasets, labels } = dataChart as any;
    const dtSetFirstItem = datasets[0];
    return (
      <>
        {dtSetFirstItem.data.map((item: any, index: number) => (
          <li
            key={index}
            className='flex items-center gap-3'
            style={{
              color: dtSetFirstItem.backgroundColor[index],
            }}
          >
            <IconHexagon />
            <div className='text-sm font-medium text-grey-700 font-jm'>
              {labels[index]}: {item}%
            </div>
          </li>
        ))}
      </>
    );
  };

  const optionPie2 = {
    color: ['#F1F4F7'],
    series: [
      {
        name: 'Token Allocation',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 3,
        },
        silent: true,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          focus: false,
          scale: false,
        },
        data: [{ value: 100 }],
      },
    ],
  };

  return (
    <div className='flex flex-1 flex-col gap-6 py-6'>
      <div className='text-base text-grey-700 font-bold text-center font-jm'>
        Main Investment Categories
      </div>
      { dataClone.length > 0 ? (
        <div className='gap-5 md:gap-10 flex flex-col md:flex-col xl:flex-row flex-wrap items-center justify-center flex-1'>
          <div className='w-[194px] h-[194px] relative'>{_renderChart()}</div>

          <ul className='gap-3 flex flex-col'>{_renderLabels()}</ul>
        </div>
      ): (
          <div className='flex items-center justify-center relative'>
            <ReactECharts option={optionPie2} style={{
              height: 250,
              width: 250,
            }} />
            <div className='text-grey-200 text-2xl absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>N/A</div>
          </div>
      )}
      <Modal
        title={<div className='text-xl'>Main Investment Categories</div>}
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        footer={null}
      >
        <ul className='gap-3 flex flex-col mt-6'>
          {_renderLabels()}
        </ul>
      </Modal>
    </div>
  );
};

export default ModalChart;
