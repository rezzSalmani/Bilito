import React, { useState, useEffect, useMemo, memo } from "react";
import { useTicketBuyingProcess } from "../../store/TicketBuyingProcess";

const Timer = memo(() => {
  const { timeLeft } = useTicketBuyingProcess();

  const formattedTimeLeft = useMemo(() => {
    const minutes = Math.floor(timeLeft / 1000 / 60);
    const seconds = (timeLeft / 1000) % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [timeLeft]);

  return <span>{formattedTimeLeft}</span>;
});

export default Timer;
