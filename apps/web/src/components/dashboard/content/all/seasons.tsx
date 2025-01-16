import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Content, ContentResponse } from '@/lib/actions/content/types';
import Link from 'next/link';
import CopyButton from '@/components/ui/copy-button';

export function AllSeasons({ seasons, seriesId }: { seasons: ContentResponse, seriesId:string }) {
  if (seasons.error) return <div>Error...</div>;

  if (!seasons.data) return null;
  return (
    <div className="flex w-full gap-8 mt-8 flex-wrap">
      {seasons.data.map((seasons, i) => {
        return <SeasonsCard key={i} id={seasons.id} title={seasons.title} description={seasons.description}
                            previewImage={seasons.preview_image!} seriesId={seriesId} />;
      })}
    </div>
  );
}

interface SeasonsCardProps {
  id: string;
  seriesId:string;
  title: string;
  description: string;
  previewImage: string | null;
}

export function SeasonsCard({ id, title, description, previewImage, seriesId }: SeasonsCardProps) {
  return (
    <Link href={`/dashboard/contents/all/series/${seriesId}/seasons/${id}/episodes/`}>
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

export function SeasonsSkeleton() {
  return (
    <div className="flex flex-col w-full gap-8 mt-8">
      {Array.from({ length: 6 }).map((_, i) => {
        return <SeasonsCardSkeleton key={i} />;
      })}
    </div>
  );
}

export function SeasonsCardSkeleton() {
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

