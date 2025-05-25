import { useContext } from "react";
import { CurrentUserContext } from "../components/App";
import { checkAuth } from "../http/userApi";

const useCurrentUser = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const checkPermission = (role = "") => {
    if (!currentUser?.role) return false;

    return currentUser?.role.toLowerCase() === role.toLowerCase();
  };

  const authUser = async () => {
    try {
      const res = await checkAuth();
      if (!res.data) return;

      setCurrentUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const isAuthenticated = () => {
    return !!currentUser; // Явная проверка наличия пользователя
  };

  return {
    currentUser,
    setCurrentUser,
    checkPermission,
    authUser,

    isAuthenticated,
  };
};

export default useCurrentUser;
