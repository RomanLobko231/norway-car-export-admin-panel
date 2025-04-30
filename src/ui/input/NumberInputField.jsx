import { useState } from "react";

const NumberInputField = ({
  icon,
  label,
  name,
  initialValue,
  onChange,
  disableCheckbox,
  optional,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    onChange({ target: { name, value: isChecked ? initialValue : 0 } });
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
          {icon}
        </div>
        <input
          onKeyDown={(e) =>
            ["e", "E", "+", "-", ".", ","].includes(e.key) && e.preventDefault()
          }
          onPaste={(e) => {
            e.preventDefault();
          }}
          onWheel={(e) => e.currentTarget.blur()}
          min={0}
          type="number"
          id={label}
          name={name}
          value={isChecked ? 0 : initialValue}
          disabled={isChecked}
          onChange={onChange}
          className="block w-full rounded-lg border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray disabled:text-light-gray md:ps-12 md:text-lg"
          required={!optional}
        />
      </div>
      {!disableCheckbox && (
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
            className="mr-2 h-4 w-4 cursor-pointer accent-gunmental"
          />
          Info is not available now
        </label>
      )}
    </div>
  );
};

export default NumberInputField;
