import { MdAlarm, MdOutlineTrendingUp } from "react-icons/md";
import NumberInputField from "../input/NumberInputField";
import { TbCoins } from "react-icons/tb";
import { useParams } from "react-router";

const AuctionEditPanel = ({ auctionData, setAuctionData }) => {
  const params = useParams();

  const calculateAuctionEnd = (hours) => {
    let currentTime = new Date().getTime();
    let updatedTime = new Date(currentTime + hours * 60 * 60 * 1000);

    const offset = updatedTime.getTimezoneOffset();
    updatedTime = new Date(updatedTime.getTime() - offset * 60 * 1000);

    return updatedTime.toISOString().replace("T", " ").substring(0, 19);
  };

  return (
    <div className="mt-8 flex w-full flex-col items-center rounded-lg border border-dashed border-medium-gray bg-gradient-to-br from-swamp-100 to-lighthouse p-4">
      <h1 className="text-2xl font-bold text-gunmental">AUKSJONSDETALJER</h1>
      <NumberInputField
        label={"Start Pris"}
        name="startPrice"
        icon={<TbCoins className="h-6 w-auto" color="#333" />}
        initialValue={auctionData.startPrice}
        onChange={(e) => {
          const value = e.target.value;
          const numericValue = value.replace(/\D/g, "");

          setAuctionData((prev) => ({
            ...prev,
            startPrice: numericValue,
          }));
        }}
        disableCheckbox={true}
      />
      <NumberInputField
        label={"Min Steg"}
        name="minStep"
        icon={<MdOutlineTrendingUp className="h-6 w-auto" color="#333" />}
        initialValue={auctionData.minStep}
        onChange={(e) => {
          const value = e.target.value;
          const numericValue = value.replace(/\D/g, "");

          setAuctionData((prev) => ({
            ...prev,
            minStep: numericValue,
          }));
        }}
        disableCheckbox={true}
      />
      <NumberInputField
        label={"Varighet (timer)"}
        icon={<MdAlarm className="h-6 w-auto" />}
        name={"durationHours"}
        initialValue={auctionData.durationHours}
        onChange={(e) => {
          const value = e.target.value;
          const numericValue = value.replace(/\D/g, "");

          setAuctionData((prev) => ({
            ...prev,
            durationHours: numericValue,
          }));
        }}
        disableCheckbox={true}
      />
      {auctionData.durationHours > 0 && (
        <p className="mt-1 text-center text-base font-medium text-light-gray">
          Auksjonen avsluttes: {calculateAuctionEnd(auctionData.durationHours)}
        </p>
      )}
      {params.id && (
        <button
          type="button"
          className="card_shadow group mb-3 mt-3 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-3 pb-2 pt-1 text-lg font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:px-4 md:text-xl"
        >
          Lagre Auksjon
        </button>
      )}
    </div>
  );
};

export default AuctionEditPanel;
