import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import {
  MdAlarm,
  MdClose,
  MdOutlineCheckBox,
  MdOutlineTrendingUp,
} from "react-icons/md";
import { TbCoins } from "react-icons/tb";
import NumberInputField from "../../input/NumberInputField";
import AuctionApiService from "../../../api/AuctionApiService";
import ErrorMessage from "../../ErrorMessage";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { addHours, format } from "date-fns";
import { useNavigate } from "react-router";

const NewAuctionDialog = ({ open, setOpen, auctionedCar }) => {
  const defaultAuction = {
    minStep: 0,
    auctionDuration: 0,
    startPrice: 0,
    expectedPrice: auctionedCar?.expectedPrice ?? 0,
    carId: auctionedCar?.id ?? null,
    thumbnailImageUrl: auctionedCar?.imagePaths?.[0] ?? "",
    makeModel:
      `${auctionedCar?.make ?? ""} ${auctionedCar?.model ?? ""}`.trim(),
    modelYear: auctionedCar?.firstTimeRegisteredInNorway?.substring(0, 4) ?? "",
  };
  const [auctionData, setAuctionData] = useState(defaultAuction);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const calculateAuctionEnd = (hours) => {
    const newDate = addHours(new Date(), hours);
    return format(newDate, "yyyy-MM-dd HH:mm:ss");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuctionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveAuction = async (auction) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuctionApiService.startNewAuction(auction);
      setOpen(false);
      navigate(`/auction/${auctionedCar.id}`);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const submitSaveAuction = (e) => {
    e.preventDefault();

    const auctionPayload = {
      minimalStep: auctionData.minStep,
      endDateTime: addHours(new Date(), auctionData.auctionDuration),
      startingPrice: auctionData.startPrice,
      carId: auctionData.carId,
      expectedPrice: auctionData.expectedPrice,
      thumbnailImageUrl: auctionData.thumbnailImageUrl,
      makeModel: auctionData.makeModel,
      modelYear: auctionData.modelYear,
    };

    saveAuction(auctionPayload);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-30">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-full overflow-y-auto">
        <div className="flex min-h-full w-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-full max-w-lg transform overflow-hidden rounded-lg border border-swamp-500 bg-gradient-to-bl from-swamp-100 to-distant-cloud p-6 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 md:min-w-[400px]"
          >
            <div className="mb-2 flex flex-row items-center justify-between md:px-2">
              <h1 className="mb-1 whitespace-nowrap text-center text-2xl font-bold text-medium-gray md:text-3xl">
                Ny Aukjson
              </h1>
              <div className="mx-3 h-[1px] flex-grow bg-light-gray opacity-50"></div>
              <MdClose
                className="h-6 w-6 hover:opacity-25"
                color="#333333"
                onClick={() => setOpen(false)}
              />
            </div>

            <form
              className="flex w-full flex-col items-center md:px-2"
              onSubmit={submitSaveAuction}
            >
              <NumberInputField
                label={"Start Pris"}
                name="startPrice"
                icon={<TbCoins className="h-6 w-auto" color="#333" />}
                initialValue={auctionData.startPrice}
                onChange={handleInputChange}
                disableCheckbox={true}
              />
              <NumberInputField
                label={"Min Steg"}
                name="minStep"
                icon={
                  <MdOutlineTrendingUp className="h-6 w-auto" color="#333" />
                }
                initialValue={auctionData.minStep}
                onChange={handleInputChange}
                disableCheckbox={true}
              />
              <NumberInputField
                label={"Forventet Pris"}
                name="expectedPrice"
                icon={
                  <LiaMoneyBillWaveAltSolid
                    className="h-6 w-auto"
                    color="#333"
                  />
                }
                initialValue={auctionData.expectedPrice}
                onChange={handleInputChange}
                disableCheckbox={true}
              />
              <NumberInputField
                label={"Varighet (timer)"}
                icon={<MdAlarm className="h-6 w-auto" />}
                name={"auctionDuration"}
                initialValue={auctionData.auctionDuration}
                onChange={handleInputChange}
                disableCheckbox={true}
              />
              {auctionData.auctionDuration > 0 && (
                <p className="mt-1 text-center text-base font-medium text-light-gray">
                  Auksjonen avsluttes:{" "}
                  {calculateAuctionEnd(auctionData.auctionDuration)}
                </p>
              )}
              {error && <ErrorMessage error={error.message} />}
              {isLoading ? (
                <p>Loading..</p>
              ) : (
                <button
                  className="buttonsh hover:button_shadow_hover active:button_shadow_click disabled:button_shadow_click mb-2 mt-5 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse disabled:bg-light-gray/50 disabled:text-light-gray"
                  disabled={isLoading}
                  type="submit"
                >
                  Start Aukjson
                  <MdOutlineCheckBox className="ml-1 h-6 w-auto" />
                </button>
              )}
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default NewAuctionDialog;
