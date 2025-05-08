const SpecificationItem = ({ icon, type, value }) => {
  return (
    <div className="flex w-full flex-row flex-wrap items-center text-base font-semibold md:text-lg">
      {icon}
      <p className="ml-2 text-light-gray md:mr-8">{type}:</p>
      <p className="ml-auto text-medium-gray">{value}</p>
    </div>
  );
};

export default SpecificationItem;
