import React, { useEffect, useState } from "react";
import { ChevronRightIcon, UserIcon } from "../UI/icons";
import { useTicketBuyingProcess } from "../../store/TicketBuyingProcess";
import { useNavigate } from "react-router-dom";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { supabase } from "../../supabaseClient";
import { getTicketTotalPrice } from "../../util/util";
import { set } from "react-hook-form";
import toast from "react-hot-toast";
import Timer from "../UI/Timer.jsx";
import HeaderTable from "./HeaderTable.jsx";
const PassengerConformInformation = () => {
  const {
    passengersInformation,
    updateTicketBuyingStatus,
    tempSelectedTicket,
    updateTempSelectedTicket,
    contactInformation,
    clearTimer,
    setTimerRunning,
  } = useTicketBuyingProcess();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tempSelectedTicket || passengersInformation.length === 0)
      return navigate("/");
    setTimerRunning(true);
  }, [passengersInformation, tempSelectedTicket]);

  const totalPrice = getTicketTotalPrice(tempSelectedTicket);

  const handlePayment = async () => {
    setIsLoading(true);
    const phoneNumber = contactInformation[0].phoneInformation_phone;
    const reservationNumber = Math.floor(1000000 + Math.random() * 9000000);
    const ticketNumber = Math.floor(1000000 + Math.random() * 9000000);
    const paymentTime = new DateObject().format("HH MM");
    const buyingDate = new DateObject().format("D MMMM YYYY");

    if (
      phoneNumber &&
      reservationNumber &&
      ticketNumber &&
      paymentTime &&
      buyingDate
    ) {
      const updatedData = await updateTempSelectedTicket({
        ...tempSelectedTicket,
        reservationNumber,
        ticketNumber,
        paymentTime,
        phoneNumber,
        buyingDate,
      });

      const userResponse = await supabase.auth.getUser();
      if (userResponse.data) {
        const currentTickets =
          userResponse.data.user.user_metadata.tickets || [];

        const boughtTicket = {
          ticketInformation: tempSelectedTicket,
          passengersInformation: passengersInformation,
          contactInformation: contactInformation[0],
        };
        console.log(boughtTicket);
        const updatedTickets = [...currentTickets, boughtTicket];
        // const isAvailable = () =>
        //   currentTickets.find(
        //     (ticket) => ticket.reservationNumber === reservationNumber
        //   );

        const { data, error } = await supabase.auth.updateUser({
          data: { tickets: updatedTickets },
        });
        if (error) {
          setError(error.message);
        } else {
          updateTicketBuyingStatus("paymentSuccess");
          toast.success("پرداخت با موفقیت انجام شد.");
          clearTimer();
        }
      } else {
        setError("لطفا ابتدا وارد شوید");
      }
    }
    setIsLoading(false);
  };
  return (
    <div className='space-y-5 md:space-y-20'>
      <div className='border border-gray3 rounded-lg p-3 xs:p-6 space-y-6'>
        <HeaderTable>
          <h6 className='text-sm xs:text-base font-IRANSansXBold'>
            تایید اطلاعات
          </h6>
        </HeaderTable>
        <span className='bg-gray3 h-0.5 w-full block'></span>
        {/* passengers information */}
        <div className='space-y-10'>
          {passengersInformation.length > 0 &&
            passengersInformation.map((passenger, index) => (
              <div className='space-y-4' key={index}>
                <div className='flex gap-3 items-center'>
                  <UserIcon classes=' w-5 h-5 md:h-7 md:w-7' />
                  <div className='flex flex-col gap-1 text-sm md:text-base'>
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
            <div className='flex items-center  flex-col md:flex-row gap-2 w-full xs:w-auto'>
              <div className='hidden xs:flex items-center gap-2 text-primary w-full text-sm sm:text-base'>
                <span>مجموع پرداختی شما</span>
                <span>
                  {totalPrice.toLocaleString()}
                  تومان
                </span>
              </div>
              <div className='flex flex-col items-center w-full justify-center relative'>
                <button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className='w-full xs:w-full px-12 py-2 bg-primary text-white rounded-lg text-sm'
                >
                  {isLoading ? "درحال پرداخت ..." : "پرداخت"}
                  <span className='inline-flex xs:hidden px-2'>
                    {totalPrice?.toLocaleString()} تومان
                  </span>
                </button>
                {error && (
                  <span className='absolute right-0 left-0 mx-auto -bottom-[50%] text-xs text-errorLight'>
                    {error}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerConformInformation;
