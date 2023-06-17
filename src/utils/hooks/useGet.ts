// GetData hook
import { useQuery } from "@tanstack/react-query";
import { zapros } from "../axios";
import { useToken } from "../zustand/useStore";
export const useGetData = (key: string[], url: string, options= {}) => {
  const token = useToken((state) => state.token);
  return useQuery(
    key,
    () =>
      zapros.get(url, {
        headers: {
          Authorization: `Bearar ${token}`,
        },
      }),
    { ...options }
  );
};
