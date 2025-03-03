import { useEffect, useState } from "react";
import CarCard from "../ui/car/CarCard";
import DeleteDialog from "../ui/dialog/DeleteDialog";
import ApiService from "../api/ApiService";
import CarsList from "../ui/car/CarsList";
import ErrorDialog from "../ui/dialog/ErrorDialog";

const HomePage = () => {
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState([]);

  const fetchAllCars = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await ApiService.getAllCars();
      setCars(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCar = async (id) => {
    try {
      setError(null);
      await ApiService.deleteById(id);
      setCars((prev) => prev.filter((element) => element.id !== id));
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    }
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  return (
    <div className="flex w-full flex-col items-center py-20">
      <h1 className="mb-2 mt-4 text-3xl font-bold text-gunmental">
        BILER TOTALT: {cars.length}
      </h1>
      <div className="mb-8 flex flex-row items-center gap-4">
        <h1 className="text-xl font-light text-gunmental">
          In Review: {cars.filter((car) => car.status === "Vurdering").length}
        </h1>
        <h1 className="text-xl font-light text-gunmental">
          Auksjon: {cars.filter((car) => car.status === "Auksjon").length}
        </h1>
        <h1 className="text-xl font-light text-gunmental">
          Solgt: {cars.filter((car) => car.status === "Solgt").length}
        </h1>
      </div>
      {isLoading && <h1>Loading..</h1>}
      <CarsList cars={cars} onDelete={deleteCar} />
      {error && (
        <ErrorDialog
          isOpen={isErrorOpen}
          setIsOpen={setIsErrorOpen}
          error={error}
        />
      )}
    </div>
  );
};

export default HomePage;
