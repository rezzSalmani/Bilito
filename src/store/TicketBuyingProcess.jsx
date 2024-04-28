import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const TicketBuyingProcess = createContext({});

export const useTicketBuyingProcess = () => {
  return useContext(TicketBuyingProcess);
};
const ticketStatusReducer = (state, action) => {
  console.log(
    "ticketStatusReducer called with state:",
    state,
    "and action:",
    action
  );

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
  }
};
const TicketBuyingProcessProvider = ({ children }) => {
  //   const [passengersInformation, setPassengersInformation] = useState(null);
  //   const [tempSelectedTicket, setTempSelectedTicket] = useState({
  //     "id": "t1",
  //     "price": 1200000,
  //     "compony": "زاگرس",
  //     "sitLeft": 16,
  //     "takeOff": "19:30",
  //     "isPopular": false,
  //     "middleStop": true,
  //     "returnable": false,
  //     "sourceCity": "تهران",
  //     "travelTime": "03:30",
  //     "landingTime": "22:40",
  //     "ticketLevel": "اکونومی",
  //     "componyImage": "/images/companies/zakros.png",
  //     "flightNumber": 122434,
  //     "childrenPrice": 900000,
  //     "sourceAirport": "Tehran Airport",
  //     "destinationCity": "مشهد",
  //     "destinationAirport": "Mashhad Airport",
  //     "passengers": {
  //       "adults": 1,
  //       "children": 0,
  //       "baby": 0,
  //     },
  //     "sitType": "اکونومی",
  //     "date": "۹ اردیبهشت ۱۴۰۳",
  //   });
  //   const [ticketBuyingStatus, setTicketStatus] = useState("information");

  const [ticketStatus, dispatchTicketDispatch] = useReducer(
    ticketStatusReducer,
    {
      passengersInformation: [],
      tempSelectedTicket: {
        "id": "t1",
        "price": 1200000,
        "compony": "زاگرس",
        "sitLeft": 16,
        "takeOff": "19:30",
        "isPopular": false,
        "middleStop": true,
        "returnable": false,
        "sourceCity": "تهران",
        "travelTime": "03:30",
        "landingTime": "22:40",
        "ticketLevel": "اکونومی",
        "componyImage": "/images/companies/zakros.png",
        "flightNumber": 122434,
        "childrenPrice": 900000,
        "sourceAirport": "Tehran Airport",
        "destinationCity": "مشهد",
        "destinationAirport": "Mashhad Airport",
        "passengers": {
          "adults": 1,
          "children": 0,
          "baby": 0,
        },
        "sitType": "اکونومی",
        "date": "۹ اردیبهشت ۱۴۰۳",
      },
      ticketBuyingStatus: "information",
    }
  );

  useEffect(() => {
    console.log("Rerender========");
  }, []);

  useEffect(() => {
    console.log("passenger changed =====>", ticketStatus.passengersInformation);
  }, [ticketStatus.passengersInformation]);

  const updatePassengersInformation = (data) => {
    dispatchTicketDispatch({ type: "updatePassengersInformation", data });
  };
  const updateTempSelectedTicket = (data) => {
    dispatchTicketDispatch({ type: "updateTempSelectedTicket", data });
  };

  const updateTicketBuyingStatus = (data) => {
    dispatchTicketDispatch({ type: "updateTicketBuyingStatus", data });
  };
  const values = {
    passengersInformation: ticketStatus.passengersInformation,
    tempSelectedTicket: ticketStatus.tempSelectedTicket,
    ticketBuyingStatus: ticketStatus.ticketBuyingStatus,
    updatePassengersInformation,
    updateTempSelectedTicket,
    updateTicketBuyingStatus,
  };
  return (
    <TicketBuyingProcess.Provider value={values}>
      {children}
    </TicketBuyingProcess.Provider>
  );
};

export default TicketBuyingProcessProvider;
