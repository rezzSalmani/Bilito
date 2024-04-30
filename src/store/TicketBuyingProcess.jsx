import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
  useMemo,
} from "react";

const TicketBuyingProcess = createContext({
  //   passengersInformation: null,
  //   tempSelectedTicket: null,
  //   ticketBuyingStatus: null,
  //   updatePassengersInformation: null,
  //   updateTempSelectedTicket: null,
  //   updateTicketBuyingStatus: null,
});

export const useTicketBuyingProcess = () => {
  return useContext(TicketBuyingProcess);
};
const ticketStatusReducer = (state, action) => {
  switch (action.type) {
    case "updatePassengersInformation":
      return {
        ...state,
        passengersInformation: action.data,
      };
      break;
    case "updateTempSelectedTicket":
      return {
        ...state,
        tempSelectedTicket: action.data,
      };
      break;
    case "updateTicketBuyingStatus":
      return {
        ...state,
        ticketBuyingStatus: action.data,
      };
    case "updateContactInformation":
      return {
        ...state,
        contactInformation: action.data,
      };
    case "restAllData":
      return {
        passengersInformation: [],
        tempSelectedTicket: null,
        contactInformation: null,
        ticketBuyingStatus: "information",
      };
    default:
      return state;
  }
};
const TicketBuyingProcessProvider = ({ children }) => {
  const [ticketStatus, dispatchTicketDispatch] = useReducer(
    ticketStatusReducer,
    {
      passengersInformation: [],
      tempSelectedTicket: null,
      contactInformation: null,
      ticketBuyingStatus: "information",
    }
  );
  // const [timeLeft, setTimeLeft] = useState(7 * 60 * 1000); // 7 minutes in milliseconds

  // useEffect(() => {
  //   if (timeLeft === 0) {
  //     clearAllInformation();
  //     console.log("times up");
  //     return;
  //   }

  //   const timer = setTimeout(() => {
  //     setTimeLeft(timeLeft - 1000);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [timeLeft]);

  // const formattedTimeLeft = useMemo(() => {
  //   const minutes = Math.floor(timeLeft / 1000 / 60);
  //   const seconds = (timeLeft / 1000) % 60;
  //   return `${minutes.toString().padStart(2, "0")}:${seconds
  //     .toString()
  //     .padStart(2, "0")}`;
  // }, [timeLeft]);

  const updatePassengersInformation = (data) => {
    dispatchTicketDispatch({ type: "updatePassengersInformation", data });
  };
  const updateTempSelectedTicket = (data) => {
    dispatchTicketDispatch({ type: "updateTempSelectedTicket", data });
    return ticketStatus.tempSelectedTicket;
  };
  const updateTicketBuyingStatus = (data) => {
    dispatchTicketDispatch({ type: "updateTicketBuyingStatus", data });
  };
  const updateContactInformation = (data) => {
    dispatchTicketDispatch({ type: "updateContactInformation", data });
  };
  const clearAllInformation = () => {
    dispatchTicketDispatch({ type: "restAllData" });
  };
  const values = {
    passengersInformation: ticketStatus.passengersInformation,
    tempSelectedTicket: ticketStatus.tempSelectedTicket,
    ticketBuyingStatus: ticketStatus.ticketBuyingStatus,
    contactInformation: ticketStatus.contactInformation,
    updatePassengersInformation,
    updateTempSelectedTicket,
    updateTicketBuyingStatus,
    updateContactInformation,
    clearAllInformation,
  };
  return (
    <TicketBuyingProcess.Provider value={values}>
      {children}
    </TicketBuyingProcess.Provider>
  );
};

export default TicketBuyingProcessProvider;
