'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contentSchemas } from '@/lib/schemas'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { z } from 'zod';

export default function SeriesForm() {
  const form = useForm({
    resolver: zodResolver(contentSchemas.series),
    defaultValues: {
      type: 'series',
      title: '',
      description: '',
      availableQualities: [],
      seasons: [],
    },
  })

  function onSubmit(values: z.infer<typeof contentSchemas.series>) {
    console.log(values)
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
          name="availableQualities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Qualities</FormLabel>
              <FormControl>
                <Input placeholder="Comma-separated qualities" {...field} onChange={(e) => field.onChange(e.target.value.split(','))} />
              </FormControl>
              <FormDescription>Enter qualities separated by commas (e.g., HD,4K,1080p)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

