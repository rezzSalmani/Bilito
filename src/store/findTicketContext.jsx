import React, { useState, createContext, useContext, useEffect } from "react";
import { TICKET_DATA } from "../ticketsData";
import { supabase } from "../supabaseClient";

const findTicketContext = createContext({
  ticketRegion: "",
  ticketType: "",
  from: "",
  to: "",
  sitType: "",
  date: "",
  passengers: {},
  error: "",
  isLoading: null,
  searchedTickets: [],
  filteredTickets: [],
  updateSearchFlightParameters: () => {},
  updateSearchFlightPassengersParameters: () => {},
  revereCity: () => {},
  handleSearchTicket: () => {},
  setFilteredTickets: () => {},
});
export const useFindTicketContext = () => {
  return useContext(findTicketContext);
};
const FindTicketContextProvider = ({ children }) => {
  const [searchFlightParameters, setSearchFlightParameters] = useState({
    ticketRegion: "local",
    ticketType: "oneWay",
    from: "",
    to: "",
    sitType: "",
    date: "",
    passengers: { adults: 1, children: 0, baby: 0 },
    error: "",
    isLoading: false,
    displayFromCity: "",
    displayToCity: "",
  });
  const [searchedTickets, setSearchedTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [tempSelectedTicket, setTempSelectedTicket] = useState();
  const [passengersInformation, setPassengersInformation] = useState([]);
  const [ticketBuyingStatus, setTicketStatus] = useState("information");
  const getTickets = async () => {
    let { data, error } = await supabase
      .from("FlightTickets")
      .select("*")
      .eq("region", searchFlightParameters.ticketRegion);
    return data;
  };

  const updateSearchFlightParameters = (identifier, value) => {
    setSearchFlightParameters((prev) => {
      return {
        ...prev,
        [identifier]: value,
      };
    });
  };
  const updateSearchFlightPassengersParameters = (identifier, type) => {
    if (type == "increment") {
      setSearchFlightParameters((prev) => {
        return {
          ...prev,
          passengers: {
            ...prev.passengers,
            [identifier]: prev.passengers[identifier] + 1,
          },
        };
      });
    }
    if (type == "decrement") {
      setSearchFlightParameters((prev) => {
        if (
          (identifier === "adults" && prev.passengers.adults === 1) ||
          prev.passengers[identifier] === 0
        )
          return prev;

        return {
          ...prev,
          passengers: {
            ...prev.passengers,
            [identifier]: prev.passengers[identifier] - 1,
          },
        };
      });
    }
  };
  const revereCity = () => {
    setSearchFlightParameters((prev) => {
      return {
        ...prev,
        from: prev.to,
        to: prev.from,
      };
    });
  };
  const handleSearchTicket = async () => {
    if (!searchFlightParameters.from) {
      updateSearchFlightParameters("error", "لطفا  مبدا را وارد کنید");
      return false;
    } else if (!searchFlightParameters.to) {
      updateSearchFlightParameters("error", "لطفا  مقصد را وارد کنید");
      return false;
    } else if (!searchFlightParameters.date) {
      updateSearchFlightParameters("error", "لطفا تاریخ را وارد کنید");
      return false;
    } else if (!searchFlightParameters.sitType) {
      updateSearchFlightParameters("error", "لطفا نوع مسافرت را وارد کنید");
      return false;
    } else if (searchFlightParameters.from === searchFlightParameters.to) {
      updateSearchFlightParameters("error", " شهر مبدا با مقصد مشابه است !");
      return false;
    }
    if (searchFlightParameters.from && searchFlightParameters.to) {
      setSearchedTickets([]);
      setFilteredTickets([]);
      updateSearchFlightParameters("error", "");
      updateSearchFlightParameters("isLoading", true);
      updateSearchFlightParameters(
        "displayFromCity",
        searchFlightParameters.from
      );
      updateSearchFlightParameters("displayToCity", searchFlightParameters.to);

      const getTicketsBasedRegionTicket = await getTickets().then(
        (data) => data[0].ticketTypes
      );
      console.log(getTicketsBasedRegionTicket);

      const getTicketTypeBasedRegionTicket =
        await getTicketsBasedRegionTicket.find(
          (item) => item.type === searchFlightParameters.ticketType
        ).cities;
      console.log(getTicketTypeBasedRegionTicket);

      let allTickets = getTicketTypeBasedRegionTicket.find(
        (ticket) =>
          ticket.from === searchFlightParameters.from &&
          ticket.to === searchFlightParameters.to
      );
      console.log(allTickets);
      if (allTickets) {
        setSearchedTickets(allTickets.tickets);
        setFilteredTickets(allTickets.tickets);
      }
      updateSearchFlightParameters("isLoading", false);
      // setTimeout(() => {
      //   const ticketRegion = TICKET_DATA.find(
      //     (ticket) => ticket.region === searchFlightParameters.ticketRegion
      //   ).ticketTypes;
      //   const targetTicketType = ticketRegion.find(
      //     (ticket) => ticket.type === searchFlightParameters.ticketType
      //   ).cities;

      //   // calculate tickets based on the from and to
      //   const allTickets = targetTicketType.find(
      //     (ticket) =>
      //       ticket.from === searchFlightParameters.from &&
      //       ticket.to === searchFlightParameters.to
      //   );
      //   console.log(targetTicketType);
      //   if (allTickets) {
      //     setSearchedTickets(allTickets.tickets);
      //     setFilteredTickets(allTickets.tickets);
      //   }
      //   updateSearchFlightParameters("isLoading", false);
      // }, 500);
      return true;
    }
  };
  const updateTempSelectedTicket = (ticketData) => {
    setTempSelectedTicket(ticketData);
  };

  const sendAndValidateUserInformation = () => {};
  const value = {
    ticketRegion: searchFlightParameters.ticketRegion,
    ticketType: searchFlightParameters.ticketType,
    from: searchFlightParameters.from,
    to: searchFlightParameters.to,
    sitType: searchFlightParameters.sitType,
    date: searchFlightParameters.date,
    passengers: searchFlightParameters.passengers,
    error: searchFlightParameters.error,
    isLoading: searchFlightParameters.isLoading,
    displayFromCity: searchFlightParameters.displayFromCity,
    displayToCity: searchFlightParameters.displayToCity,
    searchedTickets,
    revereCity,
    handleSearchTicket,
    updateSearchFlightParameters,
    updateSearchFlightPassengersParameters,
    filteredTickets,
    setFilteredTickets,
    tempSelectedTicket,
    updateTempSelectedTicket,
    ticketBuyingStatus,
    setTicketStatus,
    passengersInformation,
    setPassengersInformation,
    setTempSelectedTicket,
  };
  return (
    <findTicketContext.Provider value={value}>
      {children}
    </findTicketContext.Provider>
  );
};

export default FindTicketContextProvider;
