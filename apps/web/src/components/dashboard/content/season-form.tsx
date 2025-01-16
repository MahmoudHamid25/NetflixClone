'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contentSchemas } from '@/lib/schemas'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { z } from 'zod';
import { ImageUpload } from '@/components/dashboard/content/image-upload';
import { useState } from 'react';
import { toast } from 'sonner';
import { uploadSeason } from '@/lib/actions/content/seasons.actions';

export default function SeasonForm() {
  const form = useForm<z.infer<typeof contentSchemas.season>>({
    resolver: zodResolver(contentSchemas.season),
    defaultValues: {
      type: 'season' as const,
      title: '',
      description: '',
    },
  })

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof contentSchemas.season>) {
    console.log(values)
    setIsLoading(true)
    try {
      const res = await uploadSeason(values);
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
                <Input placeholder="Season title" {...field} />
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
                <Textarea placeholder="Season description" {...field} />
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
          name="image"
          render={({field: {onChange, value, ...field}}) => {
            // Get current image value (always watched updated)
            const image = form.watch("image");
            // console.log(image)

            return (
              <FormItem>
                <FormLabel>Image Preview</FormLabel>
                <FormControl>
                  <ImageUpload value={value} onChange={onChange} isLoading={isLoading}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="season"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Season</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Season number" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="series_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Series ID</FormLabel>
              <FormControl>
                <Input placeholder="Series ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">Submit</Button>
      </form>
    </Form>
  )
}

