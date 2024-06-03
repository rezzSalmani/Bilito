import React, { useRef, useState, useEffect } from "react";
import {
  AirPlane,
  CalenderIcon,
  UserIcon,
  TagIcon,
  EditIcon,
  SearchTicketIcon,
  FilterIcon,
  CloseCircleIcon,
  AirPlaneSpinnerIcon,
} from "../components/UI/icons";
import FilteredTicketPrice from "../components/filteringTickets/FilteredTicketPrice";
import FilteredTicketTime from "../components/filteringTickets/FilteredTicketTime";
import FilteredTicketCompany from "../components/filteringTickets/FilteredTicketCompany";
import FilteredStopCount from "../components/filteringTickets/FilteredStopCount";
import FilteredTicketClass from "../components/filteringTickets/FilteredTicketClass";
import PriceCalender from "../components/ticket/PriceCalender";
import SortingTickets, {
  sortingOptions,
} from "../components/ticket/SortingTickets";
import TicketDetailItem from "../components/ticket/TicketDetailItem";
import TicketInputs from "../components/ticket/TicketInputs";
import LandingImage from "../components/LandingImage";
import { useFindTicketContext } from "../store/FindTicketContext";
import { useNavigate } from "react-router-dom";
const Flights = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const {
    searchedTickets,
    from,
    to,
    passengers,
    sitType,
    isLoading,
    displayFromCity,
    displayToCity,
    date,
    filteredTickets,
    handleFilter,
  } = useFindTicketContext();

  const navigate = useNavigate();
  const tickets = useRef();

  useEffect(() => {
    if (!from && !to) navigate("/");
    // if (searchedTickets) {
    //   tickets.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
    // }
  }, []);

  const hideEditMenu = () => {
    setIsEdit(false);
  };
  return (
    <div>
      {/* Landing Image */}
      <LandingImage secondTitle={true} mainTitle='راحتی و سرعت در' />
      {/* Search and Edit Flight */}
      <div className='relative border-b border-gray3 '>
        <div className='container md:absolute w-fit h-fit rounded-lg font-IRANSansXBold bg-white text-gray8 left-0 right-0 mx-auto p-3 sm:px-6 sm:py-4 md:-bottom-10 md:shadow-md mt-5 md:my-0'>
          {/* <TicketInputs /> */}
          {isEdit ? (
            <TicketInputs hideMenu={hideEditMenu} />
          ) : (
            <div
              className={`flex w-full  items-center justify-center flex-wrap xs:w-fit visible opacity-100" gap-2 md:text-base text-xs  md:gap-6 child:flex child:items-center child:gap-1 child:md:gap-2 transition-all duration-200 `}
            >
              <span>
                <AirPlane classes=' w-4 md:w-5 h-4 md:h-5 -rotate-90' />
                بلیط همواپیما {from} به {to}
              </span>
              <span>
                <CalenderIcon classes=' w-4 md:w-5 h-4 md:h-5' />
                {date}
              </span>
              <span>
                <UserIcon classes=' w-4 md:w-5 h-4 md:h-5' />
                {passengers.adults + passengers.children + passengers.baby}{" "}
                مسافر
              </span>
              <span>
                <TagIcon classes=' w-4 md:w-5 h-4 md:h-5' />
                {sitType}
              </span>
              <span
                onClick={() => setIsEdit((prev) => !prev)}
                className='p-1  md:p-3 bg-primary rounded-lg font-IRANSansXRegular text-sm text-white cursor-pointer'
              >
                <span className='hidden md:flex'>ویرایش</span>
                <EditIcon />
              </span>
            </div>
          )}
        </div>
      </div>
      {/* all flights and filtering */}
      <div className=' container flex sm:mt-6 md:mt-24 lg:mt-20 my-6 md:my-10'>
        {/* filtering */}
        <div
          className={`fixed inset-0 md:static flex flex-col gap-4 py-8 text-xs lg:text-base bg-gray1 shadow-md px-6 md:p-0 lg:p-4 transition-all duration-300 z-10  ${
            isFiltering
              ? " h-screen w-full xs:w-1/2 md:w-[30%] md:h-full visible opacity-100"
              : "w-0 h-0 md:h-full md:w-[30%] invisible opacity-0 md:visible md:opacity-100"
          }`}
        >
          <span
            className='inline-flex justify-end w-full md:hidden cursor-pointer '
            onClick={() => setIsFiltering((prev) => !prev)}
          >
            <CloseCircleIcon />
          </span>
          <div className='text-gray8 flex items-start justify-between w-full '>
            <span>
              تعداد نتایج:{" "}
              {searchedTickets.tickets ? searchedTickets.tickets.length : "0"}
            </span>
            <span className='text-[10px] text-primary'>پاک کردن فیلتر‌ها</span>
          </div>
          <div className=' py-3'>
            <div className='flex gap-4 justify-center w-full flex-wrap'>
              <FilteredTicketPrice />
              <FilteredTicketTime />
              <FilteredTicketCompany />
              <FilteredStopCount />
              <FilteredTicketClass />
            </div>
          </div>
          <button
            onClick={handleFilter}
            className='bg-primary p-2 rounded-lg text-white mt-auto text-sm'
          >
            اعمال فیلتر‌ها
          </button>
        </div>
        {/* Flights tickets */}
        <div className='container w-full space-y-6' ref={tickets}>
          <div className='flex flex-col-reverse md:flex-row items-end md:items-center justify-between gap-4 w-full -z-0'>
            {/* Price Calender */}
            <PriceCalender />
            <div className='flex items-center w-full h-full md:w-[30%] justify-between'>
              <span
                className='inline-block md:hidden cursor-pointer '
                onClick={() => setIsFiltering((prev) => !prev)}
              >
                <FilterIcon />
              </span>
              {/* Sorting */}
              <SortingTickets />
            </div>
          </div>
          {/* ticket items or no tickets */}
          {isLoading && (
            <div className='flex-all w-full h-full py-10'>
              <AirPlaneSpinnerIcon />
            </div>
          )}
          {!isLoading ? (
            filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <TicketDetailItem detail={ticket} key={ticket.id} />
              ))
            ) : (
              <div className='flex-all flex-col gap-6 pt-10 text-center'>
                <span>
                  <SearchTicketIcon />
                </span>
                <span className='font-IRANSansXBold text-gray6'>
                  در این تاریخ پروازی برای {displayFromCity} به {displayToCity}{" "}
                  یافت نشد.
                </span>
                <span className='sm:text-xl text-gray5'>
                  در تاریخ دیگری جستجو کنید
                </span>
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Flights;
