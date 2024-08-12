// components/ProtectedRoute.tsx
import { useAppSelector } from "@/lib/store/hooks";
import { RootState } from "@/lib/store/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  console.log(isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
