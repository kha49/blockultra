import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type Props = PropsWithChildren<{
  breadcrumbs: ItemType[];
  classnames?: string;
  contentClassnames?: string;
}>;

export default function BasePage(props: Props) {
  const {
    breadcrumbs,
    children,
    classnames,
    contentClassnames = 'px-3 py-8',
  } = props;
  return (
    <div className={clsx('mx-auto container px-4 py-3', classnames)}>
      <div className='px-4 md:px-0'>
        <Breadcrumb items={breadcrumbs} />
      </div>
      <div className={contentClassnames}>{children}</div>
    </div>
  );
}
