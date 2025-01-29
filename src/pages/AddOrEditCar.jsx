import React from "react";
import ImageCarousel from "../ui/carousel/ImageCarousel";
import CarInfoElement from "../ui/CarInfoElement";
import TextInput from "../ui/input/InputField";
import InputField from "../ui/input/InputField";

const AddOrEditCar = () => {
  const OPTIONS = {};
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

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center py-28">
      <hr className="mb-2 mt-1 h-[4px] w-full max-w-[700px] bg-gunmental px-2" />
      <ImageCarousel images={IMAGES} options={OPTIONS} />
      <hr className="mb-4 mt-1 h-[4px] w-full max-w-[700px] bg-gunmental px-2" />
      <form className="mt-4 flex w-full max-w-[700px] flex-col items-center">
        <h1 className="text-2xl font-bold text-medium-gray">PERSONALIA</h1>
        <InputField
          label={"Fullt Navn"}
          icon={"../icons/person.png"}
          alt={"Person icon"}
          initialValue={""}
          type={"text"}
        />
        <InputField
          label={"Mobilnummer"}
          icon={"../icons/phone.png"}
          alt={"Phone icon"}
          initialValue={""}
          type={"text"}
        />
        <InputField
          label={"Epost"}
          icon={"../icons/email.png"}
          alt={"Email icon"}
          initialValue={""}
          type={"email"}
        />
        <hr className="mb-4 mt-4 w-10/12 border-[1px] border-dashed border-gunmental px-2" />
        <h1 className="mt-8 text-2xl font-bold text-medium-gray">
          BILENS INFO
        </h1>
        <InputField
          label={"Modell"}
          icon={"../icons/car.png"}
          alt={"Car icon"}
          initialValue={""}
          type={"text"}
        />
        <InputField
          label={"Merke"}
          icon={"../icons/car.png"}
          alt={"Car icon"}
          initialValue={""}
          type={"text"}
        />
        <InputField
          label={"Registrasjonsnummer"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          initialValue={""}
          type={"text"}
        />
        <InputField
          label={"Førstegangsregistrering i Norge"}
          icon={"../icons/date.png"}
          alt={"Calendar icon"}
          initialValue={""}
          type={"text"}
        />
        <InputField
          label={"Neste EU-kontroll"}
          icon={"../icons/date.png"}
          alt={"Calendar icon"}
          initialValue={""}
          type={"text"}
        />
        <InputField
          label={"Kilometerstand"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          initialValue={""}
          type={"number"}
        />
        <InputField
          label={"Drivstoff"}
          icon={"../icons/fuel.png"}
          alt={"Fuel icon"}
          initialValue={""}
          type={"text"}
        />
        <InputField
          label={"Motorvolum/slagvolum"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          initialValue={""}
          type={"number"}
        />
        <InputField
          label={"Driftstype"}
          icon={"../icons/gear.png"}
          alt={"Gears icon"}
          initialValue={""}
          type={"text"}
        />
        <InputField
          label={"Girkassetype"}
          icon={"../icons/gear.png"}
          alt={"Gears icon"}
          initialValue={""}
          type={"text"}
        />
        <InputField
          label={"Egenvekt"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          initialValue={""}
          type={"number"}
        />
        <InputField
          label={"Karosseri"}
          icon={"../icons/car.png"}
          alt={"Car icon"}
          initialValue={""}
          type={"text"}
        />
        <InputField
          label={"Dørantall"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          initialValue={""}
          type={"number"}
        />
        <InputField
          label={"Seteantall"}
          icon={"../icons/numbers.png"}
          alt={"Numbers icon"}
          initialValue={""}
          type={"number"}
        />
        <InputField
          label={"Farge"}
          icon={"../icons/car.png"}
          alt={"Car icon"}
          initialValue={""}
          type={"text"}
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
            type="text"
            id="add_info"
            class="block min-h-48 w-full rounded-lg border border-medium-gray bg-white px-5 py-4 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
            placeholder="Ytterligere opplysninger*"
            required
          />
        </div>
        <hr className="mb-4 mt-4 w-10/12 border-[1px] border-dashed border-gunmental px-2" />
        <h1 className="mt-8 text-2xl font-bold text-gunmental">STATUS</h1>
        <div className="mt-6 flex w-full flex-row items-center justify-center gap-4">
          <CarInfoElement info={"In Review"} />
          <CarInfoElement info={"Auctioning"} />
          <CarInfoElement info={"Sold"} />
        </div>
        <div className="fixed bottom-0 flex w-full flex-row items-center justify-center gap-5 bg-lighthouse/50 backdrop-blur">
          <button
            type="submit"
            className="card_shadow group mb-3 mt-3 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-4 pb-2 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:text-2xl"
          >
            Save For Now
          </button>
          <button
            type="submit"
            className="card_shadow group mb-3 mt-3 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-4 pb-2 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:text-2xl"
          >
            Save & Put to the Auction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrEditCar;
