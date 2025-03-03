import { useNavigate } from "react-router";
import CarInfoElement from "./CarInfoElement";
import DeleteDialog from "../dialog/DeleteDialog";
import { useCallback, useState } from "react";
import TextInputField from "../input/TextInputField";
import { TbCarOff } from "react-icons/tb";
import { MdDelete, MdEdit } from "react-icons/md";

const CarCard = ({ carInfo, onDelete }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = useCallback(() => {
    onDelete(carInfo.id);
  }, [onDelete, carInfo.id]);

  return (
    <div
      onClick={() => {
        navigate(`/car/${carInfo.id}`);
      }}
      className="card_shadow hover:card_shadow_hover active:card_shadow_click flex w-[300px] cursor-pointer flex-col items-center rounded-md border border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud p-3 duration-300 hover:-translate-y-1"
    >
      {carInfo.imagePaths[0] ? (
        <img
          src={carInfo.imagePaths[0]}
          alt={carInfo.model ?? "Car"}
          className="h-[185px] w-full rounded border border-swamp-500 object-cover"
        />
      ) : (
        <div className="flex h-[185px] w-full items-center justify-center rounded border border-medium-gray bg-lighthouse from-swamp-100">
          <TbCarOff className="h-10 w-auto" color="#888" />
        </div>
      )}
      <hr className="mt-3 h-[1px] w-full border border-dashed bg-light-gray opacity-50" />

      <div className="mb-2 mt-1 flex w-full flex-row items-center justify-between">
        <h1 className="inline-block truncate whitespace-nowrap bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-xl font-bold leading-[26px] text-transparent">
          {carInfo.make ?? "-"} {carInfo.model ?? "-"}
        </h1>
        <div className="mx-3 h-[1px] flex-grow bg-light-gray opacity-50"></div>
        <h1 className="inline-block bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-lg font-bold text-transparent">
          {carInfo.firstTimeRegisteredInNorway.substring(0, 4)}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <CarInfoElement info={`EU: ${carInfo.nextEUControl ?? "-"}`} />
        <CarInfoElement info={carInfo.gearboxType ?? "-"} />
        <CarInfoElement info={carInfo.engineType ?? "-"} />
        <CarInfoElement info={`${carInfo.kilometers ?? "-"} KMs`} />
      </div>
      <hr className="mt-3 h-[1px] w-full border border-dashed bg-light-gray opacity-50" />
      <div className="flex w-full flex-row items-center justify-center gap-3">
        <button className="card_shadow mb-2 mt-5 flex flex-row items-center gap-2 rounded-lg border border-medium-gray bg-white px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse">
          Edit
          <MdEdit />
        </button>
        <button
          onClick={(e) => {
            setIsOpen(true);
            e.stopPropagation();
          }}
          className="card_shadow mb-2 mt-5 flex flex-row items-center gap-2 rounded-lg border border-medium-gray bg-white px-4 pb-1 pt-1 text-xl font-semibold text-danger-red hover:bg-danger-red hover:text-lighthouse"
        >
          Delete
          <MdDelete />
        </button>
      </div>
      <DeleteDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDelete={handleDelete}
      />
    </div>

    // <div
    //   onClick={() => {
    //     navigate(`/car/${carInfo.id}`);
    //   }}
    //   className="card_shadow hover:card_shadow_hover active:card_shadow_click flex h-[440px] w-[300px] cursor-pointer flex-col items-center rounded-md border border-light-gray bg-slate-50 p-3 duration-300 hover:-translate-y-1"
    // >
    //   {carInfo.imagePaths[0] ? (
    //     <img
    //       src={carInfo.imagePaths[0]}
    //       alt="Car Name"
    //       className="h-[185px] w-full rounded border border-medium-gray object-cover"
    //     />
    //   ) : (
    //     <div className="from-swamp-100 flex h-[185px] w-full items-center justify-center rounded border border-medium-gray bg-lighthouse">
    //       <TbCarOff className="h-10 w-auto" color="#888" />
    //     </div>
    //   )}

    //   <h1 className="my-1 text-xl font-semibold leading-6 text-gunmental">
    //     {carInfo.make ?? "-"} {carInfo.model ?? "-"}
    //   </h1>
    //   <hr className="mb-2 mt-1 h-[2px] w-full bg-slate-950" />
    //   <div className="flex flex-wrap items-center gap-2">
    //     <CarInfoElement info={carInfo.registrationNumber ?? "-"} />
    //     <CarInfoElement info={`EU: ${carInfo.nextEUControl ?? "-"}`} />
    //     <CarInfoElement info={`${carInfo.kilometers ?? "-"} KMs`} />
    //     <CarInfoElement info={carInfo.status ?? "-"} />
    //   </div>
    //   <div className="flex w-full flex-row items-center justify-center gap-3">
    //     <button className="card_shadow group mb-2 mt-5 flex flex-row items-center rounded-full border border-medium-gray bg-white px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse">
    //       Edit
    //       <img
    //         src="../icons/edit_dark.png"
    //         className="ml-2 mr-1 block h-[14px] w-auto group-hover:hidden"
    //         alt="edit button"
    //       />
    //       <img
    //         src="../icons/edit_light.png"
    //         className="ml-2 mr-1 hidden h-[14px] w-auto group-hover:block"
    //         alt="edit button"
    //       />
    //     </button>
    //     <button
    //       onClick={(e) => {
    //         setIsOpen(true);
    //         e.stopPropagation();
    //       }}
    //       className="card_shadow group mb-2 mt-5 flex flex-row items-center rounded-full border border-medium-gray bg-white px-4 pb-1 pt-1 text-xl font-semibold text-danger-red hover:bg-danger-red hover:text-lighthouse"
    //     >
    //       Delete
    //       <img
    //         src="../icons/delete_dark.png"
    //         className="ml-2 mr-1 block h-[14px] w-auto group-hover:hidden"
    //         alt="delete button"
    //       />
    //       <img
    //         src="../icons/delete_light.png"
    //         className="ml-2 mr-1 hidden h-[14px] w-auto group-hover:block"
    //         alt="delete button"
    //       />
    //     </button>
    //   </div>
    //   <DeleteDialog
    //     isOpen={isOpen}
    //     setIsOpen={setIsOpen}
    //     onDelete={handleDelete}
    //   />
    // </div>
  );
};

export default CarCard;
