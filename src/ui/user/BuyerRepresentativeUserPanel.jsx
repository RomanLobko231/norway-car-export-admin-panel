import {
  MdOutlineEmail,
  MdOutlinePerson2,
  MdOutlinePhone,
} from "react-icons/md";
import TextInputField from "../input/TextInputField";

const BuyerRepresentativeUserPanel = ({ user }) => {
  return (
    <div
      className={`flex w-full max-w-7xl flex-col items-center rounded-lg border border-light-gray bg-slate-50 p-4 md:px-6`}
    >
      <h1 className="mt-2 w-full text-center text-2xl font-bold text-medium-gray md:text-start md:text-3xl">
        BRUKERINFO
      </h1>
      <hr className="my-4 hidden w-full border-[1px] border-dashed border-light-gray/35 px-2 md:block" />

      <div className="mb-2 mt-2 flex w-full flex-col items-center md:flex-row">
        <div className="flex h-full w-auto flex-col items-center rounded-lg border border-light-gray bg-white p-3">
          <h1 className="text-center text-lg font-thin text-light-gray md:text-xl">
            Status:
          </h1>
          <p className="text-center text-lg font-bold text-medium-gray md:text-2xl">
            REPRESENTATIVE
          </p>
        </div>

        <div className="mt-4 flex w-full flex-col justify-between md:ml-7 md:mt-0 md:gap-3 lg:flex-row">
          <hr className="my-1 hidden h-auto border-[1px] border-l border-dashed border-light-gray/35 lg:block" />
          <TextInputField
            label="Navn"
            name="name"
            icon={<MdOutlinePerson2 className="h-6 w-auto" color="#333333" />}
            initialValue={user.name}
            onChange={null}
            disabled={true}
          />
          <TextInputField
            label="Mobilnummer"
            name="phoneNumber"
            icon={<MdOutlinePhone className="h-6 w-auto" color="#333333" />}
            initialValue={user.phoneNumber}
            onChange={null}
            disabled={true}
          />
          <TextInputField
            label="Epost"
            name="email"
            type="email"
            icon={<MdOutlineEmail className="h-6 w-auto" color="#333333" />}
            initialValue={user.email}
            onChange={null}
            disabled={true}
          />
        </div>
      </div>
      <p className="mt-3 text-center text-sm font-normal italic text-light-gray md:text-base">
        Kun Bedriftkonto kan endre representantens opplysninger
      </p>
    </div>
  );
};

export default BuyerRepresentativeUserPanel;
