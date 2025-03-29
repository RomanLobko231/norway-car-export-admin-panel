import { useCallback, useState } from "react";
import { RiArrowDownBoxLine, RiArrowUpBoxLine } from "react-icons/ri";
import CarInfoElement from "../car/CarInfoElement";
import { MdClose, MdLink, MdOutlineCheckBox } from "react-icons/md";
import ApiService from "../../api/ApiService";
import ErrorMessage from "../ErrorMessage";
import MessageDialog from "../dialog/MessageDialog";

const BuyerCard = ({ buyer, setBuyers }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const approveBuyer = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      await ApiService.setUserLock(id, false);
      setIsLoading(false);
      setBuyers((prevBuyers) =>
        prevBuyers.map((b) =>
          b.id === id ? { ...b, accountLocked: false } : b,
        ),
      );
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const revokeBuyer = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      await ApiService.setUserLock(id, true);
      setIsLoading(false);
      setBuyers((prevBuyers) =>
        prevBuyers.map((b) =>
          b.id === id ? { ...b, accountLocked: true } : b,
        ),
      );
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBuyer = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      await ApiService.deleteUserById(id);
      setIsLoading(false);
      setBuyers((prevBuyers) => prevBuyers.filter((b) => b.id !== id));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = useCallback(() => {
    deleteBuyer(buyer.id);
  }, [deleteBuyer, buyer.id]);

  const parse = (url) => {
    let arr = url.split("/");
    return arr.pop();
  };

  return (
    <div
      className={`card_shadow hover:card_shadow_hover active:card_shadow_click w-full rounded-lg border border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud p-4`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex cursor-pointer items-center justify-between">
        <div className="flex w-full flex-row items-center gap-2">
          <h1 className="inline-block bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-xl font-bold leading-[26px] text-transparent">
            {buyer.organisationName}
          </h1>
          <hr className="h-[2px] w-5 bg-medium-gray" />
          <h1 className="text-xl font-medium text-medium-gray">{buyer.name}</h1>
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
        <div
          className="mt-4 flex w-full flex-col border-t pt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="mb-2 w-full text-start text-lg font-medium text-light-gray">
            Opplysninger:
          </h1>
          <div className="flex flex-row flex-wrap gap-2 text-base font-medium text-medium-gray">
            <CarInfoElement info={`Epost: ${buyer.email}`} />
            <CarInfoElement info={`Mobilnr.: ${buyer.phoneNumber}`} />
            <CarInfoElement
              info={`Organisasjonsnr.: ${buyer.organisationNumber}`}
            />
            <CarInfoElement
              info={`${buyer.organisationAddress.streetAddress} - ${buyer.organisationAddress.postalCode} - ${buyer.organisationAddress.postalLocation}`}
            />
          </div>
          <h1 className="mb-2 mt-4 w-full text-start text-lg font-medium text-light-gray">
            Organisasjonslisenser:
          </h1>
          <div className="flex w-full flex-col gap-2">
            {buyer.organisationLicenceURLs.map((licence) => (
              <a
                className="group flex w-full flex-row items-center rounded-md border-[1px] border-dashed border-light-gray bg-white px-3 py-1 hover:bg-gunmental"
                href={licence}
                target="_blank"
                rel="noopener noreferrer"
                key={licence}
              >
                <MdLink className="mr-2 h-6 w-auto text-medium-gray group-hover:text-lighthouse" />
                <p className="md:text-md truncate text-base font-medium text-medium-gray group-hover:text-lighthouse">
                  {parse(licence)}
                </p>
              </a>
            ))}
          </div>
          {error && <ErrorMessage error={error.message} />}
          <div className="mt-4 flex justify-start gap-2">
            {buyer.accountLocked ? (
              <button
                onClick={() => {
                  approveBuyer(buyer.id);
                }}
                className="buttonsh hover:button_shadow_hover active:button_shadow_click disabled:button_shadow_click mb-2 mt-5 flex flex-row items-center rounded-lg border border-medium-gray bg-gunmental px-3 pb-1 pt-1 text-xl font-semibold text-lighthouse hover:text-lighthouse disabled:bg-light-gray/50 disabled:text-light-gray"
                disabled={isLoading}
              >
                <MdOutlineCheckBox className="mr-2 h-6 w-auto" />
                Godkjenne
              </button>
            ) : (
              <button
                onClick={() => {
                  revokeBuyer(buyer.id);
                }}
                className="buttonsh hover:button_shadow_hover active:button_shadow_click disabled:button_shadow_click mb-2 mt-5 flex flex-row items-center rounded-lg border border-medium-gray bg-gunmental px-3 pb-1 pt-1 text-xl font-semibold text-lighthouse hover:text-lighthouse disabled:bg-light-gray/50 disabled:text-light-gray"
                disabled={isLoading}
              >
                <MdOutlineCheckBox className="mr-2 h-6 w-auto" />
                Oppheve
              </button>
            )}

            <button
              onClick={(e) => {
                setIsDialogOpen(true);
                e.stopPropagation();
              }}
              className="buttonsh hover:button_shadow_hover active:button_shadow_click disabled:button_shadow_click mb-2 mt-5 flex flex-row items-center rounded-lg border border-medium-gray bg-white px-3 pb-1 pt-1 text-xl font-semibold text-danger-red hover:bg-danger-red hover:text-lighthouse disabled:text-danger-red/50"
              disabled={isLoading}
            >
              <MdClose className="mr-2 h-6 w-auto" />
              Slette
            </button>
          </div>
        </div>
      )}
      <MessageDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        message={"Do you really want to delete this user permanently?"}
        onFunc={handleDelete}
      />
    </div>
  );
};

export default BuyerCard;
