import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";
  //react-query 
  //for 'GET' requests we can use useQuery
  //for 'POST', 'Put', 'Delete' requests we can use useMutation
const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, //auth check
  });
  return {isLoading:authUser.isLoading,authUser:authUser.data?.user,error:authUser.error};
};

export default useAuthUser;
