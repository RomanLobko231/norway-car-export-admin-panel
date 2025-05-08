import AuctionCarCard from "./AuctionCarCard";

const AuctionsList = ({ auctions, deleteAuction, setAuctionStatus }) => {
  const middleIndex = Math.floor(auctions.length / 2) + 1;
  const lastIndex = auctions.length - 1;

  return (
    <div className="flex max-w-7xl flex-wrap justify-center gap-4 xl:gap-0">
      {auctions.map((auction, index) => (
        <div key={auction.id} className="flex flex-col items-center">
          <div className="flex flex-row items-center">
            <AuctionCarCard
              auctionInfo={auction}
              onDelete={deleteAuction}
              setAuctionStatus={setAuctionStatus}
            />
            {index % 2 == 0 && auctions.length > 1 && (
              <div className="mx-3 hidden h-4/5 w-[1px] bg-gradient-to-b from-transparent via-light-gray/50 to-transparent xl:block" />
            )}
          </div>

          {index !== lastIndex && index !== middleIndex && (
            <div className="my-3 hidden h-[1px] w-4/5 bg-gradient-to-r from-transparent via-light-gray/50 to-transparent xl:block" />
          )}
        </div>
      ))}
    </div>
  );
};

export default AuctionsList;
