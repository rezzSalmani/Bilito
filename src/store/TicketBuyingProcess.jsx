import { createContext, useContext, useReducer } from "react";

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
    default:
      return state;
  }
};
const TicketBuyingProcessProvider = ({ children }) => {
  const [ticketStatus, dispatchTicketDispatch] = useReducer(
    ticketStatusReducer,
    {
      passengersInformation: [],
      tempSelectedTicket: {},
      contactInformation: {},
      ticketBuyingStatus: "information",
    }
  );

  const updatePassengersInformation = (data) => {
    dispatchTicketDispatch({ type: "updatePassengersInformation", data });
  };
  const updateTempSelectedTicket = (data) => {
    dispatchTicketDispatch({ type: "updateTempSelectedTicket", data });
  };
  const updateTicketBuyingStatus = (data) => {
    dispatchTicketDispatch({ type: "updateTicketBuyingStatus", data });
  };
  const updateContactInformation = (data) => {
    dispatchTicketDispatch({ type: "updateContactInformation", data });
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
  };
  return (
    <TicketBuyingProcess.Provider value={values}>
      {children}
    </TicketBuyingProcess.Provider>
  );
};

export default TicketBuyingProcessProvider;
