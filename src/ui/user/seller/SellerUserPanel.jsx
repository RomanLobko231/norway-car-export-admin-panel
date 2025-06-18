import { useState } from "react";
import {
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlineNumbers,
  MdOutlinePerson2,
  MdOutlinePhone,
} from "react-icons/md";
import { LuMailbox } from "react-icons/lu";
import TextInputField from "../../input/TextInputField";

const SellerUserPanel = ({ user, updateUser }) => {
  const [inputDisabled, setInputDisabled] = useState(true);
  const [userData, setUserData] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitUpdate = (e) => {
    e.preventDefault();
    updateUser(userData);
    setInputDisabled(true);
  };

  return (
    <form
      className={`flex w-full max-w-5xl flex-col items-center rounded-lg ${!inputDisabled && "card_shadow"} border border-light-gray bg-slate-50 p-4 md:px-6`}
      onSubmit={submitUpdate}
    >
      <div className="mb-4 flex w-full flex-col flex-wrap items-center justify-between gap-2 md:flex-row md:items-center">
        <div
          className={`flex w-full ${inputDisabled && "justify-between md:w-full"} flex-row items-center justify-center md:w-auto`}
        >
          <h1 className="w-full text-center text-2xl font-bold text-medium-gray md:-mb-2 md:w-auto md:text-3xl">
            STYREPANEL
          </h1>
          <p
            className={`mb-1 mt-3 w-auto cursor-pointer border-b-2 ${!inputDisabled ? "hidden" : "md:flex"} hidden border-light-gray text-center text-xl font-medium text-light-gray hover:border-gunmental hover:text-gunmental`}
            onClick={() => {
              setInputDisabled(false);
            }}
          >
            Endre opplysninger
          </p>
        </div>
        <div
          className={`hidden w-auto flex-row items-center ${inputDisabled ? "hidden" : "md:flex"} gap-7`}
        >
          <input
            className="mb-1 mt-3 inline-block w-auto cursor-pointer border-b-2 border-swamp-500 bg-gradient-to-b from-gunmental to-swamp-500 bg-clip-text text-center text-xl font-medium text-transparent hover:border-gunmental hover:text-gunmental"
            type="submit"
            value="Lagre"
          ></input>
          <p
            className="mb-1 mt-3 w-auto cursor-pointer border-b-2 border-danger-red text-center text-xl font-medium text-danger-red hover:border-gunmental hover:text-gunmental"
            onClick={() => {
              setUserData(user);
              setInputDisabled(true);
            }}
          >
            Avbryt
          </p>
        </div>
      </div>
      <hr className="mb-4 hidden w-full border-[1px] border-dashed border-light-gray/35 px-2 md:block" />

      <div className="mb-2 flex w-full flex-col items-center md:flex-row md:items-start">
        <div className="flex w-full flex-row items-center gap-2 md:w-auto md:flex-col md:justify-around md:py-2">
          <img
            src="../icons/seller_profile_icon.png"
            alt="User"
            className="h-20 w-20 rounded-lg border border-light-gray bg-white object-contain p-4 md:mb-3 md:mt-2 md:h-36 md:min-w-36"
          />
          <div className="flex w-full flex-col items-center rounded-lg border border-light-gray bg-white p-3 md:mb-3">
            <h1 className="text-center text-lg font-thin text-light-gray md:text-xl">
              Status:
            </h1>
            <p className="text-center text-lg font-bold text-medium-gray md:text-2xl">
              {userData.role}
            </p>
          </div>
        </div>

        <div className="mt-4 flex w-full flex-col justify-between md:ml-6 md:mt-3 md:gap-3 lg:flex-row">
          <hr className="mb-3 hidden h-auto border-[1px] border-l border-dashed border-light-gray/35 md:block" />
          <div className="flex w-full flex-col items-center">
            <p className="mb-1 mt-3 w-full text-center text-xl font-medium text-medium-gray md:mb-3 md:ml-10 md:mt-1 md:text-start">
              PERSONALIA
            </p>
            <TextInputField
              label="Navn"
              name="name"
              icon={<MdOutlinePerson2 className="h-6 w-auto" color="#333333" />}
              initialValue={userData.name}
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
            <TextInputField
              label="Mobilnummer"
              name="phoneNumber"
              icon={<MdOutlinePhone className="h-6 w-auto" color="#333333" />}
              initialValue={userData.phoneNumber}
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
            <TextInputField
              label="Epost"
              name="email"
              type="email"
              icon={<MdOutlineEmail className="h-6 w-auto" color="#333333" />}
              initialValue={userData.email}
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
          </div>
          <hr className="mb-3 hidden h-auto border-[1px] border-l border-dashed border-light-gray/35 md:block" />
          <div className="flex w-full flex-col items-center">
            <p className="mb-1 mt-6 w-full text-center text-xl font-medium text-medium-gray md:mb-3 md:ml-10 md:mt-1 md:text-start">
              ADDRESSE
            </p>
            <TextInputField
              label="Gateadresse"
              name="streetAddress"
              icon={<MdOutlineLocationOn className="h-6 w-auto" color="#333" />}
              initialValue={userData.address.streetAddress}
              disabled={inputDisabled}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    streetAddress: e.target.value,
                  },
                }))
              }
            />
            <TextInputField
              label="Poststed (By)"
              name="postalLocation"
              icon={<LuMailbox className="h-6 w-auto" color="#333" />}
              initialValue={userData.address.postalLocation}
              disabled={inputDisabled}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    postalLocation: e.target.value,
                  },
                }))
              }
            />
            <TextInputField
              label="Postnummer"
              name="postalCode"
              icon={<MdOutlineNumbers className="h-6 w-auto" color="#333" />}
              initialValue={userData.address.postalCode}
              disabled={inputDisabled}
              onChange={(e) => {
                const value = e.target.value;
                const numericValue = value.replace(/\D/g, "");

                setUserData((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    postalCode: numericValue,
                  },
                }));
              }}
            />
          </div>
        </div>
        <p
          className={`mb-3 mt-5 w-auto cursor-pointer border-b md:hidden ${!inputDisabled && "hidden"} border-light-gray text-center text-lg font-normal text-light-gray hover:text-gunmental`}
          onClick={() => {
            setInputDisabled(false);
          }}
        >
          Endre opplysninger
        </p>
        <div
          className={`flex flex-row items-center md:hidden ${inputDisabled && "hidden"} gap-5`}
        >
          <input
            className="mb-3 mt-5 inline-block w-auto cursor-pointer border-b border-swamp-500 bg-gradient-to-b from-gunmental to-swamp-500 bg-clip-text text-center text-lg font-normal text-transparent hover:border-gunmental hover:text-gunmental"
            type="submit"
            value="Lagre"
          ></input>
          <p
            className="mb-3 mt-5 w-auto cursor-pointer border-b border-danger-red text-center text-lg font-normal text-danger-red"
            onClick={() => {
              setUserData(user);
              setInputDisabled(true);
            }}
          >
            Avbryt
          </p>
        </div>
      </div>
    </form>
  );
};

export default SellerUserPanel;
