import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import {
  MdAlarm,
  MdClose,
  MdOutlineCheckBox,
  MdOutlineTrendingUp,
} from "react-icons/md";
import { TbCoins } from "react-icons/tb";
import NumberInputField from "../input/NumberInputField";
import AuctionApiService from "../../api/AuctionApiService";
import ErrorMessage from "../ErrorMessage";
import { RiArrowUpBoxLine } from "react-icons/ri";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import CarApiService from "../../api/CarApiService";

const NewAuctionDialog = ({ open, setOpen, auctionedCar }) => {
  const defaultAuction = {
    minStep: 0,
    durationHours: 0,
    startPrice: 0,
    carId: auctionedCar.id,
    expectedPrice: auctionedCar.expectedPrice || 0,
  };
  const [auctionData, setAuctionData] = useState(defaultAuction);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateAuctionEnd = (hours) => {
    let currentTime = new Date().getTime();
    let updatedTime = new Date(currentTime + hours * 60 * 60 * 1000);

    const offset = updatedTime.getTimezoneOffset();
    updatedTime = new Date(updatedTime.getTime() - offset * 60 * 1000);

    return updatedTime.toISOString().replace("T", " ").substring(0, 19);
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
      console.log(auction);
      // const response = await AuctionApiService.saveNewAuction(auction);
      await CarApiService.setCarStatus("Auksjon", auctionedCar.id);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitSaveAuction = (e) => {
    e.preventDefault();
    saveAuction(auctionData);
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
                name={"durationHours"}
                initialValue={auctionData.durationHours}
                onChange={handleInputChange}
                disableCheckbox={true}
              />
              {auctionData.durationHours > 0 && (
                <p className="mt-1 text-center text-base font-medium text-light-gray">
                  Auksjonen avsluttes:{" "}
                  {calculateAuctionEnd(auctionData.durationHours)}
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
                  Lagre
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
