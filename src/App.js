import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import ReviewPage from "./pages/ReviewPage";
import SoldPage from "./pages/SoldPage";
import AuctioningPage from "./pages/AuctioningPage";
import Navbar from "./ui/Navbar";
import AddOrEditCar from "./pages/AddOrEditCar";

function App() {
  return (
    <BrowserRouter>
      <div className="flex w-full justify-center">
        <Navbar />
        <Routes>
          <Route path="/" element={<ReviewPage />} exact={true} />
          <Route path="*" element={<ReviewPage />} exact={true} />
          <Route path="/review" element={<ReviewPage />} exact={true} />
          <Route path="/auctioning" element={<AuctioningPage />} exact={true} />
          <Route path="/sold" element={<SoldPage />} exact={true} />
          <Route path="/car/:car-id" element={<AddOrEditCar />} exact={true} />
          <Route path="/add-new" element={<AddOrEditCar />} exact={true} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
