import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { ContentResponse } from '@/lib/actions/content/types';

export function AllMovies({ movies } : {movies : ContentResponse}) {
  if (movies.error) return <div>Error...</div>

  if (!movies.data) return null
  return (
    <div className="flex flex-col w-full gap-8 mt-8">
      {movies.data.map((movie, i) => {
        return <MovieCard key={i} title={movie.title!} description={movie.description!} videoUrl={movie.videoUrl!} />;
      })}
    </div>
  );
}

interface MovieCardProps {
  title: string;
  description: string;
  videoUrl: string | null;
}

export function MovieCard({ title, description, videoUrl }: MovieCardProps) {
  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl bg-background-80 text-white">
      <div className="relative aspect-video w-full">
        {videoUrl ?
          <video
            src={videoUrl}
            // type="video/mp4"
            width="100%"
            height="auto"
            controls
          />
          :
          <Image
          src={"/logo-sm.webp"}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-all duration-300 hover:scale-105"
        />}
        {/*<div*/}
        {/*  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">*/}
        {/*  <Button variant="outline" size="icon" className="w-16 h-16 rounded-full">*/}
        {/*    <Play className="h-8 w-8" />*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </div>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="dark:text-gray-300 text-gray-800">{description}</p>
        {/*<p className="dark:text-gray-500 text-gray-600 text-sm">{id}</p>*/}
      </CardContent>
    </Card>
  );
}

export function MoviesSkeleton() {
  return (
    <div className="flex flex-col w-full gap-8 mt-8">
      {Array.from({ length: 6 }).map((_, i) => {
        return <MovieCardSkeleton key={i} />;
      })}
    </div>
  );
}

export function MovieCardSkeleton() {
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

