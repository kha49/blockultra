import { Avatar, Flex, Tag } from 'antd';
import React from 'react';
import { changeImageUrl } from '@/helpers/functions';

type DataGroupProps<T = any> = {
  onClick?: () => void;
  data?: T[];
};

export default function DataGroup(props: DataGroupProps) {
  const { onClick, data } = props;

  if (!data?.length) {
    return null;
  }

  const [first, ...rest] = data;

  return (
    <Flex align='center' gap={8}>
      <Avatar size={32} src={changeImageUrl(first.image)} />
      <span className='text-grey-700 font-bold font-jb text-base'>{first.name}</span>
      {rest.length > 0 && (
        <Tag
          className={'bg-grey-200 !text-grey-500 cursor-pointer text-xs !font-jm font-medium'}
          bordered={false}
          onClick={onClick}
        >
          + {rest.length}
        </Tag>
      )}
    </Flex>
  );
}
