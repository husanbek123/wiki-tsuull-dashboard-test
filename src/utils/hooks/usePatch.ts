import { useMutation } from "@tanstack/react-query";
import { zapros } from "../axios";
import { useToken } from "../zustand/useStore";
export const usePatchData = (url: string, options: {}) => {
  let token = useToken(state => state.token);
  return useMutation((data: any) => zapros.patch(url, data, {
    headers: {
      Authorization: `Bearar ${token}`,
    },
  }), {...options});
};
