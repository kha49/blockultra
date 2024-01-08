import Image from 'next/image';
import React, { memo } from 'react';
import './index.scss';
import { IGlobalSearch, IRecent } from '../SearchInput/props';
import { nFormatter, percentFormat } from '@/helpers';
import { IconRecent } from '@/assets/icons/home/IconRecent';

const SearchResult = ({
  data,
  recents,
  onClearRecent,
}: {
  data: IGlobalSearch;
  recents: IRecent[];
  onClearRecent: () => void;
}) => {
  const _renderTrending = () => {
    const { trendings } = data;
    if (!trendings || !trendings.length) return;

    const elements: JSX.Element[] = [];
    trendings.forEach((e, index) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded cursor-pointer'
          key={`tre-${index}`}
        >
          <div className='coin p-2 flex justify-between items-center'>
            <div className='coin-info flex items-center gap-4'>
              <div className='coin-info__image'>
                <img src={e.image.x60} width={32} height={32} alt={e.name} />
              </div>
              <div className='coin-info__content'>
                <div className='coin-info__content__name flex gap-2'>
                  <div className='coin-name font-medium text-sm font-jm'>
                    {e.name}
                  </div>
                  <div className='coin-tag text-xs font-medium font-jm'>
                    {e.key}
                  </div>
                </div>
                {/* <div className='coin-info__content__price'>
                  <span className='price text-xs font-medium font-jm'>
                    {nFormatter(e.price['USD'])}
                  </span>
                  <span className='percent text-xs font-medium font-jm'>
                    +21.45%
                  </span>
                </div> */}
              </div>
            </div>
            <div className='number-of-coin text-xs font-medium font-jm'>#1</div>
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item trending-today mb-4'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Trending Today
          <Image src='/rocket.png' width={20} height={20} alt='rocket' />
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderCrypto = () => {
    const { coins } = data;
    if (!coins || !coins.length) return;
    const elements: JSX.Element[] = [];

    coins.forEach((e, index) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded cursor-pointer'
          key={`tre-${index}`}
        >
          <div className='coin p-2 flex justify-between items-center'>
            <div className='coin-info flex items-center gap-4'>
              <div className='coin-info__image'>
                <img src={e.image.x60} width={32} height={32} alt={e.name} />
              </div>
              <div className='coin-info__content'>
                <div className='coin-info__content__name flex gap-2'>
                  <div className='coin-name font-medium text-sm font-jm'>
                    {e.name}
                  </div>
                  <div className='coin-tag text-xs font-medium font-jm'>
                    {e.key}
                  </div>
                </div>
                <div className='coin-info__content__price'>
                  <span className='price text-xs font-medium font-jm'>
                    {nFormatter(e.price.USD, 2, '$')}
                  </span>
                  {e.priceChangeIn24h ? percentFormat(e.priceChangeIn24h) : ''}
                </div>
              </div>
            </div>
            {e.rank ? (
              <div className='number-of-coin text-xs font-medium font-jm'>
                #{e.rank}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item cryptoassets'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Cryptoassets
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderRecent = () => {
    const { coins, trendings } = data;
    if (
      (!coins && !trendings) ||
      (!coins.length && !trendings.length) ||
      !recents ||
      !recents.length
    )
      return;
    const elements: JSX.Element[] = [];

    recents.forEach((r, i) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded'
          key={`m-${i}`}
        >
          <div className='coin p-1 flex'>
            <div className='coin-info flex flex-col items-center'>
              <div className='coin-info__image mb-2'>
                <img src={r.icon} width={32} height={32} alt='btc' />
              </div>
              <div className='coin-info__name textover-ellipsis w-20 text-center'>
                {r.name}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item recents'>
        <div className='flex justify-between'>
          <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
            Recent
            <IconRecent />
          </div>
          <div
            className='text-primary-400 text-md cursor-pointer'
            onClick={onClearRecent}
          >
            Clear
          </div>
        </div>
        <div className='modal-search-item__list flex flex-wrap'>{elements}</div>
      </div>
    );
  };

  const _returnNotFound = () => {
    const { coins, trendings } = data;
    if ((!coins && !trendings) || (!coins.length && !trendings.length))
      return <>No results found </>;
    return null;
  };

  return (
    <div className='modal-search p-4 w-full min-w-[580px] rounded-lg z-10'>
      {_renderTrending()}
      {_renderCrypto()}
      {_renderRecent()}
      {_returnNotFound()}
    </div>
  );
};

export default memo(SearchResult);
