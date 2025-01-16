import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Suspense } from 'react';
import { AllSeasons, SeasonsSkeleton } from '@/components/dashboard/content/all/seasons';
import { fetchSeasonsBySeries } from '@/lib/actions/content/seasons.actions';

export default async function SeasonsPage({params}: {params: Promise<{ seriesId: string }> }) {
  const {seriesId} = await params;
  const seasons = await fetchSeasonsBySeries(seriesId);
  return (
    <>
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
            <BreadcrumbPage>Series</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Seasons</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Suspense fallback={<SeasonsSkeleton />}>
        <AllSeasons seasons={seasons} seriesId={seriesId} />
      </Suspense>
    </>
  );
}
