import React, { Fragment, useState } from "react";
import LandingImage from "../components/LandingImage";
import CustomInput from "../components/UI/CustomInput.jsx";
import { useForm } from "react-hook-form";
import { Listbox, Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LocationIcon,
  MinusCircle,
  PlusCircle,
  SearchIcon,
  TimeIcon,
} from "../components/UI/icons.jsx";
import ButtonPrimary from "../components/UI/ButtonPrimary.jsx";
import { useFindInsuranceContext } from "../store/FindInsuranceContext.jsx";
const internationalCities = [
  "روسیه",
  "ترکیه",
  "ارمنستان",
  "آذربایجان",
  "انگلیس",
  "دبی",
  "عراق",
];
const travelTimes = [
  "1 تا 4 روز",
  "5 تا 8 روز",
  "9 تا 10 روز",
  "11 تا 15 روز",
  "16 تا 21 روز",
  "22 تا 23 روز",
  "24 تا 31 روز",
  "32 تا 45 روز",
  "3 ماه",
  "6 ماه",
  "1 سال",
];
const passengerRange = [
  { title: "۰ تا ۱۲ سال", identifier: "range0To12" },
  { title: "۱۳ تا ۶۵ سال", identifier: "range13To65" },
  { title: "۶۶ تا ۷۰ سال", identifier: "range66To70" },
  { title: "۷۱ تا ۷۵ سال", identifier: "range71To75" },
  { title: "۷۶ تا ۸۰ سال", identifier: "range76To80" },
  { title: "۸۱ سال به بالا", identifier: "range81ToHigher" },
];
const Insurance = () => {
  const {
    insuranceOptions,
    updateInsuranceOptions,
    updateInsuranceOptionsPassengers,
  } = useFindInsuranceContext();
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   control,
  //   setValue,
  //   formState: { errors, isSubmitting, isValid },
  // } = useForm({
  //   defaultValues: {
  //     range0To12: 0,
  //     range13To65: 0,
  //     range66To70: 0,
  //     range71To75: 0,
  //     range76To80: 0,
  //     range81ToHigher: 0,
  //   },
  // });
  const [error, setError] = useState("");
  // const handleInputChange = (inputIdentifier, type) => {
  //   const value = watch(inputIdentifier);
  //   setError("");
  //   if (type === "increment") {
  //     if (value < 30) {
  //       setValue(inputIdentifier, value + 1);
  //     } else {
  //       setError("بیشتر از این مقدار قابل انتخاب نیست.");
  //     }
  //   } else if (type === "decrement") {
  //     if (value > 0) {
  //       setValue(inputIdentifier, value - 1);
  //     } else {
  //       setError("کمتر از این مقدار قابل انتخاب نیست.");
  //     }
  //     //
  //   }
  // };
  return (
    <section>
      <LandingImage bgClass='insuranceBg' />
      {/* insurance search box */}
      <div className='container '>
        <div className='flex items-center flex-col md:flex-row justify-between gap-2 md:gap-6 lg:gap-10 xl:gap-20 p-6 shadow-md h-full'>
          <div className='flex w-full flex-col md:flex-row items-center md:gap-3 lg:gap-6 bg-white rounded-lg child:w-full'>
            <Listbox
              value={insuranceOptions.city}
              onChange={(value) => {
                updateInsuranceOptions("city", value);
              }}
            >
              {({ open }) => (
                <div className='relative child:flex h-full w-full '>
                  <Listbox.Button className='flex items-center justify-between h-[50px] w-full font-IRANSansXBold border border-gray4 rounded-lg px-2'>
                    {insuranceOptions.city ? (
                      <span>{insuranceOptions.city}</span>
                    ) : (
                      <span>کشور مقصد</span>
                    )}
                    <span>
                      {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </span>
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
                    <Listbox.Options className='absolute top-[90%] max-h-64 overflow-auto left-0 flex flex-col bg-white rounded-lg border w-full z-20'>
                      {internationalCities.map((city) => (
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
                                <span
                                  className={`${selected && "text-success"}`}
                                >
                                  <LocationIcon classes='w-4 h-4' />
                                </span>
                                <span
                                  className={`block truncate ${
                                    selected
                                      ? "font-medium text-success"
                                      : "font-normal"
                                  }`}
                                >
                                  {city}
                                </span>
                              </div>
                              {selected ? (
                                <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-success'>
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
              )}
            </Listbox>
            <Listbox
              value={insuranceOptions.travelTime}
              onChange={(value) => {
                updateInsuranceOptions("travelTime", value);
              }}
            >
              {({ open }) => (
                <div className='relative child:flex h-full w-full '>
                  <Listbox.Button className='flex items-center justify-between h-[50px] w-full font-IRANSansXBold border border-gray4 rounded-lg px-2'>
                    {insuranceOptions.travelTime ? (
                      <span>{insuranceOptions.travelTime}</span>
                    ) : (
                      <span>مدت سفر</span>
                    )}
                    <span>
                      {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </span>
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
                    <Listbox.Options className='absolute top-[90%] max-h-64 overflow-auto left-0 flex flex-col bg-white rounded-lg border w-full z-20'>
                      {travelTimes.map((period) => (
                        <Listbox.Option
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 0 pr-4 rounded-lg ${
                              active ? "bg-gray3 text-black" : "text-gray-900"
                            }`
                          }
                          value={period}
                          key={period}
                        >
                          {({ selected }) => (
                            <>
                              <div className='flex items-center gap-1'>
                                <span
                                  className={`${selected && "text-success"}`}
                                >
                                  <TimeIcon classes='w-4 h-4' />
                                </span>
                                <span
                                  className={`block truncate ${
                                    selected
                                      ? "font-medium text-success"
                                      : "font-normal"
                                  }`}
                                >
                                  {period}
                                </span>
                              </div>
                              {selected ? (
                                <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-success'>
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
              )}
            </Listbox>
            <Menu as='div' className='relative flex flex-col text-right'>
              {({ open }) => (
                <>
                  <Menu.Button className=' flex justify-between items-center h-[50px] w-full font-IRANSansXBold border border-gray4 rounded-lg py-4 px-2'>
                    <span>مسافران</span>
                    <span>
                      {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </span>
                  </Menu.Button>
                  {/* <span
                className={`flex text-sm text-errorLight transition-all h-4 mt-1 ${
                  error
                    ? "visible opacity-100 w-full"
                    : "invisible opacity-0 w-0 "
                }`}
              >
                {error && error}
              </span> */}
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
                      className='absolute w-full sm:min-w-max md:w-full top-[90%] max-h-64 overflow-auto right-0 mt-2 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg z-20 font-IRANSansXMedium'
                    >
                      {passengerRange.map((passenger) => (
                        <Menu.Item
                          key={passenger.identifier}
                          disabled
                          as={"div"}
                          className='flex items-center gap-6 justify-between px-3 py-3 text-nowrap '
                        >
                          {/* {active ? <span>active</span> : <span>not active</span>} */}

                          <span className='text-gray7 text-sm mr-2'>
                            {passenger.title}
                          </span>

                          <div className='flex justify-center md:w-[120px] items-center gap-2 child:flex-all'>
                            <span
                              onClick={() =>
                                updateInsuranceOptionsPassengers(
                                  passenger.identifier,
                                  "increment"
                                )
                              }
                              className='bg-primary text-white rounded-full cursor-pointer'
                            >
                              <PlusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                            </span>
                            <span className='w-10 text-center outline-none '>
                              {
                                insuranceOptions.passengers[
                                  passenger.identifier
                                ]
                              }
                            </span>
                            <span
                              onClick={() =>
                                updateInsuranceOptionsPassengers(
                                  passenger.identifier,
                                  "decrement"
                                )
                              }
                              className='bg-primary text-white rounded-full cursor-pointer'
                            >
                              <MinusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                            </span>
                          </div>
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
          <ButtonPrimary
            text='حستجو'
            type='submit'
            classes='h-full w-full md:w-fit md:px-8 lg:px-12 rounded-lg py-3 mb-auto'
            icon={<SearchIcon />}
          />
        </div>
      </div>
    </section>
  );
};

export default Insurance;
