const CarContextMenu = ({ options }) => {
  return (
    <div className="absolute bottom-14 right-2 rounded-md border border-medium-gray bg-lighthouse text-base">
      {options.map((option, index) => (
        <div key={index}>
          <div
            className="cursor-pointer text-nowrap rounded-md px-4 py-2 font-medium text-medium-gray hover:bg-swamp-100"
            onClick={(e) => {
              e.stopPropagation();
              option.onClick();
            }}
          >
            {option.label}
          </div>
          {index !== options.length - 1 && (
            <hr className="h-[1px] w-full border border-dashed bg-light-gray opacity-50" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CarContextMenu;
