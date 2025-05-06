import { User } from "lucide-react";
import { useContext } from "react";
import UserContext from "../context/UserProvider";
import { signOut } from "firebase/auth";
const Header = () => {
  const contextData = useContext(UserContext);
  const { setIsAuth } = contextData;
  const handleLogout = async () => {
    await signOut;
    setIsAuth(false);
    localStorage.setItem("isUserLoggedIn", "false");
  };
  return (
    <div className="flex items-center p-2 justify-between border-b-[2px] border-gray-200 ">
      <img src="/clinion-logo.jpg" alt="clinion-logo" width={40} />
      <div onClick={handleLogout}>logout</div>
      <div className="flex gap-4 items-center ">
        <p className="text-sm">Playground</p>
        <User width={30} color="gray" />
      </div>
    </div>
  );
};

export default Header;
