import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const DeleteDialog = ({ isOpen, setIsOpen }) => {
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
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 rounded-lg border bg-lighthouse p-12">
          <DialogTitle className="font-bold">Deactivate account</DialogTitle>
          <p className="text-lg font-semibold text-gunmental">
            Are you sure you want to delete this car? All of the data will be
            permanently removed.
          </p>
          <div className="flex gap-4">
            <button
              className="card_shadow mb-2 mt-5 flex flex-row items-center rounded-full border border-medium-gray bg-lighthouse px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button
              className="card_shadow text-danger-red hover:bg-danger-red text group mb-2 mt-5 flex flex-row items-center rounded-full border border-medium-gray bg-lighthouse px-4 pb-1 pt-1 text-xl font-semibold hover:text-lighthouse"
                          onClick={() => {
                  console.log("delete")
                  setIsOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;