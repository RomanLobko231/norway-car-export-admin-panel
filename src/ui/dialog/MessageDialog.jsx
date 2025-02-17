import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const MessageDialog = ({ isOpen, setIsOpen, onFunc, message }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
        <DialogPanel className="mr-4 max-w-lg space-y-4 rounded-lg border bg-lighthouse p-6 md:p-8">
          <DialogTitle className="text-2xl font-bold">Caution!</DialogTitle>
          <p className="text-lg font-semibold text-gunmental">{message}</p>
          <div className="flex gap-4">
            <button
              className="card_shadow mb-2 mt-5 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="card_shadow text group mb-2 mt-5 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-4 pb-1 pt-1 text-xl font-semibold text-danger-red hover:bg-danger-red hover:text-lighthouse"
              onClick={() => {
                onFunc();
                setIsOpen(false);
              }}
            >
              Confirm
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default MessageDialog;
