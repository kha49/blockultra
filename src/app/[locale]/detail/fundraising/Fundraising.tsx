'use client';

import IconA16ZCrypto from '@/assets/icons/IconA16ZCrypto';
import { IconArrowDown } from '@/assets/icons/IconArrowDown';
import IconBinStarter from '@/assets/icons/IconBinStarter';
import IconDWFLabs from '@/assets/icons/IconDWFLabs';
import IconFTXIEOs from '@/assets/icons/IconFTXIEOs';
import IconGateio from '@/assets/icons/IconGateio';
import React, { useState } from 'react';

const Fundraising = () => {
  const [items, setItems] = useState([
    { id: 1, isVisible: false },
    { id: 2, isVisible: false },
    // ... other items
  ]);

  const handleToggle = (itemId: any) => {
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, isVisible: !item.isVisible } : item
      );
    });
  };

  return (
    <div>
      <h1>Fundraising Overview</h1>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-12 gap-4 mt-2'>
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
                    $ 200,000,000
                  </h2>
                </div>
                <div className='text-center'>
                  <p className='text-grey-500 font-medium text-xs mb-2'>
                    AVG Price
                  </p>
                  <h2 className='text-grey-700 text-base font-semibold'>
                    $ 0.75
                  </h2>
                </div>
                <div className='text-center'>
                  <p className='text-grey-500 font-medium text-xs mb-2'>
                    Rounds
                  </p>
                  <h2 className='text-grey-700 text-base font-semibold'>5</h2>
                </div>
                <div className='text-center'>
                  <p className='text-grey-500 font-medium text-xs mb-2'>
                    Lead Backers
                  </p>
                  <h2 className='text-grey-700 text-base font-semibold'>21</h2>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-12 md:col-span-6 bg-white rounded-lg box-shadow-common'>
            <div className='flex flex-col gap-2'>
              <div className='w-full px-6 py-2 border-b border-solid border-grey-200 flex justify-center items-center'>
                <h1 className='text-grey-700 text-base font-bold'>
                  Price Per Round{' '}
                </h1>
              </div>
              <div className='w-full p-6 flex flex-wrap items-center justify-around gap-4'>
                <div className='text-center'>
                  <p className='text-grey-500 font-medium text-xs mb-2'>
                    Private
                  </p>
                  <h2 className='text-grey-700 text-base font-semibold'>
                    $ 0.0...0123
                  </h2>
                </div>
                <div className='text-center'>
                  <p className='text-grey-500 font-medium text-xs mb-2'>
                    Strategic
                  </p>
                  <h2 className='text-grey-700 text-base font-semibold'>
                    $ 0.55
                  </h2>
                </div>
                <div className='text-center'>
                  <p className='text-grey-500 font-medium text-xs mb-2'>
                    Strategic
                  </p>
                  <h2 className='text-grey-700 text-base font-semibold'>
                    $ 0.55
                  </h2>
                </div>
                <div className='text-center'>
                  <p className='text-grey-500 font-medium text-xs mb-2'>Seed</p>
                  <h2 className='text-grey-700 text-base font-semibold'>
                    $ 0.55
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 bg-white rounded-lg box-shadow-common'>
          <div className='w-full px-6 py-2 border-b border-solid border-grey-200 flex justify-center items-center'>
            <h1 className='text-grey-700 text-base font-bold'>
              Backer <span className='text-grey-500 ml-1'>20</span>
            </h1>
          </div>
          <div className='w-full p-6 flex flex-wrap items-center justify-between gap-4'>
            <div className='flex justify-center items-center gap-2'>
              <div className='w-12 h-12'>
                <IconA16ZCrypto />
              </div>
              <div>
                <p className='text-grey-700 font-semibold text-sm mb-1'>
                  A16z Crypto
                </p>
                <div className='bg-grey-200 rounded-sm inline-block px-1'>
                  <p className='text-grey-500 text-xs font-medium'>Tier 1</p>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <div className='w-12 h-12'>
                <IconFTXIEOs />
              </div>
              <div>
                <p className='text-grey-700 font-semibold text-sm mb-1'>
                  FTX IEOs
                </p>
                <div className='bg-grey-200 rounded-sm inline-block px-1'>
                  <p className='text-grey-500 text-xs font-medium'>Tier 1</p>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <div className='w-12 h-12'>
                <IconGateio />
              </div>
              <div>
                <p className='text-grey-700 font-semibold text-sm mb-1'>
                  Gate.io
                </p>
                <div className='bg-grey-200 rounded-sm inline-block px-1'>
                  <p className='text-grey-500 text-xs font-medium'>Tier 1</p>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <div className='w-12 h-12'>
                <IconBinStarter />
              </div>
              <div>
                <p className='text-grey-700 font-semibold text-sm mb-1'>
                  BinStarter
                </p>
                <div className='bg-grey-200 rounded-sm inline-block px-1'>
                  <p className='text-grey-500 text-xs font-medium'>Tier 1</p>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <div className='w-12 h-12'>
                <IconDWFLabs />
              </div>
              <div>
                <p className='text-grey-700 font-semibold text-sm mb-1'>
                  DWF Labs
                </p>
                <div className='bg-grey-200 rounded-sm inline-block px-1'>
                  <p className='text-grey-500 text-xs font-medium'>Tier 1</p>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <p className='text-primary-500 text-xs font-medium'>+15Backers</p>
            </div>
          </div>
        </div>

        <div className='w-full flex items-center justify-start'>
          <h1 className='text-grey-700 text-xl font-bold'>
            Details of Fundraising Rounds
          </h1>
        </div>
        {items.map((item, index) => (
          <div
            key={index}
            className='box-shadow-common p-4 flex items-center justify-between flex-wrap gap-6 mb-6'
          >
            <div className='flex flex-col gap-6 item-center'>
              <div className='flex items-center gap-2'>
                <img src='/Dao.svg' alt='dao' />
                <div className='text-sm text-grey-700 font-bold'>DAO Maker</div>
              </div>
              {item.isVisible ? (
                <div className='text-primary-500 text-sm font-semibold'>
                  01 May 2023 - 05 May 2023
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='flex flex-col gap-6 item-center'>
              <div className='text-center'>
                <div className='text-grey-500 text-sm mb-2'>Price</div>
                <div className='text-grey-700 text-sm font-semibold'>
                  $0.075
                </div>
              </div>
              {item.isVisible ? (
                <div className='text-grey-500 text-sm'>
                  Valuation:<span className='font-semibold'>$3.75M</span>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='flex flex-col gap-6 item-center'>
              <div className='text-center'>
                <div className='text-grey-500 text-sm mb-2'>Raise</div>
                <div className='text-grey-700 text-sm font-semibold'>
                  $50.00M
                </div>
              </div>
              {item.isVisible ? (
                <div className='text-grey-500 text-sm'>
                  Tokens Offered:
                  <span className='font-semibold'>50M NBIT (5%)</span>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='flex flex-col gap-6 item-center'>
              <div className='text-center'>
                <div className='text-grey-500 text-sm mb-2'>ROI</div>
                <div className='text-grey-700 text-sm font-semibold'>1.2x</div>
              </div>
              {item.isVisible ? (
                <div className='text-grey-500 text-sm'>
                  ATH ROI:<span className='font-semibold'>100x</span>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='flex flex-col gap-6 item-center'>
              <div className='text-center'>
                <div className='text-grey-500 text-sm mb-2'>Unlocked</div>
                <div className='text-grey-700 text-sm font-semibold'>
                  82.21%
                </div>
              </div>
              {item.isVisible ? (
                <div className='text-grey-500 text-sm'>
                  NBIT 618.22M~<span className='font-semibold'>$87.83M</span>
                </div>
              ) : (
                ''
              )}
            </div>
            <div
              className={
                'min-w-[100px] flex items-start justify-center ' +
                (item.isVisible ? 'rotate-180' : '')
              }
              onClick={() => handleToggle(item.id)}
            >
              <IconArrowDown />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fundraising;