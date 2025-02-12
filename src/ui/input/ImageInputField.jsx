const ImageInputField = ({ images, setImages }) => {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png",
    );
    setImages((prevFiles) => [...prevFiles, ...files]);
  };

  const handleFileDelete = (indexToDelete) => {
    setImages((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToDelete),
    );
  };

  return (
    <div className="mx-auto flex flex-col items-center p-4">
      <label className="mb-4 block text-center text-2xl font-bold text-medium-gray">
        LASTE OPP BILDER
      </label>
      <input
        type="file"
        multiple
        accept="image/jpeg, image/png"
        onChange={handleFileChange}
        className="block w-full text-base text-gunmental file:mr-4 file:rounded-lg file:border file:border-gunmental file:bg-lighthouse file:px-4 file:py-2 file:text-base file:font-medium hover:file:bg-blue-100"
      />

      {images.length > 0 && (
        <div className="mt-4">
          <ul className="mt-2 list-inside list-disc">
            {images.map((file, index) => (
              <li
                key={index}
                className="mt-2 flex flex-row items-center text-gray-700"
              >
                <span className="text-base font-medium text-medium-gray">
                  {file.name}
                </span>
                <div className="mx-2 h-[1px] w-full bg-light-gray opacity-50"></div>
                <img
                  src="../icons/cross_dark.png"
                  alt="Delete"
                  onClick={() => handleFileDelete(index)}
                  className="ml-4 mt-1 h-4 w-4 cursor-pointer hover:opacity-70"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageInputField;
