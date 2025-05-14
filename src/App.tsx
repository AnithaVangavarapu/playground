import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserProvider";
import { SignIn } from "./pages/SignIn";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { StudyDrugDoseDairy } from "./pages/Playground/dynamicForms/StudyDrugDoseDiary";
import { InsulineDiary } from "./pages/Playground/dynamicForms/InsulineDiary";

function App() {
  return (
    <div className="font-poppins">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<StudyDrugDoseDairy />} />
              <Route
                path="/studyDrugDoseDiary"
                element={<StudyDrugDoseDairy />}
              />
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
