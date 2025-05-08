import React, { useEffect, useState } from "react";
import { getTimeLeftUntil } from "../../utils/dateTimeUtils";

const AuctionCountdown = ({ utcEndTime }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeftUntil(utcEndTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeftUntil(utcEndTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [utcEndTime]);

  if (timeLeft.totalSeconds === 0) {
    return <p>Auction ended</p>;
  }

  return (
    <p className="text-lg font-bold text-medium-gray">
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </p>
  );
};

export default AuctionCountdown;
