import { ContentLayout } from '@/components/dashboard/layout/content-layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { AllContent, ContentSkeleton } from '@/components/dashboard/content/all-content';
import { fetchAllFilms } from '@/lib/actions';
import { Suspense } from 'react';

export default async function ContentsPage() {
  const movies = await fetchAllFilms();
  return (
    <ContentLayout title={'Contents'}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/apps/web/public">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Contents</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Suspense fallback={<ContentSkeleton/>}>
        <AllContent movies={movies}/>
      </Suspense>
    </ContentLayout>
  );
}