import dynamic from 'next/dynamic';
import { validateLocale } from '@/helpers/validate-locale';

const Banner = dynamic(() => import('../home/banner'), { ssr: true });

const RenderTabs = dynamic(() => import('../home/RenderTabs/RenderTabs'), {
  ssr: false,
});
const Introduce = dynamic(() => import('../home/introduce'), { ssr: true });

export default function Home(props: PageProps) {
  validateLocale(props);

  return (
    <div>
      <Banner />
      <RenderTabs />
      <Introduce />
    </div>
  );
}
