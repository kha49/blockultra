'use client';

import IconA16ZCrypto from '@/assets/icons/IconA16ZCrypto';
import IconBinStarter from '@/assets/icons/IconBinStarter';
import IconDWFLabs from '@/assets/icons/IconDWFLabs';
import IconFTXIEOs from '@/assets/icons/IconFTXIEOs';
import IconGateio from '@/assets/icons/IconGateio';
import React, { useState } from 'react';

const Fundraising = () => {
  const [items, setItems] = useState([
    { id: 1, isVisible: true },
    { id: 2, isVisible: true },
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
          <div className='col-span-6 bg-white border border-solid border-[#F1F4F7] rounded-lg shadow-md'>
            <div className='flex flex-col gap-2'>
              <div className='w-full h-10 border border-solid border-[#F1F4F7] flex justify-center items-center'>
                <h1 className='text-[#333747] text-base font-bold'>Summary</h1>
              </div>
              <div className='w-full h-[100px] grid grid-cols-4'>
                <div className='col-span-1 flex flex-col justify-center items-center gap-2'>
                  <p className='text-[#9FA4B7] font-medium text-xs'>
                    Total Funds Raised
                  </p>
                  <h2 className='text-[#333747] text-base font-semibold'>
                    $ 200,000,000
                  </h2>
                </div>
                <div className='col-span-1 flex flex-col justify-center items-center gap-2'>
                  <p className='text-[#9FA4B7] font-medium text-xs'>
                    AVG Price
                  </p>
                  <h2 className='text-[#333747] text-base font-semibold'>
                    $ 0.75
                  </h2>
                </div>
                <div className='col-span-1 flex flex-col justify-center items-center gap-2'>
                  <p className='text-[#9FA4B7] font-medium text-xs'>Rounds</p>
                  <h2 className='text-[#333747] text-base font-semibold'>5</h2>
                </div>
                <div className='col-span-1 flex flex-col justify-center items-center gap-2'>
                  <p className='text-[#9FA4B7] font-medium text-xs'>
                    Lead Backers
                  </p>
                  <h2 className='text-[#333747] text-base font-semibold'>21</h2>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-6 bg-white  border border-solid border-[#F1F4F7] rounded-lg shadow-md'>
            <div className='flex flex-col gap-2'>
              <div className='w-full h-10 border border-solid border-[#F1F4F7] flex justify-center items-center'>
                <h1 className='text-[#333747] text-base font-bold'>
                  Price Per Round{' '}
                </h1>
              </div>
              <div className='w-full h-[100px] grid grid-cols-4'>
                <div className='col-span-1 flex flex-col justify-center items-center gap-2'>
                  <p className='text-[#9FA4B7] font-medium text-xs'>Private</p>
                  <h2 className='text-[#333747] text-base font-semibold'>
                    $ 0.0...0123
                  </h2>
                </div>
                <div className='col-span-1 flex flex-col justify-center items-center gap-2'>
                  <p className='text-[#9FA4B7] font-medium text-xs'>
                    Strategic
                  </p>
                  <h2 className='text-[#333747] text-base font-semibold'>
                    $ 0.55
                  </h2>
                </div>
                <div className='col-span-1 flex flex-col justify-center items-center gap-2'>
                  <p className='text-[#9FA4B7] font-medium text-xs'>
                    Strategic
                  </p>
                  <h2 className='text-[#333747] text-base font-semibold'>
                    $ 0.55
                  </h2>
                </div>
                <div className='col-span-1 flex flex-col justify-center items-center gap-2'>
                  <p className='text-[#9FA4B7] font-medium text-xs'>Seed</p>
                  <h2 className='text-[#333747] text-base font-semibold'>
                    $ 0.55
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 bg-white  border border-solid border-[#F1F4F7] rounded-lg shadow-md'>
          <div className='w-full h-10 border border-solid border-[#F1F4F7] flex justify-center items-center'>
            <h1 className='text-[#333747] text-base font-bold'>
              Backer <span className='text-[#9FA4B7]'>20</span>
            </h1>
          </div>
          <div className='w-full h-[100px] grid grid-cols-6'>
            <div className='col-span-1 flex justify-center items-center gap-2'>
              <div className='w-12 h-12'>
                <IconA16ZCrypto />
              </div>
              <div className='w-auto h-auto flex flex-col items-center justify-between'>
                <p className='text-[#333747] font-semibold text-sm'>
                  A16z Crypto
                </p>
                <div className='bg-[#F1F4F7] w-11 h-5 rounded-lg flex  items-center justify-center'>
                  <p className=' text-[#9FA4B7] text-xs font-medium'>Tier 1</p>
                </div>
              </div>
            </div>
            <div className='col-span-1 flex justify-center items-center gap-2'>
              <div className='w-12 h-12'>
                <IconFTXIEOs />
              </div>
              <div className='w-auto h-auto flex flex-col items-center justify-between'>
                <p className='text-[#333747] font-semibold text-sm'>FTX IEOs</p>
                <div className='bg-[#F1F4F7] w-11 h-5 rounded-lg flex  items-center justify-center'>
                  <p className=' text-[#9FA4B7] text-xs font-medium'>Tier 1</p>
                </div>
              </div>
            </div>
            <div className='col-span-1 flex justify-center items-center gap-2'>
              <div className='w-12 h-12'>
                <IconGateio />
              </div>
              <div className='w-auto h-auto flex flex-col items-center justify-between'>
                <p className='text-[#333747] font-semibold text-sm'>Gate.io</p>
                <div className='bg-[#F1F4F7] w-11 h-5 rounded-lg flex  items-center justify-center'>
                  <p className=' text-[#9FA4B7] text-xs font-medium'>Tier 1</p>
                </div>
              </div>
            </div>
            <div className='col-span-1 flex justify-center items-center gap-2'>
              <div className='w-12 h-12'>
                <IconBinStarter />
              </div>
              <div className='w-auto h-auto flex flex-col items-center justify-between'>
                <p className='text-[#333747] font-semibold text-sm'>
                  BinStarter
                </p>
                <div className='bg-[#F1F4F7] w-11 h-5 rounded-lg flex  items-center justify-center'>
                  <p className=' text-[#9FA4B7] text-xs font-medium'>Tier 1</p>
                </div>
              </div>
            </div>
            <div className='col-span-1 flex justify-center items-center gap-2'>
              <div className='w-12 h-12'>
                <IconDWFLabs />
              </div>
              <div className='w-auto h-auto flex flex-col items-center justify-between'>
                <p className='text-[#333747] font-semibold text-sm'>DWF Labs</p>
                <div className='bg-[#F1F4F7] w-11 h-5 rounded-lg flex  items-center justify-center'>
                  <p className=' text-[#9FA4B7] text-xs font-medium'>Tier 1</p>
                </div>
              </div>
            </div>
            <div className='col-span-1 flex justify-center items-center'>
              <p className='text-[#5766FF] text-xs font-medium'>+15Backers</p>
            </div>
          </div>
        </div>

        <div className='w-full flex items-center justify-start'>
          <h1 className='text-[#333747] text-xl font-bold'>
            Details of Fundraising Rounds
          </h1>
        </div>
        {items.map((item, index) => (
          <div
            key={index}
            className='w-full flex flex-col gap-4 bg-white rounded-lg shadow-md p-4'
          >
            <div className='w-full flex items-center justify-start'>
              <div className='w-[300px] h-auto flex items-center justify-start gap-4'>
                <svg
                  width='40'
                  height='40'
                  viewBox='0 0 40 40'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='20' cy='20' r='20' fill='#E5E6EB' />
                  <path
                    d='M15.5 26.01C15.5 26.74 15.72 27.4 16.13 27.97C13.45 27.8 11 26.82 11 25.01V24.13C12.05 24.95 13.6 25.5 15.5 25.68V26.01ZM15.54 21.94C15.53 21.95 15.53 21.96 15.53 21.97C15.51 22.07 15.5 22.17 15.5 22.27V24.18C13.08 23.9 11 22.94 11 21.27V20.39C12.05 21.22 13.61 21.77 15.53 21.94H15.54ZM19.44 18.28C17.92 18.75 16.73 19.52 16.07 20.48C13.41 20.31 11 19.33 11 17.53V16.85C12.31 17.88 14.41 18.48 17 18.48C17.87 18.48 18.69 18.41 19.44 18.28ZM23 16.85V17.53C23 17.62 22.99 17.7 22.98 17.78C22.19 17.78 21.44 17.85 20.74 17.97C21.64 17.7 22.4 17.32 23 16.85ZM17 11C14 11 11 12 11 13.99C11 16 14 16.98 17 16.98C20 16.98 23 16 23 13.99C23 12 20 11 17 11ZM23 26.76C20.49 26.76 18.35 26.1 17 25.03V26.01C17 28 20 29 23 29C26 29 29 28 29 26.01V25.03C27.65 26.1 25.51 26.76 23 26.76ZM23 19.28C19.69 19.28 17 20.62 17 22.27C17 23.92 19.69 25.26 23 25.26C26.31 25.26 29 23.92 29 22.27C29 20.62 26.31 19.28 23 19.28Z'
                    fill='#9FA4B7'
                  />
                </svg>
                <h2 className='text-[#333747] font-bold text-xl'>Private</h2>
              </div>
              <div className='w-[240px] flex flex-col justify-center items-start'>
                <p className='text-[#9FA4B7] text-sm font-medium'>Price</p>
                <p className='text-[#333747] text-base font-semibold'>$0.75</p>
              </div>
              <div className='w-[300px] flex flex-col justify-center items-start'>
                <p className='text-[#9FA4B7] text-sm font-medium'>Raise</p>
                <p className='text-[#333747] text-base font-semibold'>
                  $50.00M
                </p>
              </div>
              <div className='w-[160px] flex flex-col justify-center items-start'>
                <p className='text-[#9FA4B7] text-sm font-medium'>ROI</p>
                <p className='text-[#333747] text-base font-semibold'>1.2x</p>
              </div>
              <div className='w-[268px] flex flex-col justify-center items-start'>
                <p className='text-[#9FA4B7] text-sm font-medium'>Unlocked</p>
                <p className='text-[#333747] text-base font-semibold'>82.21%</p>
              </div>
              <div className='w-auto flex flex-col justify-center items-center'>
                <svg
                  onClick={handleToggle}
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M11.9983 16.582C11.6783 16.582 11.3583 16.4604 11.1149 16.2154L4.44828 9.5487C3.95995 9.06037 3.95995 8.26865 4.44828 7.78031C4.93661 7.29198 5.72834 7.29198 6.21667 7.78031L12 13.5636L17.7832 7.78031C18.2716 7.29198 19.0633 7.29198 19.5516 7.78031C20.04 8.26865 20.04 9.06037 19.5516 9.5487L12.885 16.2154C12.6383 16.4604 12.3183 16.582 11.9983 16.582Z'
                    fill='#9FA4B7'
                  />
                </svg>
              </div>
            </div>

            {/* detail */}
            <div className='w-full flex items-center justify-start pb-4 border-b border-solid border-gray-200'>
              <div className='w-[300px] h-auto flex items-center justify-start gap-4'>
                <p className='text-[#5766FF] text-md font-semibold'>
                  05 May 2023
                </p>
              </div>
              <div className='w-[240px] flex flex-col justify-center items-start'>
                <p className='text-[#9FA4B7] text-md font-semibold'>
                  Valuation: $3.75M
                </p>
              </div>
              <div className='w-[300px] flex flex-col justify-center items-start'>
                <p className='text-[#9FA4B7] text-md font-semibold'>
                  Tokens Offered: 50.00M NBIT (5%)
                </p>
              </div>
              <div className='w-[160px] flex flex-col justify-center items-start'>
                <p className='text-[#9FA4B7] text-md font-semibold'>
                  ATH ROI: 100x
                </p>
              </div>
              <div className='w-auto flex flex-col justify-center items-center'>
                <p className='text-[#9FA4B7] text-md font-semibold'>
                  NBIT 618.22M ~ $87.83M
                </p>
              </div>
            </div>

            <div className='w-full h-auto flex items-center justify-center'>
              <h1 className='text-[#9FA4B7] font-medium text-base'>
                Backer 10
              </h1>
            </div>

            <div className='w-full grid grid-cols-5 gap-4 items-center justify-start'>
              <div className='col-span-1 flex items-center justify-center gap-2'>
                <div className='w-12 h-12'>
                  <IconA16ZCrypto />
                </div>
                <div className='w-auto h-auto flex flex-col items-center justify-between'>
                  <p className='text-[#333747] font-semibold text-sm'>
                    A16z Crypto
                  </p>
                  <div className='bg-[#F1F4F7] w-11 h-5 rounded-lg flex  items-center justify-center'>
                    <p className=' text-[#9FA4B7] text-xs font-medium'>
                      Tier 1
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fundraising;
