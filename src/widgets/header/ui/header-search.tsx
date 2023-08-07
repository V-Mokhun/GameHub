"use client";

import { gamesApi } from "@shared/api";
import { GAMES_ROUTE } from "@shared/consts";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@shared/ui";
import debounce from "lodash.debounce";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SearchedGame } from "./searched-game";
import { useClickOutside } from "@shared/lib/hooks";

interface HeaderSearchProps {}

export const HeaderSearch = ({}: HeaderSearchProps) => {
  const [input, setInput] = useState("");
  const pathname = usePathname();
  const commandRef = useClickOutside<HTMLDivElement>(() => {
    setInput("");
  });
  const router = useRouter();

  const {
    data: searchedGames,
    refetch,
    isFetched,
    isFetching,
  } = gamesApi.getSearchGames(input);

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="md:relative z-50 overflow-visible rounded-md max-w-md border"
      shouldFilter={false}
    >
      <CommandInput
        isLoading={isFetching}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        className="h-10"
        placeholder="Search games"
      />
      {input.trim().length > 0 && (
        <CommandList className="absolute bg-popover top-full inset-x-0 shadow rounded-b-md">
          {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
          {searchedGames && searchedGames.length > 0 && (
            <CommandGroup heading="Games">
              {searchedGames.map((game) => (
                <CommandItem
                  key={game.id}
                  value={String(game.id)}
                  onSelect={(e) => {
                    router.push(`${GAMES_ROUTE}/${e}`);
                    router.refresh();
                  }}
                >
                  <SearchedGame game={game} />
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
};
