import { useNavigate } from "react-router";
import CarInfoElement from "./CarInfoElement";
import DeleteDialog from "../dialog/DeleteDialog";
import { useCallback, useState } from "react";
import TextInputField from "../input/TextInputField";
import { TbCarOff, TbDotsVertical } from "react-icons/tb";
import { MdDelete, MdEdit } from "react-icons/md";

const CarCard = ({ carInfo, onDelete, setCarStatus }) => {
  const navigate = useNavigate();
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDelete = useCallback(() => {
    onDelete(carInfo.id);
  }, [onDelete, carInfo.id]);

  const handleSetStatus = useCallback(
    (status) => {
      setCarStatus(status, carInfo.id);
    },
    [setCarStatus, carInfo.id],
  );

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

      <div className="mb-2 mt-5 flex w-full flex-row flex-wrap items-center justify-between">
        <button className="card_shadow disabled:card_shadow_click flex flex-row items-center gap-2 rounded-lg border border-medium-gray bg-white px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse disabled:border-light-gray disabled:text-light-gray disabled:hover:bg-white disabled:hover:text-light-gray">
          Endre
          <MdEdit />
        </button>
        <button
          onClick={(e) => {
            setIsDelOpen(true);
            e.stopPropagation();
          }}
          className="card_shadow disabled:card_shadow_click flex flex-row items-center gap-2 rounded-lg border border-danger-red bg-white px-4 pb-1 pt-1 text-xl font-semibold text-danger-red hover:bg-danger-red hover:text-lighthouse disabled:border-danger-red/50 disabled:text-danger-red/50 disabled:hover:bg-white disabled:hover:text-danger-red/50"
        >
          Slette
          <MdDelete />
        </button>
        <div className="relative flex items-center">
          <TbDotsVertical
            className="h-7 w-auto hover:opacity-35"
            color="#333333"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
          />
          {isMenuOpen && (
            <div className="absolute right-8 top-12 z-10 rounded-md border border-medium-gray bg-lighthouse md:-left-2 md:right-auto md:top-10">
              {carInfo.status !== "Auksjon" && (
                <>
                  <div
                    className="cursor-pointer text-nowrap rounded-md px-4 py-2 text-base font-medium text-medium-gray hover:bg-swamp-100 md:text-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      // send to auction create page/form/modal
                    }}
                  >
                    Sette til Auksjon
                  </div>
                  <hr className="h-[1px] w-full border border-dashed bg-light-gray opacity-50" />
                </>
              )}
              {carInfo.status !== "Vurdering" && (
                <>
                  <div
                    className="cursor-pointer text-nowrap rounded-md px-4 py-2 text-base font-medium text-medium-gray hover:bg-swamp-100 md:text-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetStatus("Vurdering");
                    }}
                  >
                    Sette til Vurdering
                  </div>
                  <hr className="h-[1px] w-full border border-dashed bg-light-gray opacity-50" />
                </>
              )}
              {carInfo.status !== "Annet" && (
                <>
                  <div
                    className="cursor-pointer text-nowrap rounded-md px-4 py-2 text-base font-medium text-medium-gray hover:bg-swamp-100 md:text-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetStatus("Annet");
                    }}
                  >
                    Sette til Annet
                  </div>
                  <hr className="h-[1px] w-full border border-dashed bg-light-gray opacity-50" />
                </>
              )}
              {carInfo.status !== "Solgt" && (
                <>
                  <div
                    className="cursor-pointer text-nowrap rounded-md px-4 py-2 text-base font-medium text-medium-gray hover:bg-swamp-100 md:text-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetStatus("Solgt");
                    }}
                  >
                    Markere som Solgt
                  </div>
                  <hr className="h-[1px] w-full border border-dashed bg-light-gray opacity-50" />
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <DeleteDialog
        isOpen={isDelOpen}
        setIsOpen={setIsDelOpen}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CarCard;
