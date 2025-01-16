'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contentSchemas } from '@/lib/schemas'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { uploadSeries } from '@/lib/actions/content/series.actions';
import { uploadEpisode } from '@/lib/actions/content/episodes.actions';

export default function EpisodeForm() {
  const form = useForm<z.infer<typeof contentSchemas.episode>>({
    resolver: zodResolver(contentSchemas.episode),
    defaultValues: {
      type: 'episode' as const,
      title: '',
      description: '',
    },
  })

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof contentSchemas.episode>) {
    console.log(values)
    setIsLoading(true)
    try {
      const res = await uploadEpisode(values);
      if (!res.success) {
        throw new Error("Error during uploading series")
      }
      toast.success("Series were uploaded")

    } catch (e: unknown) {
      console.log(e);
      if (e instanceof Error) {
        toast.error(`Error: ${e.message}`);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Episode title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Episode description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="season_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Season ID</FormLabel>
              <FormControl>
                <Input placeholder="Parent content ID" {...field} />
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
                <Input type="number" placeholder="Episode number" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="video"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video File</FormLabel>
              <FormControl>
                <Input type="file" accept="video/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>Submit</Button>
      </form>
    </Form>
  )
}

