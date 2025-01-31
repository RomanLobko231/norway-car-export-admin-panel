import { useEffect, useState } from "react";
import CarCard from "../ui/CarCard";
import DeleteDialog from "../ui/DeleteDialog";
import ApiService from "../api/ApiService";
import CarsList from "../ui/CarsList";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState([]);

  const fetchAllCars = async () => {
    try {
      const response = await ApiService.getAllCars();
      console.log(response);
      setCars(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  return (
    <div className="flex w-full flex-col items-center py-20">
      <h1 className="mb-2 mt-4 text-3xl font-bold text-gunmental">
        TOTAL CARS: 8
      </h1>
      <div className="mb-8 flex flex-row items-center gap-4">
        <h1 className="text-xl font-light text-gunmental">In Review: 5</h1>
        <h1 className="text-xl font-light text-gunmental">Auctioning: 2</h1>
        <h1 className="text-xl font-light text-gunmental">Sold: 1</h1>
      </div>
      <CarsList cars={cars} />
    </div>
  );
};

export default HomePage;
