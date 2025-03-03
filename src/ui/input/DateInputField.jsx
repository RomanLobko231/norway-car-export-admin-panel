import { useEffect, useState } from "react";

const DateInputField = ({ icon, label, name, alt, initialValue, onChange }) => {
  const [isChecked, setIsChecked] = useState(initialValue === "1111-11-11");
  const [inputValue, setInputValue] = useState(initialValue || "");

  const formatDate = (value) => {
    let cleaned = value.replace(/\D/g, "");

    if (cleaned.length > 4)
      cleaned = cleaned.slice(0, 4) + "-" + cleaned.slice(4);
    if (cleaned.length > 7)
      cleaned = cleaned.slice(0, 7) + "-" + cleaned.slice(7, 10);

    return cleaned;
  };

  const handleInputChange = (e) => {
    let value = e.target.value;

    if (value.endsWith("-")) {
      value = value.slice(0, -1);
    }

    const formattedValue = formatDate(value);
    setInputValue(formattedValue);
    onChange({ target: { name, value: formattedValue } });
  };

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    const newValue = !isChecked ? "1111-11-11" : "";
    setInputValue(newValue);
    onChange({ target: { name, value: newValue } });
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
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
          <img src={icon} alt={alt} className="h-4 w-4 md:h-5 md:w-5" />
        </div>
        <input
          type="text"
          id={label}
          name={name}
          value={isChecked ? "1111-11-11" : inputValue}
          onChange={handleInputChange}
          className="block w-full rounded-lg border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray disabled:text-light-gray md:ps-12 md:text-lg"
          required
          disabled={isChecked}
          placeholder="YYYY-MM-DD"
          maxLength={10}
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

export default DateInputField;
