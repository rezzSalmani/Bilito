const [selectedFrom, setSelectedFrom] = useState("");
const [selectedTo, setSelectedTo] = useState("");
const [selectedClass, setSelectedClass] = useState("");
const [ticketDate, setTicketDate] = useState();
const [passengers, setPassengers] = useState({
  adults: 1,
  children: 0,
  baby: 0,
});
const handleIncreasePassengerChange = (identifier) => {
  setPassengers((prev) => {
    return {
      ...prev,
      [identifier]: prev[identifier] + 1,
    };
  });
};
const handleDecreasePassenger = (identifier) => {
  setPassengers((prev) => {
    if (
      (identifier === "adults" && prev.adults === 1) ||
      prev[identifier] === 0
    ) {
      return prev;
    } else {
      return {
        ...prev,
        [identifier]: prev[identifier] - 1,
      };
    }
  });
};
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
