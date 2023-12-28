import { IconDown } from '@/assets/icons/home/IconDown';
import { IconUp } from '@/assets/icons/home/IconUp';

export const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export const renderSortIcon = (props: any) => {
  if (!props.sortOrder) return null;
  console.log(props.sortOrder);
  return props.sortOrder === 'ascend' ? <IconUp /> : <IconDown />;
};
