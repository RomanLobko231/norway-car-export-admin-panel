import React from "react";
import ImageCarousel from "../ui/carousel/ImageCarousel";

const AddOrEditCar = () => {
  const OPTIONS = {};
  const IMAGES = [
    { image: "../../car_images/car1.jpg" },
    { image: "../../car_images/car2.jpg" },
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
      <h1 className="mb-12 text-xl font-light text-gunmental">
        Edit existing or Add a new car
      </h1>
      <ImageCarousel images={IMAGES} options={OPTIONS} />
      <form className="flex w-full max-w-[700px] flex-col items-center md:px-2">
        <h1 className="text-2xl font-semibold text-gunmental">Personal Info</h1>
        <div className="relative mb-4 mt-6 w-full">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-5">
            <img
              src="../icons/person.png"
              alt="Person icon"
              className="h-4 w-4 md:h-5 md:w-5"
            />
          </div>
          <input
            type="text"
            id="name"
            class="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
            placeholder="Fullt Navn*"
            required
          />
        </div>
        <div className="relative mb-4 w-full">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-5">
            <img
              src="../icons/phone.png"
              alt="Phone icon"
              className="h-4 w-4 md:h-5 md:w-5"
            />
          </div>

          <input
            type="number"
            id="telephone"
            className="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
            placeholder="Mobilnummer*"
            required
          />
        </div>
        <div className="relative mb-4 w-full">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-5">
            <img
              src="../icons/email.png"
              alt="Email icon"
              className="h-4 w-4 md:h-5 md:w-5"
            />
          </div>

          <input
            type="email"
            id="email"
            className="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
            placeholder="Email*"
            required
          />
        </div>
        <h1 className="mt-8 text-2xl font-semibold text-gunmental">Car Info</h1>
        <div className="relative mb-4 mt-6 w-full">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-5">
            <img
              src="../icons/numbers.png"
              alt="numbers icon"
              className="h-4 w-4 md:h-5 md:w-5"
            />
          </div>
          <input
            type="number"
            id="reg_num"
            class="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
            placeholder="Registrasjonsnr.*"
            required
          />
        </div>
        <div className="relative mb-4 w-full">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-5">
            <img
              src="../icons/numbers.png"
              alt="numbers icon"
              className="h-4 w-4 md:h-5 md:w-5"
            />
          </div>
          <input
            type="number"
            id="km_num"
            class="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
            placeholder="Kilometerstand*"
            required
          />
        </div>
        <div className="relative mb-4 w-full">
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
            class="block min-h-48 w-full rounded-xl border border-medium-gray bg-white px-5 py-4 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
            placeholder="Additional Info*"
            required
          />
        </div>
        <div className="mt-4 flex w-full flex-row items-center justify-between">
          <button
            type="submit"
            className="card_shadow group mb-2 mt-5 flex flex-row items-center rounded-full border border-medium-gray bg-lighthouse px-4 pb-2 pt-1 text-2xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse"
          >
            Save For Now
          </button>
          <button
            type="submit"
            className="card_shadow group mb-2 mt-5 flex flex-row items-center rounded-full border border-medium-gray bg-lighthouse px-4 pb-2 pt-1 text-2xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse"
          >
            Save & Put to the Auction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrEditCar;
