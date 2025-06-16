import { useEffect, useState } from "react";
import AuctionApiService from "../api/AuctionApiService";
import AuctionsList from "../ui/auction/AuctionsList";
import ErrorDialog from "../ui/dialog/ErrorDialog";
import { useSearchParams } from "react-router";
import { RiArrowLeftBoxLine, RiArrowRightBoxLine } from "react-icons/ri";
import PageArrows from "../ui/PageArrows";

const AUCTION_STATUSES = ["Aktivt", "Avsluttet", "Deaktivert"];

const AuctionPage = () => {
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status") || AUCTION_STATUSES.at(0);

  const [auctions, setAuctions] = useState([]);
  const [auctionFilter, setAuctionFilter] = useState(statusParam);

  const [page, setPage] = useState(0);
  const [size] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAllByStatus(auctionFilter);
  }, [auctionFilter, page]);

  const updateFilter = (newFilter) => {
    setAuctionFilter(newFilter);
    setSearchParams({ status: newFilter });
  };

  const fetchAllByStatus = async (status) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuctionApiService.getAllAuctionsByStatusPaged(
        status,
        page,
        size,
      );
      setAuctions(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAuctionById = async (auctionId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuctionApiService.deleteAuctionById(auctionId);
      setAuctions((prev) => prev.filter((a) => a.id !== auctionId));
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const setAuctionStatus = async (status, auctionId) => {
    setError(null);
    try {
      await AuctionApiService.setAuctionStatusById(status, auctionId);
      setAuctions((prev) => prev.filter((element) => element.id !== auctionId));
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    }
  };

  return (
    <div className="flex w-full flex-col items-center py-20">
      <h1 className="mb-2 mt-4 text-3xl font-bold text-gunmental">
        AUKSJONPANEL
      </h1>
      <div className="mb-10 mt-2 flex flex-row items-center gap-4">
        {AUCTION_STATUSES.map((filter) => (
          <h1
            className={`cursor-pointer rounded-lg border px-4 py-1 text-lg font-medium ${
              auctionFilter === filter
                ? "border-gunmental bg-gunmental text-lighthouse"
                : "border-medium-gray bg-lighthouse text-gunmental hover:bg-gray-200"
            }`}
            onClick={() => {
              updateFilter(filter);
            }}
            key={filter}
          >
            {filter}
            {auctionFilter === filter && `: ${auctions.length}`}
          </h1>
        ))}
      </div>

      {isLoading && (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          Loading...
        </p>
      )}
      <AuctionsList
        auctions={auctions}
        deleteAuction={deleteAuctionById}
        setAuctionStatus={setAuctionStatus}
      />
      <PageArrows page={page} setPage={setPage} totalPages={totalPages} />

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

export default AuctionPage;
