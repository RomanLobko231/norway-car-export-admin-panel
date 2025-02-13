import BuyerCard from "../ui/buyer/BuyerCard";

const BuyersPage = () => {
  const buyers = [
    {
      name: "Buyer Name",
      email: "email@gmail.com",
      phone: "+477653453",
      organisationNumber: "999-877-6832-23-1",
      status: "Pending Approval",
      date: "2025-02-11",
    },
    {
      name: "Test Name",
      email: "cwcwc@gmail.com",
      phone: "+47765244253",
      organisationNumber: "545-877-6832-23-1",
      status: "Approved",
      date: "2025-02-03",
    },
    {
      name: "Not Real Name",
      email: "vrv@gmail.com",
      phone: "+42424253453",
      organisationNumber: "087-877-6832-23-1",
      status: "Pending Approval",
      date: "2024-01-31",
    },
    {
      name: "Name",
      email: "cacw@gmail.com",
      phone: "+4712453",
      organisationNumber: "4224-977-6832-23-1",
      status: "Approved",
      date: "2025-02-11",
    },
    {
      name: "Buyer Name",
      email: "hjtyn@gmail.com",
      phone: "+47976993453",
      organisationNumber: "999-877-6832-23-1",
      status: "Approved",
      date: "2025-02-11",
    },
  ];
  return (
    <div className="flex w-full flex-col items-center py-20">
      <h1 className="mb-2 mt-4 text-3xl font-bold text-gunmental">
        TOTAL BUYERS: 5
      </h1>
      <div className="mb-8 flex flex-row items-center gap-4">
        <h1 className="text-xl font-light text-gunmental">Pending: 2</h1>
        <h1 className="text-xl font-light text-gunmental">Approved: 3</h1>
      </div>
      <div className="grid-auto-flow-dense grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-2">
        {buyers.map((buyer) => (
          <BuyerCard buyer={buyer} />
        ))}
      </div>
    </div>
  );
};

export default BuyersPage;
