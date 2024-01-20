import { FetchUnlockDetail } from '@/usecases/token-unlock';
import CoinInformation from '../information';
import './index.scss';
import { FetchCoinDetail2 } from '@/usecases/coin-info';
import { IDetail } from '@/models/IDetail';
import { isEmpty } from 'lodash';
import { redirect } from 'next/navigation';
import { Page } from '@/components/page';
import dynamic from 'next/dynamic';

const CoinTabInfo = dynamic(() => import('../coinTabInfo/Index'), { ssr: false })

async function fetchTokenDetail(coin_key: string): Promise<IDetail | null> {
  try {
    const res: any = await FetchCoinDetail2({
      coin_key,
    });
    if (!res.name) return null;
    return res as any;
  } catch (error) {
    return null;
  }
}
export default async function Detail(props: any) {
  const { params } = props;
  const data = await fetchTokenDetail(params.slug);
  if (!data) {
    redirect('/');
  }

  const breadcrumbs = [
    {
      title: 'Home',
    },
    {
      title: 'Coins',
    },
  ];

  return (
    <Page breadcrumbs={breadcrumbs}>
      <div className='flex flex-col gap-4'>
        <CoinInformation data={data} />
        <CoinTabInfo data={data} slug={params.slug} />
      </div>
    </Page>
  );
}
