import React, { useEffect, useState } from "react";
import { ChevronRightIcon, UserIcon } from "./UI/icons";
import { useTicketBuyingProcess } from "../store/TicketBuyingProcess";
import { useNavigate } from "react-router-dom";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
const PassengerConformInformation = () => {
  const {
    passengersInformation,
    updateTicketBuyingStatus,
    tempSelectedTicket,
    updateTempSelectedTicket,
    contactInformation,
  } = useTicketBuyingProcess();
  const navigate = useNavigate();
  const [passengerDetails, setPassengerDetails] = useState([]);

  useEffect(() => {
    if (!tempSelectedTicket || passengersInformation.length === 0)
      return navigate("/");
  }, [passengersInformation, tempSelectedTicket]);
  let totalPrice =
    tempSelectedTicket.price * tempSelectedTicket.passengers.adults +
    tempSelectedTicket.childrenPrice * tempSelectedTicket.passengers.children +
    tempSelectedTicket.childrenPrice * tempSelectedTicket.passengers.baby;
  // console.log(passengersInformation);
  const handlePayment = () => {
    const phoneNumber = contactInformation[0].phoneInformation_phone;
    const reservationNumber = Math.floor(1000000 + Math.random() * 9000000);
    const ticketNumber = Math.floor(1000000 + Math.random() * 9000000);
    const paymentTime = new DateObject().format("HH MM");
    const buyingDate = new DateObject({
      calendar: persian,
      locale: persian_fa,
    }).format("D MMMM YYYY");
    console.log(buyingDate);
    if (
      phoneNumber &&
      reservationNumber &&
      ticketNumber &&
      paymentTime &&
      buyingDate
    ) {
      console.log("first");
      updateTempSelectedTicket({
        ...tempSelectedTicket,
        reservationNumber,
        ticketNumber,
        paymentTime,
        phoneNumber,
        buyingDate,
      });
      updateTicketBuyingStatus("paymentSuccess");
    }
  };
  return (
    <div className='space-y-5 md:space-y-20'>
      <div className='border border-gray3 rounded-lg p-3 xs:p-6 space-y-6'>
        <div className='flex items-center justify-between w-full '>
          <h6 className='text-sm xs:text-base font-IRANSansXBold'>
            تایید اطلاعات
          </h6>
          <div className='text-xs xs:text-sm'>
            <span>زمان باقی مانده:</span>
            <span className='text-errorLight'>07:23</span>
          </div>
        </div>
        <span className='bg-gray3 h-0.5 w-full block'></span>
        {/* passengers information */}
        <div className='space-y-10'>
          {passengersInformation.length > 0 &&
            passengersInformation?.map((passenger, index) => (
              <div className='space-y-4' key={index}>
                <div className='flex gap-3 items-center'>
                  <UserIcon classes=' w-5 h-5 md:h-7 md:w-7' />
                  <div className='flex flex-col gap-1 text-sm md:text-base'>
                    {/* <span className=''>
                  </span> */}
                    <span className='text-gray7 font-IRANSansXBold text-left '>
                      {passenger.gender === "مرد" ? "Mr." : "Miss."}{" "}
                      {passenger.firstName}
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-3 md:gap-6 flex-wrap text-sm md:text-base'>
                  <div className='flex items-center gap-2 '>
                    <span className='text-xs md:text-sm'>رده سنی:</span>
                    <span className='font-IRANSansXMedium'>
                      {passenger.age}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs md:text-sm'>تاریخ تولد:</span>
                    <span className='font-IRANSansXMedium'>
                      {passenger.dateOfBirth}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs md:text-sm'>کدملی:</span>
                    <span className='font-IRANSansXMedium'>
                      {passenger.nationalCode}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs md:text-sm'>شماره پاسپورت:</span>
                    <span className='font-IRANSansXMedium'>
                      {passenger.passPortNumber}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs md:text-sm'>قیمت بلیط:</span>
                    <span className='font-IRANSansXMedium'>
                      {passenger.age === "بزرگسال"
                        ? tempSelectedTicket.price.toLocaleString()
                        : tempSelectedTicket.childrenPrice.toLocaleString()}
                      تومان
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <span className='bg-gray3 h-0.5 w-full block'></span>
        <div className='space-y-4'>
          <span className='inline-block text-sm'>
            اگر کد تخفیف دارید، وارد کنید و دکمه ثبت را بزنید.
          </span>
          <div className='flex flex-col xs:flex-row gap-6 items-center md:h-12'>
            <input
              type='text'
              className='w-full xs:w-[260px] h-10 rounded-lg border border-gray3 px-2 outline-none'
              placeholder='کد تخفیف'
            />
            <button className='flex-all w-full xs:w-[100px] h-10 rounded-lg border border-primary text-primary '>
              ثبت
            </button>
          </div>
        </div>
        <span className='bg-gray3 h-0.5 w-full block'></span>
        <div className='space-y-4'>
          <label className='flex gap-2 w-fit'>
            <input type='checkbox' />
            استفاده از موجودی کیف پول
          </label>
          <div className='flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-nowrap'>
            <span
              onClick={() => {
                updateTicketBuyingStatus("information");
              }}
              className='flex items-center gap-2 font-IRANSansXMedium text-primary text-sm cursor-pointer'
            >
              <ChevronRightIcon />
              بازگشت به مرحله قبل
            </span>
            <div className='flex items-center gap-2 w-full xs:w-auto'>
              <div className='hidden xs:flex items-center gap-2 text-primary w-full text-sm sm:text-base'>
                <span>مجموع پرداختی شما</span>
                <span>
                  {totalPrice.toLocaleString()}
                  تومان
                </span>
              </div>
              <button
                onClick={handlePayment}
                className='w-full  xs:w-auto px-12 py-2 bg-primary text-white rounded-lg text-sm'
              >
                پرداخت
                <span className='inline-flex xs:hidden'>
                  {totalPrice?.toLocaleString()} تومان
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerConformInformation;
