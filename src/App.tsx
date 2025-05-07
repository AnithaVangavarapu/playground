import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserProvider";
import { SignIn } from "./pages/SignIn";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { SDDD } from "./pages/Playground/studyDrugDoseDiary";
import { InsulineDiary } from "./pages/Playground/insulineDiary";

function App() {
  return (
    <div className="font-poppins">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<SDDD />} />
              <Route path="/studyDrugDoseDiary" element={<SDDD />} />
              <Route path="/insulineDiary" element={<InsulineDiary />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </UserProvider>
    </div>
  );
}

export default App;
