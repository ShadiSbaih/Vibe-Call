import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["loginPage"],
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login Success", data);
      queryClient.invalidateQueries({ queryKey: ["authUser"] }); // this will invalidate the authUser query and refetch it
    },
    onError: (error) => {
      console.log("Login Error", error);
    },
  });
    return {
        LoginMutation: mutate,
        isPending,
        error,  
    }
};
