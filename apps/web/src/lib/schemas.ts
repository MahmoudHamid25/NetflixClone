import { z } from 'zod'

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
    availableQualities: z.array(z.string()).optional(),
    seasons: z.array(z.string()).optional(),
  }),
  episode: baseContentSchema.extend({
    type: z.literal('episode'),
    parent_content_id: z.string().optional(),
    season: z.number().optional(),
    episode_number: z.number().optional(),
    video: z.instanceof(File).optional(),
  }),
  season: baseContentSchema.extend({
    type: z.literal('season'),
    seriesId: z.string().optional()
  }),
};

export type FilmBody = z.infer<typeof contentSchemas.film>;