import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useNavigate } from "react-router";

const ErrorDialog = ({ isOpen, setIsOpen, error }) => {
  const navigate = useNavigate();
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-[75]"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 rounded-lg border bg-lighthouse p-8">
          <DialogTitle className="font-bold">
            {`Error: ${error.statusCode}`}
          </DialogTitle>
          <p className="text-lg font-semibold text-gunmental">
            {error.message}
          </p>
          <p className="text-base font-normal text-medium-gray">
            {error.timestamp}
          </p>
          <div className="flex gap-4">
            <button
              className="card_shadow mb-2 mt-5 flex flex-row items-center rounded-full border border-medium-gray bg-lighthouse px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button
              className="card_shadow mb-2 mt-5 flex flex-row items-center rounded-full border border-medium-gray bg-lighthouse px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse"
              onClick={() => {
                setIsOpen(false);
                navigate("/");
              }}
            >
              To Home
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ErrorDialog;
