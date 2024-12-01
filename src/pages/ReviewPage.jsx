import { useState } from "react";
import CarCard from "../ui/CarCard";
import DeleteDialog from "../ui/DeleteDialog";

const ReviewPage = () => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex max-w-7xl flex-wrap justify-center gap-5 py-28">
        <CarCard setIsOpen={setIsOpen} carInfo={{ id: "cwwc", name: "name" }} />
        <CarCard setIsOpen={setIsOpen} carInfo={{ id: "cwwc", name: "name" }} />
        <CarCard setIsOpen={setIsOpen} carInfo={{ id: "cwwc", name: "name" }} />
        <CarCard setIsOpen={setIsOpen} carInfo={{ id: "cwwc", name: "name" }} />
        <CarCard setIsOpen={setIsOpen} carInfo={{ id: "cwwc", name: "name" }} />
        <CarCard setIsOpen={setIsOpen} carInfo={{ id: "cwwc", name: "name" }} />
      </div>
      <DeleteDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ReviewPage;
