import { useContext } from "react";
import { UserContext } from "../state/UserContext";

const useCheckAdmin = () => {

  const { userDetails } = useContext(UserContext);

  const isAdmin = userDetails?.role === "admin";

  return { isAdmin };
}

export default useCheckAdmin;