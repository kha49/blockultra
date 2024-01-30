import { changeImageUrl } from '@/app/[locale]/detail/information/popup/backers/Backers';
import { Modal } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

const BackerList = ({ backers, initNumber, type }: any) => {
  const [showMore, setShowMore] = useState(false);
  const visibleItems = backers?.slice(0, initNumber);

  const handleCancel = () => {
    setShowMore(false);
  };

  return (
    <div>
      {backers && (
        <div>
          <div className='w-full p-6 flex flex-wrap items-center justify-around gap-4'>
            {visibleItems?.map((item: any, index: any) => (
              <BackerItem key={index} item={item} />
            ))}
            {backers?.length > initNumber && (
              <button onClick={() => setShowMore(true)}>
                {' '}
                <span className='text-primary-500'>
                  + {backers?.length - initNumber} {type}
                </span>
              </button>
            )}
          </div>
          <Modal
            title={type?.toUpperCase()}
            open={showMore}
            onCancel={handleCancel}
            footer={false}
          >
            <div className='flex flex-col flex-wrap items-start gap-5 w-full mt-6'>
              {...Array.from(Array(backers?.length).keys()).map((item) => {
                return (
                  <BackerItem key={item} item={backers[item]} />
                );
              })}
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export const BackerItem = ({ item  }:any) => {
  return (
    <div className='flex justify-center items-center gap-4'>
      {
        item?.logo ? (
          <div className='w-12 h-12'>
            <Image src={changeImageUrl(item?.logo)} height={50} width={50} alt={item.name} />
          </div>
        ) : ''
      }
      <div>
        <p className='text-grey-700 font-semibold text-sm mb-1'>{item.name}</p>
        {
          item?.tier ? (
            <div className='bg-grey-200 rounded-sm inline-block px-2 py-0.5'>
              <p className='text-grey-500 text-xs font-medium'>{item.tier ? `Tier ${item.tier}` : '-'}</p>
            </div>
          ) : ''
        }
      </div>
    </div>
  );
};

export default BackerList;
