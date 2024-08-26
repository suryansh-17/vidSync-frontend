"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, ThumbsUp, History } from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks";

interface UserData {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  watchHistory: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const token = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    fetch(
      `https://elwi9xjnlh.execute-api.ap-south-1.amazonaws.com/api/v1/users/current-user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  if (!userData) {
    return <div className="p-6 text-white">User not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={userData.avatar || "/placeholder.svg?height=96&width=96"}
              alt={userData.username}
            />
            <AvatarFallback>
              {userData.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center md:items-start gap-4">
            <h1 className="text-2xl font-bold">{userData.fullName}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <UserCircle className="w-4 h-4" />
                <span>{userData.username}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span>Likes: Placeholder</span>
              </div>
              <div className="flex items-center gap-1">
                <History className="w-4 h-4" />
                <span>{userData.watchHistory.length} views</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="bg-gray-800 text-gray-100 hover:bg-gray-700"
            >
              View Channel
            </Button>
          </div>
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger
              value="liked"
              className="data-[state=active]:bg-gray-700"
            >
              Liked Videos
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-gray-700"
            >
              Watch History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="liked">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Liked Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="w-full whitespace-nowrap rounded-md border border-gray-700">
                  <div className="flex w-max space-x-4 p-4">
                    {[...Array(5)].map((_, i) => (
                      <VideoCard key={i} title={`Liked Video ${i + 1}`} />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Watch History</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="w-full whitespace-nowrap rounded-md border border-gray-700">
                  <div className="flex w-max space-x-4 p-4">
                    {userData.watchHistory.length > 0 ? (
                      userData.watchHistory.map((videoId, i) => (
                        <VideoCard key={i} title={`Watched Video ${i + 1}`} />
                      ))
                    ) : (
                      <div className="text-gray-400">
                        No watch history available.
                      </div>
                    )}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface VideoCardProps {
  title: string;
}

function VideoCard({ title }: VideoCardProps) {
  return (
    <div className="w-[250px] space-y-3">
      <div className="aspect-video overflow-hidden rounded-lg bg-gray-700">
        <img
          src="/placeholder.svg?height=140&width=250"
          alt={title}
          className="w-full object-cover"
          width={250}
          height={140}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none text-gray-100">{title}</h3>
        <p className="text-xs text-gray-400">100K views • 2 days ago</p>
      </div>
    </div>
  );
}
