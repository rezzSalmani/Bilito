import React, { useEffect, useState } from "react";
import { FilteringSubMenuHeader } from "./FilteringSubMenuHeader";
import { useFindTicketContext } from "../../store/FindTicketContext";

const ticketClasses = ["اکونومی", "بیزینس", "پرمیوم اکونومی", "فرست"];
const FilteredTicketClass = () => {
  const { searchedTickets, setFilteredTickets, classChecked, setClassChecked } =
    useFindTicketContext();

  const handleClassSelection = (title) => {
    if (classChecked.includes(title)) {
      setClassChecked(classChecked.filter((item) => item !== title));
    } else {
      setClassChecked([...classChecked, title]);
    }
  };

  // useEffect(() => {
  //   if (classChecked.length > 0) {
  //     const filteredTickets = searchedTickets.filter((item) =>
  //       classChecked.includes(item.ticketLevel)
  //     );
  //     setFilteredTickets(filteredTickets);
  //   } else {
  //     // If no class is selected, setFilteredTickets can be set to the original searchedTickets
  //     setFilteredTickets(searchedTickets);
  //   }
  // }, [classChecked, searchedTickets]);

  return (
    <FilteringSubMenuHeader title='کلاس پروازی'>
      {ticketClasses.map((classType, index) => (
        <div className='inline-flex items-center text-sm' key={index}>
          <label
            className='relative flex items-center p-1.5 rounded-full cursor-pointer'
            htmlFor={classType}
          >
            <input
              id={classType}
              name={classType}
              checked={classChecked.includes(classType)}
              onChange={() => handleClassSelection(classType)}
              type='checkbox'
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-tint5 checked:bg-tint5 checked:before:bg-tint5 hover:before:opacity-10"
            />
            <span className='absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5'
                viewBox='0 0 20 20'
                fill='currentColor'
                stroke='currentColor'
                strokeWidth='1'
              >
                <path
                  clipRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                ></path>
              </svg>
            </span>
          </label>
          <label
            className='mt-px font-light text-gray7 cursor-pointer select-none'
            htmlFor={classType}
          >
            {classType}
          </label>
        </div>
      ))}
    </FilteringSubMenuHeader>
  );
};

export default FilteredTicketClass;
