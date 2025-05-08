import { TbCarOff, TbCoins, TbDotsVertical, TbTrashX } from "react-icons/tb";
import DeleteDialog from "../dialog/DeleteDialog";
import AuctionCountdown from "./AuctionCountdown";
import { useNavigate } from "react-router";
import SpecificationItem from "./SpecificationItem";
import { MdDelete, MdEdit, MdOutlineTrendingUp } from "react-icons/md";
import CarContextMenu from "../car/CarContextMenu";
import { useCallback, useState } from "react";
import EditAuctionDialog from "./dialog/EditAuctionDialog";

// const AuctionCarCard = ({ auctionInfo, onDelete }) => {
//   const navigate = useNavigate();

//   const [isDelOpen, setIsDelOpen] = useState(false);

//   const handleDelete = () => {};
//   return (
//     <div
//       onClick={() => {
//         navigate(`/auction/${auctionInfo.id}`);
//       }}
//       className="card_shadow hover:card_shadow_hover active:card_shadow_click flex w-[300px] cursor-pointer flex-col items-center rounded-md border border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud p-3 duration-300 hover:-translate-y-1"
//     >
//       {auctionInfo.carDetails.thumbnailImageUrl ? (
//         <img
//           src={auctionInfo.carDetails.thumbnailImageUrl}
//           alt={auctionInfo.carDetails.makeModel ?? "Car"}
//           className="h-[185px] w-full rounded border border-swamp-500 object-cover"
//         />
//       ) : (
//         <div className="flex h-[185px] w-full items-center justify-center rounded border border-medium-gray bg-lighthouse from-swamp-100">
//           <TbCarOff className="h-10 w-auto" color="#888" />
//         </div>
//       )}
//       <hr className="mt-3 h-[1px] w-full border border-dashed bg-light-gray opacity-50" />

//       <div className="mb-2 mt-1 flex w-full flex-row items-center justify-between">
//         <h1 className="inline-block truncate whitespace-nowrap bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-xl font-bold leading-[26px] text-transparent">
//           {auctionInfo.carDetails.makeModel ?? "-"}
//         </h1>
//         <div className="mx-3 h-[1px] flex-grow bg-light-gray opacity-50"></div>
//         <h1 className="inline-block bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-lg font-bold text-transparent">
//           {auctionInfo.carDetails.modelYear ?? ""}
//         </h1>
//       </div>
//       <hr className="mb-3 h-[1px] w-full border border-dashed bg-light-gray opacity-50" />

//       <div className="flex w-full flex-col gap-[0.35rem]">
//         <SpecificationItem
//           type={"Start Pris"}
//           value={auctionInfo.startingPrice}
//           icon={<TbCoins />}
//         />
//         <SpecificationItem
//           type={"Min Steg"}
//           value={auctionInfo.minimalStep}
//           icon={<MdOutlineTrendingUp />}
//         />
//         <SpecificationItem
//           type={"Forventet Pris"}
//           value={auctionInfo.expectedPrice}
//           icon={<TbCoins />}
//         />
//         <SpecificationItem
//           type={"Høyeste Bud"}
//           value={auctionInfo.highestBid ?? "Ingen Bud"}
//           icon={<TbCoins />}
//         />
//       </div>

//       <hr className="mt-3 h-[1px] w-full border border-dashed bg-light-gray opacity-50" />

//       <div className="mt-3 flex w-full flex-row items-center justify-between text-center text-base font-semibold text-medium-gray">
//         Avslutes om
//         <AuctionCountdown utcEndTime={auctionInfo.endDateTime} />
//       </div>
//       <div className="mb-2 mt-3 flex w-full flex-row flex-wrap items-center justify-between">
//         <button className="card_shadow disabled:card_shadow_click flex flex-row items-center gap-2 rounded-lg border border-medium-gray bg-white px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse disabled:border-light-gray disabled:text-light-gray disabled:hover:bg-white disabled:hover:text-light-gray">
//           Endre
//           <MdEdit />
//         </button>
//         <button
//           onClick={(e) => {
//             setIsDelOpen(true);
//             e.stopPropagation();
//           }}
//           className="card_shadow disabled:card_shadow_click flex flex-row items-center gap-2 rounded-lg border border-danger-red bg-white px-4 pb-1 pt-1 text-xl font-semibold text-danger-red hover:bg-danger-red hover:text-lighthouse disabled:border-danger-red/50 disabled:text-danger-red/50 disabled:hover:bg-white disabled:hover:text-danger-red/50"
//         >
//           Slette
//           <MdDelete />
//         </button>
//         <div className="relative flex items-center">
//           <TbDotsVertical
//             className="h-7 w-auto hover:opacity-35"
//             color="#333333"
//             onClick={(e) => {
//               e.stopPropagation();
//               //setIsMenuOpen((prev) => !prev);
//             }}
//           />
//           {/* {isMenuOpen && (
//             <CarContextMenu
//               options={menuOptions.filter(
//                 (o) => o.label.trim().split(" ").pop() !== auctionInfo.status,
//               )}
//             />
//           )} */}
//         </div>
//       </div>
//       <DeleteDialog
//         isOpen={isDelOpen}
//         setIsOpen={setIsDelOpen}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// };

// export default AuctionCarCard;

const AuctionCarCard = ({ auctionInfo, onDelete, setAuctionStatus }) => {
  const navigate = useNavigate();

  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOptions = [
    {
      label: "Markere som Avsluttet",
      onClick: () => {
        handleSetStatus("Avsluttet");
        setIsMenuOpen(false);
      },
    },
    {
      label: "Markere som Aktivt",
      onClick: () => {
        handleSetStatus("Aktivt");
        setIsMenuOpen(false);
      },
    },
  ];

  const handleDelete = useCallback(() => {
    onDelete(auctionInfo.id);
  }, [onDelete, auctionInfo.id]);

  const handleSetStatus = useCallback(
    (status) => {
      setAuctionStatus(status, auctionInfo.id);
    },
    [setAuctionStatus, auctionInfo.id],
  );

  return (
    <div
      onClick={() => {
        navigate(`/auction/${auctionInfo.id}`);
      }}
      className="card_shadow hover:card_shadow_hover active:card_shadow_click flex w-[300px] cursor-pointer flex-col items-center gap-6 rounded-md border border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud p-4 duration-300 hover:-translate-y-1 xl:w-[620px] xl:flex-row"
    >
      <div className="h-[185px] w-full overflow-hidden rounded border border-swamp-500 xl:h-[220px] xl:min-w-[220px] xl:max-w-[220px]">
        {auctionInfo.carDetails.thumbnailImageUrl ? (
          <img
            src={auctionInfo.carDetails.thumbnailImageUrl}
            alt={auctionInfo.carDetails.makeModel ?? "Car"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full object-cover">
            <TbCarOff className="h-10 w-auto" color="#888" />
          </div>
        )}
      </div>

      <div className="flex w-full max-w-[285px] flex-col items-center md:justify-between xl:h-full">
        <div className="mb-1 flex w-full items-center gap-2">
          <div className="w-full truncate whitespace-nowrap bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-xl font-bold text-transparent">
            {auctionInfo.carDetails.makeModel ?? "-"}
          </div>

          <div className="h-[1px] flex-grow bg-light-gray opacity-50" />

          <div className="whitespace-nowrap bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-lg font-bold text-transparent">
            {auctionInfo.carDetails.modelYear ?? ""}
          </div>
        </div>

        <div className="mt-1 flex w-full flex-col gap-1 rounded-md border border-dashed border-medium-gray bg-lighthouse p-2">
          <SpecificationItem
            type={"Start Pris"}
            value={auctionInfo.startingPrice}
            icon={<TbCoins />}
          />
          <SpecificationItem
            type={"Min Steg"}
            value={auctionInfo.minimalStep}
            icon={<MdOutlineTrendingUp />}
          />
          <SpecificationItem
            type={"Forventet Pris"}
            value={auctionInfo.expectedPrice}
            icon={<TbCoins />}
          />
          <SpecificationItem
            type={"Høyeste Bud"}
            value={auctionInfo.highestBid ?? "Ingen Bud"}
            icon={<TbCoins />}
          />
        </div>
        <hr className="mb-2 mt-3 h-[1px] w-full border border-dashed bg-light-gray opacity-50" />
        <div className="flex w-full flex-row items-center justify-between text-center text-base font-semibold text-light-gray">
          Avslutes om
          <AuctionCountdown utcEndTime={auctionInfo.endDateTime} />
        </div>
      </div>
      <div className="mb-2 flex flex-row items-center justify-center gap-2 xl:h-full xl:flex-col">
        <button
          className="flex rounded-lg border border-medium-gray p-1 text-medium-gray hover:bg-medium-gray hover:text-lighthouse"
          onClick={(e) => {
            setIsUpdateOpen(true);
            e.stopPropagation();
          }}
        >
          <MdEdit className="h-auto w-8" />
        </button>
        <button
          className="flex rounded-lg border border-danger-red p-1 text-danger-red hover:bg-danger-red hover:text-lighthouse"
          onClick={(e) => {
            setIsDelOpen(true);
            e.stopPropagation();
          }}
        >
          <TbTrashX className="h-auto w-8" />
        </button>
        <button
          className="relative flex rounded-lg border border-medium-gray p-1 text-medium-gray hover:bg-medium-gray hover:text-lighthouse"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((prev) => !prev);
            console.log(auctionInfo);
          }}
        >
          <TbDotsVertical className="h-auto w-8" />
          {isMenuOpen && (
            <CarContextMenu
              options={menuOptions.filter(
                (o) => o.label.trim().split(" ").pop() !== auctionInfo.status,
              )}
            />
          )}
        </button>
      </div>

      <DeleteDialog
        isOpen={isDelOpen}
        setIsOpen={setIsDelOpen}
        onDelete={handleDelete}
      />
      <EditAuctionDialog
        open={isUpdateOpen}
        setOpen={setIsUpdateOpen}
        auction={auctionInfo}
      />
    </div>
  );
};

export default AuctionCarCard;
