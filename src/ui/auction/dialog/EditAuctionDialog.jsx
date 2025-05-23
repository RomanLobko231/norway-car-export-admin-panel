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
import { getHoursUntil } from "../../../utils/dateTimeUtils";

const EditAuctionDialog = ({ open, setOpen, auction }) => {
  const [auctionData, setAuctionData] = useState({
    minimalStep: auction.minimalStep,
    auctionDuration: getHoursUntil(auction.endDateTime),
    startingPrice: auction.startingPrice,
    id: auction.id,
    expectedPrice: auction.expectedPrice,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuctionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateAuction = async (auction) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuctionApiService.updateAuction(auction);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      setError(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const submitUpdateAuction = (e) => {
    e.preventDefault();
    const updatePayload = {
      minimalStep: auctionData.minimalStep,
      endDateTime: addHours(new Date(), auctionData.auctionDuration),
      startingPrice: auctionData.startingPrice,
      carId: auctionData.carId,
      id: auctionData.id,
      expectedPrice: auctionData.expectedPrice,
    };
    updateAuction(updatePayload);
  };

  const calculateAuctionEnd = (hours) => {
    const newDate = addHours(new Date(), hours);
    return format(newDate, "yyyy-MM-dd HH:mm:ss");
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
                Endre Auksjon
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
              onSubmit={submitUpdateAuction}
            >
              <NumberInputField
                label={"Start Pris"}
                name="startingPrice"
                icon={<TbCoins className="h-6 w-auto" color="#333" />}
                initialValue={auctionData.startingPrice}
                onChange={handleInputChange}
                disableCheckbox={true}
              />
              <NumberInputField
                label={"Min Steg"}
                name="minimalStep"
                icon={
                  <MdOutlineTrendingUp className="h-6 w-auto" color="#333" />
                }
                initialValue={auctionData.minimalStep}
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
              {auctionData.auctionDuration == 0 && (
                <ErrorMessage
                  error={
                    "Setting duration as '0' means that auction will be closed immeadiately"
                  }
                />
              )}
              {isLoading ? (
                <p>Loading..</p>
              ) : (
                <button
                  className="buttonsh hover:button_shadow_hover active:button_shadow_click disabled:button_shadow_click mb-2 mt-5 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse disabled:bg-light-gray/50 disabled:text-light-gray"
                  disabled={isLoading}
                  type="submit"
                >
                  Lagre Aukjson
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

export default EditAuctionDialog;
