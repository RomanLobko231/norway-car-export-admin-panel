import { useEffect, useState } from "react";
import BuyerCard from "../ui/buyer/BuyerCard";
import ApiService from "../api/ApiService";
import ErrorDialog from "../ui/dialog/ErrorDialog";

const BuyersPage = () => {
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [buyers, setBuyers] = useState([]);
  const [showLocked, setShowLocked] = useState(true);

  const fetchBuyers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await ApiService.getAllBuyers();
      setBuyers(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const countInReview = () => {
    return buyers.filter((b) => b.accountLocked).length;
  };

  const countApproved = () => {
    return buyers.filter((b) => !b.accountLocked).length;
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  return (
    <div className="flex w-full flex-col items-center py-20">
      <h1 className="mb-2 mt-4 text-3xl font-bold text-gunmental">
        TOTALT BUYERE: {buyers.length}
      </h1>
      <div className="mb-10 mt-2 flex flex-row items-center gap-4">
        <h1
          className={`cursor-pointer rounded-lg border px-4 py-1 text-lg font-medium ${
            showLocked
              ? "border-gunmental bg-gunmental text-lighthouse"
              : "border-medium-gray bg-lighthouse text-gunmental hover:bg-gray-200"
          }`}
          onClick={() => {
            setShowLocked(true);
          }}
        >
          I Vurdering: {countInReview()}
        </h1>
        <h1
          className={`cursor-pointer rounded-lg border px-4 py-1 text-lg font-medium ${
            !showLocked
              ? "border-gunmental bg-gunmental text-lighthouse"
              : "border-medium-gray bg-lighthouse text-gunmental hover:bg-gray-200"
          }`}
          onClick={() => {
            setShowLocked(false);
          }}
        >
          Godkjent: {countApproved()}
        </h1>
      </div>
      {isLoading && <h1>Loading..</h1>}
      <div className="flex w-[700px] flex-col items-center gap-2">
        {buyers
          .filter((b) => b.accountLocked == showLocked)
          .map((buyer) => (
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
