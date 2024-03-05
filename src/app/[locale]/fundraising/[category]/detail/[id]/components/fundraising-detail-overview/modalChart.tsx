'use client';

import { IconHexagon } from '@/assets/icons';
import Text from '@/components/Text';
import DoughnutChart from '@/components/chart/Doughnut';
import { COLOR_CHART } from '@/helpers/constants';
import { cn } from '@/helpers/functions';
import { useDisclosure } from '@/hooks/useDisclosure';
import { Flex, Modal } from 'antd';
import ReactECharts from 'echarts-for-react';
import { round } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { ItemCategoryBanker } from '../../../../types';

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
  const [dataCheck, setDataCheck] = useState<any[]>([]);
  useEffect(() => {
    if (!data) return;
    const sumCount = data.reduce((a, b) => a + b.count, 0);
    const dataHasPercent = data.map((d) => ({
      ...d,
      percent: round((d.count / sumCount) * 100, 2),
    }));
    const dataOther = dataHasPercent.slice(3);
    setDataCheck(dataHasPercent);
    const length = dataHasPercent.length;
    const colorChart = Object.keys(COLOR_CHART)
      .splice(0, length)
      .map((e: string) => COLOR_CHART[e as keyof typeof COLOR_CHART]);
    const dataChart = {
      labels: [...dataHasPercent.slice(0, 3).map((d) => d.name), 'Other'],
      datasets: [
        {
          label: 'aaa',
          data: [
            ...dataHasPercent.slice(0, 3).map((d) => d.percent),
            round(
              (dataOther.reduce((a, b) => a + b.count, 0) / sumCount) * 100,
              2
            ),
          ],
          backgroundColor: colorChart,
          hoverOffset: 10,
          borderWidth: 5,
          hoverBorderColor: 'white',
        },
      ],
    };
    setDataChart(dataChart);

    setLabelFocus({
      label: dataHasPercent[0].name,
      value: dataHasPercent[0].percent + '',
    });
  }, [data]);

  const _renderChart = () => {
    if (!dataChart || dataCheck.length === 0) return <></>;
    return (
      <>
        <Flex
          vertical
          align='center'
          justify='center'
          className={cn(
            'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          )}
        >
          <Text size={20} lineHeight={28} weight='bold' ellipsis maxWidth={100}>
            {labelFocus.label}
          </Text>
          <Text size={16} lineHeight={24} type='secondary'>
            {labelFocus.value}%
          </Text>
        </Flex>
        <DoughnutChart
          data={dataChart}
          ref={chartRef}
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

  const _renderLabels = (data?: any[]) => {
    if (!dataChart || dataCheck.length === 0) return null;

    const { datasets, labels } = dataChart;
    const dtSetFirstItem = datasets[0];
    return (
      <>
        {(data?.map((d) => d.percent) || dtSetFirstItem.data).map(
          (item: any, index: number) => (
            <li
              key={index}
              className={
                'flex items-center gap-3 ' +
                cn(
                  index === dtSetFirstItem.data.length - 1 &&
                    !data &&
                    'cursor-pointer'
                )
              }
              style={{
                color: dtSetFirstItem.backgroundColor[index],
              }}
              onClick={
                index === dtSetFirstItem.data.length - 1 && !data
                  ? () => onOpen()
                  : undefined
              }
            >
              <IconHexagon />
              <Text>
                {(data && data[index].name) || labels[index]}: {item}%
              </Text>
            </li>
          )
        )}
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
    <div className='flex flex-1 flex-col gap-6 p-6'>
      <Text weight='bold' size={16} lineHeight={24} className={'text-center'}>
        Main Investment Categories
      </Text>
      {dataCheck.length > 0 ? (
        <Flex
          wrap='wrap'
          align='center'
          justify='center'
          flex={1}
          className={cn('gap-5 md:gap-10 flex-col md:flex-col', 'xl:flex-row')}
        >
          <div className='w-[194px] h-[194px] relative'>{_renderChart()}</div>

          <ul className='gap-3 flex flex-col'>{_renderLabels()}</ul>
        </Flex>
      ) : (
        <div className='flex items-center justify-center relative'>
          <ReactECharts
            option={optionPie2}
            style={{
              height: 250,
              width: 250,
            }}
          />
          <div className='font-jm text-grey-200 text-2xl absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
            N/A
          </div>
        </div>
      )}
      <Modal
        title={<div className='text-xl'>Main Investment Categories Other</div>}
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        footer={null}
      >
        <ul className='gap-3 flex flex-col mt-6'>
          {_renderLabels(dataCheck.slice(3, dataCheck.length))}
        </ul>
      </Modal>
    </div>
  );
};

export default ModalChart;
