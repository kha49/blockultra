'use client';

import Image from 'next/image';
import Allocation from '../allocation';
import './index.scss';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Avatar, Flex, Modal, Popover } from 'antd';
import Link from 'next/link';
import { ICoinInfo, CoinAllocation } from '../coinInfoTabs/props';
import { nFormatter, percentFormat } from '@/helpers';
import { FetchInfomationCoin } from '@/usecases/exchange';
import { round } from 'lodash';
import { COLOR_CHART } from '@/helpers/constants';
import IconWeb from '@/assets/icons/IconWeb';
import { IconTwitter } from '@/assets/icons';
import { IconTikTok } from '@/assets/icons/IconTikTok';
import { CategoryDistribution, LaunchPadInfomationType } from '../../types';
import { IeoIdoCategory, getIconLink } from '../../config';
import MainCategories from '../main-categories';
import { useParams } from 'next/navigation';

type PropsType = {
  info: LaunchPadInfomationType;
};

const CoinInformation = (props: PropsType) => {
  const { info } = props;
  const _sortedCategories = useMemo(
    () =>
      info.categoriesDistribution.sort((a, b) => b.percentage - a.percentage),
    []
  );
  const { locale } = useParams<{
    locale: string;
  }>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSupportedOpen, setIsModalSupportedOpen] = useState(false);
  const [coinsData, setCoinsData] = useState<ICoinInfo>();
  const [key, setKey] = useState('binance');
  const [totalVolume, setTotalVolume] = useState<number>(9999);
  const [listTopCoin, setListTopCoin] = useState<CoinAllocation[]>([]);

  const getData = useCallback(async () => {
    const responses: any = await FetchInfomationCoin({ key: key });
    setCoinsData(responses);
    setTotalVolume(await responses.totalusdVolume);
    setListTopCoin(await responses.allocation);
  }, [key]);

  useEffect(() => {
    getData();
  }, [getData]);

  const toggleModal = () => {
    setIsModalOpen(true);
  };

  const _caculateCoin = (i: number) => {
    let rate = round((listTopCoin[i]?.usdVolume / totalVolume) * 100, 2);
    let name = listTopCoin[i]?.coinName;
    let volumes = listTopCoin.slice(0, 9).map((item) => item?.usdVolume);
    let otherSum =
      totalVolume - volumes.reduce((total, volume) => total + volume, 0);
    let otherRate = round((otherSum / totalVolume) * 100, 2);
    if (i < 9) {
      return (
        <div className='flex index__detail'>
          <span className='mr-1'>{name + ': '}</span>
          <span>{rate + '%'}</span>
        </div>
      );
    } else {
      return (
        <div className='flex index__detail'>
          <span className='mr-1'>Other:</span>
          <span>{otherRate + '%'}</span>
        </div>
      );
    }
  };

  // const _renderLinePopup = (i: number) => {
  //   let _color = colorChart[i];
  //   return (
  //     <div className='popup__contents-index hover:cursor-pointer flex'>
  //       <div>
  //         <svg
  //           className='w-4.5 h-5 hover:w-5.5 hover:h-6'
  //           viewBox='0 0 18 20'
  //           fill='none'
  //           xmlns='http://www.w3.org/2000/svg'
  //         >
  //           <path
  //             d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
  //             fill={_color}
  //           />
  //         </svg>
  //       </div>
  //       {_caculateCoin(i)}
  //     </div>
  //   );
  // };

  return (
    <>
      <Modal
        title={<div className='text-2xl'>Launched Project Categories</div>}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer=''
      >
        <MainCategories data={_sortedCategories} />
      </Modal>

      <Modal
        open={isModalSupportedOpen}
        onCancel={() => setIsModalSupportedOpen(false)}
        title={<div className='text-2xl'>Supported Blockchain Platforms</div>}
        footer={false}
        width={466}
      >
        <div className='max-h-[418px] overflow-y-auto mt-6'>
          <Flex vertical gap={16}>
            {info.tokenPlatforms.map((token, index) => (
              <Flex key={index} gap={12}>
                <Avatar key={token.key} src={token.iconUrl} alt={token.name} />

                <span>{token.name}</span>
              </Flex>
            ))}
          </Flex>
        </div>
      </Modal>

      <Flex
        vertical
        gap={24}
        className='shadow-primary bg-white p-4 rounded-lg md:p-6'
      >
        <Flex wrap='wrap' gap={16} className='launchpad-information'>
          <div className='w-[76px] h-[76px]'>
            <Image
              width={76}
              height={76}
              alt={info.name}
              src={info.nativeToken.icon}
              className='rounded-full'
            />
          </div>
          <div>
            <div className='flex items-center mb-3 coins__header-info'>
              <div className='coins__name text-zinc-700 text-2xl font-bold leading-loose'>
                {info.name}
              </div>
            </div>
            <div className='flex flex-wrap gap-3 items-center coins__header-tag'>
              <Link
                href={`/${locale}/ieo-ido/${IeoIdoCategory.topIdoLaunchpads}`}
                className='coins__tag'
              >
                <p className='coins__tag-text px-2 items-center'>Tier 1</p>
              </Link>

              <span className='inline-block w-[2px] relative bg-gray-500 h-[18px]'></span>

              <span className='coins__tag items-center'>
                <p>
                  Year of Foundation:
                  <span>{info.foundationDate}</span>
                </p>
              </span>

              <span className='inline-block w-[6px] h-[6px] bg-gray-500 rounded-full'></span>
              <div
                onClick={() => setIsModalSupportedOpen(true)}
                className='flex items-center avatar-wrapper'
              >
                <Avatar.Group maxCount={4}>
                  {info.tokenPlatforms.map((token, index) => (
                    <Avatar
                      key={token.key}
                      src={token.iconUrl}
                      alt={token.name}
                    />
                  ))}
                </Avatar.Group>
              </div>
            </div>
          </div>
        </Flex>
        <div className='grid gap-y-4 lg:gap-y-0 pt-[6px] border border-r-0 border-l-0 border-b-0 border-t-gray-300 lg:gap-4 lg:grid-cols-5'>
          <div className='flex flex-col gap-6 lg:col-span-3'>
            <div className='grid gap-4 md:grid-cols-2'>
              <Flex vertical gap={8}>
                <Flex align='center' gap={6}>
                  <span className='text-gray-500'>Token:</span>
                  <Image
                    width={20}
                    height={20}
                    src={info.nativeToken.icon}
                    alt={info.name}
                  />
                  <span>{info.nativeToken.symbol}</span>
                </Flex>
                <Flex gap={16} align='center'>
                  <span className='text-4xl'>
                    {nFormatter(Number(info.enterPrice), 2, '$')}
                  </span>
                  {info.priceChangeIn24h && (
                    <span className='text-base'>
                      {percentFormat(Number(info.priceChangeIn24h))}
                    </span>
                  )}
                </Flex>
              </Flex>
              <div className='grid grid-cols-2'>
                <Flex vertical gap={24}>
                  <div>
                    <p className='text-gray-500'>Total Funds Raise</p>
                    <p className='text-base'>
                      {nFormatter(Number(info.totalFundsRaised), 2, '$')}
                    </p>
                  </div>
                  <div>
                    <p className='text-gray-500'>Current Avg ROI (USD)</p>
                    <div className='text-base flex gap-1'>
                      {nFormatter(Number(info.avgRoi.current), 2, '')}x
                      <span>
                        {percentFormat(Number(info.avgRoi.currentPercent))}
                      </span>
                    </div>
                  </div>
                </Flex>
                <Flex vertical gap={24}>
                  <div>
                    <p className='text-gray-500'>Number of IDOs</p>
                    <p className='text-base'>{Number(info.projectsCount)}</p>
                  </div>
                  <div>
                    <p className='text-gray-500'>ATH Avg ROI (USD)</p>
                    <div className='text-base flex gap-1'>
                      {nFormatter(Number(info.avgRoi.ath), 2, '')}x
                      <span>
                        {percentFormat(Number(info.avgRoi.athPercent))}
                      </span>
                    </div>
                  </div>
                </Flex>
              </div>
            </div>
            <div className='coins__links'>
              <p className='coins__label text-gray-500'>Links</p>
              <div className='flex mt-2 gap-4 xl:gap-5 py-[6px]'>
                {info.links.slice(0, 3).map((item, index) => (
                  <Link target='_blank' key={index} href={item.value}>
                    {getIconLink(item.type)}
                  </Link>
                ))}

                {info.links.length > 3 && (
                  <Popover
                    trigger='click'
                    placement='bottom'
                    content={
                      <div className='flex items-center gap-5'>
                        {info.links.slice(3).map((item, index) => (
                          <Link target='_blank' key={index} href={item.value}>
                            {getIconLink(item.type)}
                          </Link>
                        ))}
                      </div>
                    }
                  >
                    <div className='w-7 h-7 bg-slate-100 rounded-3xl flex-col justify-center items-center gap-2.5 inline-flex'>
                      <div className='text-zinc-700 text-xs font-semibold leading-tight hover:cursor-pointer'>
                        +{info.links.slice(3).length}
                      </div>
                    </div>
                  </Popover>
                )}
              </div>
            </div>
          </div>
          <div
            className='lg:col-span-2 lg:border lg:border-l-gray-300 lg:border-t-0 lg:border-r-0 lg:border-b-0'
            onClick={toggleModal}
          >
            <Allocation
              data={_sortedCategories}
              list={listTopCoin}
              total={totalVolume}
            />
          </div>
        </div>
      </Flex>
    </>
  );
};

export default CoinInformation;
