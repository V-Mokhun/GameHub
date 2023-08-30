"use client";

import { GameStatus, GameUserRating } from "@entities/game";
import { userApi } from "@shared/api";
import { PROFILE_ROUTE } from "@shared/consts";
import { useActiveList } from "@shared/lib/hooks";
import {
  ActiveIndicator,
  Avatar,
  AvatarImage,
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Title,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@shared/ui";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface GameFriendsProps {
  gameId: string;
}

export const GameFriends = ({ gameId }: GameFriendsProps) => {
  const { data: gameFriends } = userApi.getGameFriends(gameId);
  const [seeAll, setSeeAll] = useState(false);
  const firstFriends = useMemo(() => gameFriends?.slice(0, 5), [gameFriends]);
  const { members } = useActiveList();
  const router = useRouter();

  return (
    gameFriends &&
    gameFriends.length > 0 && (
      <div className="md:my-6 my-4">
        <Title size="small">Friends who own this game</Title>
        <Table className="whitespace-nowrap xs:whitespace-normal">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">User</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Rating</TableHead>
              <TableHead>
                <div className="flex items-center justify-end gap-2">
                  <span>Time played</span>{" "}
                  <Icon name="Clock" className="w-4 h-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(seeAll ? gameFriends : firstFriends)!.map((friend) => {
              const isActive = members.some((m) => m === friend.id);

              return (
                <TableRow
                  className="cursor-pointer"
                  onClick={() => router.push(PROFILE_ROUTE(friend.username))}
                  key={friend.id}
                >
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="relative flex justify-center items-center">
                            <Avatar className={"w-8 h-8"}>
                              <AvatarImage src={friend.imageUrl} />
                            </Avatar>
                            {isActive && <ActiveIndicator size="small" />}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>{friend.username}</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="text-center">
                    <GameStatus status={friend.game.status} />
                  </TableCell>
                  <TableCell>
                    {friend.game.userRating ? (
                      <GameUserRating
                        userRating={friend.game.userRating}
                        className="mx-auto"
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {friend.game.playTime ? (
                      <span>{friend.game.playTime}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {gameFriends.length > 5 && (
          <div className="mt-2 flex items-center gap-2">
            <Button onClick={() => setSeeAll((prev) => !prev)}>
              {seeAll ? "See First 5" : "See All"}
            </Button>
            {!seeAll && (
              <span className="text-muted-foreground">
                {gameFriends.length - 5} more left
              </span>
            )}
          </div>
        )}
      </div>
    )
  );
};
