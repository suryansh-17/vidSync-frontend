"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IconEye } from "@tabler/icons-react";
import { useAppSelector } from "@/lib/store/hooks";
import { Sidebar } from "@/components/ui/sidebar";

interface VideoDetailsProps {
  videoFile: string;
  title: string;
  description: string;
  views: number;
  createdAt: string;
  thumbnail: string;
}

const VideoDetailPage: React.FC = () => {
  const { id } = useParams();
  const userId = useAppSelector((state) => state.user.id);
  const [videoData, setVideoData] = useState<VideoDetailsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const token = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (id) {
      fetch(
        `https://elwi9xjnlh.execute-api.ap-south-1.amazonaws.com/api/v1/videos/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch video data");
          }
          return response.json();
        })
        .then((data) => {
          setVideoData(data.data.videoUrl);

          // Increment view count after successfully fetching video data
          increaseViewCount();

          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [id, token]);

  // Function to increase view count
  const increaseViewCount = () => {
    if (id && userId) {
      fetch(
        `https://elwi9xjnlh.execute-api.ap-south-1.amazonaws.com/api/v1/videos/update/views`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoId: id, userId }),
        }
      ).catch((error) => {
        console.error("Failed to increase view count", error);
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-6 w-1/3 mt-4" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-full mt-2" />
      </div>
    );
  }

  if (!videoData) {
    return <div className="p-6 text-white">Video not found.</div>;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="mb-6">
        <ReactPlayer
          url={videoData.videoFile}
          controls
          width="100%"
          height="500px"
          light={videoData.thumbnail}
        />
      </div>
      <Card className="bg-gray-800 text-white">
        <CardContent>
          <h1 className="text-2xl font-bold">{videoData.title}</h1>
          <p className="text-gray-400 mt-2">
            {new Date(videoData.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-400 flex items-center mt-4">
            <IconEye className="mr-2" /> {videoData.views} views
          </p>
          <p className="mt-4">{videoData.description}</p>
          <Button className="mt-6 bg-blue-600">Like</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoDetailPage;
