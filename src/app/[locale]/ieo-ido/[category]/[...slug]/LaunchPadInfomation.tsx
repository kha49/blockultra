'use client';

import React from 'react';
import { getIeoIdoBreadcrumbs } from '../config';
import { Page } from '@/components/page';
import CoinInfoRenderTabs from './coinInfoTabs';
import CoinInformation from './coinInfo';
import { LaunchPadInfomationType } from '../types';
import { Flex } from 'antd';
import TierSystem from '../components/tier-system';
import CategoryOverview from '../components/category-overview';
import { IeoIdoTable } from '../components/ieo-ido-table';

type PropsType = {
  category: string;
  data: LaunchPadInfomationType;
};

const LaunchPadInfomation = (props: PropsType) => {
  const breadcrumbs = [
    ...getIeoIdoBreadcrumbs(props.category),
    { title: props.data.name },
  ];

  return (
    <Page breadcrumbs={breadcrumbs}>
      <Flex vertical gap={8}>
        <CoinInformation info={props.data} />

        <CategoryOverview info={props.data} />

        <TierSystem />

        <IeoIdoTable />
      </Flex>
    </Page>
  );
};

export default LaunchPadInfomation;
