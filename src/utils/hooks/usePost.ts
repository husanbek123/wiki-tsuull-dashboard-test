import { useMutation } from "@tanstack/react-query";
import { zapros } from "../axios";
import { useToken } from "../zustand/useStore";
export const usePostData = (url: string, options = {}) => {
  let token = useToken((state) => state.token);
  return useMutation(
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
