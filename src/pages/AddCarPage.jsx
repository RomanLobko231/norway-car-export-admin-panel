import { useState } from "react";
import CarEditingPanel from "../ui/car/CarEditingPanel";
import ErrorDialog from "../ui/dialog/ErrorDialog";
import ApiService from "../api/ApiService";
import { useNavigate } from "react-router";

const AddCarPage = () => {
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const defaultCar = {
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
    gearboxType: "Annet",
    operatingMode: "Annet",
    weight: 0,
    nextEUControl: "",
    ownerId: "",
    status: "Annet",
    additionalInformation: "",
    expectedPrice: "",
    imagePaths: [],
  };

  const defaultAuction = { minStep: 0, durationHours: 0, startPrice: 0 };

  const createDefaultOwner = () => ({
    name: "",
    phoneNumber: "",
    email: "",
    password: generateRandomString(32),
    address: { streetAddress: "", postalLocation: "", postalCode: "" },
    role: "SELLER",
  });

  const [car, setCar] = useState(defaultCar);
  const [auction, setAuction] = useState(defaultAuction);
  const [owner, setOwner] = useState(createDefaultOwner);

  const resetFormData = () => {
    setCar(defaultCar);
    setOwner(createDefaultOwner());
  };

  const handleSaveCar = async (carData, ownerData, images) => {
    if (carData.ownerId) {
      return await ApiService.saveCarExistingUser(carData, images);
    } else {
      const savedUser = await ApiService.registerSeller(ownerData);
      const updatedCarData = {
        ...carData,
        ownerId: savedUser.data.userId,
      };
      return await ApiService.saveCarNewUser(updatedCarData, images);
    }
  };

  const saveCar = async (carData, ownerData, images) => {
    setIsLoading(true);
    setError(null);
    try {
      const carResponse = await handleSaveCar(carData, ownerData, images);
      resetFormData();
      navigate(`/car/${carResponse.data.id}`);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  function generateRandomString(length) {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
  }

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

      <CarEditingPanel
        car={car}
        owner={owner}
        saveInfo={saveCar}
        auction={auction}
      />
    </>
  );
};

export default AddCarPage;
