'use client';
import FunDTable from './components/fundraising-table';
import { FundraisingType, getBreadcrumbConfig } from './config';
import './index.scss';
import { Page } from '@/components/page';

type PageProps = {
  params: {
    category: FundraisingType;
    locale: 'vi' | 'en';
  };
};

export default function Fundraising({ params }: PageProps) {
  return (
    <Page
      breadcrumbs={getBreadcrumbConfig(params.category)}
      classnames='fundraising'
    >
      <FunDTable />
    </Page>
  );
}
