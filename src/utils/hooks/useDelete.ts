// useDelete custom hook
import { useMutation } from "@tanstack/react-query";
import { zapros } from "../axios";
export const useDelete = (url: string | string[], options: {}) => {
   return useMutation((id: string) => zapros.delete(`${url}/${id}`), {
    ...options,
  }); 
};
