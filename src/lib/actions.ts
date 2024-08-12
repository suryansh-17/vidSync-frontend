"use server";

import { signIn } from "@/auth/login";
import { z } from "zod";
const formSchema = z.object({
  identifier: z.string().min(1, {
    message: "Please enter a username or email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export async function authenticate(
  _currentState: unknown,
  formData: z.infer<typeof formSchema>,
  isEmail: boolean
) {
  const payload = {
    [isEmail ? "email" : "username"]: formData.identifier,
    password: formData.password,
  };
  try {
    await signIn("credentials", payload);
  } catch (error) {
    throw error;
  }
}
