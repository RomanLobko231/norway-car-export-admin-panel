import CarCard from "./CarCard";

const CarsList = ({ cars, onDelete, setCarStatus }) => {
  return (
    <div className="flex max-w-7xl flex-wrap justify-center gap-4">
      {cars.map((car) => (
        <CarCard
          carInfo={car}
          key={car.id}
          onDelete={onDelete}
          setCarStatus={setCarStatus}
        />
      ))}
    </div>
  );
};

export default CarsList;
