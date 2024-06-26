import React, { useState, createContext, useContext, useEffect } from "react";
import { supabase } from "../supabaseClient";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";

const searchFlightParametersData = {
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
};
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
  const [searchFlightParameters, setSearchFlightParameters] = useState(
    searchFlightParametersData
  );
  const [searchedTickets, setSearchedTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isFindBasedHistory, setIsFindBasedHistory] = useState(false);
  const [companiesChecked, setCompaniesChecked] = useState([]);
  const [timeFiltered, setTimeFiltered] = useState([0, 1440]);
  const [classChecked, setClassChecked] = useState([]);
  const [priceFiltered, setPriceFiltered] = useState([600000, 2200000]);

  const getTickets = async () => {
    let { data, error } = await supabase
      .from("FlightTickets")
      .select("*")
      .eq("region", searchFlightParameters.ticketRegion);
    if (error) throw error;
    return data;
  };
  const updateSearchFlightParameters = (identifier, value) => {
    setSearchFlightParameters((prev) => {
      return {
        ...prev,
        [identifier]: value,
      };
    });
    // if (identifier !== "error") {
    //   setSearchFlightParameters((prev) => {
    //     return {
    //       ...prev,
    //       error: "",
    //     };
    //   });
    // }
  };
  const resetTicketParameters = () => {
    setSearchFlightParameters(searchFlightParametersData);
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
        return true;
    }
  };

  const handleSearchTicket = async () => {
    const { ticketType, from, to } = searchFlightParameters;
    setSearchedTickets([]);
    setFilteredTickets([]);
    updateSearchFlightParameters("error", "");
    updateSearchFlightParameters("isLoading", true);
    updateSearchFlightParameters("displayFromCity", from);
    updateSearchFlightParameters("displayToCity", to);

    try {
      const getTicketsBasedRegionTicket = await getTickets().then(
        (data) => data[0].ticketTypes
      );
      const getTicketTypeBasedRegionTicket =
        await getTicketsBasedRegionTicket.find(
          (item) => item.type === ticketType
        ).cities;

      let allTickets = await getTicketTypeBasedRegionTicket.find(
        (ticket) => ticket.from === from && ticket.to === to
      );
      if (allTickets) {
        setSearchedTickets(allTickets.tickets);
        setFilteredTickets(allTickets.tickets);
      }
    } catch (err) {
      console.log(err);
      updateSearchFlightParameters("error", "دریافت اطلاعات موفقیت آمیز نبود!");
    } finally {
      setIsFindBasedHistory(false);
      updateSearchFlightParameters("isLoading", false);
    }
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

  const filterByCompony = (ticket) => {
    if (!companiesChecked.length) return true;
    return companiesChecked.includes(ticket.compony);
  };
  const filterByClass = (ticket) => {
    if (!classChecked.length) return true;
    return classChecked.includes(ticket.ticketLevel);
  };

  const filterByTime = (ticket) => {
    const takeOffTime = ticket.takeOff.split(":");
    const landingTime = ticket.landingTime.split(":");
    const takeOffMinutes =
      parseInt(takeOffTime[0]) * 60 + parseInt(takeOffTime[1]);
    const landingMinutes =
      parseInt(landingTime[0]) * 60 + parseInt(landingTime[1]);
    return (
      takeOffMinutes >= timeFiltered[0] && landingMinutes <= timeFiltered[1]
    );
  };
  const filterByPrice = (ticket) => {
    let ticketPrice = ticket.price;
    return ticketPrice >= priceFiltered[0] && ticketPrice <= priceFiltered[1];
  };
  const resetFilters = () => {
    setCompaniesChecked([]);
    setTimeFiltered([0, 1440]);
    setClassChecked([]);
    setPriceFiltered([600000, 2200000]);
  };
  function combinedFilters(ticket) {
    return (
      filterByTime(ticket) &&
      filterByClass(ticket) &&
      filterByCompony(ticket) &&
      filterByPrice(ticket)
      // filterByPrice(ticket)
    );
  }
  useEffect(() => {
    if (searchedTickets.length > 0) {
      const filtered = searchedTickets.filter((ticket) =>
        combinedFilters(ticket)
      );
      setFilteredTickets(filtered);
    }
  }, [
    searchedTickets,
    companiesChecked,
    timeFiltered,
    priceFiltered,
    classChecked,
  ]);
  const handleFilter = () => {
    if (searchedTickets.length > 0) {
      const filtered = searchedTickets.filter((ticket) =>
        combinedFilters(ticket)
      );
      setFilteredTickets(filtered);
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
    filteredTickets,
    revereCity,
    handleSearchTicket,
    updateSearchFlightParameters,
    updateSearchFlightPassengersParameters,
    setFilteredTickets,
    validateSearchFlightParameters,
    findTicketBasedHistory,
    companiesChecked,
    setCompaniesChecked,
    timeFiltered,
    setTimeFiltered,
    classChecked,
    setClassChecked,
    priceFiltered,
    setPriceFiltered,
    handleFilter,
    resetFilters,
    resetTicketParameters,
  };

  return (
    <FindTicketContext.Provider value={value}>
      {children}
    </FindTicketContext.Provider>
  );
};

export default FindTicketContextProvider;
