import { useState } from "react";
import CarEditingPanel from "../ui/car/CarEditingPanel";
import ErrorDialog from "../ui/ErrorDialog";
import ApiService from "../api/ApiService";

const AddCarPage = () => {
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [car, setCar] = useState({
    id: null,
    registrationNumber: "",
    kilometers: 0,
    make: "",
    model: "",
    firstTimeRegisteredInNorway: "",
    engineType: "",
    engineVolume: 0,
    bodywork: "",
    numberOfSeats: 0,
    numberOfDoors: 0,
    color: "",
    gearboxType: "",
    operatingMode: "",
    weight: 0,
    nextEUControl: "",
    ownerInfo: {
      name: "",
      phoneNumber: "",
      email: "",
    },
    status: "",
    additionalInformation: "",
    imagePaths: [],
  });

  const saveCar = async (carData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.saveCar(carData);
      console.log(carData);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          Loading...
        </p>
      )}
      {error && (
        <ErrorDialog
          isOpen={isErrorOpen}
          setIsOpen={setIsErrorOpen}
          error={error}
        />
      )}
      {!isLoading && !error && car && (
        <CarEditingPanel car={car} saveCar={saveCar} />
      )}
    </>
  );
};

export default AddCarPage;
