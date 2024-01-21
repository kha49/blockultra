import { Page } from '@/components/page';
import { FundraisingCategory, FundraisingCategoryLabel } from '../../config';
import Link from 'next/link';
import FundraisingDetailOverview from './components/fundraising-detail-overview';
import FundraisingDetailTable from './components/fundraising-detail-table';
import './index.scss';
import CommonPage from '@/components/page/common-page';
import { FetchDetailBanker } from '@/usecases/fundraising';
import { IBankerData } from '../../types';
type PageProps = {
  params: {
    locale: 'vi' | 'en';
    id: string;
    category: string;
  };
  searchParams: any;
};

async function fetchDetail(backer_id: string) {
  try {
    const res: any = await FetchDetailBanker({
      backer_id,
    });
    return res as IBankerData;
  } catch (error) {
    return null;
  }
}

export default async function FundraisingDetail({
  params,
  searchParams,
}: PageProps) {
  const { category, locale, id } = params;
  const response = await fetchDetail(id);

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

  const _renderInfo = () => {
    if (!response) return null;
    return <FundraisingDetailOverview data={response} />;
  };

  return (
    <CommonPage breadcrumbs={breadcrumbs}>
      <div className='container-shadow mt-3'>{_renderInfo()}</div>
      <div className='container-shadow'>
        <FundraisingDetailTable />
      </div>
    </CommonPage>
  );
}
