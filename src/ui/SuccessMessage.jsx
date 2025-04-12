const SuccessMessage = ({ message }) => {
  return (
    <div className="mt-3 w-full rounded-lg border-2 border-swamp-500 bg-white px-3 py-2.5 text-base font-medium text-swamp-500 md:text-lg">
      <p>{message}</p>
    </div>
  );
};

export default SuccessMessage;
