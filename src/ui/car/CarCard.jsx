import { useNavigate } from "react-router";
import CarInfoElement from "./CarInfoElement";
import DeleteDialog from "../DeleteDialog";
import { useCallback, useState } from "react";

const CarCard = ({ carInfo, onDelete }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = useCallback(() => {
    onDelete(carInfo.id);
  }, [onDelete, carInfo.id]);

  return (
    <div
      onClick={() => {
        navigate(`/car/${carInfo.id}`, { state: { car: carInfo } });
      }}
      className="card_shadow hover:card_shadow_hover active:card_shadow_click flex h-[440px] w-[300px] cursor-pointer flex-col items-center rounded-md border border-light-gray bg-slate-50 p-3 duration-300 hover:-translate-y-1"
    >
      <img
        src="./../car_example.jpg"
        alt="Car Name"
        className="w-full rounded border border-medium-gray object-cover"
      />
      <h1 className="my-1 text-xl font-semibold leading-6 text-gunmental">
        {carInfo.make} {carInfo.model}
      </h1>
      <hr className="mb-2 mt-1 h-[2px] w-full bg-slate-950" />
      <div className="flex flex-wrap items-center gap-2">
        <CarInfoElement info={carInfo.registrationNumber} />
        <CarInfoElement info={`EU: ${carInfo.nextEUControl}`} />
        <CarInfoElement info={`${carInfo.kilometers} KMs`} />
        <CarInfoElement info={carInfo.status} />
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-3">
        <button className="card_shadow hover: group mb-2 mt-5 flex flex-row items-center rounded-full border border-medium-gray bg-white px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse">
          Edit
          <img
            src="../icons/edit_dark.png"
            className="ml-2 mr-1 block h-[14px] w-auto group-hover:hidden"
            alt="edit button"
          />
          <img
            src="../icons/edit_light.png"
            className="ml-2 mr-1 hidden h-[14px] w-auto group-hover:block"
            alt="edit button"
          />
        </button>
        <button
          onClick={(e) => {
            setIsOpen(true);
            e.stopPropagation();
          }}
          className="card_shadow hover: group mb-2 mt-5 flex flex-row items-center rounded-full border border-medium-gray bg-white px-4 pb-1 pt-1 text-xl font-semibold text-danger-red hover:bg-danger-red hover:text-lighthouse"
        >
          Delete
          <img
            src="../icons/delete_dark.png"
            className="ml-2 mr-1 block h-[14px] w-auto group-hover:hidden"
            alt="delete button"
          />
          <img
            src="../icons/delete_light.png"
            className="ml-2 mr-1 hidden h-[14px] w-auto group-hover:block"
            alt="delete button"
          />
        </button>
      </div>
      <DeleteDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CarCard;
