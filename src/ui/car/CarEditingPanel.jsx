import { useEffect, useState } from "react";
import ImageCarousel from "../carousel/ImageCarousel";
import CarInfoElement from "./CarInfoElement";
import TextInputField from "../input/TextInputField";
import NumberInputField from "../input/NumberInputField";
import OptionsInput from "../input/OptionsInput";
import DateInputField from "../input/DateInputField";
import ImageInputField from "../input/ImageInputField";
import DeleteDialog from "../dialog/DeleteDialog";
import MessageDialog from "../dialog/MessageDialog";
import {
  MdEdit,
  MdLocationOn,
  MdNumbers,
  MdOutlineAirlineSeatReclineNormal,
  MdOutlineAlternateEmail,
  MdOutlineCalendarMonth,
  MdOutlineDirectionsCar,
  MdOutlineFormatColorFill,
  MdOutlineLocationOn,
  MdOutlinePerson2,
  MdOutlinePhone,
} from "react-icons/md";
import { LuFuel, LuMailbox } from "react-icons/lu";

const CarEditingPanel = ({ car, owner, saveInfo }) => {
  const [carData, setCarData] = useState(car);
  const [ownerData, setOwnerData] = useState(owner);
  const [uploadImages, setUploadImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const OPERATING_MODES = [
    "Bakhjulstrekk",
    "Framhjulstrekk",
    "Firehjulstrekk",
    "Annet",
  ];
  const GEARBOX_TYPES = ["Manuell", "Automat", "Annet"];
  const STATUS_OPTIONS = ["Vurdering", "Auksjon", "Solgt", "Annet"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOwnerInputChange = (e) => {
    const { name, value } = e.target;
    setOwnerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const deleteImageByName = (imageName) => {
    setCarData((prevData) => ({
      ...prevData,
      imagePaths: prevData.imagePaths.filter(
        (imageUrl) => !imageUrl.includes(imageName),
      ),
    }));
  };

  const submitSaveRequest = (e) => {
    e.preventDefault();
    saveInfo(carData, ownerData, uploadImages);
  };

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center py-28">
      <hr className="mb-2 mt-1 h-[4px] w-full max-w-[700px] bg-gunmental px-2" />
      <ImageCarousel
        images={carData.imagePaths}
        deleteImage={deleteImageByName}
      />
      <hr className="mb-4 mt-2 w-full max-w-[700px] border-[1px] border-dashed border-gunmental px-2" />
      <ImageInputField images={uploadImages} setImages={setUploadImages} />
      <form
        className="mt-4 flex w-full max-w-[700px] flex-col items-center px-2 md:px-0"
        onSubmit={submitSaveRequest}
        onReset={() => {
          setIsOpen(true);
        }}
      >
        <h1 className="text-2xl font-bold text-medium-gray">PERSONALIA</h1>
        <div className="flex w-full flex-col items-start">
          <TextInputField
            label={"Fullt Navn"}
            icon={<MdOutlinePerson2 className="h-4 w-4 md:h-5 md:w-5" />}
            name={"name"}
            initialValue={ownerData.name}
            onChange={handleOwnerInputChange}
          />
        </div>
        <TextInputField
          label={"Mobilnummer"}
          icon={<MdOutlinePhone className="h-4 w-4 md:h-5 md:w-5" />}
          name={"phoneNumber"}
          initialValue={ownerData.phoneNumber}
          onChange={handleOwnerInputChange}
        />
        <TextInputField
          label={"Epost"}
          icon={<MdOutlineAlternateEmail className="h-4 w-4 md:h-5 md:w-5" />}
          name={"email"}
          initialValue={ownerData.email}
          onChange={handleOwnerInputChange}
        />
        {owner.role !== "ONE_TIME_SELLER" && (
          <>
            {owner.role == "BUYER" && (
              <TextInputField
                label={"Land"}
                name="country"
                icon={
                  <MdOutlineLocationOn className="h-6 w-auto" color="#333" />
                }
                initialValue={ownerData.address.country}
                onChange={(e) =>
                  setOwnerData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      country: e.target.value,
                    },
                  }))
                }
              />
            )}
            <TextInputField
              label={"Gateadresse"}
              name="streetAddress"
              icon={<MdOutlineLocationOn className="h-6 w-auto" color="#333" />}
              initialValue={ownerData.address.streetAddress}
              onChange={(e) =>
                setOwnerData((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    streetAddress: e.target.value,
                  },
                }))
              }
            />
            <div className="flex w-full flex-row gap-2">
              <div className="basis-7/12">
                <TextInputField
                  label={"Poststed (By)"}
                  name="postalLocation"
                  icon={<LuMailbox className="h-4 w-4 md:h-5 md:w-5" />}
                  initialValue={ownerData.address.postalLocation}
                  onChange={(e) =>
                    setOwnerData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        postalLocation: e.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div className="basis-5/12">
                <TextInputField
                  label={"Postnummer"}
                  name="postalCode"
                  icon={<MdNumbers className="h-4 w-4 md:h-5 md:w-5" />}
                  initialValue={ownerData.address.postalCode}
                  onChange={(e) =>
                    setOwnerData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        postalCode: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          </>
        )}
        <hr className="mb-4 mt-4 w-10/12 border-[1px] border-dashed border-gunmental px-2" />
        <h1 className="mt-8 text-2xl font-bold text-medium-gray">
          BILENS INFO
        </h1>
        <TextInputField
          label={"Modell"}
          icon={<MdOutlineDirectionsCar className="h-4 w-4 md:h-5 md:w-5" />}
          name={"model"}
          initialValue={carData.model}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Merke"}
          icon={<MdOutlineDirectionsCar className="h-4 w-4 md:h-5 md:w-5" />}
          name={"make"}
          initialValue={carData.make}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Registrasjonsnummer"}
          icon={<MdNumbers className="h-4 w-4 md:h-5 md:w-5" />}
          name={"registrationNumber"}
          initialValue={carData.registrationNumber}
          onChange={handleInputChange}
        />
        <DateInputField
          label={"Førstegangsregistrering i Norge"}
          icon={<MdOutlineCalendarMonth className="h-4 w-4 md:h-5 md:w-5" />}
          name={"firstTimeRegisteredInNorway"}
          initialValue={carData.firstTimeRegisteredInNorway}
          onChange={handleInputChange}
        />
        <DateInputField
          label={"Neste EU-kontroll"}
          icon={<MdOutlineCalendarMonth className="h-4 w-4 md:h-5 md:w-5" />}
          name={"nextEUControl"}
          initialValue={carData.nextEUControl}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Kilometerstand"}
          icon={<MdNumbers className="h-4 w-4 md:h-5 md:w-5" />}
          name={"kilometers"}
          initialValue={carData.kilometers}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Drivstoff"}
          icon={<LuFuel className="h-4 w-4 md:h-5 md:w-5" />}
          name={"engineType"}
          initialValue={carData.engineType}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Motorvolum/slagvolum"}
          icon={<MdNumbers className="h-4 w-4 md:h-5 md:w-5" />}
          name={"engineVolume"}
          initialValue={carData.engineVolume}
          onChange={handleInputChange}
        />
        <p className="mt-4 text-base font-medium text-light-gray">Driftstype</p>
        <OptionsInput
          options={OPERATING_MODES}
          initialOption={carData.operatingMode}
          optionName={"operatingMode"}
          handleInputChange={handleInputChange}
        />
        <p className="mt-4 text-base font-medium text-light-gray">
          Girkassetype
        </p>
        <OptionsInput
          options={GEARBOX_TYPES}
          initialOption={carData.gearboxType}
          optionName={"gearboxType"}
          handleInputChange={handleInputChange}
        />
        <NumberInputField
          label={"Egenvekt"}
          icon={<MdNumbers className="h-4 w-4 md:h-5 md:w-5" />}
          name={"weight"}
          initialValue={carData.weight}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Karosseri"}
          icon={<MdOutlineDirectionsCar className="h-4 w-4 md:h-5 md:w-5" />}
          name={"bodywork"}
          initialValue={carData.bodywork}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Dørantall"}
          icon={<MdNumbers className="h-4 w-4 md:h-5 md:w-5" />}
          name={"numberOfDoors"}
          initialValue={carData.numberOfDoors}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Seteantall"}
          icon={
            <MdOutlineAirlineSeatReclineNormal className="h-4 w-4 md:h-5 md:w-5" />
          }
          name={"numberOfSeats"}
          initialValue={carData.numberOfSeats}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Farge"}
          icon={<MdOutlineFormatColorFill className="h-4 w-4 md:h-5 md:w-5" />}
          name={"color"}
          initialValue={carData.color}
          onChange={handleInputChange}
        />
        <hr className="mb-4 mt-4 w-10/12 border-[1px] border-dashed border-gunmental px-2" />
        <h1 className="mt-8 text-2xl font-bold text-medium-gray">
          TILLEGSINFO
        </h1>
        <div className="relative mb-3 mt-5 w-full">
          <div className="pointer-events-none absolute inset-y-0 start-0 top-5 flex items-baseline ps-5">
            <MdEdit className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <textarea
            id="add_info"
            className="block min-h-48 w-full rounded-lg border border-medium-gray bg-white px-5 py-4 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
            placeholder="Ytterligere opplysninger*"
            name={"additionalInformation"}
            value={carData.additionalInformation || ""}
            onChange={handleInputChange}
          />
        </div>
        <hr className="mb-4 mt-4 w-10/12 border-[1px] border-dashed border-gunmental px-2" />
        <h1 className="mt-8 text-2xl font-bold text-gunmental">STATUS</h1>
        <OptionsInput
          options={STATUS_OPTIONS}
          initialOption={carData.status}
          optionName={"status"}
          handleInputChange={handleInputChange}
        />
        <div className="fixed bottom-0 flex w-full flex-row items-center justify-center gap-2 bg-lighthouse/50 backdrop-blur md:gap-5">
          <button
            type="submit"
            className="card_shadow group mb-3 mt-3 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-3 pb-2 pt-1 text-lg font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:px-4 md:text-2xl"
          >
            Save For Now
          </button>
          <button
            type="reset"
            className="card_shadow group mb-3 mt-3 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-3 pb-2 pt-1 text-lg font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:px-4 md:text-2xl"
          >
            Reset
          </button>
        </div>
      </form>
      <MessageDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        message={
          "Are you sure you want to reset all data? After confirming all unsaved data will be lost."
        }
        onFunc={() => {
          setCarData(car);
          setOwnerData(owner);
        }}
      />
    </div>
  );
};

export default CarEditingPanel;
