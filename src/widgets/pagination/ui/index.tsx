"use client";

import { useEffect, useMemo, useState } from "react";
import { PaginationLimit } from "./pagination-limit";
import { PaginationNavigaton } from "./pagination-navigation";

interface PaginationProps {
  onPaginateChange: (limit: number, offset: number) => void;
  totalPages: number;
  limit: number;
  offset: number;
  limitValues: number[];
  isPreviousData: boolean;
  hasMore?: boolean;
  isFetching?: boolean;
}

export const Pagination = ({
  onPaginateChange,
  totalPages,
  limit: initialLimit,
  offset: initialOffset,
  limitValues,
  isPreviousData,
  hasMore,
  isFetching,
}: PaginationProps) => {
  const [limit, setLimit] = useState(initialLimit);
  const [offset, setOffset] = useState(initialOffset);

  const page = useMemo(() => Math.floor(offset / limit) + 1, [offset, limit]);

  useEffect(() => {
    setLimit(initialLimit);
    setOffset(initialOffset);
  }, [initialLimit, initialOffset]);

  useEffect(() => {
    onPaginateChange(limit, offset);
  }, [onPaginateChange, limit, offset]);

  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:justify-end gap-4">
      <PaginationLimit
        limit={limit}
        onLimitChange={setLimit}
        limitValues={limitValues}
        isFetching={isFetching}
      />
      <div>
        <span className="text-sm lg:text-base">
          Page {page} of {totalPages}
        </span>
      </div>
      <PaginationNavigaton
        isFetching={isFetching}
        isPreviousData={isPreviousData}
        hasMore={hasMore}
        limit={limit}
        totalPages={totalPages}
        page={page}
        onPageChange={setOffset}
      />
    </div>
  );
};
