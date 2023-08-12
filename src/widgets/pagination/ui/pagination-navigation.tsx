"use client";

import { Button, Icon } from "@shared/ui";
import { Dispatch, SetStateAction } from "react";

interface PaginationNavigatonProps {
  isPreviousData: boolean;
  hasMore?: boolean;
  page: number;
  onPageChange: Dispatch<SetStateAction<number>>;
  limit: number;
  totalPages: number;
  isFetching?: boolean;
}

export const PaginationNavigaton = ({
  isPreviousData,
  limit,
  onPageChange,
  page,
  hasMore,
  totalPages,
  isFetching,
}: PaginationNavigatonProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => onPageChange(0)}
        disabled={page === 1 || isFetching}
        size="icon"
        variant="secondary"
      >
        <Icon className="text-white" name="ChevronsLeft" />
      </Button>
      <Button
        onClick={() =>
          onPageChange((oldOffset) => Math.max(oldOffset - limit, 0))
        }
        disabled={page === 1 || isFetching}
        size="icon"
        variant="secondary"
      >
        <Icon className="text-white" name="ChevronLeft" />
      </Button>
      <Button
        onClick={() => {
          if (!isPreviousData && hasMore) {
            onPageChange((oldOffset) => oldOffset + limit);
          }
        }}
        disabled={isPreviousData || !hasMore || isFetching || totalPages === page}
        size="icon"
        variant="secondary"
      >
        <Icon className="text-white" name="ChevronRight" />
      </Button>
      <Button
        onClick={() => {
          onPageChange(totalPages * limit - limit);
        }}
        disabled={isPreviousData || !hasMore || isFetching || totalPages === page}
        size="icon"
        variant="secondary"
      >
        <Icon className="text-white" name="ChevronsRight" />
      </Button>
    </div>
  );
};
