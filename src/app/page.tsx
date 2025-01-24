"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, User } from "lucide-react";

import { api } from "~/trpc/react";
import { PostChart } from "~/components/PostChart";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { PostCounter } from "~/components/PostCounter";
import { ModeToggle } from "~/components/ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function Home() {
  const [masturbates] = api.masturbate.getAll.useSuspenseQuery();

  const utils = api.useUtils();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"day" | "month" | "year">("day");

  const { data: day } = api.masturbate.getToday.useQuery();
  const { data: me } = api.user.me.useQuery();
  const { data: month } = api.masturbate.getThisMonth.useQuery();
  const { data: year } = api.masturbate.getThisYear.useQuery();

  const mutation = api.masturbate.create.useMutation({
    onSuccess: async () => {
      console.log("success");
      await utils.masturbate.invalidate();
    },
  });

  return (
    <div className="container mx-auto p-10 mt-48">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Masturbation Calculator</h1>
        <div className="flex gap-4">
          <ModeToggle />
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={me?.image ?? ""} alt={me?.name ?? ""} />
                    <AvatarFallback>{me?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>{me?.name}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => router.push("/api/auth/logout")}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Masturbation Counters</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <PostCounter label="Today" count={day!} />
            <PostCounter label="This Month" count={month!} />
            <PostCounter label="This Year" count={year!} />
            <Button
              onClick={() => mutation.mutate()}
              className="w-full"
              variant="default"
              disabled={mutation.status === "pending"}
            >
              {mutation.status === "pending" ? (
                <Loader2 className="animate-spin" />
              ) : (
                "I've Just Masturbated"
              )}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Posting Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as "day" | "month" | "year")
              }
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
              <TabsContent value="day">
                <PostChart
                  data={masturbates.map((val) => ({
                    count: day!,
                    createdAt: val.createdAt,
                  }))}
                  period="day"
                />
              </TabsContent>
              <TabsContent value="month">
                <PostChart
                  data={masturbates.map((val) => ({
                    count: month!,
                    createdAt: val.createdAt,
                  }))}
                  period="month"
                />
              </TabsContent>
              <TabsContent value="year">
                <PostChart
                  data={masturbates.map((val) => ({
                    count: year!,
                    createdAt: val.createdAt,
                  }))}
                  period="year"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
