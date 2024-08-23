// components/VideoCard.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { formatNumber } from "@/lib/utils"; // Utility to format numbers, e.g., 1k, 1M

interface VideoCardProps {
  title: string;
  thumbnail: string;
  views: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, thumbnail, views }) => {
  return (
    <Card className="bg-gray-800 text-white rounded-lg shadow-lg">
      <CardHeader>
        <div className="relative w-full h-40">
          <Image
            src={thumbnail}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2">{title}</CardTitle>
        <p className="text-gray-400">{formatNumber(views)} views</p>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
