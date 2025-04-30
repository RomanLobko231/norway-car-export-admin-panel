import React, { useEffect, useState } from "react";
import ImageCarousel from "../ui/carousel/ImageCarousel";
import CarInfoElement from "../ui/car/CarInfoElement";
import TextInput from "../ui/input/TextInputField";
import InputField from "../ui/input/TextInputField";
import { useLocation, useParams } from "react-router";
import CarEditingPanel from "../ui/car/CarEditingPanel";
import ErrorDialog from "../ui/dialog/ErrorDialog";
import CarApiService from "../api/CarApiService";
import UserApiService from "../api/UserApiService";

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
      const carResponse = await CarApiService.getCarById(id);
      setCar(carResponse.data);
      const ownerResponse = await UserApiService.getUserById(
        carResponse.data.ownerId,
      );
      setOwner(ownerResponse.data);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCar = async (carData, ownerData, images) => {
    setIsLoading(true);
    setError(null);
    console.log(carData);
    try {
      await CarApiService.updateCar(carData, images);
      await UserApiService.updateUser(ownerData);
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
      {!isLoading && car && (
        <CarEditingPanel car={car} owner={owner} saveInfo={saveCar} />
      )}
    </>
  );
};

export default EditCarPage;
