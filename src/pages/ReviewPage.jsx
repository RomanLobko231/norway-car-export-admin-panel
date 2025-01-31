import { useState } from "react";
import CarCard from "../ui/CarCard";
import DeleteDialog from "../ui/DeleteDialog";

const ReviewPage = () => {
  return (
    <div className="flex w-full flex-col items-center py-20">
      <h1 className="mb-2 mt-4 text-3xl font-bold text-gunmental">
        TOTAL CARS: 8
      </h1>
      <div className="mb-8 flex flex-row items-center gap-4">
        <h1 className="text-xl font-light text-gunmental">In Review: 5</h1>
        <h1 className="text-xl font-light text-gunmental">Auctioning: 2</h1>
        <h1 className="text-xl font-light text-gunmental">Sold: 1</h1>
      </div>
    </div>
  );
};

export default ReviewPage;
