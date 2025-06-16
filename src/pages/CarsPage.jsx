import { useEffect, useState } from "react";
import CarCard from "../ui/car/CarCard";
import DeleteDialog from "../ui/dialog/DeleteDialog";
import CarsList from "../ui/car/CarsList";
import ErrorDialog from "../ui/dialog/ErrorDialog";
import CarApiService from "../api/CarApiService";
import { useSearchParams } from "react-router";
import PageArrows from "../ui/PageArrows";

const CAR_STATUSES = ["Vurdering", "Solgt", "Annet", "Auksjon"];

const CarsPage = () => {
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status") || CAR_STATUSES.at(0);
  const [carFilter, setCarFilter] = useState(statusParam);

  const [page, setPage] = useState(0);
  const [size] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAllByStatus(carFilter);
  }, [carFilter, page]);

  const updateFilter = (newFilter) => {
    setCarFilter(newFilter);
    setSearchParams({ status: newFilter });
  };

  const fetchAllByStatus = async (status) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await CarApiService.getAllCarsByStatusPaged(
        status,
        page,
        size,
      );
      setCars(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCar = async (carId) => {
    try {
      setError(null);
      await CarApiService.deleteCarById(carId);
      setCars((prev) => prev.filter((c) => c.id !== carId));
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
              updateFilter(filter);
            }}
            key={filter}
          >
            {filter}
            {carFilter === filter && `: ${cars.length}`}
          </h1>
        ))}
      </div>
      {isLoading && <h1>Loading..</h1>}
      <CarsList cars={cars} onDelete={deleteCar} setCarStatus={setCarStatus} />
      <PageArrows page={page} setPage={setPage} totalPages={totalPages} />
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
