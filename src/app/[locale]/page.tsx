import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../config';
import RenderTabs from '../home/RenderTabs/RenderTabs';
import Banner from '../home/banner';
import Introduce from '../home/introduce';
type Props = {
  params: { locale: string };
};

export default function Home({ params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <main className='py-8'>
      <Banner />
      <RenderTabs />
      <Introduce />
    </main>
  );
}
