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
  const [car, setCar] = useState({
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
    imagePaths: [],
  });
  const [owner, setOwner] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: randomString(32),
    address: { streetAddress: "", postalLocation: "", postalCode: "" },
    role: "SELLER",
  });

  const resetFormData = () => {
    setCar({
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
      ownerId: "",
      status: "",
      additionalInformation: "",
      imagePaths: [],
    });

    setOwner({
      name: "",
      phoneNumber: "",
      email: "",
      password: randomString(32),
      address: { streetAddress: "", postalLocation: "", postalCode: "" },
      role: "SELLER",
    });
  };

  const handleSaveCar = async (carData, ownerData, images) => {
    try {
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
    } catch (error) {
      throw error;
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

  function randomString(length) {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
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
