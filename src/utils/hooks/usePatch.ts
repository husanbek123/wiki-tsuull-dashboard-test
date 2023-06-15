import { useMutation } from "@tanstack/react-query";
import { zapros } from "../axios";
export const usePatchData = (url: string, options: {}) => {
  return useMutation((data: any) => zapros.patch(url, data, {}), {...options});
};
