"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { setUser } from "@/lib/store/features/userSlice";
import { useAppDispatch } from "@/lib/store/hooks";

const Explore: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("accessToken");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          "https://elwi9xjnlh.execute-api.ap-south-1.amazonaws.com/api/v1/users/current-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (response.ok && result.success) {
          // Extract user data from the result
          const userData = result.data;
          dispatch(
            setUser({
              id: userData._id,
              username: userData.username,
              email: userData.email,
              fullName: userData.fullName,
              avatar: userData.avatar,
              coverImage: userData.coverImage,
              watchHistory: userData.watchHistory,
              createdAt: userData.createdAt,
              updatedAt: userData.updatedAt,
            })
          );
        } else {
          setError("Failed to fetch user data. Please log in again.");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("An error occurred. Please try again later.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Sidebar>
      <Dashboard />
    </Sidebar>
  );
};

export default Explore;
