import React, { Fragment, useRef } from "react";
import { Listbox, Transition, Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../UI/ButtonPrimary";
import {
  ChevronDownIcon,
  SearchIcon,
  CheckIcon,
  PlusCircle,
  MinusCircle,
  LocationIcon,
  CalendarIcon,
} from "../UI/icons";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const ticketClasses = ["اکونومی", "بیزینس", "فرست"];

import { useFindTicketContext } from "../../store/FindTicketContext";

const localCities = ["تهران", "مشهد", "شیراز", "کیش"];
const internationalCities = ["روسیه", "ایران"];
const TicketInputs = ({ hideMenu }) => {
  const navigate = useNavigate();
  const {
    from,
    to,
    sitType,
    date,
    passengers,
    error,
    revereCity,
    handleSearchTicket,
    updateSearchFlightParameters,
    updateSearchFlightPassengersParameters,
    ticketRegion,
  } = useFindTicketContext();
  const datePickerRef = useRef();
  const tempCities =
    ticketRegion === "international" ? internationalCities : localCities;

  const handleSearch = async () => {
    const status = await handleSearchTicket();
    console.log(status);
    if (hideMenu && status) hideMenu();
    if (status) navigate("/flights");
  };
  return (
    <div className=' flex items-center gap-2 w-full h-full justify-center flex-wrap lg:flex-nowrap child:outline-none child:border child:h-10 child:lg:h-12 child:rounded-lg child:border-gray3 child:px-2 text-sm sm:text-sm child:md:w-[100px] child:lg:w-[200px] transition-all duration-400'>
      {/* from */}
      <Listbox
        value={from}
        onChange={(value) => {
          updateSearchFlightParameters("from", value);
        }}
      >
        <div className='relative child:flex h-full w-full '>
          <Listbox.Button className='flex items-center justify-between h-full w-full font-IRANSansXBold'>
            {from ? <span>{from}</span> : <span>مبدا</span>}
            <ChevronDownIcon classes='sm:hidden' />
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter='ease-out duration-100'
            enterFrom='opacity-0 -translate-y-4'
            enterTo='opacity-100 translate-y-0'
            leave='ease-in duration-100'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 -translate-y-4'
          >
            <Listbox.Options className='absolute top-10 max-max-h-40 overflow-auto left-0 flex flex-col bg-white rounded-lg border w-full z-20'>
              {tempCities.map((city) => (
                <Listbox.Option
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 0 pr-4 rounded-lg ${
                      active ? "bg-gray3 text-black" : "text-gray-900"
                    }`
                  }
                  value={city}
                  key={city}
                >
                  {({ selected }) => (
                    <>
                      <div className='flex items-center gap-1'>
                        <span>
                          <LocationIcon classes='w-4 h-4' />
                        </span>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {city}
                        </span>
                      </div>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-successLight'>
                          <CheckIcon />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <span
        onClick={() => revereCity()}
        style={{ width: " fit-content", padding: "0" }}
        className='hidden flex-all w-fit border-none cursor-pointer'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5'
          />
        </svg>
      </span>
      {/* to */}
      <Listbox
        value={to}
        onChange={(value) => updateSearchFlightParameters("to", value)}
      >
        <div className='relative child:flex h-full w-full'>
          <Listbox.Button className='flex items-center justify-between h-full w-full font-IRANSansXBold'>
            {to ? <span>{to}</span> : <span>مقصد</span>}
            <ChevronDownIcon classes='sm:hidden' />
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter='ease-out duration-100'
            enterFrom='opacity-0 -translate-y-4'
            enterTo='opacity-100 translate-y-0'
            leave='ease-in duration-100'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 -translate-y-4'
          >
            <Listbox.Options className='absolute top-10 max-max-h-40 overflow-auto left-0 flex flex-col bg-white rounded-lg border w-full z-20'>
              {tempCities.map((city) => (
                <Listbox.Option
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 0 pr-4 rounded-lg ${
                      active ? "bg-gray3 text-black" : "text-gray-900"
                    }`
                  }
                  value={city}
                  key={city}
                >
                  {({ selected }) => (
                    <>
                      <div className='flex items-center gap-1'>
                        <span>
                          <LocationIcon classes='w-4 h-4' />
                        </span>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {city}
                        </span>
                      </div>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-successLight'>
                          <CheckIcon />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {/* date */}
      <div className='flex justify-between items-center w-full relative '>
        <DatePicker
          value={date}
          ref={datePickerRef}
          inputClass='h-full w-full outline-none placeholder:text-gray8 font-bold placeholder:font-IRANSansXBold cursor-pointer'
          onChange={(valueType) => {
            updateSearchFlightParameters(
              "date",
              valueType.format("D MMMM YYYY")
            );
          }}
          format={"D MMMM YYYY"}
          placeholder='تاریخ رفت'
          calendar={persian}
          locale={persian_fa}
          calendarPosition='bottom-center'
          containerStyle={{
            width: "100%",
          }}
        />
        <span
          className='md:hidden lg:block absolute left-2 top-0 bottom-0 my-auto w-fit h-fit'
          onClick={() => datePickerRef.current.openCalendar()}
        >
          <CalendarIcon />
        </span>
      </div>
      {/* passengers */}
      <Menu as='div' className='relative flex h-full w-full text-right'>
        <Menu.Button className='flex items-center w-full h-full font-IRANSansXBold'>
          مسافران
        </Menu.Button>
        <Transition
          as={Fragment}
          enter='ease-out duration-100'
          enterFrom='opacity-0 -translate-y-4'
          enterTo='opacity-100 translate-y-0'
          leave='ease-in duration-100'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 -translate-y-4'
        >
          <Menu.Items
            static
            className='absolute w-full sm:min-w-max md:w-auto top-[90%] right-0 mt-2 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg z-20 font-IRANSansXMedium'
          >
            <Menu.Item
              disabled
              as={"div"}
              className='flex items-center gap-6 justify-between px-3 py-4 text-nowrap '
            >
              <div>
                {/* {active ? <span>active</span> : <span>not active</span>} */}
                بزرگسال
                <span className='text-gray5 text-xs mr-2'>۱۲ سال به بالا</span>
              </div>
              <div className='flex items-center gap-2 child:flex-all'>
                <span
                  onClick={() =>
                    updateSearchFlightPassengersParameters(
                      "adults",
                      "increment"
                    )
                  }
                  className='bg-primary text-white rounded-full cursor-pointer'
                >
                  <PlusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                </span>
                <span className='w-7'>{passengers.adults}</span>
                <span
                  onClick={() =>
                    updateSearchFlightPassengersParameters(
                      "adults",
                      "decrement"
                    )
                  }
                  className={` text-white rounded-full cursor-pointer ${
                    passengers.adults == 1 ? "bg-gray5" : "bg-primary"
                  }`}
                >
                  <MinusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                </span>
              </div>
            </Menu.Item>
            <Menu.Item
              disabled
              as={"div"}
              className='flex items-center gap-6 justify-between px-3 py-4 text-nowrap '
            >
              <div>
                {/* {active ? <span>active</span> : <span>not active</span>} */}
                کودک
                <span className='text-gray5 text-xs mr-2'>2 تا 12 سال</span>
              </div>
              <div className='flex items-center gap-2 child:flex-all'>
                <span
                  onClick={() =>
                    updateSearchFlightPassengersParameters(
                      "children",
                      "increment"
                    )
                  }
                  className='bg-primary text-white rounded-full cursor-pointer'
                >
                  <PlusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                </span>
                <span className='w-7'>{passengers.children}</span>
                <span
                  onClick={() =>
                    updateSearchFlightPassengersParameters(
                      "children",
                      "decrement"
                    )
                  }
                  className='bg-primary text-white rounded-full cursor-pointer'
                >
                  <MinusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                </span>
              </div>
            </Menu.Item>
            <Menu.Item
              disabled
              as={"div"}
              className='flex items-center gap-6 justify-between px-3 py-4 text-nowrap '
            >
              <div>
                {/* {active ? <span>active</span> : <span>not active</span>} */}
                نوزاد
                <span className='text-gray5 text-xs mr-2'>تا 2 سال</span>
              </div>
              <div className='flex items-center gap-2 child:flex-all'>
                <span
                  onClick={() =>
                    updateSearchFlightPassengersParameters("baby", "increment")
                  }
                  className='bg-primary text-white rounded-full cursor-pointer'
                >
                  <PlusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                </span>
                <span className='w-7'>{passengers.baby}</span>
                <span
                  onClick={() =>
                    updateSearchFlightPassengersParameters("baby", "decrement")
                  }
                  className='bg-primary text-white rounded-full cursor-pointer'
                >
                  <MinusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                </span>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
      {/* level */}
      <Listbox
        value={sitType}
        onChange={(value) => updateSearchFlightParameters("sitType", value)}
      >
        <div className='relative child:flex h-full w-full'>
          <Listbox.Button className='flex justify-between items-center h-full w-full font-IRANSansXBold'>
            {sitType ? <span>{sitType}</span> : <span>کلاس پرواز</span>}
            <ChevronDownIcon classes='sm:hidden' />
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter='ease-out duration-100'
            enterFrom='opacity-0 -translate-y-4'
            enterTo='opacity-100 translate-y-0'
            leave='ease-in duration-100'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 -translate-y-4'
          >
            <Listbox.Options className='absolute top-10 w-full md:w-40 md:min-w-full max-h-44 text-nowrap overflow-auto right-0 flex flex-col bg-white rounded-lg border z-10'>
              {ticketClasses.map((ticketClass, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 0 pr-4 rounded-lg ${
                      active ? "bg-gray3 text-black" : "text-gray-900"
                    }`
                  }
                  value={ticketClass}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {ticketClass}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-successLight'>
                          <CheckIcon />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <div className='relative w-full h-full  border-none'>
        <ButtonPrimary
          onClick={handleSearch}
          classes=' rounded-lg h-full w-full'
          text='جستجو'
          icon={<SearchIcon />}
        />
        {error && (
          <span className='absolute left-0 right-0 mx-auto w-full text-nowrap -bottom-5 text-error text-xs font-IRANSansXMedium border-none px-2'>
            {error && error}
          </span>
        )}
      </div>
    </div>
  );
};

export default TicketInputs;
