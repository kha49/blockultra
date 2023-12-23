import Image from 'next/image';
import React from 'react';
import './index.scss';

const SearchResult = () => {
  return (
    <div className='modal-search p-4 w-full min-w-[580px] rounded-lg z-10'>
      <div className='modal-search-item trending-today mb-4'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Trending Today
          <Image src='/rocket.png' width={20} height={20} alt='rocket' />
        </div>
        <div className='modal-search-item__list'>
          {[1, 2, 3].map((item) => {
            return (
              <div
                className='modal-search-item__list__item hover:rounded cursor-pointer'
                key={item}
              >
                <div className='coin p-2 flex justify-between items-center'>
                  <div className='coin-info flex items-center gap-4'>
                    <div className='coin-info__image'>
                      <Image src='/btc.png' width={32} height={32} alt='btc' />
                    </div>
                    <div className='coin-info__content'>
                      <div className='coin-info__content__name flex gap-2'>
                        <div className='coin-name font-medium text-sm font-jm'>
                          Bitcoin
                        </div>
                        <div className='coin-tag text-xs font-medium font-jm'>
                          BTC
                        </div>
                      </div>
                      <div className='coin-info__content__price'>
                        <span className='price text-xs font-medium font-jm'>
                          $28.526K
                        </span>
                        <span className='percent text-xs font-medium font-jm'>
                          +21.45%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='number-of-coin text-xs font-medium font-jm'>
                    #1
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='modal-search-item recents'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Recent
          <Image src='/recent.png' width={20} height={20} alt='recent' />
        </div>
        <div className='modal-search-item__list flex flex-wrap'>
          {[1, 2, 3, 4, 5, 6].map((item) => {
            return (
              <div
                className='modal-search-item__list__item hover:rounded'
                key={item}
              >
                <div className='coin p-2 flex'>
                  <div className='coin-info flex flex-col'>
                    <div className='coin-info__image mb-2'>
                      <Image src='/btc.png' width={32} height={32} alt='btc' />
                    </div>
                    <div className='coin-info__name'>BTC</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='modal-search-item cryptoassets'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Cryptoassets
        </div>
        <div className='modal-search-item__list'>
          {[1, 2, 3].map((item) => {
            return (
              <div
                className='modal-search-item__list__item hover:rounded cursor-pointer'
                key={item}
              >
                <div className='coin p-2 flex justify-between items-center'>
                  <div className='coin-info flex items-center gap-4'>
                    <div className='coin-info__image'>
                      <Image src='/btc.png' width={32} height={32} alt='btc' />
                    </div>
                    <div className='coin-info__content'>
                      <div className='coin-info__content__name flex gap-2'>
                        <div className='coin-name font-medium text-sm font-jm'>
                          Bitcoin
                        </div>
                        <div className='coin-tag text-xs font-medium font-jm'>
                          BTC
                        </div>
                      </div>
                      <div className='coin-info__content__price'>
                        <span className='price text-xs font-medium font-jm'>
                          $28.526K
                        </span>
                        <span className='percent text-xs font-medium font-jm'>
                          +21.45%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='number-of-coin text-xs font-medium font-jm'>
                    #1
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='modal-search-item dex-pairs'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Dex pairs
        </div>
        <div className='modal-search-item__list'>
          {[1, 2, 3, 4, 5].map((item) => {
            return (
              <div
                className='modal-search-item__list__item hover:rounded'
                key={item}
              >
                <div className='coin p-2 flex'>
                  <div className='coin-info flex items-center gap-2'>
                    <div className='coin-info__image'>
                      <Image src='/btc.png' width={32} height={32} alt='btc' />
                    </div>
                    <div className='coin-info__image'>
                      <Image src='/btc.png' width={32} height={32} alt='btc' />
                    </div>
                    <div className='coin-info__name font-medium text-sm font-jm'>
                      C98/WBNB Liquidity: 187k
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
