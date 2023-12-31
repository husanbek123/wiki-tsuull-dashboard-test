/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { zapros } from "../axios";
import { useToken } from "../zustand/useStore";
export const usePatchData = (url: string, options = {}) => {
  const token = useToken((state) => state.token);
  return useMutation(
    (data: any) =>
      zapros.patch(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    { ...options }
  );
};
