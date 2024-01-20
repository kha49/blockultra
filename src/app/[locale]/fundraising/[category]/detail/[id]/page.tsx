import { Page } from '@/components/page';
import { FundraisingCategory, FundraisingCategoryLabel } from '../../config';
import Link from 'next/link';
import FundraisingDetailOverview from './components/fundraising-detail-overview';
import FundraisingDetailTable from './components/fundraising-detail-table';
import './index.scss';
type PageProps = {
  params: {
    locale: 'vi' | 'en';
    id: string;
    category: string;
  };
  searchParams: any;
};

export default function FundraisingDetail({ params, searchParams }: PageProps) {
  console.log('params.x');
  const { category, locale, id } = params;

  const breadcrumbs = [
    {
      title: 'BlockUltra',
    },
    {
      title: 'Fundraising',
    },
    {
      title: (
        <Link href={`/${locale}/fundraising/${category}`}>
          {
            FundraisingCategoryLabel[
              category ?? FundraisingCategory.FundingRounds
            ]
          }
        </Link>
      ),
    },
    {
      title: searchParams?.name,
    },
  ];

  return (
    <Page breadcrumbs={breadcrumbs}>
      <div className='container-shadow'>
        <FundraisingDetailOverview />
      </div>
      <div className='container-shadow'>
        <FundraisingDetailTable />
      </div>
    </Page>
  );
}
