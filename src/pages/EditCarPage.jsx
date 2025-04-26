import React, { useEffect, useState } from "react";
import ImageCarousel from "../ui/carousel/ImageCarousel";
import CarInfoElement from "../ui/car/CarInfoElement";
import TextInput from "../ui/input/TextInputField";
import InputField from "../ui/input/TextInputField";
import ApiService from "../api/ApiService";
import { useLocation, useParams } from "react-router";
import CarEditingPanel from "../ui/car/CarEditingPanel";
import ErrorDialog from "../ui/dialog/ErrorDialog";

const EditCarPage = () => {
  const params = useParams();

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [car, setCar] = useState(null);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    loadCarAndOwner(params.id);
  }, []);

  const loadCarAndOwner = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await fetchCar(id);
      await fetchOwner(car.ownerId);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCar = async (id) => {
    const carResponse = await ApiService.getCarById(id);
    setCar(carResponse.data);
  };

  const fetchOwner = async (ownerId) => {
    const ownerResponse = await ApiService.getUserById(ownerId);
    setOwner(ownerResponse.data);
  };

  const saveCar = async (carData, ownerData, images) => {
    setIsLoading(true);
    setError(null);
    try {
      await ApiService.updateCar(carData, images);
      await ApiService.updateOwner(ownerData);
      await loadCarAndOwner(params.id);
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
        <CarEditingPanel car={car} owner={owner} saveInfo={saveCar} />
      )}
    </>
  );
};

export default EditCarPage;
