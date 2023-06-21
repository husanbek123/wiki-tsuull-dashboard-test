import { useMutation } from "@tanstack/react-query";
import { zapros } from "../axios";
import { useToken } from "../zustand/useStore";
export const usePostData = (url: string, options = {}) => {
  const token = useToken((state) => state.token);
  return useMutation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) =>
      zapros.post(url, data, {
        headers: {
          Authorization: `Bearar ${token}`,
        },
      }),
    {
      ...options,
    }
  );
};
