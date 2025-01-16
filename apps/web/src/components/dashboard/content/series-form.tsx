'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contentSchemas } from '@/lib/schemas'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { ImageUpload } from '@/components/dashboard/content/image-upload';
import { uploadSeries } from '@/lib/actions/content/series.actions';

export default function SeriesForm() {
  const form = useForm<z.infer<typeof contentSchemas.series>>({
    resolver: zodResolver(contentSchemas.series),
    defaultValues: {
      type: 'series' as const,
      title: '',
      description: '',
      seasons: [],
    },
  })

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof contentSchemas.series>) {
    console.log(values)
    setIsLoading(true)
    try {
      const res = await uploadSeries(values);
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
                <Input placeholder="Series title" {...field} />
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
                <Textarea placeholder="Series description" {...field} />
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
          name="seasons"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seasons</FormLabel>
              <FormControl>
                <Input placeholder="Comma-separated season IDs" {...field} onChange={(e) => field.onChange(e.target.value.split(','))} />
              </FormControl>
              <FormDescription>Enter season IDs separated by commas</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">Submit</Button>
      </form>
    </Form>
  )
}

