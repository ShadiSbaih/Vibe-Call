import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../lib/api";
import toast from "react-hot-toast";

const useSignUp = () => {
 const queryClient = useQueryClient();
  const { isPending, mutate, error } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signUp,
    onSuccess: () => {
      // After the mutation is successful, invalidate the "authUser" query
      // to ensure the latest authenticated user data is fetched from the server.
      // This helps keep the UI in sync with the backend changes.
      queryClient.invalidateQueries({ queryKey: ["authUser"] });// Invalidate the authUser query to refetch user data
      toast.success("Account created successfully.");
    },
    onError: (error) => {
      // Handle error case
      console.error("Error during signup:", error);
      toast.error(error?.response?.data?.message || "An error occurred during signup.");
    },
  });
    return {
        isPending,
        error,
        signUpMutation: mutate,
    };
}

export default useSignUp