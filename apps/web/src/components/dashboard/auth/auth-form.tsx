"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {toast} from "sonner";
import {login} from "@/lib/actions";
import { PasswordInput } from '@/components/dashboard/auth/password-input';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  email: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(8, {message: "Password must be at least 8 characters."})
})

export function AuthForm() {

  // const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter();
// eslint-disable no-unused-vars
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(data)
      const res = await login({
        email: data.email,
        password: data.password
      });

      toast.success("Logged in", {
        description: (
            <div>
              <span>{res.data?.accessToken}</span>
              <span> {res.data?.refreshToken}</span>
            </div>
        ),
      });
      router.push("/dashboard");
    } catch (e) {
      toast.error(`${e}`);
    }
  }


  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-center gap-8 min-w-80">
          <div className="w-full">
            <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" autoComplete="email" {...field} />
                      </FormControl>
                      <FormDescription>
                        {/*This is your public display name.*/}
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="Password" {...field} />
                      </FormControl>
                      <FormDescription>
                        {/*This is your public display name.*/}
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                )}
            />
          </div>
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
  )
}
