import { useContext, useEffect } from "react";
import UserContext from "../../context/UserProvider";
import { auth } from "../../Firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const useSignIn = () => {
  const contextData = useContext(UserContext);
  const { isAuth, setIsAuth } = contextData;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/");
    else navigate("/signin");
  }, [isAuth]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
      hd: "quadone.com",
    });
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      if (result.user?.email?.endsWith("@quadone.com")) {
        localStorage.setItem("isUserLoggedIn", "true");
        setIsAuth(true);
        navigate("/");
      } else {
        await signOut;
        localStorage.setItem("isUserLoggedIn", "false");
        setIsAuth(false);
        toast.error("Unautheriged user, access denied!", {
          style: {
            fontSize: "12px",
          },
        });
        navigate("/signin");
      }
    }
  };
  return { handleLogin };
};
