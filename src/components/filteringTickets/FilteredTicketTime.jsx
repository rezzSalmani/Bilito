import React, { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { ChevronDownIcon, ChevronUpIcon } from "../UI/icons";
import { FilteringSubMenuHeader } from "./FilteringSubMenuHeader";
import { useFindTicketContext } from "../../store/FindTicketContext";
const TRAVEL_TIME_STEP = 30;
const TRAVEL_TIME_START = 0;
const TRAVEL_TIME_END = 1440;
const formatTime = (decimalHours) => {
  const hours = Math.floor(decimalHours / 60);
  const minutes = decimalHours % 60;
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
};
const FilteredTicketTime = () => {
  // original data and set filtered Ticket form use context
  const { searchedTickets, setFilteredTickets, timeFiltered, setTimeFiltered } =
    useFindTicketContext();
  // based filter value
  // filtering
  // useEffect(() => {
  //   const filteredTickets = searchedTickets.filter((ticket) => {
  //     const takeOffTime = ticket.takeOff.split(":");
  //     const landingTime = ticket.landingTime.split(":");
  //     const takeOffMinutes =
  //       parseInt(takeOffTime[0]) * 60 + parseInt(takeOffTime[1]);
  //     const landingMinutes =
  //       parseInt(landingTime[0]) * 60 + parseInt(landingTime[1]);
  //     return (
  //       takeOffMinutes >= timeFiltered[0] && landingMinutes <= timeFiltered[1]
  //     );
  //   });

  //   // Update the filtered tickets
  //   setFilteredTickets(filteredTickets);
  // }, [searchedTickets, timeFiltered, setFilteredTickets]);

  return (
    <FilteringSubMenuHeader title='زمان حرکت'>
      <div className='flex justify-between items-center text-sm w-full text-gray7'>
        <span> از {formatTime(timeFiltered[0])}</span>
        <span> تا {formatTime(timeFiltered[1])}</span>
      </div>
      <div className='flex justify-center w-full flex-wrap'>
        <Range
          values={timeFiltered}
          step={TRAVEL_TIME_STEP}
          min={TRAVEL_TIME_START}
          max={TRAVEL_TIME_END}
          rtl={true}
          onChange={(values) => {
            setTimeFiltered(values);
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: timeFiltered,
                    colors: ["#ccc", "#548BF4", "#ccc"],
                    min: TRAVEL_TIME_START,
                    max: TRAVEL_TIME_END,
                    rtl: true,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "18px",
                width: "18px",
                borderRadius: "4px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <div
                style={{
                  height: "16px",
                  width: "5px",
                  backgroundColor: isDragged ? "#548BF4" : "#CCC",
                }}
              />
            </div>
          )}
        />
      </div>
    </FilteringSubMenuHeader>
  );
};

export default FilteredTicketTime;
