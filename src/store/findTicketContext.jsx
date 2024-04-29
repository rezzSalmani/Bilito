import React, { useState, createContext, useContext, useEffect } from "react";
import { TICKET_DATA } from "../ticketsData";
import { supabase } from "../supabaseClient";

const FindTicketContext = createContext({
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
  return useContext(FindTicketContext);
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

  const getTickets = async () => {
    let { data, error } = await supabase
      .from("FlightTickets")
      .select("*")
      .eq("region", searchFlightParameters.ticketRegion);
    if (error) return error;
    return data;
  };

  const updateSearchFlightParameters = (identifier, value) => {
    setSearchFlightParameters((prev) => {
      return {
        ...prev,
        [identifier]: value,
      };
    });
    if (identifier !== "error") {
      setSearchFlightParameters((prev) => {
        return {
          ...prev,
          error: "",
        };
      });
    }
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
  const validateSearchFlightParameters = () => {
    switch (true) {
      case !searchFlightParameters.from:
        updateSearchFlightParameters("error", "لطفا  مبدا را وارد کنید");
        return false;
      case !searchFlightParameters.to:
        updateSearchFlightParameters("error", "لطفا  مقصد را وارد کنید");
        return false;
      case !searchFlightParameters.date:
        updateSearchFlightParameters("error", "لطفا تاریخ را وارد کنید");
        return false;
      case !searchFlightParameters.sitType:
        updateSearchFlightParameters("error", "لطفا نوع مسافرت را وارد کنید");
        return false;
      case searchFlightParameters.from === searchFlightParameters.to:
        updateSearchFlightParameters("error", " شهر مبدا با مقصد مشابه است!");
        return false;
      default:
        // no error, continue with the rest of the code
        return true;
    }
  };

  const handleSearchTicket = async () => {
    // const isTrue = validateSearchFlightParameters();
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

      const getTicketTypeBasedRegionTicket =
        await getTicketsBasedRegionTicket.find(
          (item) => item.type === searchFlightParameters.ticketType
        ).cities;

      let allTickets = getTicketTypeBasedRegionTicket.find(
        (ticket) =>
          ticket.from === searchFlightParameters.from &&
          ticket.to === searchFlightParameters.to
      );
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
    }
  };

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
    validateSearchFlightParameters,
  };
  return (
    <FindTicketContext.Provider value={value}>
      {children}
    </FindTicketContext.Provider>
  );
};

export default FindTicketContextProvider;
