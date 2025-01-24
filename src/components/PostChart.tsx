"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

export interface IMasturbate {
  count: number;
  createdAt: Date;
}

interface IProps {
  readonly data: IMasturbate[];
  readonly period: "day" | "month" | "year";
}

export function PostChart({ data, period }: IProps) {
  const processData = (
    data: IMasturbate[],
    period: "day" | "month" | "year",
  ) => {
    const today = new Date();
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.createdAt);
      switch (period) {
        case "day":
          return itemDate.toDateString() === today.toDateString();
        case "month":
          return (
            itemDate.getMonth() === today.getMonth() &&
            itemDate.getFullYear() === today.getFullYear()
          );
        case "year":
          return itemDate.getFullYear() === today.getFullYear();
      }
    });

    return filteredData.map((item) => ({
      date: item.createdAt,
      masturbates: 1 || item.count,
    }));
  };

  const chartData = processData(data, period);

  return (
    <ChartContainer
      config={{
        masturbates: {
          label: "masturbates",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="masturbates" fill="var(--color-posts)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
