"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { login } from "@/services/auth/authServices";
import { useAppDispatch } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader"; // Import Loader component
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

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
  const [isLoading, setIsLoading] = useState(false); // State for loader

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true); // Show loader
      const payload = {
        [isEmail ? "email" : "username"]: values.identifier,
        password: values.password,
      };

      const res = await login(dispatch, payload);
      console.log(res);
      if (res) {
        toast.success("Login successful!");

        // Add a small delay before navigation
        setTimeout(() => {
          router.push("/explore");
        }, 1500); // Adjust delay as needed (1500ms = 1.5 seconds)
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Hide loader
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black flex items-center justify-center">
      {isLoading && <Loader />} {/* Show loader when logging in */}
      <div className="max-w-4xl w-full p-8 bg-gray-800 text-white rounded-lg shadow-lg relative">
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
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
            <div className="md:col-span-2 text-center mt-4">
              <p className="text-gray-400">
                New user?{" "}
                <a href="/signup" className="text-blue-400 hover:underline">
                  Sign up here
                </a>
              </p>
            </div>
          </form>
        </Form>
        <ToastContainer theme="dark" /> {/* Toastify container */}
      </div>
    </div>
  );
}
