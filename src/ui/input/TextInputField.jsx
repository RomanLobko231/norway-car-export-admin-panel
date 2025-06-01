const TextInputField = ({
  label,
  type,
  name,
  icon,
  initialValue,
  onChange,
  disabled,
  optional,
}) => {
  return (
    <div className="mb-2 mt-1 w-full flex-col">
      <label
        htmlFor={label}
        className="ml-5 text-sm font-medium text-light-gray md:text-base"
      >
        {label}
        {!optional && "*"}
      </label>
      <div className="relative mt-1 w-full">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
          {icon}
        </div>
        <input
          type={type ? type : "text"}
          id={label}
          name={name}
          autoComplete={name}
          value={initialValue}
          onChange={onChange}
          className="block w-full rounded-lg border border-medium-gray bg-white px-3 py-2.5 ps-12 text-base font-medium text-medium-gray disabled:border-none disabled:bg-slate-50 disabled:px-[22px] disabled:py-[11px] disabled:ps-12 md:text-lg"
          required={!optional}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default TextInputField;
