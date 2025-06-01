import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import {
  MdAlternateEmail,
  MdClose,
  MdOutlineAccountBalance,
  MdOutlinePerson2,
  MdOutlinePhone,
} from "react-icons/md";
import UserApiService from "../../../api/UserApiService";
import ErrorMessage from "../../ErrorMessage";
import SpecificationItem from "../SpecificationItem";

const HighestBidderDialog = ({ open, setOpen, bidderId }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bidderInfo, setBidderInfo] = useState(null);

  useEffect(() => {
    getHighestBidderById(bidderId);
  }, []);

  const getHighestBidderById = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response =
        await UserApiService.getRepresentativeWithCompanyById(bidderId);
      setBidderInfo(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
              <div className="mb-4 flex flex-row items-center justify-between">
                <h1 className="mb-1 whitespace-nowrap text-center text-2xl font-bold text-medium-gray md:text-3xl">
                  Vinnende Budgiver
                </h1>
                <div className="mx-3 h-[1px] flex-grow bg-light-gray opacity-50"></div>
                <MdClose
                  className="h-6 w-6 hover:opacity-25"
                  color="#333333"
                  onClick={() => setOpen(false)}
                />
              </div>
              {isLoading || !bidderInfo ? (
                <p>Loading...</p>
              ) : (
                <>
                  <p className="mb-2 ml-3 w-full text-start text-base font-semibold text-light-gray">
                    Representant:
                  </p>
                  <div className="mt-1 flex w-full flex-col items-center gap-2 rounded-md border border-dashed border-medium-gray bg-lighthouse p-2">
                    <SpecificationItem
                      type={"Navn"}
                      value={bidderInfo.representative.name}
                      icon={<MdOutlinePerson2 />}
                    />
                    <div className="h-[1px] w-full flex-grow bg-light-gray opacity-50"></div>
                    <SpecificationItem
                      type={"Epost"}
                      value={bidderInfo.representative.email}
                      icon={<MdAlternateEmail />}
                    />
                    <div className="h-[1px] w-full flex-grow bg-light-gray opacity-50"></div>
                    <SpecificationItem
                      type={"Mobilnummer"}
                      value={bidderInfo.representative.phoneNumber}
                      icon={<MdOutlinePhone />}
                    />
                  </div>
                  <p className="mb-2 ml-3 mt-4 w-full text-start text-base font-semibold text-light-gray">
                    Tilhører til:
                  </p>
                  <div className="mt-1 flex w-full flex-col items-center gap-2 rounded-md border border-dashed border-medium-gray bg-lighthouse p-2">
                    <SpecificationItem
                      type={"Organisasjonsnavn"}
                      value={bidderInfo.companyName}
                      icon={<MdOutlineAccountBalance />}
                    />
                    <div className="h-[1px] w-full flex-grow bg-light-gray opacity-50"></div>
                    <SpecificationItem
                      type={"Kontaktperson"}
                      value={bidderInfo.companyContactPerson}
                      icon={<MdOutlinePerson2 />}
                    />
                    <div className="h-[1px] w-full flex-grow bg-light-gray opacity-50"></div>
                    <SpecificationItem
                      type={"Epost"}
                      value={bidderInfo.companyEmail}
                      icon={<MdAlternateEmail />}
                    />
                    <div className="h-[1px] w-full flex-grow bg-light-gray opacity-50"></div>
                    <SpecificationItem
                      type={"Mobilnummer"}
                      value={bidderInfo.companyPhoneNumber}
                      icon={<MdOutlinePhone />}
                    />
                  </div>
                </>
              )}
              {error && <ErrorMessage error={error.message} />}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default HighestBidderDialog;
