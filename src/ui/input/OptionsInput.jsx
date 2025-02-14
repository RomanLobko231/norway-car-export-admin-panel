const OptionsInput = ({
  options,
  initialOption,
  optionName,
  handleInputChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {options.map((option) => (
        <label
          key={option}
          className={`cursor-pointer rounded-lg border px-4 py-2 text-base font-medium transition ${
            initialOption === option
              ? "border-gunmental bg-gunmental text-lighthouse"
              : "border-medium-gray bg-lighthouse text-gunmental hover:bg-gray-200"
          }`}
        >
          <input
            type="radio"
            name={optionName}
            value={option}
            checked={initialOption === option}
            onChange={handleInputChange}
            className="hidden"
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default OptionsInput;
