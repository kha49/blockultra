'use client';

import { nFormatter } from '@/helpers';
import { FetchCoinFundraising } from '@/usecases/coin-info';
import { useEffect, useState } from 'react';
import BackerList, { BackerItem } from '@/components/BackerList/BackerList';
import IconFundraisingRoundsDetail from '@/assets/icons/IconFundraisingRoundsDetail';
import IconFundraisingRoundsArrow from '@/assets/icons/IconFundraisingRoundsArrow';


const Fundraising = (props:any) => {
  const [overView, setOverview] = useState<any>([]);
  const [fundraisings, setFundraisings] = useState<IFundraisings[]>([]);
  const symbol = props.data?.symbol || '';

  useEffect(() => {
    fetchFundraising();
  }, []);

  async function fetchFundraising() {
    let res: any = await FetchCoinFundraising({
      coin_key: props.slug,
      limit: 100,
    });
    setOverview(res?.overview);
    let fundraisings = res?.fundraisings || [];
  
    for (let i in fundraisings) {
      fundraisings[i].id = i;
      fundraisings[i].isVisible = false;
    }
    setFundraisings(fundraisings);
    return res;
  }

  const handleToggle = (itemId: any) => {
    setFundraisings((prevItems) => {
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, isVisible: !item.isVisible } : item
      );
    });
  };

  return (
    <div>
      <h1 className='text-grey-700 text-xl font-bold mb-2'>Overview</h1>
      <div className='grid grid-cols-12 gap-4 mb-6'>
        <div className='col-span-12 md:col-span-6 bg-white rounded-lg box-shadow-common'>
          <div>
            <div className='w-full px-6 py-2 border-b border-solid border-grey-200 flex justify-center items-center'>
              <h1 className='text-grey-700 text-base font-bold'>Summary</h1>
            </div>
            <div className='w-full p-6 flex flex-wrap items-center justify-around gap-4'>
              <div className='text-center'>
                <p className='text-grey-500 font-medium text-xs mb-2'>
                  Total Funds Raised
                </p>
                <h2 className='text-grey-700 text-base font-semibold'>
                  {overView?.totalFundRaised ? nFormatter(overView?.totalFundRaised | 0, 2, '$') : '-'}
                </h2>
              </div>
              <div className='text-center'>
                <p className='text-grey-500 font-medium text-xs mb-2'>
                  AVG Price
                </p>
                <h2 className='text-grey-700 text-base font-semibold'>
                  {overView?.avgPrice ? nFormatter(overView?.avgPrice | 0, 2, '$') : '-'}
                </h2>
              </div>
              <div className='text-center'>
                <p className='text-grey-500 font-medium text-xs mb-2'>
                  Rounds
                </p>
                <h2 className='text-grey-700 text-base font-semibold'>
                  {overView?.round_number ? overView?.round_number : '-'}
                </h2>
              </div>
              <div className='text-center'>
                <p className='text-grey-500 font-medium text-xs mb-2'>
                  Lead Backers
                </p>
                <h2 className='text-grey-700 text-base font-semibold'>
                  {overView?.leadBackers ? overView?.leadBackers : '-'}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-12 md:col-span-6 bg-white rounded-lg box-shadow-common'>
          <div className='flex flex-col gap-2'>
            <div className='w-full px-6 py-2 border-b border-solid border-grey-200 flex justify-center items-center'>
              <h1 className='text-grey-700 text-base font-bold'>
                Price Per Round
              </h1>
            </div>
            <div className='w-full p-6 flex flex-wrap items-center justify-around gap-4'>
              <div className='text-center'>
                <p className='text-grey-500 font-medium text-xs mb-2'>
                  Private
                </p>
                <h2 className='text-grey-700 text-base font-semibold'>
                  {overView?.pricePerRoundPrice ? nFormatter(overView?.pricePerRoundPrice, 2, '$') : '-'}
                </h2>
              </div>
              <div className='text-center'>
                <p className='text-grey-500 font-medium text-xs mb-2'>
                  Strategic
                </p>
                <h2 className='text-grey-700 text-base font-semibold'>
                  {overView?.strategic ? nFormatter(overView?.strategic, 2, '$') : '-'}
                </h2>
              </div>
              <div className='text-center'>
                <p className='text-grey-500 font-medium text-xs mb-2'>Seed</p>
                <h2 className='text-grey-700 text-base font-semibold'>
                  {overView?.seed ? nFormatter(overView?.seed, 2, '$') : '-'}
                </h2>
              </div>
              <div className='text-center'>
                <p className='text-grey-500 font-medium text-xs mb-2'>
                  Pre-Seed
                </p>
                <h2 className='text-grey-700 text-base font-semibold'>
                  {overView?.pre_seed ? nFormatter(overView?.pre_seed, 2, '$') : '-'}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white rounded-lg box-shadow-common mb-6'>
        <div className='w-full px-6 py-2 border-b border-solid border-grey-200 flex justify-center items-center'>
          <h1 className='text-grey-700 text-base font-bold'>
            Backer
            <span className='text-grey-500 ml-1'>
              {overView?.backers?.length}
            </span>
          </h1>
        </div>
        <BackerList
          backers={overView?.backers}
          initNumber={4}
          type={'backer'}
        />
      </div>
      <h1 className='text-grey-700 text-xl font-bold mb-2'>
        Details
      </h1>
      {fundraisings.map((item, index) => (
        <div
          key={index}
          className='box-shadow-common mb-6'
        >
          <div className='flex items-center justify-between flex-wrap gap-6 p-4'>
            <div className='flex flex-col gap-6 item-center'>
              <div className='flex items-center gap-2'>
                <IconFundraisingRoundsDetail />
                <div className='text-sm text-grey-700 font-bold'>
                  {item.type}
                </div>
              </div>
              {item.isVisible ? (
                <div className='text-primary-500 text-sm font-semibold'>
                  {new Date(item.date || Date.now()).toLocaleDateString()}
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='flex flex-col gap-6 item-center'>
              <div className='text-center'>
                <div className='text-grey-500 text-sm mb-2'>Price</div>
                <div className='text-grey-700 text-sm font-semibold'>
                  {nFormatter(item.price || 0, 2, '$')}
                </div>
              </div>
              {item.isVisible ? (
                <div className='text-grey-500 text-sm'>
                  Valuation:
                  <span className='font-semibold'>
                    {nFormatter(item.valuation || 0, 2, '$')}
                  </span>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='flex flex-col gap-6 item-center'>
              <div className='text-center'>
                <div className='text-grey-500 text-sm mb-2'>Raise</div>
                <div className='text-grey-700 text-sm font-semibold'>
                  {nFormatter(item.raised | 0, 2, '$')}
                </div>
              </div>
              {item.isVisible ? (
                <div className='text-grey-500 text-sm'>
                  Tokens Offered:{' '}
                  <span className='font-semibold'>
                    {nFormatter(item.tokensOffered || 0, 2, '$')}(
                    {nFormatter(item.percenOfTokens || 0, 2, '%', true)})
                  </span>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='flex flex-col gap-6 item-center'>
              <div className='text-center'>
                <div className='text-grey-500 text-sm mb-2'>ROI</div>
                <div className='text-grey-700 text-sm font-semibold'>
                  {nFormatter(item.roi || 0, 2, 'x', true)}
                </div>
              </div>
              {item.isVisible ? (
                <div className='text-grey-500 text-sm'>
                  ATH ROI:
                  <span className='font-semibold'>
                    {nFormatter(item.athROI || 0, 2, 'x', true)}
                  </span>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='flex flex-col gap-6 item-center'>
              <div className='text-center'>
                <div className='text-grey-500 text-sm mb-2'>Unlocked</div>
                <div className='text-grey-700 text-sm font-semibold'>
                  {nFormatter(item.unlockedPercent | 0, 2, '%', true)}
                </div>
              </div>
              {item.isVisible ? (
                <div className='text-grey-500 text-sm'>
                  {nFormatter(item.unlockedTokens || 0, 2, symbol)}~
                  <span className='font-semibold'>
                    {nFormatter(item.unlockedValue || 0, 2, symbol)}
                  </span>
                </div>
              ) : (
                ''
              )}
            </div>
            <div
              className={
                'min-w-[100px] flex items-start justify-center transition-all ' +
                (item.isVisible ? 'rotate-180' : '')
              }
              onClick={() => handleToggle(item.id)}
            >
              <IconFundraisingRoundsArrow />
            </div>
          </div>
          {
            item?.backers && item?.backers.length > 0 ? (
              <div className={'w-full p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-start border-t border-grey-300 ' + (item.isVisible ? '' : 'hidden') }>
                {item?.backers.map((item: any, index: any) => (
                  <div className='flex justify-start items-center'>
                    <BackerItem key={index} item={item} />
                  </div>
                ))}
              </div>
            ) : ''
          }
        </div>
      ))}
    </div>
  );
};

export default Fundraising;
