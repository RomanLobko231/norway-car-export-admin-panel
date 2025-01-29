import { useEffect, useState } from "react";

const InputField = ({ icon, label, alt, initialValue, type }) => {
  const [inputValue, setInputValue] = useState(initialValue || "");

  useEffect(() => {
    setInputValue(initialValue || "");
  }, [initialValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
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
          onWheel={(e) => e.currentTarget.blur()}
          min={0}
          type={type}
          id={label}
          value={inputValue}
          onChange={handleChange}
          className="block w-full rounded-lg border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
          required
        />
      </div>
    </div>
  );
};

export default InputField;
