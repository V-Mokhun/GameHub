"use client";

import { GameStatus } from "@entities/game";
import { userApi } from "@shared/api";
import { useActiveList } from "@shared/lib/hooks";
import {
  ActiveIndicator,
  Avatar,
  AvatarImage,
  Icon,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  Title,
} from "@shared/ui";

interface GameFriendsProps {
  gameId: string;
}

export const GameFriends = ({ gameId }: GameFriendsProps) => {
  const { data: gameFriends } = userApi.getGameFriends(gameId);
  const { members } = useActiveList();

  return (
    <div className="my-4">
      <Title size="small">Friends who own this game</Title>
      <Table className="whitespace-nowrap xs:whitespace-normal">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-center">
              Time played <Icon name="Clock" className="w-4 h-4 ml-1" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
					
				</TableBody>
      </Table>
      <ul className="flex flex-col gap-2">
        {gameFriends?.map((friend) => {
          const isActive = members.some((m) => m === friend.id);

          return (
            <li className="flex items-center gap-2" key={friend.id}>
              <div className="relative">
                <Avatar className={"w-8 h-8"}>
                  <AvatarImage src={friend.imageUrl} />
                </Avatar>
                {isActive && <ActiveIndicator size="small" />}
              </div>
              <GameStatus status={friend.game.status} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
