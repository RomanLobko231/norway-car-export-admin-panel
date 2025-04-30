import { useState } from "react";
import CarEditingPanel from "../ui/car/CarEditingPanel";
import ErrorDialog from "../ui/dialog/ErrorDialog";
import { useNavigate } from "react-router";
import CarApiService from "../api/CarApiService";
import UserApiService from "../api/UserApiService";

const AddCarPage = () => {
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const defaultCar = {
    registrationNumber: "",
    kilometers: "",
    make: "",
    model: "",
    firstTimeRegisteredInNorway: "",
    engineType: "",
    engineVolume: "",
    bodywork: "",
    numberOfSeats: "",
    numberOfDoors: "",
    color: "",
    gearboxType: "Annet",
    operatingMode: "Annet",
    weight: "",
    nextEUControl: "",
    ownerId: "",
    status: "Vurdering",
    additionalInformation: "",
    expectedPrice: "",
    imagePaths: [],
  };

  const createDefaultOwner = () => ({
    name: "",
    phoneNumber: "",
    email: "",
    password: generateRandomString(32),
    address: { streetAddress: "", postalLocation: "", postalCode: "" },
    role: "SELLER",
  });

  const [car, setCar] = useState(defaultCar);
  const [owner, setOwner] = useState(createDefaultOwner);

  const resetFormData = () => {
    setCar(defaultCar);
    setOwner(createDefaultOwner());
  };

  // --- API call: check if car already exists ---
  const checkIfCarExists = async (regNumber) => {
    try {
      const response = await CarApiService.existsByRegNumber(regNumber);
      return response.data;
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    }
  };

  // --- Main save logic ---
  const handleSaveCar = async (carData, ownerData, images) => {
    const carExists = await checkIfCarExists(carData.registrationNumber);
    if (carExists) {
      throw {
        statusCode: 409,
        message: "Car with this Registration number already exists.",
        timestamp: new Date().toISOString(),
      };
    }

    if (carData.ownerId) {
      return await CarApiService.saveCarExistingUser(carData, images);
    } else {
      const savedUser = await UserApiService.registerSeller(ownerData);
      const updatedCarData = {
        ...carData,
        ownerId: savedUser.data.userId,
      };

      return await CarApiService.saveCarNewUser(updatedCarData, images);
    }
  };

  // --- UI handler ---
  const saveCar = async (carData, ownerData, images) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await handleSaveCar(carData, ownerData, images);
      resetFormData();
      navigate(`/car/${response.data.id}`);
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

      <CarEditingPanel car={car} owner={owner} saveInfo={saveCar} />
    </>
  );
};

export default AddCarPage;
