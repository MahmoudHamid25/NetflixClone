'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const baseContentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(5, 'Description should be at least 5 characters'),
  release_date: z.string().optional(),
  status: z.enum(['active', 'inactive'], 'Invalid status'),
});

const contentSchemas = {
  film: baseContentSchema.extend({ type: z.literal('film') }),
  series: baseContentSchema.extend({ type: z.literal('series') }),
  episode: baseContentSchema.extend({
    type: z.literal('episode'),
    parent_content_id: z.string().optional(),
    season: z.number().optional(),
    episode_number: z.number().optional(),
  }),
};

export function ContentForm() {
  const form = useForm({
    resolver: zodResolver(baseContentSchema),
    defaultValues: {
      type: 'film',
    },
  });

  const contentType = form.watch('type');
  const schema = contentSchemas[contentType];

  function onSubmit(data: z.infer<typeof baseContentSchema>) {
    console.log('Form Submitted:', data, contentType);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Content Type Selector */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="film">Film</SelectItem>
                  <SelectItem value="series">Series</SelectItem>
                  <SelectItem value="episode">Episode</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Release Date */}
        <FormField
          control={form.control}
          name="release_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Episode-specific Fields */}
        {contentType === 'episode' && (
          <>
            <FormField
              control={form.control}
              name="parent_content_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Content ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter series ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="season"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Season</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Season" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="episode_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Episode Number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Episode number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
