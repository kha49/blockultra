'use client';

import {
  IconBell,
  IconCaretDown,
  IconCopy,
  IconSave,
  IconStar,
} from '@/assets/icons';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import InformationUnlock from '../information-unlock';
import { Popover, Select, Tooltip } from 'antd';
import './style.scss';
import IntroduceCoin from './popup/introduce-coin/IntroduceCoin';
import IconFdv from '@/assets/icons/IconFdv';
import Fdv from './popup/fdv/Fdv';
import Backers from './popup/backers/Backers';
import IconETH from '@/assets/icons/IconETH';
import WalletAddress from './popup/wallet/WalletAddress';
import WalletBrand from './popup/wallet/WalletBrand';
import Categories from './popup/categories/Categories';
import { currencyFormat, nFormatter, percentFormat } from '@/helpers';
import { IDetail } from '@/models/IDetail';
import Links from './popup/links/Links';
import { useEffect, useState } from 'react';
import { changeImageUrl } from '@/helpers/functions';

export default function CoinInformation({ data }: any) {
  let newData = data as IDetail;
  const [price, setPrice] = useState(newData?.price)
  const [timeSelect, setTimeSelect] = useState('24H')
  const [histData, setHistData] = useState<any>(newData?.histData)
  const [atlPrice, setAtlPrice] = useState<any>(newData?.histData?.low[timeSelect]?.USD)
  const [athPrice, setAthlPrice] = useState<any>(newData?.histData?.high[timeSelect]?.USD)

  const handlePriceChange = (value: string) => {
    setTimeSelect(value)
    setAtlPrice(histData?.low[value]?.USD)
    setAthlPrice(histData?.high[value]?.USD)
  };

  useEffect(() => {
    setTimeout(() => {
      setPrice(newData?.price)
      setHistData(newData?.histData)
      setAtlPrice(newData?.histData?.low[timeSelect]?.USD)
      setAthlPrice(newData?.histData?.high[timeSelect]?.USD)
    }, 300);
  }, [data])
 
  return (
    <div>
      {
        newData ? (
          <div className='bg-white py-6 px-2 md:px-6 coin-detail'>
            <div className='flex flex-col md:flex-row justify-between pb-6 border-b border-grey-300'>
              <div className='flex items-center gap-4 mb-4 md:mb-0'>
                <Popover content={<IntroduceCoin data={newData} />}>
                  <img
                    src={changeImageUrl(newData?.image?.x150)}
                    alt=''
                    width={76}
                    height={76}
                    className='rounded-full min-w-[76px] max-w-[76px]'
                  />
                </Popover>
                <div>
                  <div className='flex items-center flex-wrap mb-3'>
                    <h1 className='flex items-center text-grey-700 text-2xl font-bold'>
                      <Popover content={<IntroduceCoin data={newData} />}>
                        <span className='font-jb text-2xl'>{newData?.name}</span>
                      </Popover>
                      <span className='flex items-center px-2 rounded text-xs text-grey-500 bg-grey-200 font-medium ml-2'>
                        {newData?.symbol}
                      </span>
                      <span className='w-0.5 h-6 bg-grey-500 mx-4'></span>
                    </h1>
                    <div className='flex items-center gap-2'>
                      <IconStar />
                      <IconStar />
                      <IconStar />
                      <IconStar />
                      <IconStar />
                      <span className='text-sm md:text-base'>
                        5.0
                      </span>
                    </div>
                    {/* <span className='w-2 h-2 bg-grey-500 mx-4 rounded-full'></span>
                    <span className='text-primary-500 text-sm md:text-base'>
                      1.2K Ratings
                    </span> */}
                  </div>
                  <div className='hidden md:flex gap-2 item-center'>
                    <span className='flex items-center px-2 py-0.5 rounded text-xs text-grey-500 font-medium bg-grey-200'>
                      #{newData?.rank}
                    </span>
                    <span className='flex items-center px-2 py-0.5 rounded text-xs text-grey-500 font-medium bg-grey-200'>
                      #{newData?.wallet} in Wallet
                    </span>
                    <span className='flex items-center px-2 py-0.5 rounded text-xs text-grey-500 font-medium bg-grey-200'>
                      <img
                        src='/coin-info/accumulating.png'
                        alt=''
                        width={12}
                        height={12}
                        className='mr-2'
                      />
                      Accumulating
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex item-center gap-3 md:hidden'>
                <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap'>
                  #{newData?.rank}
                </span>
                <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap'>
                  #{newData?.wallet} in Wallet
                </span>
                <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap'>
                  <img
                    src='/coin-info/accumulating.png'
                    alt=''
                    width={12}
                    height={12}
                    className='mr-2'
                  />
                  Accumulating
                </span>
              </div>
              <div className='block mt-4 md:mt-0'>
                <div className='flex justify-start md:justify-end flex-wrap gap-4 coin__actions mb-3'>
                  <Tooltip title='Add to Watchlist'>
                    <button className='action p-2 rounded border border-grey-300 hover:bg-grey-200'>
                      <IconSave />
                    </button>
                  </Tooltip>
                  <Tooltip title='Edit'>
                    <button className='action p-2 rounded border border-grey-300 hover:bg-grey-200'>
                      <PencilSquareIcon className='w-5 h-5' />
                    </button>
                  </Tooltip>
                  <Tooltip title='Price Alert'>
                    <button className='action p-2 rounded border border-grey-300 hover:bg-grey-200'>
                      <IconBell />
                    </button>
                  </Tooltip>
                </div>
                <div className='flex justify-start md:justify-end flex-wrap gap-2'>
                  <span className='text-sm text-grey-500'>Categories</span>
                  <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap cursor-pointer'>
                    {data?.category}
                  </span>
                  <Popover
                    placement='bottomRight'
                    content={<Categories data={newData} />}
                  >
                    <span className='flex items-center px-2 rounded text-xs text-primary-500 font-medium bg-grey-200 whitespace-nowrap cursor-pointer'>
                      See All
                    </span>
                  </Popover>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-6 md:grid-cols-12'>
              <div className='col-span-6 md:col-span-9 xl:col-span-10'>
                <div className='gap-4 md:gap-[35px] xl:gap-[70px] 2xl:gap-[110px] mt-6 flex flex-wrap'>
                  <div className='w-full max-w-[420px]'>
                    <div className='flex flex-wrap gap-2 md:gap-4 items-center'>
                      <span className='text-xl md:text-3xl font-bold'>
                        {price
                          ? nFormatter(price, 5, '$')
                          : ''}
                      </span>
                      <span className='text-sp-green-500 text-xs text-base'>
                        {percentFormat(newData?.price_change_in_24h * 100)}
                      </span>
                    </div>
                    <div className='flex items-center flex-wrap gap-2 pt-6 pb-3 text-grey-700'>
                      {
                        atlPrice ? (
                          <span>
                            {currencyFormat(atlPrice, '$')}
                          </span>

                        ) : (<span>0</span>)
                      }
                      <div className='relative w-[90px] max-w-[90px]'>
                        {
                          price && athPrice ? (
                            <div
                              className='unlock absolute top-1/2 left-0 -translate-y-1/2 bg-primary-500 h-1.5 rounded-xl z-20'
                              style={{ width: ((price/athPrice)*100) > 100 ? 100 + '%' : ((price/athPrice)*100) + '%' }}
                            ></div>
                          ) : (
                            <div
                              className='unlock absolute top-1/2 left-0 -translate-y-1/2 bg-primary-500 h-1.5 rounded-xl z-20'
                              style={{ width: 0 + '%' }}
                            ></div>
                          )
                        }
                        <div className='locked bg-grey-300 w-full h-1.5 rounded-xl'></div>
                      </div>
                      {
                        athPrice ? (
                          <span className='mr-2'>
                            {currencyFormat(athPrice, '$')}
                          </span>

                        ) : (<span>0</span>)
                      }
                      <Select
                        defaultValue='24h'
                        className='select-time w-[60px]'
                        onChange={handlePriceChange}
                        options={[
                          { value: '24H', label: '24h' },
                          { value: '7D', label: '7d' },
                          { value: '30D', label: '1m' },
                          { value: '3M', label: '3m' },
                          { value: 'YTD', label: 'All' },
                        ]}
                      />
                    </div>
                    <div className='flex items-center mb-1'>
                      <span className='text-grey-500 text-sm'>IDO Price:</span>
                      <span className='text-grey-700 text-sm mr-1 font-jsb font-semibold'>
                        {currencyFormat(newData?.idoPrice?.USD, '$')}
                      </span>
                      <span className='text-xs text-sp-green-500'>
                        (
                        {price
                          ? currencyFormat(
                              price / newData?.idoPrice?.USD,
                              ''
                            )
                          : 0}
                        x)
                      </span>
                    </div>
                    <div className='flex items-center mb-1'>
                      <span className='text-grey-500 text-sm'>Private Price:</span>
                      <span className='text-grey-700 text-sm mr-1 font-jsb font-semibold'>
                        {currencyFormat(newData?.atlPrice?.USD || 0, '$')}
                      </span>
                      <span className='text-xs text-sp-green-500'>
                        (
                        {price
                          ? currencyFormat(
                              price / (newData?.atlPrice?.USD || 0),
                              ''
                            )
                          : 0}
                        x)
                      </span>
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 md:gap-y-9 gap-x-[60px]'>
                    <div className='category'>
                      <div className='text-grey-500 text-sm'>Market Cap</div>
                      <div className='text-grey-700 flex flex-wrap items-center gap-1 font-jsb font-semibold'>
                        {nFormatter(Number(newData?.marketCap), 3, '$')}
                        <span className='text-xs text-sp-green-500'>+2.83%</span>
                      </div>
                    </div>
                    <div className='category'>
                      <div className='text-grey-500 text-sm'>Volume 24h</div>
                      <div className='text-grey-700 flex flex-wrap items-center gap-1 font-jsb font-semibold'>
                        {nFormatter(Number(newData?.volume24h), 2, '$')}
                        <span className='text-xs text-sp-green-500'>+2.83%</span>
                      </div>
                    </div>
                    <div className='category'>
                      <div className='text-grey-500 text-sm'>Vol/MCap 24h</div>
                      <div className='text-grey-700 font-jsb font-semibold'>
                        {currencyFormat(newData?.volMCap24h, '', { numberRound: 5 })}
                      </div>
                    </div>
                    <div className='category'>
                      <div className='text-grey-500 text-sm flex gap-1 items-center'>
                        <Popover content={<Fdv />}>
                          <div className='flex items-center gap-1'>
                            FDV <IconFdv />
                          </div>
                        </Popover>
                      </div>
                      <div className='text-grey-700 font-jsb font-semibold'>
                        {nFormatter(Number(newData?.fdv), 3, '$')}
                      </div>
                    </div>
                    <div className='category'>
                      <div className='text-grey-500 text-sm'>Circ.Supply</div>
                      <div className='text-grey-700 flex flex-wrap items-center gap-1 font-jsb font-semibold'>
                        {nFormatter(newData?.circ, 3, '$')}
                        <span className='text-grey-500 text-xs'>
                          {percentFormat(Number(newData?.percentOfCircSupply))}
                        </span>
                      </div>
                    </div>
                    <div className='category'>
                      <div className='text-grey-500 text-sm'>Total Supply</div>
                      <div className='text-grey-700 flex flex-wrap items-center font-jsb font-semibold'>
                      <span className='mr-1'>{newData?.symbol.toUpperCase()}</span> {nFormatter(Number(newData?.totalSupply), 2, '')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-4 xl:gap-8 2xl:gap-[110px] flex-wrap'>
                  {newData?.tokens && newData?.tokens.length >0 && (
                    <div className='mt-3 xl:mt-7'>
                      <span className='text-grey-500 text-sm mb-1'>Contracts</span>
                      <Contracts tokens={newData?.tokens} />
                    </div>
                  )}

                  <div className='flex flex-wrap gap-4 md:gap-8 xl:gap-[110px] xl:mt-7'>
                    <Links links={newData?.links}></Links>
                    <Backers backers={newData?.backers} />
                  </div>
                </div>
              </div>
              <div className='col-span-6 md:col-span-3 xl:col-span-2'>
                {<InformationUnlock data={newData} />}
              </div>
            </div>
          </div>
        ) : ''
      }
    </div>
  );
}

function Contracts(props: any) {
  const tokens = props.tokens || [];
  if (tokens.length <= 0) return;
  return (
    <div className='flex items-center gap-4 px-3 py-2 bg-grey-200 rounded'>
      <IconETH />
      <span className='text-sm'>{tokens[0]?.platformName}</span>
      <Popover content={<WalletAddress tokens={props.tokens} />}>
        <div>
          <IconCaretDown />
        </div>
      </Popover>
      <span className='text-primary-500 max-w-[62px] lg:max-w-[124px] truncate'>
        {tokens[0]?.address}
      </span>
      <Popover
        content={<span className='text-grey-700 text-xs'>Copy address</span>}
      >
        <IconCopy />
      </Popover>
      <Popover
        content={<span className='text-grey-700 text-xs'>Add to Metamask</span>}
      >
        <Image src='/coin-info/fox.png' width={24} height={24} alt='fox' />
      </Popover>
      <Popover content={<WalletBrand />}>
        <IconCaretDown />
      </Popover>
    </div>
  );
}
// export default CoinInformation;
