import React, { useEffect } from "react";
import {
  CheckIcon,
  CreditCartIcon,
  TicketIcon,
  UserIcon,
} from "../components/UI/icons";
import { useNavigate } from "react-router-dom";
import PassengersInformation from "../components/checkout/PassengersInformation.jsx";
import PassengerConformInformation from "../components/checkout/PassengerConformInformation.jsx";
import PaymentConformation from "../components/checkout/PaymentConformation.jsx";
import TicketDetailItem from "../components/ticket/TicketDetailItem.jsx";
import { useTicketBuyingProcess } from "../store/TicketBuyingProcess.jsx";
const Checkout = () => {
  const { tempSelectedTicket, updateTempSelectedTicket, ticketBuyingStatus } =
    useTicketBuyingProcess();
  const navigate = useNavigate();
  useEffect(() => {
    if (tempSelectedTicket === null) navigate("/");
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='container space-y-10 md:space-y-20 '>
      <div className='flex flex-col xs:flex-row gap-4 items-center  text-xs xs:text-sm text-tint3 '>
        <div className=' text-nowrap flex-all flex-col gap-2'>
          <span className='p-1 md:p-2 bg-tint1 rounded-full w-fit '>
            <CheckIcon />
          </span>
          انتخاب بلیط
        </div>
        <span className='h-0.5 bg-gray3 rounded-xl w-full'></span>
        <div
          className={`text-nowrap flex-all flex-col gap-2 font-IRANSansXBold ${
            ticketBuyingStatus === "information" && "text-primary"
          }`}
        >
          <span className='p-1 md:p-2 bg-tint1 rounded-full w-fit text'>
            <UserIcon />
          </span>
          مشخصات
        </div>
        <span className='h-0.5 bg-gray3 rounded-xl w-full'></span>
        <div
          className={`text-nowrap flex-all flex-col gap-2 ${
            ticketBuyingStatus === "conformation" && "text-primary"
          }`}
        >
          <span className='p-1 md:p-2 bg-tint1 rounded-full w-fit '>
            <CreditCartIcon />
          </span>
          تایید بلیط و پرداخت
        </div>
        <span className='h-0.5 bg-gray3 rounded-xl w-full'></span>
        <div
          className={` text-nowrap flex-all flex-col gap-2 ${
            ticketBuyingStatus === "paymentSuccess" && "text-primary"
          }`}
        >
          <span className='p-1 md:p-2 bg-tint1 rounded-full w-fit '>
            <TicketIcon />
          </span>
          صدور بلیط
        </div>
      </div>
      {(ticketBuyingStatus === "information" ||
        ticketBuyingStatus === "conformation") &&
        tempSelectedTicket && (
          <div className='flex-all w-full'>
            <TicketDetailItem
              isMoreDetail={false}
              detail={tempSelectedTicket}
              changeTicket={
                <button
                  onClick={() => {
                    updateTempSelectedTicket(null);
                    navigate("/flights");
                  }}
                  className='px-6 py-1.5 md:px-8 lg:py-2 bg-primary text-white text-nowrap cursor-pointer rounded-md transition-all text-sm'
                >
                  تغیر بلیط
                </button>
              }
            />
          </div>
        )}

      {ticketBuyingStatus === "information" && <PassengersInformation />}
      {ticketBuyingStatus === "conformation" && <PassengerConformInformation />}
      {ticketBuyingStatus === "paymentSuccess" && <PaymentConformation />}
    </div>
  );
};

export default Checkout;
