import { TbCarOff, TbCheck, TbEdit, TbTrashX } from "react-icons/tb";
import TextInputField from "../../input/TextInputField";
import {
  MdClose,
  MdOutlineEmail,
  MdOutlinePerson2,
  MdOutlinePhone,
} from "react-icons/md";
import { useEffect, useState } from "react";
import DeleteDialog from "../../dialog/DeleteDialog";

const AdminCard = ({ admin, deleteAdmin, updateAdmin }) => {
  const [adminData, setAdminData] = useState(admin);
  const [inputDisabled, setInputDisabled] = useState(true);

  const [isDelOpen, setIsDelOpen] = useState(false);

  useEffect(() => {
    setInputDisabled(true);
  }, [admin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onUpdateSubmit = (e) => {
    e.preventDefault();
    updateAdmin(adminData);
  };

  const resetData = (e) => {
    e.preventDefault();
    setAdminData(admin);
    setInputDisabled(true);
  };

  return (
    <div className="flex w-full flex-col items-center rounded-lg border border-light-gray bg-slate-50 p-3">
      <form
        onSubmit={onUpdateSubmit}
        onReset={resetData}
        className="flex w-full flex-col items-center gap-3 md:items-end md:justify-between lg:flex-row"
      >
        <div className="flex w-full flex-col items-start gap-1 md:items-center lg:mr-2 lg:flex-row lg:gap-2">
          <TextInputField
            label="Navn"
            name="name"
            icon={<MdOutlinePerson2 className="h-6 w-auto" color="#333333" />}
            initialValue={adminData.name}
            onChange={handleInputChange}
            disabled={inputDisabled}
          />
          <TextInputField
            label="Mobilnummer"
            name="phoneNumber"
            icon={<MdOutlinePhone className="h-6 w-auto" color="#333333" />}
            initialValue={adminData.phoneNumber}
            onChange={handleInputChange}
            disabled={inputDisabled}
          />
          <TextInputField
            label="Epost"
            name="email"
            type="email"
            icon={<MdOutlineEmail className="h-6 w-auto" color="#333333" />}
            initialValue={adminData.email}
            onChange={handleInputChange}
            disabled={inputDisabled}
          />
        </div>
        <div
          className={`mb-3 ${inputDisabled ? "flex" : "hidden"} flex-row items-center gap-2`}
        >
          <button
            className="flex rounded-lg border border-medium-gray p-1 text-medium-gray hover:bg-medium-gray hover:text-lighthouse"
            onClick={() => {
              setInputDisabled(false);
            }}
            type="button"
          >
            <TbEdit className="h-auto w-8" />
          </button>
          <button
            className="flex rounded-lg border border-danger-red p-1 text-danger-red hover:bg-danger-red hover:text-lighthouse"
            onClick={() => {
              setIsDelOpen(true);
            }}
            type="button"
          >
            <TbTrashX className="h-auto w-8" />
          </button>
        </div>
        <div
          className={`mb-3 ${inputDisabled ? "hidden" : "flex"} flex-row items-center gap-2`}
        >
          <button
            className="flex rounded-lg border border-swamp-500 p-1 text-swamp-500 hover:bg-swamp-500 hover:text-lighthouse"
            type="submit"
          >
            <TbCheck className="h-auto w-8" />
          </button>
          <button
            className="flex rounded-lg border border-danger-red p-1 text-danger-red hover:bg-danger-red hover:text-lighthouse"
            type="reset"
          >
            <MdClose className="h-auto w-8" />
          </button>
        </div>
        <DeleteDialog
          isOpen={isDelOpen}
          setIsOpen={setIsDelOpen}
          onDelete={() => {
            deleteAdmin(admin.id);
          }}
        />
      </form>
    </div>
  );
};

export default AdminCard;
