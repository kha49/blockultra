'use client';

import { IconDiamond } from '@/assets/icons';
import Text from '@/components/Text';
import { cn } from '@/helpers/functions';
import { Tooltip } from 'antd';

const UserPoint = () => {
  return (
    <Tooltip
      placement='bottom'
      title={<Text size={12}>My Points</Text>}
      overlayClassName={cn(
        '[&_.ant-tooltip-inner]:!bg-white',
        '[&_.ant-tooltip-arrow]:before:!bg-white'
      )}
    >
      <div>
        <IconDiamond />
      </div>
    </Tooltip>
  );
};

export default UserPoint;
