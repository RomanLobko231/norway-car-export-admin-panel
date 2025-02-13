import { useState } from "react";
import { RiArrowDownBoxLine, RiArrowUpBoxLine } from "react-icons/ri";

const BuyerCard = ({ buyer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`card_shadow col-span-1 min-w-96 self-start rounded-lg border border-light-gray bg-slate-50 p-4 ${isExpanded ? "row-span-3" : "row-span-1"}`}
    >
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <p className="text-lg font-semibold">{buyer.name}</p>
          <p className="text-sm text-gray-500">{buyer.date}</p>
        </div>
        <div>
          {isExpanded ? (
            <RiArrowUpBoxLine
              className="h-10 w-auto hover:opacity-50 active:opacity-10"
              color="#333333"
            />
          ) : (
            <RiArrowDownBoxLine
              className="h-10 w-auto hover:opacity-50 active:opacity-10"
              color="#333333"
            />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 border-t pt-4 text-base font-medium text-medium-gray">
          <p>Status: {buyer.status}</p>
          <p>Email: {buyer.email}</p>
          <p>Phone: {buyer.phone}</p>
          <p>Organization Number: {buyer.organisationNumber}</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => {}}
              className="card_shadow mb-2 mt-5 flex flex-row items-center rounded-full border border-medium-gray bg-white px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse"
            >
              Approve
            </button>
            <button
              onClick={() => {}}
              className="card_shadow mb-2 mt-5 flex flex-row items-center rounded-full border border-medium-gray bg-white px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerCard;
