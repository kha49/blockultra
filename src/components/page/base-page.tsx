import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type Props = PropsWithChildren<{
  breadcrumbs: ItemType[];
  classnames?: string;
}>;

export default function BasePage(props: Props) {
  const { breadcrumbs, children, classnames } = props;
  return (
    <div className={clsx('mx-auto max-w-2xl px-4 py-3', classnames)}>
      <Breadcrumb items={breadcrumbs} />
      <div className={'px-3 py-8'}>{children}</div>
    </div>
  );
}
