import { useEffect, useState } from "react";
import CarCard from "../ui/car/CarCard";
import DeleteDialog from "../ui/dialog/DeleteDialog";
import CarsList from "../ui/car/CarsList";
import ErrorDialog from "../ui/dialog/ErrorDialog";
import CarApiService from "../api/CarApiService";

const CarsPage = () => {
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState([]);

  const CAR_STATUSES = ["Vurdering", "Solgt", "Annet"];
  const [carFilter, setCarFilter] = useState(CAR_STATUSES.at(0));

  useEffect(() => {
    fetchAllByStatus(carFilter);
  }, [carFilter]);

  const fetchAllByStatus = async (status) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await CarApiService.getAllCarsByStatus(status);
      setCars(response.data);
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
      await CarApiService.deleteCarById(id);
      setCars((prev) => prev.filter((element) => element.id !== id));
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    }
  };

  const setCarStatus = async (status, carId) => {
    setError(null);
    try {
      await CarApiService.setCarStatus(status, carId);
      setCars((prev) => prev.filter((element) => element.id !== carId));
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    }
  };

  return (
    <div className="flex w-full flex-col items-center py-20">
      <h1 className="mb-2 mt-4 text-3xl font-bold text-gunmental">
        BILSTYREPANEL
      </h1>
      <div className="mb-10 mt-2 flex flex-row items-center gap-4">
        {CAR_STATUSES.map((filter) => (
          <h1
            className={`cursor-pointer rounded-lg border px-4 py-1 text-lg font-medium ${
              carFilter === filter
                ? "border-gunmental bg-gunmental text-lighthouse"
                : "border-medium-gray bg-lighthouse text-gunmental hover:bg-gray-200"
            }`}
            onClick={() => {
              setCarFilter(filter);
            }}
            key={filter}
          >
            {filter}
          </h1>
        ))}
      </div>
      {isLoading && <h1>Loading..</h1>}
      <CarsList cars={cars} onDelete={deleteCar} setCarStatus={setCarStatus} />
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

export default CarsPage;
