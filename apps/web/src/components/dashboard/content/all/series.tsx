import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Content, ContentResponse } from '@/lib/actions/content/types';
import Link from 'next/link';
import CopyButton from '@/components/ui/copy-button';

export function AllSeries({ series }: { series: ContentResponse }) {
  if (series.error) return <div>Error...</div>;

  if (!series.data) return null;
  return (
    <div className="flex w-full gap-8 mt-8 flex-wrap">
      {series.data.map((series, i) => {
        return <SeriesCard key={i} id={series.id} title={series.title} description={series.description}
                           previewImage={series.preview_image} />;
      })}
    </div>
  );
}

interface SeriesCardProps {
  id: string;
  title: string;
  description: string;
  previewImage: string | null;
}

export function SeriesCard({ id, title, description, previewImage }: SeriesCardProps) {
  return (
    <Link href={`/dashboard/contents/all/series/${id}/seasons/`}>
      <Card className="w-96 overflow-hidden transition-all duration-300 hover:shadow-xl bg-background-80 dark:text-white">
        <div className="relative aspect-video w-full">
          <Image
            src={previewImage || '/logo-sm.webp'}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-all duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-3">{title}</h2>
          <p className="dark:text-gray-300 text-gray-800">{description}</p>
          <CopyButton className="dark:text-gray-500 text-gray-600 text-sm" textToCopy={id} buttonLabel={id}></CopyButton>

        </CardContent>
      </Card>
    </Link>
  );
}

export function SeriesSkeleton() {
  return (
    <div className="flex flex-col w-full gap-8 mt-8">
      {Array.from({ length: 6 }).map((_, i) => {
        return <SeriesCardSkeleton key={i} />;
      })}
    </div>
  );
}

export function SeriesCardSkeleton() {
  return (
    <Card className="w-full max-w-3xl overflow-hidden bg-background-80">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="p-6">
        <Skeleton className="h-8 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  );
}

