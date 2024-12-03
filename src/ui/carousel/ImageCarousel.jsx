import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./ImageCarouselButtons";

import useEmblaCarousel from "embla-carousel-react";
import { ImageNumbers, useSelectedSnapDisplay } from "./ImageNumbers";

const ImageCarousel = ({ images, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  return (
    <section className="mx-auto max-w-[300px] md:max-w-[700px]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div
              className="max-w-[300px] flex-none translate-x-0 md:max-w-[700px]"
              key={index}
            >
              <img className="rounded object-contain" src={image.image} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <ImageNumbers selectedSnap={selectedSnap} snapCount={snapCount} />
      </div>
    </section>
  );
};

export default ImageCarousel;
