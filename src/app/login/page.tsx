"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const formSchema = z.object({
  identifier: z.string().min(1, {
    message: "Please enter a username or email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        "https://your-api-endpoint.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      console.log(data);
      // Handle success
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black flex items-center justify-center">
      <div className="max-w-4xl w-full p-8 bg-gray-800 text-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Login to vidSync
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEmail ? "Email" : "Username"}</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      type={isEmail ? "email" : "text"}
                      placeholder={`Enter your ${
                        isEmail ? "email" : "username"
                      }`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter your {isEmail ? "email" : "username"}.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="text-black"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2 flex items-center justify-between">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsEmail(!isEmail)}
                className="text-gray-400"
              >
                {isEmail ? "Use Username" : "Use Email"}
              </Button>
              <a href="/forgot-password" className="text-gray-400">
                Forgot Password?
              </a>
            </div>
            <div className="md:col-span-2">
              <Button
                type="submit"
                variant="secondary"
                className="w-full py-3 text-lg font-semibold"
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
