"use client";

import { Title } from "@shared/ui";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CustomTooltip = ({
  active,
  payload,
  length,
}: {
  active: boolean;
  length: number;
  payload: {
    value: number;
    payload: {
      rating: number;
      count: number;
    };
  }[];
}) => {
  if (!active) return null;

  const { count } = payload[0].payload;

  return (
    <div className="z-10 max-w-[200px] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
      <div className="flex flex-col items-center gap-1">
        <span>
          {Math.trunc((count / length) * 100)}% ({count} game{count > 1 && "s"})
        </span>
      </div>
    </div>
  );
};

interface UserRatingsPieChartProps {
  data: number[];
}

const COLORS = {
  "1": "#FF2D00",
  "2": "#FF5733",
  "3": "#FFC300",
  "4": "#FF9100",
  "5": "#33A1C9",
  "6": "#006E6D",
  "7": "#009624",
  "8": "#7CB342",
  "9": "#FF4081",
  "10": "#9C27B0",
};

export const UserRatingsPieChart = ({ data }: UserRatingsPieChartProps) => {
  let formattedData = new Array(10).fill(0).map((_, i) => ({
    rating: i + 1,
    count: 0,
  }));
  data.forEach(
    (rating) => formattedData.find((d) => d.rating === rating)!.count++
  );
  formattedData = formattedData.filter((d) => d.count > 0);

  return (
    <>
      <Title size="small">Rating distribution</Title>
      <div className="w-[450px] h-[50vh] xs:w-full mx-auto">
        <ResponsiveContainer className={"w-full h-full text-muted-foreground"}>
          <PieChart>
            <Pie
              paddingAngle={2}
              data={formattedData}
              dataKey="count"
              cx="50%"
              cy="50%"
              innerRadius={15}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                if (value === 0) return null;

                const RADIAN = Math.PI / 180;
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {formattedData[index].rating} (
                    {Math.trunc((value / data.length) * 100)}%)
                  </text>
                );
              }}
            >
              {formattedData.map(({ rating }) => (
                <Cell
                  key={`cell-${rating}`}
                  fill={COLORS[rating.toString() as keyof typeof COLORS]}
                />
              ))}
            </Pie>
            {/* @ts-ignore */}
            <Tooltip content={<CustomTooltip length={data.length} />} />
            <Legend
              className="xs:hidden"
              iconSize={16}
              layout="horizontal"
              verticalAlign="top"
              align="center"
              payload={formattedData.map(({ rating }) => ({
                value: rating,
                id: rating.toString(),
                color: COLORS[rating.toString() as keyof typeof COLORS],
                type: "square",
              }))}
            />
            <Legend
              className="hidden xs:block"
              iconSize={16}
              layout="vertical"
              verticalAlign="middle"
              align="left"
              payload={formattedData.map(({ rating }) => ({
                value: rating,
                id: rating.toString(),
                color: COLORS[rating.toString() as keyof typeof COLORS],
                type: "square",
              }))}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
