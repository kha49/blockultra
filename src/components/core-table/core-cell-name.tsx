import Link from 'next/link';
import { Avatar, Typography } from 'antd';
import clsx from 'clsx';
import { changeImageUrl } from '@/helpers/functions';

interface ICoreCellNameProps {
  imagesUrl?: string[];
  name?: string;
  symbol?: string;
  link?: string;
  rightNode?: React.ReactNode;
}

export const CoreCellName = (props: ICoreCellNameProps) => {
  const { imagesUrl, name = 'image', symbol, link, rightNode } = props;
  const Name = link ? Link : Typography;
  const nameClass = link ? 'hover:text-primary-500' : '';
  return (
    <div className='flex items-center gap-2 font-jm'>
      {imagesUrl?.length && (
        <Avatar.Group maxCount={3}>
          {imagesUrl.map((url, index) => (
            <Avatar key={index} size={32} src={changeImageUrl(url)} />
          ))}
        </Avatar.Group>
      )}
      <div className='flex items-start gap-1 justify-start flex-col md:flex-row'>
        <Name
          href={link!}
          className={clsx(
            'text-grey-700 font-medium text-sm truncate max-w-[55px] md:max-w-[160px] lg:max-w-[200px]',
            nameClass
          )}
        >
          {name}
        </Name>
        {symbol && (
          <span className='rounded py-0 bg-grey-200 text-[#9FA4B7] leading-5 px-2 text-xs font-medium'>
            {symbol}
          </span>
        )}
        {rightNode}
      </div>
    </div>
  );
};
