'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EpisodeForm from '@/components/dashboard/content/episode-form';
import FilmForm from '@/components/dashboard/content/film-form';
import SeasonForm from '@/components/dashboard/content/season-form';
import SeriesForm from '@/components/dashboard/content/series-form';

export function ContentForm() {
  const [activeTab, setActiveTab] = useState('episodes');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="episodes">Episodes</TabsTrigger>
        <TabsTrigger value="films">Films</TabsTrigger>
        <TabsTrigger value="seasons">Seasons</TabsTrigger>
        <TabsTrigger value="series">Series</TabsTrigger>
      </TabsList>
      <TabsContent value="episodes">
        <EpisodeForm />
      </TabsContent>
      <TabsContent value="films">
        <FilmForm />
      </TabsContent>
      <TabsContent value="seasons">
        <SeasonForm />
      </TabsContent>
      <TabsContent value="series">
        <SeriesForm />
      </TabsContent>
    </Tabs>
  );
}
