"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader } from "lucide-react"

// ✅ Validation schema with zod
const formSchema = z
  .object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(6, "Password is required")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
        "Password must contain at least 1 uppercase, 1 lowercase, and 1 number"
      ),
    rePassword: z.string().min(6, "Please confirm your password"),
    phone: z
      .string()
      .min(11, "Phone must be at least 11 digits")
      .regex(/^[0-9]+$/, "Phone must contain only numbers"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  })

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // 1️⃣ Call your Next.js register API
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("❌ Registration failed:", data)
        setIsLoading(false)
        return
      }

      console.log("✅ Registration success:", data)

      // 2️⃣ Auto-login user immediately
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      })

      if (!signInResponse?.error) {
        router.push("/") // redirect to home page
      } else {
        router.push("/Login") // fallback to login manually
      }
    } catch (error) {
      console.error("❌ Error during register:", error)
    }

    setIsLoading(false)
  }

  return (
    <Card className="p-6 w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ahmed Abd Al-Muti" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="ahmedmuttiish@gmail.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Ahmed@123" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Re-enter Password */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Ahmed@123" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="01010700701" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
            Register {isLoading && <Loader className="animate-spin ml-2" />}
          </Button>
        </form>
      </Form>
    </Card>
  )
}
