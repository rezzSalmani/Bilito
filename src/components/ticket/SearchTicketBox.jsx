import React, { useEffect, useState } from "react";
import { AirPlane } from "../UI/icons";
import TicketInputs from "./TicketInputs";

import { useFindTicketContext } from "../../store/FindTicketContext";
const SearchTicketBox = () => {
  // const [ticketRegion, setTicketRegion] = useState("local");
  // const [ticketType, setTicketType] = useState("oneWay");
  const [availableTickets, setAvailableTickets] = useState([]);
  const { ticketRegion, ticketType, updateSearchFlightParameters } =
    useFindTicketContext();

  return (
    <div className='container md:absolute left-0 right-0 mx-auto p-4 md:p-6 -bottom-40 my-6 rounded-lg space-y-4 sm:space-y-6 shadow-lg w-full bg-white h-fit'>
      <div className='flex items-center justify-center lg:justify-start gap-10 border-b border-gray5 text-sm sm:text-base md:text-lg child:flex child:items-center child:gap-2 text-gray5 child:cursor-pointer child:transition-all'>
        {/* ticket region */}
        <div
          onClick={() =>
            updateSearchFlightParameters("ticketRegion", "international")
          }
          className={`${
            ticketRegion === "international"
              ? "text-primary font-IRANSansXBold border-b-2 scale-110 border-primary pb-3"
              : "pb-3"
          }`}
        >
          <AirPlane />
          <span>پرواز خارجی</span>
        </div>
        <div
          onClick={() => updateSearchFlightParameters("ticketRegion", "local")}
          className={`${
            ticketRegion === "local"
              ? "text-primary font-IRANSansXBold border-b-2 scale-110 border-primary  pb-3"
              : "pb-3"
          }`}
        >
          <AirPlane />
          <span>پرواز داخلی</span>
        </div>
      </div>
      {/* ticket type */}
      <div className='flex items-center justify-evenly sm:justify-center lg:justify-start gap-2 sm:gap-4 text-shade3 text-xs px-5 child:sm:h-10 child:h-8 child:w-24 child:border child:border-shade1 child:rounded-lg child:transition-all'>
        <button
          onClick={() => updateSearchFlightParameters("ticketType", "oneWay")}
          className={`${ticketType === "oneWay" && "bg-primary text-white"}`}
        >
          رفت
        </button>
        <button
          onClick={() =>
            updateSearchFlightParameters("ticketType", "roundTrip")
          }
          className={`${ticketType === "roundTrip" && "bg-primary text-white"}`}
        >
          برگشت
        </button>
        <button
          onClick={() =>
            updateSearchFlightParameters("ticketType", "multiPlace")
          }
          className={`${
            ticketType === "multiPlace" && "bg-primary text-white"
          }`}
        >
          چند مسیره
        </button>
      </div>
      <TicketInputs />
    </div>
  );
};

export default SearchTicketBox;
