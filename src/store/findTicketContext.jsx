import React, { useState, createContext, useContext, useEffect } from "react";
import { supabase } from "../supabaseClient";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";
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
  const [isFindBasedHistory, setIsFindBasedHistory] = useState(false);
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

    let allTickets = await getTicketTypeBasedRegionTicket.find(
      (ticket) =>
        ticket.from === searchFlightParameters.from &&
        ticket.to === searchFlightParameters.to
    );
    if (allTickets) {
      setSearchedTickets(allTickets.tickets);
      setFilteredTickets(allTickets.tickets);
    }
    setIsFindBasedHistory(false);
    updateSearchFlightParameters("isLoading", false);
  };
  const findTicketBasedHistory = (sourceCity, distentionCity) => {
    updateSearchFlightParameters("from", sourceCity);
    updateSearchFlightParameters("to", distentionCity);
    updateSearchFlightParameters(
      "date",
      new DateObject({
        calendar: persian,
        locale: persian_fa,
      }).format("D MMMM YYYY")
    );
    updateSearchFlightParameters("sitType", "اکونومی");
    setIsFindBasedHistory(true);
  };
  useEffect(() => {
    if (isFindBasedHistory) handleSearchTicket();
  }, [
    searchFlightParameters.from,
    searchFlightParameters.to,
    isFindBasedHistory,
  ]);
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
    findTicketBasedHistory,
  };

  return (
    <FindTicketContext.Provider value={value}>
      {children}
    </FindTicketContext.Provider>
  );
};

export default FindTicketContextProvider;
