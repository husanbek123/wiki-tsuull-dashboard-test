import { useMutation } from "@tanstack/react-query";
import { zapros } from "../axios";
export const usePostData = (url: string, options: {}) => {
  return useMutation((data: object) => zapros.post(url, data), { ...options });
};
