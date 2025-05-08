import { createContext, useState, type ReactNode, useEffect } from "react";
import { auth } from "../Firebase";

interface UserProviderProps {
  children: ReactNode;
}
export interface UserContextProps {
  isAuth: boolean;
  setIsAuth: (val: boolean) => void;
}
const UserContext = createContext<UserContextProps>({
  isAuth: false,
  setIsAuth: () => {},
});
export default UserContext;

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const value = { isAuth, setIsAuth };
  useEffect(() => {
    localStorage.setItem("isUserLoggedIn", String(isAuth));
  }, [isAuth]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.email?.endsWith("@quadone.com")) {
        localStorage.setItem("isUserLoggedIn", "true");
        setIsAuth(true);
      } else {
        localStorage.setItem("isUserLoggedIn", "false");
        setIsAuth(false);
      }
    });
  }, []);

  return <UserContext value={value}>{children}</UserContext>;
};
