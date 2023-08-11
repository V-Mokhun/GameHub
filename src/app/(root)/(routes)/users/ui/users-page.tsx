"use client";
import { userApi } from "@shared/api";

interface UsersPageProps {}

export const UsersPage = ({}: UsersPageProps) => {
  const { data, isLoading } = userApi.getUsers();
  console.log(data);

  return <>page</>;
};
