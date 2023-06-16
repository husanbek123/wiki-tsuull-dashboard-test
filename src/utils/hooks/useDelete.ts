// useDelete custom hook
import { useMutation } from "@tanstack/react-query";
import { zapros } from "../axios";
import { useToken } from "../zustand/useStore";
export const useDelete = (url: string | string[], options: {}) => {
  let token = useToken((state) => state.token);
  return useMutation(
    (id: string) =>
      zapros.delete(`${url}/${id}`, {
        headers: {
          Authorization: `Bearar ${token}`,
        },
      }),
    {
      ...options,
    }
  );
};
