import { useEffect, useState } from "react";

const TextInputField = ({ icon, label, name, alt, initialValue, onChange }) => {
  const [isChecked, setIsChecked] = useState(initialValue === "N/A");

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    onChange({ target: { name, value: !isChecked ? "N/A" : "" } });
  };
  return (
    <div className="mb-2 mt-1 w-full flex-col">
      <label
        htmlFor={label}
        className="ml-5 text-base font-medium text-light-gray"
      >
        {label}
      </label>
      <div className="relative mt-1 w-full">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-5">
          <img src={icon} alt={alt} className="h-4 w-4 md:h-5 md:w-5" />
        </div>
        <input
          type="text"
          id={label}
          name={name}
          value={isChecked ? "N/A" : initialValue}
          onChange={onChange}
          className="block w-full rounded-lg border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray disabled:text-light-gray md:ps-14 md:text-lg"
          required
          disabled={isChecked}
        />
      </div>
      <label
        className={`ml-6 mt-2 flex cursor-pointer items-center text-sm sm:text-base ${
          isChecked
            ? "font-semibold text-medium-gray"
            : "font-normal text-light-gray"
        }`}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-2 h-4 w-4 accent-gunmental"
        />
        Info is not available now
      </label>
    </div>
  );
};

export default TextInputField;
