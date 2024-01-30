'use client';

import { useState } from 'react';
import { usePathname, useRouter } from '../../helpers/navigation';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useLocale } from 'next-intl';
import { IconCaretDown } from '@/assets/icons';

const SwitcherLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [lang] = useState(locale);

  const items: MenuProps['items'] = [
    {
      key: 'en',
      label: 'English',
    },
    {
      key: 'vn',
      label: 'Viet Nam',
    },
  ];

  const langList = [
    {
      key: 'en',
      label: 'English',
    },
    {
      key: 'vn',
      label: 'Viet Nam',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    router.replace(pathname, { locale: key });
  };

  const getLabelLanguage = (key: string) => {
    return langList.find(item => item?.key === key)?.label
  }

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      placement='bottomLeft'
      arrow
    >
      <div
        className='flex gap-1 items-center cursor-pointer'
        onClick={(e) => e.preventDefault()}
      >
        {getLabelLanguage(lang)} <IconCaretDown />
      </div>
    </Dropdown>
  );
};

export default SwitcherLanguage;
