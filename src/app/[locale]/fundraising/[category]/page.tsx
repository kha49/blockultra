'use client';
import {
  FundraisingType,
  getBreadcrumbConfig,
  validFundraisingType,
} from './config';
import './index.scss';
import { Page } from '@/components/page';
import { FunDTable } from './components/fundraising-table';

type PageProps = {
  params: {
    category: FundraisingType;
    locale: 'vi' | 'en';
  };
};

export default function Fundraising({ params }: PageProps) {
  const isValidCategory = validFundraisingType(params.category);
  return (
    <Page
      breadcrumbs={getBreadcrumbConfig(params.category)}
      classnames='fundraising'
    >
      <FunDTable />
    </Page>
  );
}
