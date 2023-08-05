"use client";

import { useState } from "react";

interface GameSummaryProps {
  summary: string;
}

export const GameSummary = ({ summary }: GameSummaryProps) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="mb-4 text-sm md:text-base">
      {isReadMore ? summary.slice(0, 150) : summary + " "}
      <button
        type="button"
        onClick={toggleReadMore}
        className="text-muted-foreground"
      >
        {isReadMore ? "...read more" : "show less"}
      </button>
    </p>
  );
};
