const ErrorMessage = ({ error }) => {
  return (
    <div className="mt-3 w-full rounded-lg border-2 border-danger-red bg-white px-3 py-2.5 text-base font-medium text-danger-red md:text-lg">
      <p>{error}</p>
    </div>
  );
};

export default ErrorMessage;
