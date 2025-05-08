import { useState } from "react";
import { MdClose, MdOutlineFileUpload } from "react-icons/md";

const MAX_TOTAL_SIZE = 20 * 1024 * 1024;

const ImageInputField = ({ images, setImages }) => {
  const [totalSize, setTotalSize] = useState(0);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png",
    );

    const newFiles = [];
    let currentSize = totalSize;

    for (const file of files) {
      if (currentSize + file.size <= MAX_TOTAL_SIZE) {
        newFiles.push(file);
        currentSize += file.size;
      } else {
        alert("20 MB total upload limit reached. File skipped: " + file.name);
        break;
      }
    }

    if (newFiles.length > 0) {
      setImages((prev) => [...prev, ...newFiles]);
      setTotalSize(currentSize);
    }
  };

  const handleFileDelete = (indexToDelete) => {
    setImages((prevFiles) => {
      const removedFile = prevFiles[indexToDelete];
      setTotalSize((prevSize) => prevSize - removedFile.size);
      return prevFiles.filter((_, index) => index !== indexToDelete);
    });
  };

  return (
    <div className="mb-2 mt-1 flex w-full max-w-[300px] flex-col items-center">
      <label className="flex w-full cursor-pointer flex-row items-center justify-center gap-1 rounded-lg border border-gunmental bg-white px-4 py-2 text-base font-medium text-light-gray hover:bg-gray-200 hover:text-medium-gray md:text-lg">
        <MdOutlineFileUpload className="h-6 w-auto" />
        Velg filer
        <input
          type="file"
          multiple
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {images.length > 0 && (
        <>
          <div className="mt-3 w-full">
            <div className="mb-2 text-sm text-medium-gray">
              {(totalSize / (1024 * 1024)).toFixed(2)} MB / 20.00 MB
            </div>
            <div className="h-2 w-full overflow-hidden rounded-sm bg-light-gray/50">
              <div
                className="h-full bg-swamp transition-all duration-200"
                style={{ width: `${(totalSize / MAX_TOTAL_SIZE) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="mt-3 w-full">
            <ul className="mt-2 list-inside list-disc">
              {images.map((file, index) => (
                <li
                  key={index}
                  className="mt-2 flex flex-row items-center text-gray-700"
                >
                  <p className="max-w-[70%] truncate text-sm font-medium text-medium-gray md:text-base">
                    {file.name}
                  </p>
                  <div className="mx-3 h-[1px] flex-grow bg-light-gray opacity-50"></div>
                  <MdClose
                    className="h-5 w-5 flex-shrink-0 hover:opacity-25"
                    color="#333333"
                    onClick={() => handleFileDelete(index)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageInputField;
