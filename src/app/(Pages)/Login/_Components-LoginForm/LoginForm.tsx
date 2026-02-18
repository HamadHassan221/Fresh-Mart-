"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from "next-auth/react";

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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Heading1, Loader } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
    Email: z.string().email("invalid email"),
    Password: z
        .string()
        .min(6, "password is required")
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
            "invalid password"
        ),
});

export function LoginForm() {

    let searchparams = useSearchParams();
    const [isloading, setisloading] = useState(false);
    
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Email: "",
            Password: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setisloading(true);
        const response = await signIn("credentials", {
            redirect: false,
            email: values.Email,
            password: values.Password,
        });

        if (!response?.error) {
            router.push("/"); // navigate only on success
        }
        setisloading(false);

        console.log(response);
    }

    return (
        <Card className="p-6 w-sm">
            <Form {...form}>
                {searchparams.get('error') ? <h1 className=" text-3xl text-center py-3 text-red-600">{searchparams.get('error')}</h1> : ''}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="Email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ali@anything.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Password"
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
                    <Button type="submit" className="cursor-pointer w-full" disabled={isloading}>Submit {isloading && <Loader className="animate-spin"></Loader>}</Button>
                </form>
            </Form>
        </Card>

    )
}