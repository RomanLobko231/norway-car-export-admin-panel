import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./ui/Navbar";
import EditCarPage from "./pages/EditCarPage";
import AddCarPage from "./pages/AddCarPage";
import BuyersPage from "./pages/BuyersPage";
import ProtectedRoute from "./ui/security/ProtectedRoute";
import CarsPage from "./pages/CarsPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex w-full justify-center">
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} exact={true} />
            <Route path="*" element={<HomePage />} exact={true} />
            <Route path="/cars" element={<CarsPage />} exact={true} />
            <Route path="/car/:id" element={<EditCarPage />} exact={true} />
            <Route path="/add-new" element={<AddCarPage />} exact={true} />
            <Route path="/buyers" element={<BuyersPage />} exact={true} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
