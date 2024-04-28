import React, { useState } from "react";
import {
  AirPlane,
  AirPlaneWithLines,
  BagIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TicketIcon,
  TimeIcon,
  UserCircleIcon,
} from "./UI/icons";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import { useFindTicketContext } from "../store/findTicketContext";
const PaymentConformation = () => {
  const [showDetails, setShowDetails] = useState(false);
  const { tempSelectedTicket } = useFindTicketContext();
  const totalPrice =
    tempSelectedTicket.price * tempSelectedTicket.passengers.adults +
    tempSelectedTicket.childrenPrice * tempSelectedTicket.passengers.children +
    tempSelectedTicket.childrenPrice * tempSelectedTicket.passengers.baby;
  return (
    <div className='space-y-10 md:space-y-20'>
      <div className='flex-all gap-3 md:text-xl bg-successLight2xl text-success py-2 rounded-lg'>
        <CheckCircleIcon classes='w-6 md:w-8 h-6 md:h-8' />
        پرداخت شما با موفقیت انجام شد.
      </div>
      <div className='space-y-6 border border-gray4 rounded-lg p-3 md:p-6 '>
        <div className='flex items-center justify-between  gap-2 w-full text-sm md:text-base'>
          <div className='flex items-center flex-wrap gap-2 md:gap-4 text-gray9 font-IRANSansXMedium'>
            <div className='flex-all items-center gap-2'>
              <img
                src='/images/companies/mahan.png'
                alt='mahan'
                className='w-6 rounded-full'
              />
              <span className='text-sm'>{tempSelectedTicket?.compony}</span>
            </div>
            <span className='flex items-center gap-1'>
              <AirPlane classes='w-5 h-5 -rotate-90' />
              <span>
                پرواز {tempSelectedTicket?.sourceCity} به{" "}
                {tempSelectedTicket?.destinationCity}
              </span>
            </span>
            <div className='flex gap-2'>
              <span>{tempSelectedTicket?.takeOff}</span>
              <span>{tempSelectedTicket?.date}</span>
            </div>
          </div>
          <div className='flex flex-col  md:flex-row items-center gap-2 text-primary text-nowrap text-xs xs:text-sm'>
            <span>مجموع پرداختی شما</span>
            <span>{totalPrice.toLocaleString()}&nbsp;تومان</span>
          </div>
        </div>
        <div className='flex items-end xs:items-center justify-between flex-wrap text-sm gap-2 xs:gap-4 text-nowrap'>
          <div className='flex items-center gap-2 xs:gap-4 child:flex child:gap-1 flex-wrap '>
            <div>
              <span className='text-gray7 text-xs xs:text-sm'>شماره رزرو:</span>
              <span className='text-gray9 font-IRANSansXMedium'>
                {tempSelectedTicket?.reservationNumber}
              </span>
            </div>
            <div>
              <span className='text-gray7 text-xs xs:text-sm'>شماره بلیط:</span>
              <span className='text-gray9 font-IRANSansXMedium'>
                {tempSelectedTicket?.ticketNumber}
              </span>
            </div>
            <div>
              <span className='text-gray7 text-xs xs:text-sm'>رنج سنی:</span>
              <span className='text-gray9 font-IRANSansXMedium '>
                بزرگسال
                {(tempSelectedTicket?.passengers.children > 0 ||
                  tempSelectedTicket?.passengers.children > 0) &&
                  " و کودک"}
              </span>
            </div>
            <div>
              <span className='text-gray7 text-xs xs:text-sm'>
                تعداد مسافر:
              </span>
              <span className='text-gray9 font-IRANSansXMedium '>
                {tempSelectedTicket?.passengers.adults} بزرگسال
                {tempSelectedTicket?.passengers.children > 0 && (
                  <span className='mr-1'>
                    {tempSelectedTicket?.passengers.children > 0 &&
                      tempSelectedTicket?.passengers.children +
                        tempSelectedTicket?.passengers.baby}
                    &nbsp; کودک
                  </span>
                )}
              </span>
            </div>
            <div>
              <span className='text-gray7 text-xs xs:text-sm'>
                شماره پرواز:
              </span>
              <span className='text-gray9 font-IRANSansXMedium '>
                {tempSelectedTicket?.flightNumber}
              </span>
            </div>
          </div>
        </div>
        <span
          className='flex items-end justify-end gap-1 xs:gap-2 text-primary cursor-pointer text-xs xs:text-sm'
          onClick={() => setShowDetails((prev) => !prev)}
        >
          جزئیات بیشتر
          {showDetails ? (
            <ChevronUpIcon classes='w-4 h-4 xs:w-5 xs:h-5' />
          ) : (
            <ChevronDownIcon classes='w-4 h-4 xs:w-5 xs:h-5' />
          )}
        </span>
      </div>
      {/* ticket Details */}
      <div
        className={`border border-gray4 rounded-lg text-sm transition-all duration-200 ${
          showDetails
            ? "visible opacity-100 h-full translate-y-4"
            : "invisible opacity-0 h-0"
        }`}
      >
        <div className='flex h-full child:py-6'>
          <div className='flex-all w-[56px] md:w-[114px] text-gray6 border-l border-b border-gray2'>
            <TicketIcon classes='w-4 md:w-8 h-4 md:h-8' />
          </div>
          <div className='flex items-center justify-center md:justify-start flex-wrap pr-4 lg:pr-14 gap-3 xs:gap-4 border-b border-gray2 h-full w-full text-center md:text-right'>
            <div className='child:block '>
              <span className='text-gray7'>شماره رزرو</span>
              <span className='text-gray9 font-IRANSansXMedium'> 123456</span>
            </div>
            <div className='child:block '>
              <span className='text-gray7'>شماره بلیط</span>
              <span className='text-gray9 font-IRANSansXMedium'>
                123456789123
              </span>
            </div>
            <div className='child:block '>
              <span className='text-gray7'>تاریخ خرید</span>
              <span className='text-gray9 font-IRANSansXMedium'>
                شنبه 27 مرداد_2023
              </span>
            </div>
            <div className='child:block '>
              <span className='text-gray7'>ساعت خرید</span>
              <span className='text-gray9 font-IRANSansXMedium'>15:30</span>
            </div>
            <div className='child:block '>
              <span className='text-gray7'>تلفن همراه</span>
              <span className='text-gray9 font-IRANSansXMedium'>
                091011231456
              </span>
            </div>
            <div className='flex-all flex-col items-center'>
              <span className='text-gray7'>وضعیت</span>
              <span className='flex gap-1 text-success font-IRANSansXMedium '>
                <CheckIcon />
                <span>تایید شده</span>
              </span>
            </div>
          </div>
        </div>
        <div className='flex h-full'>
          <div className='flex-all w-[56px] md:w-[114px] text-gray6  border-l border-b border-gray2'>
            <UserCircleIcon classes='w-4 md:w-8 h-4 md:h-8' />
          </div>
          <div className='space-y-6 border-b border-gray2 h-full w-full divide-y divide-gray2 child:py-6'>
            {/* Passengers */}
            <div className='flex items-center justify-center md:justify-start flex-wrap pr-4 lg:pr-14 gap-3 xs:gap-4 h-full w-full text-center md:text-right'>
              <div className='child:block '>
                <span className='text-gray7'>نام مسافر</span>
                <span className='text-gray9'>خانم شیوا ارغوان</span>
              </div>
              <div className='child:block '>
                <span className='text-gray7'>نام مسافر به لاتین</span>
                <span className='text-gray9'>Mrs.shiva arghavan</span>
              </div>
              <div className='child:block '>
                <span className='text-gray7'>تاریخ تولد</span>
                <span className='text-gray9'>139575/04/25</span>
              </div>
              <div className='child:block '>
                <span className='text-gray7'>کدملی/شماره گذرنامه</span>
                <span className='text-gray9'>123456789987</span>
              </div>
            </div>
            <div className='flex items-center justify-center md:justify-start flex-wrap pr-4 lg:pr-14 gap-3 xs:gap-4  h-full w-full text-center md:text-right'>
              <div className='child:block '>
                <span className='text-gray7'>نام مسافر</span>
                <span className='text-gray9'>خانم شیوا ارغوان</span>
              </div>
              <div className='child:block '>
                <span className='text-gray7'>نام مسافر به لاتین</span>
                <span className='text-gray9'>Mrs.shiva arghavan</span>
              </div>
              <div className='child:block '>
                <span className='text-gray7'>تاریخ تولد</span>
                <span className='text-gray9'>139575/04/25</span>
              </div>
              <div className='child:block '>
                <span className='text-gray7'>کدملی/شماره گذرنامه</span>
                <span className='text-gray9'>123456789987</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex h-full child:py-6'>
          <div className='flex-all w-[56px] md:w-[114px] text-gray6  border-l border-b border-gray2'>
            <AirPlane classes='w-4 md:w-8 h-4 md:h-8' />
          </div>
          <div className='flex flex-col pr-4 md:pr-14 gap-4 md:gap-6 items-center md:items-start border-b border-gray2 h-full w-full text-xs xs:text-sm'>
            <div className='flex flex-col md:flex-row items-center justify-center xs:justify-start gap-4 lg:gap-6 text-center md:text-right'>
              <div className='flex-all flex-col gap-2 font-IRANSansXBold'>
                <img
                  src='/images/companies/mahan.png'
                  alt='company'
                  className='w-8 rounded-full'
                />
                <span>ماهان</span>
              </div>
              <div className='flex flex-wrap justify-center sm:justify-start items-center gap-2 xs:gap-4'>
                <div className='flex-all flex-col gap-2'>
                  <span className='font-IRANSansXBold'>02:50</span>
                  <span>استانبول (SAW)</span>
                </div>
                <div className='flex-all flex-col text-gray7 gap-1 xs:gap-2 w-fit'>
                  <span className='flex items-center gap-2 text-xs md:text-base'>
                    <TimeIcon classes='w-4 h-4 md:w-5 md:h-5' />
                    19:00
                  </span>
                  <AirPlaneWithLines classes='w-[70px] xs:w-[140px] h-[16px]' />
                  <span className='flex items-center gap-2 text-xs md:text-base'>
                    <BagIcon classes='w-4 h-4 md:w-5 md:h-5' />
                    20Kg
                  </span>
                </div>
                <div className='flex-all flex-col gap-2'>
                  <span className='font-IRANSansXBold'>21:50</span>
                  <span>دبی (DXB)</span>
                </div>
                <div className='flex-all flex-col gap-2'>
                  <span className='text-gray7'>شماره پرواز</span>
                  <span className='text-gray8 font-IRANSansXMedium'>165</span>
                </div>
                <div className='flex-all flex-col gap-2'>
                  <span className='text-gray7'>کلاس پرواز</span>
                  <span className='text-gray8 font-IRANSansXMedium'>
                    کوانومی
                  </span>
                </div>
              </div>
              {/* <div className='flex-all flex-col gap-2'></div> */}
            </div>
            <div className='flex flex-col sm:flex-row items-start gap-4 text-center md:text-right'>
              <div className='flex gap-3'>
                <div className='flex flex-col '>
                  <span className='text-gray7'>فرودگاه مبدا</span>
                  <span className='font-IRANSansXMedium'>
                    استانبول، فرودگاه استانبول
                  </span>
                </div>
                <div className='flex  flex-col '>
                  <span className='text-gray7'>فرودگاه مقصد</span>
                  <span className='font-IRANSansXMedium'>دبی، فرودگاه دبی</span>
                </div>
              </div>
              <div className='flex  gap-3'>
                <div className='flex  flex-col '>
                  <span className='text-gray7'>زمان سفر:</span>
                  <span className='text-gray8 font-IRANSansXMedium'>
                    دوشنبه،6 شهریور 1402
                  </span>
                </div>
                <div className='flex  flex-col '>
                  <span className='text-gray7'>زمان رسیدن:</span>
                  <span className='text-gray8 font-IRANSansXMedium'>
                    دوشنبه،7 شهریور 1402
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex-all gap-4 child:w-[184px] child:h-10 text-sm font-IRANSansXMedium'>
        {/* download ticket */}
        <button
          className='flex-all gap-2 text-white bg-primary rounded-lg'
          onClick={() => {}}
        >
          <TicketIcon />
          دانلود بلیط
        </button>
        <button className='flex-all gap-2 text-primary border border-primary bg-white rounded-lg'>
          <TicketIcon />
          دانلود بلیط
        </button>
      </div>
    </div>
  );
};

export default PaymentConformation;
