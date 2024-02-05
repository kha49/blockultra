import { Page } from '@/components/page';

import './styles.scss';
import dynamic from 'next/dynamic';
type PageProps = {
  params: {
    id: string;
  };
};

const CategoryDetail = dynamic(() => import('./CategoryDetail'), {
  ssr: false,
});

const breadcrumbs = [
  {
    title: 'Home',
  },
  {
    title: 'Categories',
  },
  {
    title: 'Currency',
  },
];

export default function CategoryPage(props: PageProps) {
  return (
    <Page
      classnames='category-page'
      contentClassnames='py-8'
      breadcrumbWrapperClassnames='px-8 xl:px-4'
      breadcrumbs={breadcrumbs}
    >
      <CategoryDetail {...props} />
    </Page>
  );
}
