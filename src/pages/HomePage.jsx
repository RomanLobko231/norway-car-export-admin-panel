import { useState } from "react";
import UserApiService from "../api/UserApiService";
import TextInputField from "../ui/input/TextInputField";
import {
  MdAlternateEmail,
  MdFilterAlt,
  MdOutlinePersonSearch,
  MdPhone,
} from "react-icons/md";
import { RiArrowRightBoxLine } from "react-icons/ri";
import DeleteDialog from "../ui/dialog/DeleteDialog";
import ErrorDialog from "../ui/dialog/ErrorDialog";
import CompanyUserPanel from "../ui/user/CompanyUserPanel";
import BuyerRepresentativeUserPanel from "../ui/user/BuyerRepresentativeUserPanel";
import SellerUserPanel from "../ui/user/SellerUserPanel";

const FIND_FILTER = ["Epost", "Mobilnummer"];

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [findFilter, setFindFilter] = useState({
    filter: FIND_FILTER.at(0),
    filterValue: "",
  });

  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [deleteUserOpen, setDeleteUserOpen] = useState(false);

  const fetchUserByEmail = async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await UserApiService.getUserByEmail(email);
      setUserData(user.data);
      setError(null);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserByPhoneNumber = async (number) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await UserApiService.getUserByPhoneNumber(number);
      setUserData(user.data);
      setError(null);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await UserApiService.updateUserAsAdmin(userData);
      setUserData(user.data);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUserById = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await UserApiService.deleteUserById(userData.id);
      window.location.reload();
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const submitFindUser = (e) => {
    e.preventDefault();

    if (findFilter.filter == "Epost") fetchUserByEmail(findFilter.filterValue);
    if (findFilter.filter == "Mobilnummer")
      fetchUserByPhoneNumber(findFilter.filterValue);
  };

  return (
    <div className="flex w-full max-w-7xl flex-col items-center py-20">
      <h1 className="mb-4 mt-4 text-3xl font-bold text-gunmental">
        BRUKERSTYREPANEL
      </h1>
      <form
        className="flex w-full max-w-5xl flex-col items-center justify-center gap-4 p-4 md:flex-row md:items-end"
        onSubmit={submitFindUser}
      >
        <div className="flex w-3/5 flex-col">
          <p className="w-full text-center text-base font-medium text-light-gray">
            Finn bruker med:
          </p>
          <div className="mb-2 mt-1 flex w-full flex-row items-center gap-4">
            {FIND_FILTER.map((filter) => (
              <h1
                className={`w-full cursor-pointer rounded-lg border px-4 py-2.5 text-center text-lg font-medium ${
                  findFilter.filter === filter
                    ? "border-gunmental bg-gunmental text-lighthouse"
                    : "border-medium-gray bg-white text-gunmental hover:bg-gray-200"
                }`}
                onClick={() => {
                  setFindFilter((prev) => ({
                    ...prev,
                    filter: filter,
                  }));
                }}
                key={filter}
              >
                {filter}
              </h1>
            ))}
          </div>
        </div>
        <hr className="mb-2 hidden h-[50px] border-[1px] border-l border-dashed border-light-gray/35 md:block" />
        <TextInputField
          label={findFilter.filter}
          icon={
            findFilter.filter == "Epost" ? (
              <MdAlternateEmail className="h-6 w-auto" />
            ) : (
              <MdPhone className="h-6 w-auto" />
            )
          }
          name={findFilter.filter}
          initialValue={findFilter.filterValue}
          onChange={(e) => {
            setFindFilter((prev) => ({
              ...prev,
              filterValue: e.target.value,
            }));
          }}
          optional={false}
          disableCheckbox={true}
        />
        <hr className="mb-2 hidden h-[50px] border-[1px] border-l border-dashed border-light-gray/35 md:block" />

        <button
          type="submit"
          className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 flex w-1/2 flex-row items-center justify-center space-x-2 rounded-lg border border-medium-gray bg-white px-6 pb-2 pt-2 text-gunmental hover:bg-gunmental hover:text-lighthouse md:rounded-lg"
        >
          <span className="text-xl font-semibold leading-4 md:text-2xl">
            FINN
          </span>
          <div className="-mb-1 h-[16px] border-l-2 border-solid border-gunmental group-hover:border-lighthouse md:h-[18px]"></div>
          <MdOutlinePersonSearch className="-mb-1 h-6 w-auto" />
        </button>
      </form>
      {error && isErrorOpen && (
        <ErrorDialog
          isOpen={isErrorOpen}
          setIsOpen={setIsErrorOpen}
          error={error}
        />
      )}
      {isLoading && (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          Loading...
        </p>
      )}
      {userData && !isLoading && (
        <div
          className={`mt-4 flex w-full flex-col items-center justify-center px-4`}
        >
          {userData.role === "BUYER_COMPANY" && (
            <CompanyUserPanel user={userData} updateUser={updateUser} />
          )}
          {userData.role === "BUYER_REPRESENTATIVE" && (
            <BuyerRepresentativeUserPanel user={userData} />
          )}
          {userData.role === "SELLER" && (
            <SellerUserPanel user={userData} updateUser={updateUser} />
          )}
          <p
            className="mb-1 mt-7 flex w-auto cursor-pointer border-b-2 border-danger-red/50 text-center text-lg font-medium text-danger-red/50 hover:border-danger-red hover:text-danger-red"
            onClick={() => setDeleteUserOpen(true)}
          >
            Slette bruker
          </p>
        </div>
      )}
      <DeleteDialog
        isOpen={deleteUserOpen}
        setIsOpen={setDeleteUserOpen}
        onDelete={deleteUserById}
      />
    </div>
  );
};

export default HomePage;
