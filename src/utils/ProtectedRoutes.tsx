import { useContext } from "react";
import UserContext from "../context/UserProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Header, SideMenu } from "../components";

const ProtectedRoutes = () => {
  const contextData = useContext(UserContext);
  const { isAuth } = contextData;

  return isAuth ? (
    <div className="flex flex-col">
      <Header />
      <div className="grid grid-cols-6 w-full lg:min-h-[660px]">
        <div className="grid-cols-1 border-r border-gray-200">
          <SideMenu />
        </div>
        <div className="col-span-5 w-full bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default ProtectedRoutes;
