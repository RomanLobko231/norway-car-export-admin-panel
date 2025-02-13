import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import ReviewPage from "./pages/ReviewPage";
import SoldPage from "./pages/SoldPage";
import AuctioningPage from "./pages/AuctioningPage";
import Navbar from "./ui/Navbar";
import AddOrEditCar from "./pages/EditCarPage";
import HomePage from "./pages/HomePage";
import EditCarPage from "./pages/EditCarPage";
import AddCarPage from "./pages/AddCarPage";
import BuyersPage from "./pages/BuyersPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex w-full justify-center">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} exact={true} />
          <Route path="*" element={<HomePage />} exact={true} />
          <Route path="/car/:id" element={<EditCarPage />} exact={true} />
          <Route path="/add-new" element={<AddCarPage />} exact={true} />
          <Route path="/buyers" element={<BuyersPage />} exact={true} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
