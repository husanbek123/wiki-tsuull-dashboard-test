// GetData hook
import { useQuery } from "@tanstack/react-query";
import { zapros } from "../axios";
export const useGetData = (url: string, key: string[], options: {}) => {
  return useQuery(key, () => zapros.get(url), { ...options });
};
