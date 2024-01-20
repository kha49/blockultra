'use client';

import Image from 'next/image';
import Allocation from '../allocation';
import './index.scss';
import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Popover } from 'antd';
import Link from 'next/link';
import { ICoinInfo, CoinAllocation } from '../coinInfoTabs/props';
import { nFormatter, percentFormat } from '@/helpers';
import { FetchInfomationCoin } from '@/usecases/exchange';
import { round } from 'lodash';
import { COLOR_CHART } from '@/helpers/constants';
import IconWeb from '@/assets/icons/IconWeb';
import { IconTwitter, IconFile, IconTelegram } from '@/assets/icons';

const CoinInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const colorChart = [
    COLOR_CHART.BITTER_LEMON,
    COLOR_CHART.MALACHITE,
    COLOR_CHART.PAOLO_VERONESE_GREEN,
    COLOR_CHART.TURQUOISE_SURF,
    COLOR_CHART.CERULEAN_FROST,
    COLOR_CHART.PLUMP_PURPLE,
    COLOR_CHART.PURPUREUS,
    COLOR_CHART.JAZZBERRY_JAM,
    COLOR_CHART.CERISE,
    COLOR_CHART.SUNSET_ORANGE,
  ];

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

  const _renderLinePopup = (i: number) => {
    let _color = colorChart[i];
    return (
      <div className='popup__contents-index hover:cursor-pointer flex'>
        <div>
          <svg
            className='w-4.5 h-5 hover:w-5.5 hover:h-6'
            viewBox='0 0 18 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
              fill={_color}
            />
          </svg>
        </div>
        {_caculateCoin(i)}
      </div>
    );
  };

  return (
    <div className='w-full bg-white mx-auto'>
      <Modal
        title={<div className='text-2xl'>Token Allocation</div>}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer=''
      >
        <div className='popup__contents'>
          {_renderLinePopup(0)}
          {_renderLinePopup(1)}
          {_renderLinePopup(2)}
          {_renderLinePopup(3)}
          {_renderLinePopup(4)}
          {_renderLinePopup(5)}
          {_renderLinePopup(6)}
          {_renderLinePopup(7)}
          {_renderLinePopup(8)}
          {_renderLinePopup(9)}
        </div>
      </Modal>

      <div className='coins bg-white px-6 pt-6 pb-4 gap-1.5 rounded-lg shadow'>
        <div className='coins__header flex border-b pb-6 justify-between'>
          <div className='flex gap-4 items-center justify-center'>
            <img src={coinsData?.icon} />

            <div className='flex-col gap-3 justify-start inline-flex'>
              <div className='coins__name text-zinc-700 text-2xl font-jb leading-loose'>
                {coinsData?.name}
              </div>
              <div className='justify-start items-center inline-flex'>
                <div className='px-2 bg-slate-100 rounded items-center'>
                  <div className='text-gray-400 text-xs font-jm leading-tight'>
                    Tier 1
                  </div>
                </div>

                <div className='line__tag border border-grey-400 mx-3' />

                <div className='flex items-center '>
                  <span className='text-gray-400 text-xs font-jm leading-tight'>
                    Year of Foundation:
                  </span>
                  <span className='text-zinc-700 text-xs font-jb leading-tight'>
                    {/* {coinsData.yearFoundation} */}2017
                  </span>
                </div>

                <div className='w-1.5 h-1.5 mx-2 bg-gray-300 rounded-full' />

                <span className='coins__tag items-center'>
                  <Popover
                    content={
                      <div className='text-right text-zinc-700 text-xs font-medium leading-tight'>
                        {coinsData?.country}
                      </div>
                    }
                    trigger='hover'
                  >
                    {/* {showFlag(coinsData?.country)} */}
                    <Link href='../exchange'>
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
                    </Link>
                  </Popover>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='coins__info grid grid-cols-5 mt-1.5'>
          <div className='col-span-5 md:col-span-3'>
            <div className='coins__body grid grid-cols-2'>
              <div className='col-span-2 xl:col-span-1'>
                <div className='coins__value flex-col justify-start gap-2 inline-flex'>
                  <div className='flex items-center'>
                    <div className='text-xs text-gray-400 font-jm leading-tight'>
                      Spot Trading Volume
                    </div>
                  </div>

                  <div className='items-center gap-4 inline-flex'>
                    <span className='price text-[40px] font-jeb leading-[48px]'>
                      {nFormatter(Number(coinsData?.volumes.day.toUSD), 2, '$')}
                    </span>
                    <span className='price--increase text-base font-jsb'>
                      {percentFormat(
                        (Number(coinsData?.volumes?.day?.toUSD) /
                          Number(coinsData?.reportedVolumes.day.toUSD) -
                          1) *
                          100
                      )}
                    </span>
                  </div>

                  <div className='text-zinc-700 text-sm font-jm leading-tight'>
                    {nFormatter(Number(coinsData?.volumes.day.toBTC), 3, 'BTC')}
                  </div>
                </div>

                <div className='coins__socials mt-8'>
                  <div className='coins__links flex-col justify-start items-start gap-2 inline-flex'>
                    <div className='text-gray-400 text-xs font-jm leading-tight'>
                      Links
                    </div>

                    <div className='flex gap-4 xl:gap-5 py-1.5'>
                      <Link
                        href={
                          coinsData?.links[0] ? coinsData?.links[0]?.value : ''
                        }
                      >
                        <IconWeb />
                      </Link>
                      <Link
                        href={
                          coinsData?.links[1] ? coinsData?.links[1]?.value : ''
                        }
                      >
                        <IconTwitter />
                      </Link>
                      <Link
                        href={
                          coinsData?.links[2] ? coinsData?.links[2]?.value : ''
                        }
                      >
                        <IconTelegram />
                      </Link>
                      <Popover
                        trigger='click'
                        placement='bottom'
                        content={
                          <div className='flex items-center gap-5'>
                            <Link
                              href={
                                coinsData?.links[3]
                                  ? coinsData?.links[3]?.value
                                  : ''
                              }
                            >
                              <IconFile />
                            </Link>
                            <Link
                              href={
                                coinsData?.links[4]
                                  ? coinsData?.links[4]?.value
                                  : ''
                              }
                            >
                              <svg
                                width='28'
                                height='28'
                                viewBox='0 0 28 28'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M1.75 10.15C1.75 7.20972 1.75 5.73959 2.32222 4.61655C2.82555 3.6287 3.6287 2.82555 4.61655 2.32222C5.73959 1.75 7.20972 1.75 10.15 1.75H17.85C20.7903 1.75 22.2604 1.75 23.3835 2.32222C24.3713 2.82555 25.1744 3.6287 25.6778 4.61655C26.25 5.73959 26.25 7.20972 26.25 10.15V17.85C26.25 20.7903 26.25 22.2604 25.6778 23.3835C25.1744 24.3713 24.3713 25.1744 23.3835 25.6778C22.2604 26.25 20.7903 26.25 17.85 26.25H10.15C7.20972 26.25 5.73959 26.25 4.61655 25.6778C3.6287 25.1744 2.82555 24.3713 2.32222 23.3835C1.75 22.2604 1.75 20.7903 1.75 17.85V10.15Z'
                                  fill='#7289DA'
                                />
                                <path
                                  d='M21.2408 8.77333C19.9163 7.65333 18.3268 7.09333 16.6491 7L16.3842 7.28C17.8853 7.65333 19.2099 8.4 20.4461 9.42667C18.945 8.58667 17.2672 8.02667 15.5011 7.84C14.9713 7.74667 14.5298 7.74667 14 7.74667C13.4702 7.74667 13.0287 7.74667 12.4989 7.84C10.7328 8.02667 9.05505 8.58667 7.5539 9.42667C8.79014 8.4 10.1147 7.65333 11.6158 7.28L11.3509 7C9.67317 7.09333 8.08372 7.65333 6.75917 8.77333C5.25803 11.76 4.4633 15.12 4.375 18.5733C5.69954 20.0667 7.5539 21 9.49656 21C9.49656 21 10.1147 20.2533 10.5562 19.6C9.40826 19.32 8.34862 18.6667 7.6422 17.64C8.26032 18.0133 8.87844 18.3867 9.49656 18.6667C10.2913 19.04 11.086 19.2267 11.8807 19.4133C12.5872 19.5067 13.2936 19.6 14 19.6C14.7064 19.6 15.4128 19.5067 16.1193 19.4133C16.914 19.2267 17.7087 19.04 18.5034 18.6667C19.1216 18.3867 19.7397 18.0133 20.3578 17.64C19.6514 18.6667 18.5917 19.32 17.4438 19.6C17.8853 20.2533 18.5034 21 18.5034 21C20.4461 21 22.3005 20.0667 23.625 18.5733C23.5367 15.12 22.742 11.76 21.2408 8.77333ZM11.086 16.8933C10.203 16.8933 9.40826 16.0533 9.40826 15.0267C9.40826 14 10.203 13.16 11.086 13.16C11.969 13.16 12.7638 14 12.7638 15.0267C12.7638 16.0533 11.969 16.8933 11.086 16.8933ZM16.914 16.8933C16.031 16.8933 15.2362 16.0533 15.2362 15.0267C15.2362 14 16.031 13.16 16.914 13.16C17.797 13.16 18.5917 14 18.5917 15.0267C18.5917 16.0533 17.797 16.8933 16.914 16.8933Z'
                                  fill='white'
                                />
                              </svg>
                            </Link>
                            <Link
                              href={
                                coinsData?.links[5]
                                  ? coinsData?.links[5]?.value
                                  : ''
                              }
                            >
                              <svg
                                width='28'
                                height='28'
                                viewBox='0 0 28 28'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <circle
                                  cx='14'
                                  cy='14'
                                  r='12.25'
                                  fill='#1877F2'
                                />
                                <path
                                  d='M18.562 17.7464L19.1061 14.2888H15.7021V12.0461C15.7021 11.1 16.1767 10.1772 17.7014 10.1772H19.25V7.23362C19.25 7.23362 17.8452 7 16.5027 7C13.698 7 11.8665 8.65632 11.8665 11.6536V14.2888H8.75V17.7464H11.8665V26.1052C12.4921 26.201 13.1322 26.25 13.7843 26.25C14.4363 26.25 15.0764 26.201 15.7021 26.1052V17.7464H18.562Z'
                                  fill='white'
                                />
                              </svg>
                            </Link>
                            <Link
                              href={
                                coinsData?.links[6]
                                  ? coinsData?.links[6]?.value
                                  : ''
                              }
                            >
                              <svg
                                width='28'
                                height='28'
                                viewBox='0 0 28 28'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <circle
                                  cx='14'
                                  cy='14'
                                  r='12.25'
                                  fill='#FF4500'
                                />
                                <path
                                  d='M7.62891 17.5L5.63281 20.043V20.3301H10.5547V20.043L8.57227 17.5V10.9375L12.8242 20.3301H13.4258L17.0625 10.9375V18.6484L15.5723 20.043V20.3301H22.0938V20.043L20.6445 18.6484V8.94141L22.0938 7.58789V7.25977H17.5957L14.3145 15.3125L10.6504 7.25977H5.86523V7.58789L7.62891 9.67969V17.5Z'
                                  fill='white'
                                />
                              </svg>
                            </Link>
                            <Link
                              href={
                                coinsData?.links[7]
                                  ? coinsData?.links[7]?.value
                                  : ''
                              }
                            >
                              <svg
                                width='28'
                                height='28'
                                viewBox='0 0 28 28'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M14 1.75C7.23187 1.75 1.75 7.23187 1.75 14C1.75 19.4206 5.25656 23.9991 10.1259 25.6222C10.7384 25.7294 10.9681 25.3619 10.9681 25.0403C10.9681 24.7494 10.9528 23.7847 10.9528 22.7587C7.875 23.3253 7.07875 22.0084 6.83375 21.3194C6.69594 20.9672 6.09875 19.88 5.57812 19.5891C5.14937 19.3594 4.53688 18.7928 5.56281 18.7775C6.5275 18.7622 7.21656 19.6656 7.44625 20.0331C8.54875 21.8859 10.3097 21.3653 11.0141 21.0437C11.1213 20.2475 11.4428 19.7116 11.795 19.4053C9.06938 19.0991 6.22125 18.0425 6.22125 13.3569C6.22125 12.0247 6.69594 10.9222 7.47687 10.0647C7.35437 9.75844 6.92562 8.50281 7.59937 6.81844C7.59937 6.81844 8.62531 6.49687 10.9681 8.07406C11.9481 7.79844 12.9894 7.66062 14.0306 7.66062C15.0719 7.66062 16.1131 7.79844 17.0931 8.07406C19.4359 6.48156 20.4619 6.81844 20.4619 6.81844C21.1356 8.50281 20.7069 9.75844 20.5844 10.0647C21.3653 10.9222 21.84 12.0094 21.84 13.3569C21.84 18.0578 18.9766 19.0991 16.2509 19.4053C16.695 19.7881 17.0778 20.5231 17.0778 21.6716C17.0778 23.31 17.0625 24.6269 17.0625 25.0403C17.0625 25.3619 17.2922 25.7447 17.9047 25.6222C20.3365 24.8012 22.4497 23.2383 23.9468 21.1534C25.4438 19.0685 26.2493 16.5667 26.25 14C26.25 7.23187 20.7681 1.75 14 1.75Z'
                                  fill='#171515'
                                />
                              </svg>
                            </Link>
                          </div>
                        }
                      >
                        <div className='w-7 h-7 bg-slate-200 rounded-3xl flex-col justify-center items-center inline-flex'>
                          <div className='text-zinc-700 text-xs font-jsb leading-tight hover:cursor-pointer'>
                            +5
                          </div>
                        </div>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-span-2 xl:col-span-1'>
                <div className='coins__category xl:w-4/5 flex-wrap flex gap-y-6'>
                  <div className='category'>
                    <div className='coins__title'>Market Share</div>
                    <div className='category__number'>
                      {coinsData?.percentVolume
                        ? coinsData?.percentVolume + '%'
                        : '-'}
                    </div>
                  </div>

                  <div className='category'>
                    <div className='coins__title'>Financial Reserves</div>
                    <div className='category__number'>
                      {nFormatter(Number(coinsData?.reserves), 2, '$')}
                    </div>
                  </div>

                  <div className='category'>
                    <div className='coins__title'>Coin</div>
                    <div className='category__number'>
                      {coinsData?.currenciesCount
                        ? coinsData?.currenciesCount
                        : '-'}
                    </div>
                  </div>
                  <div className='category'>
                    <div className='coins__title'>Trading Pairs</div>
                    <div className='category__number'>
                      {coinsData?.pairsCount ? coinsData?.pairsCount : '-'}
                    </div>
                  </div>
                  <div className='category'>
                    <div className='coins__title'>Native Token</div>
                    <div className='category__link flex'>
                      <Image
                        src='/coin-info/nativetoken.png'
                        alt=''
                        width={20}
                        height={20}
                      />
                      <div className='ml-2 text-zinc-700 text-base font-jsb leading-normal'>
                        BNB
                      </div>
                    </div>
                  </div>
                  <div className='category'>
                    <div className='coins__title'>Fees</div>
                    <div className='category__link flex'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M13 11L21.2 2.80005'
                          stroke='#5766FF'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M22 6.8V2H17.2'
                          stroke='#5766FF'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13'
                          stroke='#5766FF'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                      </svg>
                      <Link href=''>
                        {/* <Link href={coinsData?.links}> */}
                        <div className='items-center ml-2 text-zinc-700 text-base font-jsb underline'>
                          Source{' '}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-5 pt-5 md:pt-0 md:col-span-2 border-t md:border-t-0 md:border-l border-gray-200'>
            <div className='md:ml-6 ' onClick={toggleModal}>
              <Allocation list={listTopCoin} total={totalVolume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinInformation;
