const CarInfoElement = ({ info }) => {
  return (
    <p className="inline-block rounded-md border border-light-gray bg-white px-3 py-1 text-base font-medium text-medium-gray md:text-lg">
      {info}
    </p>
  );
};

export default CarInfoElement;
