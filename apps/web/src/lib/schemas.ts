import { z } from 'zod';

export const baseContentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(5, 'Description should be at least 5 characters'),
  release_date: z.string().date().optional(),
});

export const contentSchemas = {
  film: baseContentSchema.extend({
    type: z.literal('film'),
    video: z.instanceof(File).optional(),
  }),
  series: baseContentSchema.extend({
    type: z.literal('series'),
    seasons: z.array(z.string()).optional(),
    image: z.any()
      .refine(
        (file) => file instanceof File || file === null,
        'Please upload a valid image file.',
      )
      .optional(),
  }),
  episode: baseContentSchema.extend({
    type: z.literal('episode'),
    season_id: z.string().optional(),
    episode_number: z.number().optional(),
    video: z.instanceof(File).optional(),
    image: z.any()
      .refine(
        (file) => file instanceof File || file === null,
        'Please upload a valid image file.',
      )
      .optional(),
  }),
  season: baseContentSchema.extend({
    type: z.literal('season'),
    series_id: z.string().uuid(),
    season: z.number(),
    image: z.any()
      .refine(
        (file) => file instanceof File || file === null,
        'Please upload a valid image file.',
      )
      .optional(),
  }),
};

export type FilmBody = z.infer<typeof contentSchemas.film>;
export type SeriesBody = z.infer<typeof contentSchemas.series>;
export type SeasonBody = z.infer<typeof contentSchemas.season>;
export type EpisodeBody = z.infer<typeof contentSchemas.episode>;