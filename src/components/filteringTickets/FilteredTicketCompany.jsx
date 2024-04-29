import React, { useEffect, useRef, useState } from "react";
import { FilteringSubMenuHeader } from "./FilteringSubMenuHeader";
import { useFindTicketContext } from "../../store/FindTicketContext";
const flightCompanies = [
  { id: "c1", title: "ماهان", image: "/images/companies/mahan.png" },
  { id: "c2", title: "ایران ایر", image: "/images/companies/iranAir.png" },
  { id: "c3", title: "آسمان", image: "/images/companies/aseman.png" },
  { id: "c4", title: "کارون", image: "/images/companies/karon.png" },
  { id: "c5", title: "چابهار", image: "/images/companies/chabahar.png" },
  { id: "c6", title: "زاگرس", image: "/images/companies/zakros.png" },
];
const FilteredTicketCompany = () => {
  const { searchedTickets, setFilteredTickets } = useFindTicketContext();
  const [companiesChecked, setCompaniesChecked] = useState([]);

  const handleCompanySelection = (title) => {
    if (companiesChecked.includes(title)) {
      setCompaniesChecked(companiesChecked.filter((item) => item !== title));
    } else {
      setCompaniesChecked([...companiesChecked, title]);
    }
  };
  useEffect(() => {
    if (companiesChecked.length > 0) {
      const filteredTickets = searchedTickets.filter((item) =>
        companiesChecked.includes(item.compony)
      );
      setFilteredTickets(filteredTickets);
    } else {
      setFilteredTickets(searchedTickets);
    }
  }, [companiesChecked, searchedTickets]);

  return (
    <FilteringSubMenuHeader title='شرکت هواپیمایی'>
      <div className='flex flex-col w-full'>
        {flightCompanies.map((company) => (
          <div
            className='inline-flex items-center gap-1 text-sm'
            key={company.id}
          >
            <label
              className='relative flex items-center p-1.5 rounded-full cursor-pointer'
              htmlFor={company.title}
            >
              <input
                id={company.title}
                name={company.title}
                type='checkbox'
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-tint5 checked:bg-tint5 checked:before:bg-tint5 hover:before:opacity-10"
                checked={companiesChecked.includes(company.title)}
                onChange={() => handleCompanySelection(company.title)}
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
            <img
              src={company.image}
              alt={company.title}
              className='w-4 rounded-full'
            />
            <label
              className='mt-px font-light text-gray7 cursor-pointer select-none'
              htmlFor={company.title}
            >
              {company.title}
            </label>
          </div>
        ))}
      </div>
    </FilteringSubMenuHeader>
  );
};

export default FilteredTicketCompany;
