// pages/index.tsx
import React, { useEffect, useState } from "react";
import VideoCard from "@/components/VideoCard";
import { useAppSelector } from "@/lib/store/hooks";
import Cookies from "js-cookie";

interface Video {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const [videoData, setVideoData] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Select user data from Redux store
  const user = useAppSelector((state) => state.user);
  const token = Cookies.get("accessToken");

  useEffect(() => {
    const fetchVideoData = async () => {
      if (!user.id || !token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://elwi9xjnlh.execute-api.ap-south-1.amazonaws.com/api/v1/videos/?sortType=desc&sortBy=createdAt&userId=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setVideoData(data.data.result); // Access the result array from the response
        } else {
          setError("Failed to fetch video data");
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
        setError("An error occurred while fetching video data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [user.id, token]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h1 className="text-4xl text-white font-bold mb-6">Trending Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videoData.map((video) => (
          <VideoCard
            key={video._id}
            title={video.title}
            thumbnail={video.thumbnail}
            views={video.views}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
