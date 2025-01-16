import { ApiResponse } from '@/lib/actions/shared/types';

export type Content = {
  id: string;
  title: string;
  type: 'film' | 'series' | 'seasons' | 'episodes';
  description: string;
  preview_image: string | null;
  release_date: string | null;
  subs: string[] | null
  dubs: string[] | null;
  available_qualities: string[] | null;
  credits: string[] | null;
  parent_content_id: string | null;
  season: number | null;
  episode_number: number | null;
  videoUrl: string | null;
};

export type ContentResponse = ApiResponse<Array<Content>>;
