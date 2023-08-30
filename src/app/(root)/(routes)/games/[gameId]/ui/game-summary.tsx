"use client";

import { Skeleton } from "@shared/ui";
import { useState } from "react";

interface GameSummaryProps {
  summary?: string;
  isLoading: boolean;
}

export const GameSummary = ({ summary, isLoading }: GameSummaryProps) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  if (isLoading)
    return (
      <div className="mb-2">
        <Skeleton className="h-6 w-full mb-1" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );

  return (
    summary && (
      <p className="mb-2 text-sm md:text-base">
        {isReadMore ? summary.slice(0, 400) : summary + " "}
        {summary.length > 400 && (
          <button
            type="button"
            onClick={toggleReadMore}
            className="text-muted-foreground hover:text-muted-foreground/70 transition-colors"
          >
            {isReadMore ? "...Read More" : "Show Less"}
          </button>
        )}
      </p>
    )
  );
};
