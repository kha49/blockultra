import { Avatar, Flex, Tag } from 'antd';
import React from 'react';

type IData = {
  avatarUrl: string;
  name: string;
};

type DataGroupProps<T = IData> = {
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
      <Avatar size={32} src={first.avatarUrl} />
      <span>{first.name}</span>
      <Tag
        className={'bg-[#F1F4F7] cursor-pointer'}
        bordered={false}
        onClick={onClick}
      >
        +{rest.length}
      </Tag>
    </Flex>
  );
}
