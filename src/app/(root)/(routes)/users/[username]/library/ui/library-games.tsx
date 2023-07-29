"use client";

import { userLibraryApi } from "@shared/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface LibraryGamesProps {
  username: string;
}

export const LibraryGames = ({ username }: LibraryGamesProps) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const {
    data: filteredLibrary,
    isFetching,
    isPreviousData,
  } = userLibraryApi.getFilteredLibrary(username);

  console.log(filteredLibrary);

  return <div>games</div>;
};
