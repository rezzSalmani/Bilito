import React, { useState, useEffect, useMemo } from "react";
import { useTicketBuyingProcess } from "../../store/TicketBuyingProcess";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(7 * 60 * 1000); // 7 minutes in milliseconds
  const { clearAllInformation } = useTicketBuyingProcess();
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1000);
    }, 1000);

    if (timeLeft === 0) {
      clearAllInformation();
    }

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formattedTimeLeft = useMemo(() => {
    const minutes = Math.floor(timeLeft / 1000 / 60);
    const seconds = (timeLeft / 1000) % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [timeLeft]);

  return <span>{formattedTimeLeft}</span>;
};

export default Timer;
