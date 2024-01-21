'use client';
import { Page } from '@/components/page';
import React, { useEffect, useState } from 'react';

import './styles.scss';
import CategoryOverview from './components/category-overview';
import CategoryTable from './components/category-table';
import { getBreadcrumbConfig } from './components/category-table/config';
import { FetchCategoryDetail } from '@/usecases/category';
type PageProps = {
  params: {
    id: string;
  };
};

export default function CategoryPage(props: PageProps) {
  const breadcrumbs = getBreadcrumbConfig();

  const [category, setCategory] = useState<any>({});

  const getCategoryDetail = async (id: any) => {
    const response = await FetchCategoryDetail({ id });
    setCategory(response);
  };

  useEffect(() => {
    getCategoryDetail(props.params.id);
  }, [props.params]);

  return (
    <Page
      classnames='category-page'
      contentClassnames='py-8'
      breadcrumbs={breadcrumbs}
    >
      <CategoryOverview category={category} />
      <CategoryTable />
    </Page>
  );
}
