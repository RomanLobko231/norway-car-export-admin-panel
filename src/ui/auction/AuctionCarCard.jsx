import {
  TbCarOff,
  TbCoins,
  TbDotsVertical,
  TbStar,
  TbTrashX,
} from "react-icons/tb";
import DeleteDialog from "../dialog/DeleteDialog";
import AuctionCountdown from "./AuctionCountdown";
import { useNavigate } from "react-router";
import SpecificationItem from "./SpecificationItem";
import { MdDelete, MdEdit, MdOutlineTrendingUp } from "react-icons/md";
import CarContextMenu from "../car/CarContextMenu";
import { useCallback, useState } from "react";
import EditAuctionDialog from "./dialog/EditAuctionDialog";
import HighestBidderDialog from "./dialog/HighestBidderDialog";

const AuctionCarCard = ({ auctionInfo, onDelete, setAuctionStatus }) => {
  const navigate = useNavigate();

  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const menuOptions = [
    {
      label: "Markere som Avsluttet",
      onClick: () => {
        handleSetStatus("Avsluttet");
        setIsMenuOpen(false);
      },
    },
    {
      label: "Markere som Deaktivert",
      onClick: () => {
        handleSetStatus("Deaktivert");
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
        //navigate(`/auction/${auctionInfo.id}`);
      }}
      className="card_shadow hover:card_shadow_hover active:card_shadow_click flex w-[300px] cursor-pointer flex-col items-center gap-6 rounded-md border border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud p-4 duration-300 xl:w-[620px] xl:flex-row"
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
          <div
            className={`rounded-[4px] border-medium-gray ${auctionInfo.highestBid && "hover:-m-[1px] hover:border-[1px] hover:bg-swamp-100"}`}
            onClick={(e) => {
              if (auctionInfo.highestBid) setIsUserOpen(true);
              e.stopPropagation();
            }}
          >
            <SpecificationItem
              type={"Høyeste Bud"}
              value={auctionInfo.highestBid?.amount ?? "Ingen Bud"}
              icon={<TbStar />}
            />
          </div>
        </div>
        <hr className="mb-2 mt-3 h-[1px] w-full border border-dashed bg-light-gray opacity-50" />
        <div className="flex w-full flex-row items-center justify-between text-center text-base font-semibold text-light-gray">
          Avslutes om
          <AuctionCountdown utcEndTime={auctionInfo.endDateTime} />
        </div>
      </div>
      <div className="mb-2 flex flex-row items-center justify-center gap-2 xl:h-full xl:flex-col">
        <button
          className="flex rounded-lg border border-medium-gray p-1 text-medium-gray hover:bg-medium-gray hover:text-lighthouse disabled:opacity-35 disabled:hover:bg-lighthouse disabled:hover:text-medium-gray"
          onClick={(e) => {
            setIsUpdateOpen(true);
            e.stopPropagation();
          }}
          disabled={auctionInfo.status == "Aktivt"}
        >
          <MdEdit className="h-auto w-8" />
        </button>
        <button
          className="flex rounded-lg border border-danger-red p-1 text-danger-red hover:bg-danger-red hover:text-lighthouse disabled:opacity-35 disabled:hover:bg-lighthouse disabled:hover:text-danger-red"
          onClick={(e) => {
            setIsDelOpen(true);
            e.stopPropagation();
          }}
          disabled={auctionInfo.status == "Aktivt"}
        >
          <TbTrashX className="h-auto w-8" />
        </button>
        <button
          className="relative flex rounded-lg border border-medium-gray p-1 text-medium-gray hover:bg-medium-gray hover:text-lighthouse"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((prev) => !prev);
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
      {isUserOpen && (
        <HighestBidderDialog
          open={isUserOpen}
          setOpen={setIsUserOpen}
          bidderId={auctionInfo.highestBid?.bidderId}
        />
      )}

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
