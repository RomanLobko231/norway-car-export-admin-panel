import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  MdClose,
  MdOutlineAlternateEmail,
  MdOutlinePerson2,
  MdOutlinePhone,
  MdPassword,
} from "react-icons/md";
import { RiArrowRightBoxLine, RiArrowUpBoxLine } from "react-icons/ri";

import UserApiService from "../../../api/UserApiService";
import { useState } from "react";
import TextInputField from "../../input/TextInputField";
import PasswordInputField from "../../input/PasswordInputField";
import ErrorMessage from "../../ErrorMessage";

const AddAdminModal = ({ open, setOpen, setAdmins }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [adminData, setAdminData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    fallbackEmail: "-",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveAdmin = async (adminData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await UserApiService.registerAdmin(adminData);
      setAdmins((prevUsers) => [...prevUsers, response.data]);
      setAdminData({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        fallbackEmail: "-",
      });
      setOpen(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    saveAdmin(adminData);
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
            className="relative w-full max-w-lg transform overflow-hidden rounded-lg border border-swamp-500 bg-gradient-to-bl from-swamp-100 to-distant-cloud p-6 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 md:min-w-[400px]"
          >
            <div className="mb-2 flex flex-row items-center justify-between md:px-2">
              <h1 className="mb-1 whitespace-nowrap text-center text-2xl font-bold text-medium-gray md:text-3xl">
                Legg til
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
              onSubmit={submitForm}
              onClick={(e) => e.stopPropagation()}
            >
              <TextInputField
                label="Epost"
                name="email"
                type="email"
                icon={
                  <MdOutlineAlternateEmail
                    className="h-6 w-auto"
                    color="#333"
                  />
                }
                initialValue={adminData.email}
                onChange={handleInputChange}
              />

              <PasswordInputField
                label="Passord"
                name="password"
                icon={<MdPassword className="h-6 w-auto" color="#333" />}
                initialValue={adminData.password}
                onChange={handleInputChange}
              />
              <TextInputField
                label="Navn"
                name="name"
                icon={<MdOutlinePerson2 className="h-6 w-auto" color="#333" />}
                initialValue={adminData.name}
                onChange={handleInputChange}
              />
              <TextInputField
                label="Mobilnummer"
                name="phoneNumber"
                icon={<MdOutlinePhone className="h-6 w-auto" color="#333" />}
                initialValue={adminData.phoneNumber}
                onChange={handleInputChange}
              />
              {error && <ErrorMessage error={error.message} />}
              {isLoading ? (
                <p>Loading..</p>
              ) : (
                <button
                  type="submit"
                  className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 mt-5 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 pb-2 pt-2 hover:from-mirage hover:to-gunmental md:space-x-2 md:rounded-lg"
                >
                  <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
                    SENDE
                  </span>
                  <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
                  <RiArrowUpBoxLine className="h-6 w-auto" color="#FEFAF0" />
                </button>
              )}
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddAdminModal;
