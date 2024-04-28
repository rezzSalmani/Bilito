import React, { useState, useRef, useEffect } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "../UI/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
const availableTickets = [
  {
    id: "t1",
    isAvailable: true,
    price: 1300000,
    isFull: false,
    isDiscount: false,
  },
  {
    id: "t2",
    isAvailable: true,
    price: 1100000,
    isFull: true,
    isDiscount: false,
  },
  {
    id: "t3",
    isAvailable: false,
    price: 1350000,
    isFull: false,
    isDiscount: false,
  },
  {
    id: "t4",
    isAvailable: true,
    price: 1400000,
    isFull: false,
    isDiscount: false,
  },
  {
    id: "t5",
    isAvailable: true,
    price: 960000,
    isFull: false,
    isDiscount: true,
  },
  {
    id: "t6",
    isAvailable: true,
    price: 1400000,
    isFull: true,
    isDiscount: false,
  },
  {
    id: "t7",
    isAvailable: true,
    price: 1400000,
    isFull: false,
    isDiscount: true,
  },
  {
    id: "t8",
    isAvailable: true,
    price: 1400000,
    isFull: false,
    isDiscount: true,
  },
];
let initDate = 1;
const PriceCalender = () => {
  const [priceCalender, setPriceCalender] = useState(false);
  const swiperRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  return (
    <div className='relative w-full md:w-[90%] shadow-md border border-gray3 rounded-lg'>
      <div
        className='hidden p-2 md:flex w-full justify-between cursor-pointer font-IRANSansXMedium '
        onClick={() => setPriceCalender(!priceCalender)}
      >
        <span>تقویم قیمتی</span>
        {priceCalender ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </div>
      {/* menu droop Down */}
      <div
        className={`flex md:absolute top-10 left-0 right-0 mx-auto items-center justify-between rounded-lg  border border-gary4 bg-white transition-all child:flex-all text-nowrap overflow-hidden ${
          priceCalender
            ? "w-full h-24 visible opacity-100"
            : "md:invisible md:opacity-0 md:h-0"
        }`}
      >
        <span
          onClick={handlePrev}
          ref={prevButtonRef}
          className='w-10 inline-block  h-full cursor-pointer'
        >
          <ChevronRightIcon />
        </span>
        <Swiper
          ref={swiperRef}
          spaceBetween={20}
          slidesPerView={"auto"}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}
          centeredSlides={false}
          // breakpoints={{
          //   380: {
          //     slidesPerView: 1,
          //     spaceBetween: 10,
          //   },
          //   480: {
          //     slidesPerView: 2,
          //     spaceBetween: 10,
          //   },
          //   640: {
          //     slidesPerView: 4,
          //     spaceBetween: 5,
          //   },
          //   1024: {
          //     slidesPerView: 5,
          //     spaceBetween: 10,
          //   },
          //   1220: {
          //     slidesPerView: 6,
          //     spaceBetween: 10,
          //   },
          // }}
          className='flex items-center justify-center w-auto gap-4 text-xs h-full text-gray-600'
        >
          {availableTickets.map((ticket, index) => {
            const enDate = new DateObject();
            const date = new DateObject({
              calendar: persian,
              locale: persian_fa,
            });

            return (
              <SwiperSlide
                className='flex w-fit h-full justify-evenly bg-white items-center py-3 child:inline-block flex-col hover:border-b-2 border-b-primary duration-75 transition-all  cursor-pointer font-IRANSansXMedium text-gray7 overflow-hidden'
                key={ticket.id}
              >
                <div className=' text-gray7'>
                  <span>{date.add(index, "days").format("D MMMM YYYY")}</span>
                </div>
                <span>{enDate.add(index, "days").format("D MMMM")}</span>
                <span className={` ${ticket.isDiscount && "text-success"}`}>
                  {ticket.isAvailable ? (
                    ticket.isFull ? (
                      "ظرفیت تکمیل"
                    ) : (
                      ticket.price
                    )
                  ) : (
                    <span className='text-error'>ناموجود</span>
                  )}
                </span>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <span
          onClick={handleNext}
          ref={nextButtonRef}
          className='w-10 inline-block h-full cursor-pointer'
        >
          <ChevronLeftIcon />
        </span>
      </div>
    </div>
  );
};

export default PriceCalender;
