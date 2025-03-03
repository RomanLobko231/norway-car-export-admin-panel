import React, { useState } from "react";
import { RiArrowRightBoxLine, RiArrowLeftBoxLine } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";

const ImageCarousel = ({ images, deleteImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      {images && images.length > 0 && (
        <div className="flex w-full flex-col items-center px-2 md:mx-auto md:max-w-[700px] md:px-0">
          <div className="mb-2 flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-3">
              <RiArrowLeftBoxLine
                onClick={prevSlide}
                className="h-10 w-auto hover:opacity-50 active:opacity-10"
                color="#333333"
              />
              <RiArrowRightBoxLine
                onClick={nextSlide}
                className="h-10 w-auto hover:opacity-50 active:opacity-10"
                color="#333333"
              />
            </div>
            <p className="select-none text-base font-medium text-medium-gray md:text-2xl">{`${currentIndex + 1} / ${images.length}`}</p>
            <button
              onClick={() => {
                deleteImage(images[currentIndex]);
                if (currentIndex != 0) setCurrentIndex(currentIndex - 1);
              }}
              className="card_shadow group mb-2 mt-2 flex select-none flex-row items-center gap-1 rounded-lg border border-medium-gray bg-lighthouse px-1 pb-1 pt-1 text-base font-semibold text-medium-gray hover:bg-danger-red hover:text-lighthouse md:px-4 md:text-xl"
            >
              Delete Image
              <TiDelete className="h-6 w-auto" />
            </button>
          </div>

          <div className="mt-4 flex max-h-[550px] w-full overflow-hidden">
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="h-auto w-full select-none object-cover"
            />
          </div>
        </div>
      )}
      {(images == null || images.length <= 0 || images == undefined) && (
        <p className="mt-2 text-lg font-normal text-light-gray">
          No images yet
        </p>
      )}
    </>
  );
};

export default ImageCarousel;
