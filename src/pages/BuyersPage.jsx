import { useEffect, useState } from "react";
import ErrorDialog from "../ui/dialog/ErrorDialog";
import UserApiService from "../api/UserApiService";
import { useSearchParams } from "react-router";
import BuyerCard from "../ui/user/buyer/BuyerCard";

const BUYER_STATUSES = [
  { locked: true, status: "I Vurdering" },
  { locked: false, status: "Godkjent" },
];

const BuyersPage = () => {
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [buyers, setBuyers] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("locked");
  const initialLockedStatus =
    statusParam === null ? BUYER_STATUSES.at(0).locked : statusParam === "true";
  const [buyerFilter, setBuyerFilter] = useState(initialLockedStatus);

  useEffect(() => {
    fetchBuyersByLockedStatus();
  }, [buyerFilter]);

  const fetchBuyersByLockedStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response =
        await UserApiService.getAllBuyersByLockedStatus(buyerFilter);
      setBuyers(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFilter = (newFilter) => {
    setBuyerFilter(newFilter);
    setSearchParams({ locked: newFilter });
  };

  console.log(buyerFilter);

  return (
    <div className="flex w-full flex-col items-center py-20">
      <h1 className="mb-2 mt-4 text-3xl font-bold text-gunmental">
        ORGANISASJONER
      </h1>
      <div className="mb-10 mt-2 flex flex-row items-center gap-4">
        {BUYER_STATUSES.map((filter) => (
          <h1
            className={`cursor-pointer rounded-lg border px-4 py-1 text-lg font-medium ${
              buyerFilter === filter.locked
                ? "border-gunmental bg-gunmental text-lighthouse"
                : "border-medium-gray bg-lighthouse text-gunmental hover:bg-gray-200"
            }`}
            onClick={() => {
              updateFilter(filter.locked);
            }}
            key={filter.status}
          >
            {filter.status}
            {buyerFilter === filter.locked && `: ${buyers.length}`}
          </h1>
        ))}
      </div>
      {isLoading && <h1>Loading..</h1>}
      <div className="flex w-full flex-col items-center gap-2 px-4 md:w-[700px] md:px-0">
        {buyers.map((buyer) => (
          <div className="w-full" key={buyer.id}>
            <BuyerCard buyer={buyer} setBuyers={setBuyers} />
            <hr className="mt-3 h-[1px] w-full border border-dashed bg-light-gray opacity-50" />
          </div>
        ))}
      </div>
      {error && (
        <ErrorDialog
          isOpen={isErrorOpen}
          setIsOpen={setIsErrorOpen}
          error={error}
        />
      )}
    </div>
  );
};

export default BuyersPage;
