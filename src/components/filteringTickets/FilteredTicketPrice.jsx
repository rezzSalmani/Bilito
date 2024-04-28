import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { ChevronDownIcon, ChevronUpIcon } from "../UI/icons";
import { FilteringSubMenuHeader } from "./FilteringSubMenuHeader";
import { useFindTicketContext } from "../../store/findTicketContext";
const STEP_PRICE = 10000;
const MIN_PRICE = 600000;
const MAX_PRICE = 2200000;
const FilteredTicketPrice = () => {
  // const [showPriceFilter, setShowPriceFilter] = useState(false);
  const { searchedTickets, setFilteredTickets } = useFindTicketContext();
  const [priceFiltered, setPriceFiltered] = useState([600000, 2200000]);
  return (
    <FilteringSubMenuHeader title='قیمت'>
      <>
        <div className='flex justify-between items-center text-sm w-full text-gray7'>
          <span> از {priceFiltered[0].toLocaleString()}</span>
          <span> تا {priceFiltered[1].toLocaleString()}</span>
        </div>
        <div className='flex justify-center flex-wrap'>
          <Range
            values={priceFiltered}
            step={STEP_PRICE}
            min={MIN_PRICE}
            max={MAX_PRICE}
            rtl={true}
            onChange={(values) => {
              setPriceFiltered(values);
              const filteredTickets = searchedTickets.filter((ticket) => {
                const ticketPrice = ticket.price;
                return ticketPrice >= values[0] && ticketPrice <= values[1];
              });
              setFilteredTickets(filteredTickets);
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
                      values: priceFiltered,
                      colors: ["#ccc", "#548BF4", "#ccc"],
                      min: MIN_PRICE,
                      max: MAX_PRICE,
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
      </>
    </FilteringSubMenuHeader>
  );
};

export default FilteredTicketPrice;
