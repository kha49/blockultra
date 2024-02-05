'use client';
import { Page } from '@/components/page';
import { getBreadcrumbDetailConfig } from '../../config';
import './index.scss';
import Main from './main';

type PageProps = {
  params: {
    locale: 'vi' | 'en';
    id: string;
    category: string;
  };
  searchParams: any;
};

export default async function FundraisingDetail({
  params,
  searchParams,
}: PageProps) {
  const { category } = params;

  return (
    <Page
      breadcrumbs={getBreadcrumbDetailConfig(category, searchParams?.name)}
      contentClassnames='pt-4 pb-3'
    >
      <Main params={params} />
    </Page>
  );
}
