import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LampContainer } from "@/components/ui/lamp";

export default function Home() {
  return (
    <LampContainer className="rounded-none">
      <h1 className="text-6xl text-center font-bold text-white mb-6">
        Welcome to <br /> VidSync
      </h1>

      <div className="space-x-4">
        <Link href="/login">
          <Button variant="default" className="px-6 py-3">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="secondary" className="px-6 py-3">
            Sign Up
          </Button>
        </Link>
      </div>
    </LampContainer>
  );
}
