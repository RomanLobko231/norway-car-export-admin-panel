import { useEffect, useState } from "react";
import UserApiService from "../../../api/UserApiService";
import {
  RiAddBoxLine,
  RiArrowDownBoxLine,
  RiArrowUpBoxLine,
} from "react-icons/ri";
import AdminCard from "./AdminCard";
import { MdOutlineGroupOff } from "react-icons/md";
import ErrorDialog from "../../dialog/ErrorDialog";
import AddAdminModal from "./AddAdminModal";

const AdminsPanel = () => {
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);
  const [admins, setAdmins] = useState([]);

  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteAdminById = async (id) => {
    setError(null);
    setIsLoading(true);
    try {
      await UserApiService.deleteUserById(id);
      setAdmins((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllAdmins = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await UserApiService.getAllAdmins();
      setAdmins(response.data);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAdmin = async (adminData) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await UserApiService.updateUser(adminData);
      setAdmins((prevUsers) =>
        prevUsers.map((user) =>
          user.id === response.data.id ? response.data : user,
        ),
      );
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`mt-8 flex w-full max-w-7xl flex-col items-center rounded-lg border border-light-gray bg-white p-3 md:p-6`}
    >
      <div className="flex w-full flex-col flex-wrap items-center justify-start md:flex-row">
        <h1 className="mb-4 text-center text-2xl font-bold text-medium-gray md:mb-0 md:text-3xl">
          ADMINS
        </h1>
        <button
          onClick={() => {
            setAdminModalOpen(true);
          }}
          className="buttonsh hover:button_shadow_hover active:button_shadow_click group mr-4 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 py-2 hover:from-mirage hover:to-gunmental md:ml-auto md:mt-0 md:space-x-2 md:rounded-lg"
          disabled={sessionStorage.getItem("role") !== "SUPER_ADMIN"}
        >
          <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
            LEGG TIL
          </span>
          <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
          <RiAddBoxLine className="h-6 w-auto" color="#FEFAF0" />
        </button>
        <div>
          {isExpanded ? (
            <RiArrowUpBoxLine
              className="h-10 w-auto hover:opacity-50 active:opacity-10"
              color="#333333"
              onClick={() => {
                setIsExpanded(false);
              }}
            />
          ) : (
            <RiArrowDownBoxLine
              className="h-10 w-auto hover:opacity-50 active:opacity-10"
              color="#333333"
              onClick={() => {
                setIsExpanded(true);
                if (admins.length <= 0) {
                  getAllAdmins();
                }
              }}
            />
          )}
        </div>
      </div>
      {isExpanded && (
        <>
          {admins.length > 0 && !isLoading ? (
            <div
              className={`mt-8 flex w-full max-w-7xl flex-col flex-nowrap items-center justify-center gap-4 pb-4 md:flex-row md:flex-wrap md:items-start`}
            >
              {admins.map((admin, index) => (
                <div
                  className="flex w-full flex-col items-center"
                  key={admin.id}
                >
                  <AdminCard
                    admin={admin}
                    deleteAdmin={deleteAdminById}
                    updateAdmin={updateAdmin}
                  />
                  {admins.length !== index + 1 && (
                    <hr className="mt-4 h-[1px] w-full border border-dashed bg-light-gray opacity-50" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="my-12 flex flex-col">
              <MdOutlineGroupOff
                className="h-16 w-auto opacity-50"
                color="#888"
              />
              {error ? (
                <p className="mt-2 text-center text-xl font-normal text-light-gray opacity-75">
                  Kunne ikke få tak i adminer :( <br />
                  Prøv igjen senere
                </p>
              ) : (
                <p className="mt-2 text-center text-xl font-normal text-light-gray opacity-75">
                  Ingen adminere her ennå.
                </p>
              )}
            </div>
          )}
        </>
      )}

      <AddAdminModal
        open={isAdminModalOpen}
        setOpen={setAdminModalOpen}
        setAdmins={setAdmins}
      />
      {error && (
        <ErrorDialog
          isOpen={isErrorOpen}
          setIsOpen={setIsErrorOpen}
          error={error}
        />
      )}
    </div>
  );
};

export default AdminsPanel;
