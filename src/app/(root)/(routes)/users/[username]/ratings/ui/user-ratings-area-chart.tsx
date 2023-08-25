"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  label: string;
  payload: {
    value: number;
    payload: {
      date: string;
      name: string;
      rating: number;
      releaseDate: string;
    };
  }[];
}) => {
  if (!active) return null;

  const { date, name, rating, releaseDate } = payload[0].payload;

  return (
    <div className="z-10 max-w-[200px] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
      <div className="flex flex-col items-center gap-1">
        <span>{rating}</span>
        <p>
          {name}{" "}
          <span className="inline-flex text-muted-foreground">
            ({new Date(releaseDate).getFullYear()})
          </span>
        </p>
        <p>{date}</p>
      </div>
    </div>
  );
};

interface UserRatingsAreaChartProps {
  formattedData: {
    name: string;
    date: string;
    rating: number | null;
    releaseDate: Date | null;
  }[];
}

export const UserRatingsAreaChart = ({
  formattedData,
}: UserRatingsAreaChartProps) => {
  return (
    <div className="w-[450px] h-[60vh] xs:w-full mb-6">
      <ResponsiveContainer className={"w-full h-full text-muted-foreground"}>
        <AreaChart
          data={formattedData}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} className="stroke-muted" />
          <XAxis
            dataKey="date"
            ticks={[
              formattedData[0].date,
              formattedData[formattedData.length - 1].date,
            ]}
            padding={{ left: 20, right: 20 }}
            axisLine={{ className: "stroke-muted" }}
            tickLine={{ className: "stroke-muted" }}
          />
          <YAxis
            type="number"
            dataKey="rating"
            domain={[1, 10]}
            tickCount={10}
            axisLine={{ className: "stroke-muted" }}
            tickLine={false}
            tick={{ fill: "currentColor" }}
            padding={{ bottom: 20, top: 20 }}
          />
          {/* @ts-ignore */}
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="rating"
            stroke="stroke-secondary"
            fill="fill-primary"
            className="fill-primary stroke-secondary"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
