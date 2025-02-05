import { useState } from "react";
import ImageCarousel from "../carousel/ImageCarousel";
import CarInfoElement from "./CarInfoElement";
import TextInputField from "../input/TextInputField";
import NumberInputField from "../input/NumberInputField";
import OptionsInput from "../input/OptionsInput";
import DateInputField from "../input/DateInputField";

const CarEditingPanel = ({ car, saveCar }) => {
  const [formData, setFormData] = useState(car);
  const OPERATING_MODES = [
    "Bakhjulstrekk",
    "Framhjulstrekk",
    "Firehjulstrekk",
    "Annet",
  ];
  const GEARBOX_TYPES = ["Manuell", "Automat", "Annet"];
  const STATUS_OPTIONS = ["In Review", "On Auction", "Sold", "Other"];
  const IMAGES = [
    { image: "../../car_images/car1.jpg" },
    { image: "../../car_images/car2.jpg" },
    { image: "../../car_images/car10.jpg" },
    { image: "../../car_images/car11.jpg" },
    { image: "../../car_images/car3.jpg" },
    { image: "../../car_images/car4.jpg" },
    { image: "../../car_images/car5.jpg" },
    { image: "../../car_images/car6.jpg" },
    { image: "../../car_images/car7.jpg" },
    { image: "../../car_images/car8.jpg" },
    { image: "../../car_images/car9.jpg" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitSaveRequest = (e) => {
    e.preventDefault();
    saveCar(formData);
  };

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center py-28">
      <hr className="mb-2 mt-1 h-[4px] w-full max-w-[700px] bg-gunmental px-2" />
      <ImageCarousel images={IMAGES} />
      <hr className="mb-4 mt-1 h-[4px] w-full max-w-[700px] bg-gunmental px-2" />
      <form
        className="mt-4 flex w-full max-w-[700px] flex-col items-center"
        onSubmit={submitSaveRequest}
      >
        <h1 className="text-2xl font-bold text-medium-gray">PERSONALIA</h1>
        <div className="flex w-full flex-col items-start">
          <TextInputField
            label={"Fullt Navn"}
            icon={"../icons/person.png"}
            alt={"Person icon"}
            name={"name"}
            initialValue={formData.ownerInfo.name}
            onChange={(e) =>
              setFormData((prev) => ({
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
          initialValue={formData.ownerInfo.phoneNumber}
          onChange={(e) =>
            setFormData((prev) => ({
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
          initialValue={formData.ownerInfo.email}
          onChange={(e) =>
            setFormData((prev) => ({
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
          initialValue={formData.model}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Merke"}
          icon={"../icons/car.png"}
          alt={"Car icon"}
          name={"make"}
          initialValue={formData.make}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Registrasjonsnummer"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          name={"registrationNumber"}
          initialValue={formData.registrationNumber}
          onChange={handleInputChange}
        />
        <DateInputField
          label={"Førstegangsregistrering i Norge"}
          icon={"../icons/date.png"}
          name={"firstTimeRegisteredInNorway"}
          alt={"Calendar icon"}
          initialValue={formData.firstTimeRegisteredInNorway}
          onChange={handleInputChange}
        />
        <DateInputField
          label={"Neste EU-kontroll"}
          icon={"../icons/date.png"}
          alt={"Calendar icon"}
          name={"nextEUControl"}
          initialValue={formData.nextEUControl}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Kilometerstand"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          name={"kilometers"}
          initialValue={formData.kilometers}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Drivstoff"}
          icon={"../icons/fuel.png"}
          alt={"Fuel icon"}
          name={"engineType"}
          initialValue={formData.engineType}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Motorvolum/slagvolum"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          name={"engineVolume"}
          initialValue={formData.engineVolume}
          onChange={handleInputChange}
        />
        <p className="mt-4 text-base font-medium text-light-gray">Driftstype</p>
        <OptionsInput
          options={OPERATING_MODES}
          initialOption={formData.operatingMode}
          optionName={"operatingMode"}
          handleInputChange={handleInputChange}
        />
        <p className="mt-4 text-base font-medium text-light-gray">
          Girkassetype
        </p>
        <OptionsInput
          options={GEARBOX_TYPES}
          initialOption={formData.gearboxType}
          optionName={"gearboxType"}
          handleInputChange={handleInputChange}
        />
        <NumberInputField
          label={"Egenvekt"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          name={"weight"}
          initialValue={formData.weight}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Karosseri"}
          icon={"../icons/car.png"}
          alt={"Car icon"}
          name={"bodywork"}
          initialValue={formData.bodywork}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Dørantall"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          name={"numberOfDoors"}
          initialValue={formData.numberOfDoors}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Seteantall"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          name={"numberOfSeats"}
          initialValue={formData.numberOfSeats}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Farge"}
          icon={"../icons/car.png"}
          alt={"Car icon"}
          name={"color"}
          initialValue={formData.color}
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
            value={formData.additionalInformation || ""}
            onChange={handleInputChange}
          />
        </div>
        <hr className="mb-4 mt-4 w-10/12 border-[1px] border-dashed border-gunmental px-2" />
        <h1 className="mt-8 text-2xl font-bold text-gunmental">STATUS</h1>
        <OptionsInput
          options={STATUS_OPTIONS}
          initialOption={formData.status}
          optionName={"status"}
          handleInputChange={handleInputChange}
        />
        <div className="fixed bottom-0 flex w-full flex-row items-center justify-center gap-5 bg-lighthouse/50 backdrop-blur">
          <button
            type="submit"
            className="card_shadow group mb-3 mt-3 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-4 pb-2 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:text-2xl"
          >
            Save For Now
          </button>
          <button className="card_shadow group mb-3 mt-3 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-4 pb-2 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:text-2xl">
            Save & Put to the Auction
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarEditingPanel;
