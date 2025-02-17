import { useState } from "react";
import ImageCarousel from "../carousel/ImageCarousel";
import CarInfoElement from "./CarInfoElement";
import TextInputField from "../input/TextInputField";
import NumberInputField from "../input/NumberInputField";
import OptionsInput from "../input/OptionsInput";
import DateInputField from "../input/DateInputField";
import ImageInputField from "../input/ImageInputField";
import DeleteDialog from "../dialog/DeleteDialog";
import MessageDialog from "../dialog/MessageDialog";

const CarEditingPanel = ({ car, saveCar }) => {
  const [carData, setCarData] = useState(car);
  const [uploadImages, setUploadImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const OPERATING_MODES = [
    "Bakhjulstrekk",
    "Framhjulstrekk",
    "Firehjulstrekk",
    "Annet",
  ];
  const GEARBOX_TYPES = ["Manuell", "Automat", "Annet"];
  const STATUS_OPTIONS = ["In Review", "On Auction", "Sold", "Other"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
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
    saveCar(carData, uploadImages);
  };

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center py-28">
      <hr className="mb-2 mt-1 h-[4px] w-full max-w-[700px] bg-gunmental px-2" />
      <ImageCarousel
        images={carData.imagePaths}
        deleteImage={deleteImageByName}
      />
      <hr className="mb-4 mt-4 w-full max-w-[700px] border-[1px] border-dashed border-gunmental px-2" />
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
            icon={"../icons/person.png"}
            alt={"Person icon"}
            name={"name"}
            initialValue={carData.ownerInfo.name}
            onChange={(e) =>
              setCarData((prev) => ({
                ...prev,
                ownerInfo: { ...prev.ownerInfo, name: e.target.value },
              }))
            }
          />
        </div>
        <TextInputField
          label={"Mobilnummer"}
          icon={"../icons/phone.png"}
          alt={"Phone icon"}
          name={"phoneNumber"}
          initialValue={carData.ownerInfo.phoneNumber}
          onChange={(e) =>
            setCarData((prev) => ({
              ...prev,
              ownerInfo: { ...prev.ownerInfo, phoneNumber: e.target.value },
            }))
          }
        />
        <TextInputField
          label={"Epost"}
          icon={"../icons/email.png"}
          alt={"Email icon"}
          name={"email"}
          initialValue={carData.ownerInfo.email}
          onChange={(e) =>
            setCarData((prev) => ({
              ...prev,
              ownerInfo: { ...prev.ownerInfo, email: e.target.value },
            }))
          }
        />
        <hr className="mb-4 mt-4 w-10/12 border-[1px] border-dashed border-gunmental px-2" />
        <h1 className="mt-8 text-2xl font-bold text-medium-gray">
          BILENS INFO
        </h1>
        <TextInputField
          label={"Modell"}
          icon={"../icons/car.png"}
          alt={"Car icon"}
          name={"model"}
          initialValue={carData.model}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Merke"}
          icon={"../icons/car.png"}
          alt={"Car icon"}
          name={"make"}
          initialValue={carData.make}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Registrasjonsnummer"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          name={"registrationNumber"}
          initialValue={carData.registrationNumber}
          onChange={handleInputChange}
        />
        <DateInputField
          label={"Førstegangsregistrering i Norge"}
          icon={"../icons/date.png"}
          name={"firstTimeRegisteredInNorway"}
          alt={"Calendar icon"}
          initialValue={carData.firstTimeRegisteredInNorway}
          onChange={handleInputChange}
        />
        <DateInputField
          label={"Neste EU-kontroll"}
          icon={"../icons/date.png"}
          alt={"Calendar icon"}
          name={"nextEUControl"}
          initialValue={carData.nextEUControl}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Kilometerstand"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          name={"kilometers"}
          initialValue={carData.kilometers}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Drivstoff"}
          icon={"../icons/fuel.png"}
          alt={"Fuel icon"}
          name={"engineType"}
          initialValue={carData.engineType}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Motorvolum/slagvolum"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
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
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          name={"weight"}
          initialValue={carData.weight}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Karosseri"}
          icon={"../icons/car.png"}
          alt={"Car icon"}
          name={"bodywork"}
          initialValue={carData.bodywork}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Dørantall"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          name={"numberOfDoors"}
          initialValue={carData.numberOfDoors}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Seteantall"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          name={"numberOfSeats"}
          initialValue={carData.numberOfSeats}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Farge"}
          icon={"../icons/car.png"}
          alt={"Car icon"}
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
            <img
              src="../icons/edit_dark.png"
              alt="numbers icon"
              className="h-4 w-4 md:h-5 md:w-5"
            />
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
        onFunc={() => setCarData(car)}
      />
    </div>
  );
};

export default CarEditingPanel;
