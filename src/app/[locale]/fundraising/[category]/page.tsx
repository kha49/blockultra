'use client';
import { FundraisingType, getBreadcrumbConfig } from './config';
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
  return (
    <Page
      breadcrumbs={getBreadcrumbConfig(params.category)}
      classnames='fundraising'
    >
      <FunDTable />
    </Page>
  );
}
