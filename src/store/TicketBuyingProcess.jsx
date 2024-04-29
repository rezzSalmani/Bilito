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
      tempSelectedTicket: {
        "id": "t2",
        "price": 1100000,
        "compony": "کارون",
        "sitLeft": 10,
        "takeOff": "15:30",
        "isPopular": true,
        "middleStop": false,
        "returnable": false,
        "sourceCity": "تهران",
        "travelTime": "04:00",
        "landingTime": "19:30",
        "ticketLevel": "فرست",
        "componyImage": "/images/companies/karon.png",
        "flightNumber": 923153,
        "childrenPrice": 850000,
        "sourceAirport": "Tehran Airport",
        "destinationCity": "مشهد",
        "destinationAirport": "Mashhad Airport",
        "passengers": {
          "adults": 2,
          "children": 1,
          "baby": 0,
        },
        "sitType": "بیزینس",
        "date": "۱۰ اردیبهشت ۱۴۰۳",
        "reservationNumber": 2651813,
        "ticketNumber": 7348058,
        "paymentTime": "14 04",
        "phoneNumber": "1888124124",
        "buyingDate": "29 April 2024",
      },
      contactInformation: null,
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
