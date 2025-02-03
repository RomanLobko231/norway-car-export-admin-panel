import React, { useEffect, useState } from "react";
import ImageCarousel from "../ui/carousel/ImageCarousel";
import CarInfoElement from "../ui/car/CarInfoElement";
import TextInput from "../ui/input/TextInputField";
import InputField from "../ui/input/TextInputField";
import ApiService from "../api/ApiService";
import { useLocation, useParams } from "react-router";
import CarEditingPanel from "../ui/car/CarEditingPanel";
import ErrorDialog from "../ui/ErrorDialog";

const EditCarPage = () => {
  const params = useParams();

  const location = useLocation();
  const carFromLocation = location.state?.car;

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [car, setCar] = useState(null);

  useEffect(() => {
    if (carFromLocation == null) {
      fetchCar(params.id);
    } else {
      setCar(carFromLocation);
    }
  }, []);

  const fetchCar = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.getCarById(id);
      setCar(response.data);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCar = async (carData) => {
    setIsLoading(true);
    setError(null);
    try {
      await ApiService.updateCar(carData);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
      fetchCar(params.id);
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

export default EditCarPage;
