import React from "react";
import LandingImage from "../components/LandingImage";
import {
  SearchIcon,
  AirPlane,
  CheckCircleIcon,
  CreditCartIcon,
  TicketIcon,
  CalenderIcon,
} from "../components/UI/icons";

const STEPS = [
  {
    id: "s1",
    title: "جستجوی بلیط",
    text: "در بخش جستجو، نوع سفر ‏(یکطرفه یا رفت و برگشت)‏ و مبدأ و مقصد خود را وارد کنید، تاریخ سفر را انتخاب کنید و تعداد مسافران را مشخص کنید.",
    icon: <SearchIcon classes='w-4 h-4 sm:w-6 sm:h-6' />,
  },
  {
    id: "s2",
    title: "انتخاب پرواز",
    text: " بر اساس اطلاعاتی که وارد کرده‌اید، نتایجی شامل لیست پروازها و قیمت‌ها نمایش داده می‌شود. می‌توانید پروازهای مختلف را بررسی کنید و براساس ترجیحات خود،یک پرواز را انتخاب کنید",
    icon: <AirPlane classes='w-4 h-4 sm:w-6 sm:h-6' />,
  },
  {
    id: "s3",
    title: "انتخاب صندلی",
    text: "پس از انتخاب پرواز،شما باید صندلی یا صندلی های مورد نظرخود راانتخاب کنید .",
    icon: <CheckCircleIcon classes='w-4 h-4 sm:w-6 sm:h-6' />,
  },
  {
    id: "s4",
    title: "اطلاعات مسافران",
    text: "دراین مرحله باید اطلاعات مسافران را وارد کنید.این اطلاعات شامل نام ونام خانوادگی ،جنسیت ،تاریخ تولد واطلاعات تماس می باشد.",
    icon: <CalenderIcon classes='w-4 h-4 sm:w-6 sm:h-6' />,
  },
  {
    id: "s5",
    title: "تایید وپرداخت",
    text: "دراین مرحله باید هزینه بلیط را پرداخت کنید. شما میتوانیدبا کارت بانکی،که رمز پویا دارد وارد درگاه پرداخت شده وپس از پرداخت موفق،بلیط شما تایید می شود ویک بلیط الکترونیکی به شما ارائه می شود.",
    icon: <CreditCartIcon classes='w-4 h-4 sm:w-6 sm:h-6' />,
  },
  {
    id: "s6",
    title: "دریافت بلیط",
    text: "پس از تایید خرید،بلیط را از وب سایت زرروشده دریافت کنید ویا آن را چاپ کنید.",
    icon: <TicketIcon classes='w-4 h-4 sm:w-6 sm:h-6' />,
  },
];
const BuyingSteps = () => {
  return (
    <div>
      <LandingImage
        bgClass='guildBgGradient'
        mainTitle='خرید مطمعین را با بیلیتو تجربه کنید'
      />
      <div className='container py-10 space-y-7 md:space-y-14'>
        <h4 className='text-xl xs:text-2xl md:text-3xl font-IRANSansXBold text-right'>
          مراحل خرید آنلاین بلیط هواپیما
        </h4>
        <div>
          {STEPS.map((item) => (
            <div
              key={item.id}
              className='space-y-2 md:space-y-4 border-r border-gray4 border-dashed h-fit pb-8 pr-6  sm:pr-10 relative custom-ticket-Step-elem after:w-4 after:h-4 after:sm:w-6 after:sm:h-6 after:-right-2 after:sm:-right-3'
            >
              <h6 className='flex items-center gap-2 text-gray8 font-IRANSansXBold text-lg md:text-2xl '>
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </h6>
              <p className='text-gray6 text-sm md:text-xl'>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyingSteps;
