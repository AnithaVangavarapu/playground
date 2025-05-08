import { User, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import UserContext from "../context/UserProvider";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
const Header = () => {
  const contextData = useContext(UserContext);
  const { setIsAuth } = contextData;
  const [showpopup, setShowpopup] = useState<boolean>(false);
  const handleLogout = async () => {
    await signOut(auth);
    setIsAuth(false);
    localStorage.setItem("isUserLoggedIn", "false");
  };
  return (
    <div className="flex items-center p-2 justify-between border-b-[2px] border-gray-200 ">
      <img src="/clinion-logo.jpg" alt="clinion-logo" width={40} />

      <div className="flex gap-4 items-center ">
        <p className="text-sm">Playground</p>
        <div className="relative">
          <User
            width={30}
            color="gray"
            onClick={() => setShowpopup(!showpopup)}
          />
          {showpopup && (
            <div className="absolute border  bg-white right-0 top-8 w-40 p-2 border-gray-200 shadow-sm rounded-md">
              <div
                onClick={handleLogout}
                className="text-[10px] flex items-center gap-2 "
              >
                <LogOut width={12} color="gray" />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
