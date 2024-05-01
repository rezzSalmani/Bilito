import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
  useMemo,
} from "react";
export const LIMIT_TIME = 7 * 60 * 1000;
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
        "date": "۱۲ اردیبهشت ۱۴۰۳",
      },
      contactInformation: null,
      ticketBuyingStatus: "information",
    }
  );
  const [timeLeft, setTimeLeft] = useState(LIMIT_TIME);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (timeLeft <= 0) {
      dispatchTicketDispatch({ type: "restAllData" });
      setTimerRunning(false); // Stop the timer when timeLeft is 0
    } else if (timerRunning) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1000);
      }, 1000);
    }
    // Clear timeout if the component is unmounted or timerRunning is set to false
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeLeft, timerRunning]); // Include timerRunning in the dependency array

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
  const clearTimer = () => {
    setTimerRunning(false);
    setTimeLeft(LIMIT_TIME);
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
    timeLeft,
    setTimerRunning,
    clearTimer,
  };
  return (
    <TicketBuyingProcess.Provider value={values}>
      {children}
    </TicketBuyingProcess.Provider>
  );
};

export default TicketBuyingProcessProvider;
