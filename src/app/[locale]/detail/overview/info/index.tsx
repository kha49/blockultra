'use client';

import Tag from '@/components/Tag';
import Text from '@/components/Text';
import { currencyFormat, percentFormat } from '@/helpers';
import { Flex } from 'antd';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import './index.scss';
const AdvancedRealTimeChart = dynamic(
  () =>
    import('react-ts-tradingview-widgets').then((w) => w.AdvancedRealTimeChart),
  {
    ssr: false,
  }
);

export default function InfoCharts(props: any) {
  const [data, setData] = useState(props.data);
  const launchDate = new Date(data?.listingDate);

  const TradeLaunchDate = useMemo(() => {
    if (!launchDate) return '';

    const value = moment
      .duration(
        Number(moment().format('X')) - Number(moment(launchDate).format('X')),
        'seconds'
      )
      .asDays();

    const symbol = value > 1 ? ' days ago' : ' day ago';

    return (
      <Text className={'!text-[#A0ABC0]'}>
        {value.toFixed(0)}
        {symbol}
      </Text>
    );
  }, [launchDate]);

  useEffect(() => {
    setData(props?.data);
  }, [props]);

  return (
    <div className='info-charts'>
      <div className='info-charts__wrapper grid grid-cols-1 xl:grid-cols-3 gap-4'>
        <div className='chart xl:col-span-2'>
          {data?.symbol ? (
            <AdvancedRealTimeChart
              symbol={data?.symbol + 'USD'}
              interval={'60'}
              autosize
            ></AdvancedRealTimeChart>
          ) : (
            ''
          )}
        </div>
        <div className='info p-6'>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              Max Supply
            </div>
            <div className='value font-medium text-base font-jm'>
              <Text weight='semiBold' size={16} lineHeight={24}>
                {data?.symbol}{' '}
                {currencyFormat(data?.maxSupply, '', {
                  numberRound: 2,
                })}
              </Text>
            </div>
          </div>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <Flex gap={4} align='center'>
              <Text size={16} lineHeight={24} className={'!text-[#4F556E]'}>
                Price Change
              </Text>
              <Tag>
                <Text size={12} type='secondary'>
                  24h
                </Text>
              </Tag>
            </Flex>
            <div className='value font-medium text-base font-jm text-right'>
              <div className='price font-semibold'>
                {currencyFormat(
                  (data?.price * data?.price_change_in_24h) / 100,
                  '$'
                )}
              </div>
              <div className='percent-increment text-sm'>
                {percentFormat(props?.data?.price_change_in_24h, '', {
                  precision: 3,
                })}
              </div>
            </div>
          </div>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              <div>All Time High</div>
              <div className='time text-xs'>
                {moment(data?.athPrice?.date).format('MMM DD, YYYY')}
              </div>
            </div>
            <div className='value font-medium text-base font-jm text-right'>
              <div className='price font-semibold'>
                {currencyFormat(data?.athPrice?.USD, '$')}
              </div>
              <div className='percent-increment text-sm'>
                {percentFormat((data?.price / data?.athPrice?.USD - 1) * 100)}
              </div>
            </div>
          </div>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              <div>ATH Market Cap</div>
              <div className='time text-xs'>
                {moment(data?.athMarketCap?.dateUSD).format('MMM DD, YYYY')}
              </div>
            </div>
            <div className='value font-medium text-base font-jm text-right'>
              <div className='price font-semibold'>
                {currencyFormat(data?.athMarketCap?.USD, '$')}
              </div>
              <div className='percent-increment text-sm'>
                {percentFormat(
                  (data?.marketCap / data?.athMarketCap?.USD - 1) * 100
                )}
              </div>
            </div>
          </div>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              <div>All Time Low</div>
              <div className='time text-xs'>
                {moment(data?.atlPrice?.dateUSD).format('MMM DD, YYYY')}
              </div>
            </div>
            <div className='value font-medium text-base font-jm text-right'>
              <div className='price font-semibold'>
                {currencyFormat(data?.atlPrice?.USD, '$')}
              </div>
              <div className='percent-increment text-sm'>
                {percentFormat((data?.price / data?.atlPrice?.USD - 1) * 100)}
              </div>
            </div>
          </div>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              Market Dominance
            </div>
            <div className='value font-semibold text-base font-jm text-right'>
              {percentFormat(
                (data?.marketCap / data?.header?.totalMarketCap) * 100,
                '',
                {
                  numberRound: 2,
                  noStyle: true,
                }
              )}
            </div>
          </div>
          <div className='info__item flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              <div>Trade Launch Date</div>
            </div>
            <div className='value font-medium text-base font-jm text-right'>
              <div className='price font-semibold'>
                {moment(launchDate).format('DD/MM/YYYY')}
              </div>
              <div className='time text-xs'>{TradeLaunchDate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
