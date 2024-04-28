import React, { Fragment, useState } from "react";
import {
  TimeIcon,
  AirPlaneIconPopularServices,
  TicketIcon,
  BagIcon,
  CloseCircleIcon,
} from "../UI/icons";
import { Tab } from "@headlessui/react";
import Modal from "../UI/Modal";
import { useAuthContext } from "../../store/authContext";
import toast from "react-hot-toast";
import { useFindTicketContext } from "../../store/findTicketContext";
import { useNavigate } from "react-router-dom";
import { useTicketBuyingProcess } from "../../store/TicketBuyingProcess";

const TicketDetailItem = ({
  detail,
  isMoreDetail = true,
  changeTicket = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { sitType, date, passengers } = useFindTicketContext();
  const { updateTempSelectedTicket } = useTicketBuyingProcess();
  const navigate = useNavigate();
  function closeModal() {
    setIsModalOpen(false);
  }
  function openModal() {
    setIsModalOpen(true);
  }
  const { currentUser } = useAuthContext();

  const button = (
    <button
      type='button'
      className='flex-all items-center gap-2 px-3 py-2 lg:px-5 lg:py-3 bg-primary text-white text-nowrap cursor-pointer rounded-md transition-all text-sm font-medium hover:bg-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 active:scale-95'
    >
      جزئیات بلیط
      <span className='hidden xs:block'>
        <TicketIcon />
      </span>
    </button>
  );
  const {
    id,
    sourceCity,
    destinationCity,
    sourceAirport,
    destinationAirport,
    sitLeft,
    takeOff,
    landingTime,
    compony,
    componyImage,
    ticketLevel,
    travelTime,
    price,
    childrenPrice,
    returnable,
    isPopular,
    middleStop,
    flightNumber,
  } = detail;

  const handleCheckout = () => {
    // create a 6 diget random number
    if (!currentUser) {
      return toast.error("لطفا ابتدا ثبت نام کنید.");
    }
    updateTempSelectedTicket({
      ...detail,
      passengers,
      sitType,
      date,
    });
    navigate("/checkout");
  };
  return (
    <div className=' border border-gray3 rounded-lg p-3 md:p-6 space-y-3 md:space-y-6 w-full xs:w-auto'>
      <div className='flex items-center justify-between '>
        <div className='flex-all flex-wrap gap-2 text-[10px] sm:text-xs child:bg-errorLight2xl text-error child:p-1.5 child:rounded-lg'>
          <span>{sitLeft} صندلی باقی مانده </span>
          <span>غیر قابل استرداد</span>
        </div>
        <div className='flex-all flex-wrap gap-2 text-[10px] sm:text-xs child:bg-tint1 text-primary child:p-1.5 child:rounded-lg'>
          <span>{ticketLevel}</span>
          <span>سیستمی</span>
        </div>
      </div>
      {/* ticket time and price */}
      <div className='flex flex-col xs:flex-row justify-between items-center w-full gap-4'>
        <div className='flex justify-evenly sm:justify-start sm:gap-4 text-center w-full lg:w-[50%]'>
          <div className='flex-all flex-col gap-1 text-xs sm:text-sm text-gray-600 font-IRANSansXBold'>
            <img
              src={componyImage}
              alt='mahan'
              className='w-8 md:w-12 rounded-full'
            />
            <span>{compony}</span>
          </div>
          <div className='flex-all flex-col gap-3 '>
            <span className='font-IRANSansXBold text-base text-gray8'>
              {takeOff}
            </span>
            <span className='text-xs sm:text-sm text-gray7'>{sourceCity}</span>
          </div>
          <div className='flex lg:w-full flex-col gap-4 child:flex-all child:gap-1 text-xs md:text-sm text-gray6'>
            <span>
              <TimeIcon classes='w-4 h-4' />
              {travelTime}
            </span>
            <span className=' border-dashed border-b w-14 xs:w-20 md:min-w-28 lg:w-full border-gray3 relative'>
              <span className='flex-all absolute inset-0 my-auto left-0 w-full text-primary'>
                <AirPlaneIconPopularServices />
              </span>
            </span>
            <span>
              <BagIcon classes='w-4 h-4' />
              20 Kg
            </span>
          </div>
          <div className='flex-all flex-col gap-3 '>
            <span className='font-IRANSansXBold text-gray8 text-base'>
              {landingTime}
            </span>
            <span className='text-xs sm:text-sm text-gray7'>
              {destinationCity}
            </span>
          </div>
        </div>
        <div className='flex flex-row flex-wrap text-center items-center justify-end sm:justify-end gap-1 lg:gap-4 text-sm md:text-base w-full sm:w-fit text-nowrap '>
          <div>
            <span className='flex-all font-IRANSansXMedium text-primary'>
              {price.toLocaleString()}تومان
            </span>
            <span className='text-warning text-xs'>نرخ رسمی ایران لاین</span>
          </div>
          {changeTicket}
          {isMoreDetail && (
            <Modal
              button={button}
              isOpen={isModalOpen}
              closeModal={closeModal}
              openModal={openModal}
            >
              <div className='flex flex-col gap-3 justify-start items-start p-3 xs:p-6 w-screen  h-screen xs:h-[520px] xs:w-[500px] md:w-[600px] lg:w-[800px] transition-all text-right'>
                <Tab.Group
                  selectedIndex={selectedTabIndex}
                  onChange={setSelectedTabIndex}
                >
                  <Tab.List className='flex items-center justify-between w-full gap-3'>
                    <div className='flex items-center text-sm gap-4 md:gap-4 h-fit border-b border-gray3 child:py-4 w-full '>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={`relative ${
                              selected ? "text-blue-500" : "text-gray5 "
                            }`}
                          >
                            <span>اطلاعات پرواز</span>
                            {selected ? (
                              <span className='absolute -bottom-0.5 left-0 right-0 mx-auto w-full h-0.5 rounded-3xl bg-primary transition-all duration-300'></span>
                            ) : (
                              <span className='absolute -bottom-0.5 left-0 right-0 mx-auto h-0.5 rounded-3xl bg-primary opacity-0 invisible w-0 transition-all duration-300'></span>
                            )}
                          </button>
                        )}
                      </Tab>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={`relative ${
                              selected ? "text-blue-500 " : "text-gray5 "
                            }`}
                          >
                            <span>
                              <span className='hidden pl-1 md:inline-block'>
                                قوانین
                              </span>
                              استرداد
                            </span>
                            {selected ? (
                              <span className='absolute -bottom-0.5 left-0 right-0 mx-auto w-full h-0.5 rounded-3xl bg-primary transition-all duration-300'></span>
                            ) : (
                              <span className='absolute -bottom-0.5 left-0 right-0 mx-auto h-0.5 rounded-3xl bg-primary opacity-0 invisible w-0 transition-all duration-300'></span>
                            )}
                          </button>
                        )}
                      </Tab>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={`relative ${
                              selected ? "text-blue-500 " : "text-gray5 "
                            }`}
                          >
                            <span>
                              <span className='hidden pl-1  md:inline-block'>
                                قوانین
                              </span>{" "}
                              ویزا و مسیر
                            </span>
                            {selected ? (
                              <span className='absolute -bottom-0.5 left-0 right-0 mx-auto w-full h-0.5 rounded-3xl bg-primary transition-all duration-300'></span>
                            ) : (
                              <span className='absolute -bottom-0.5 left-0 right-0 mx-auto h-0.5 rounded-3xl bg-primary opacity-0 invisible w-0 transition-all duration-300'></span>
                            )}
                          </button>
                        )}
                      </Tab>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={`relative ${
                              selected ? "text-blue-500 " : "text-gray5 "
                            }`}
                          >
                            <span>بار مجاز</span>
                            {selected ? (
                              <span className='absolute -bottom-0.5 left-0 right-0 mx-auto w-full h-0.5 rounded-3xl bg-primary transition-all duration-300'></span>
                            ) : (
                              <span className='absolute -bottom-0.5 left-0 right-0 mx-auto h-0.5 rounded-3xl bg-primary opacity-0 invisible w-0 transition-all duration-300'></span>
                            )}
                          </button>
                        )}
                      </Tab>
                    </div>
                    <span onClick={closeModal}>
                      <CloseCircleIcon classes='w-6 h-6 text-gray7' />
                    </span>
                  </Tab.List>
                  <Tab.Panels className='w-full h-full'>
                    {/* tab-1 */}
                    <Tab.Panel className='flex flex-col space-y-4 h-full'>
                      {/* compony, class , sits */}
                      <div className='flex gap-6'>
                        <div className='flex items-center gap-2'>
                          <img
                            src={componyImage}
                            alt={compony}
                            className='w-6 md:w-10 rounded-full'
                          />
                          <span className='text-xs sm:text-base text-nowrap font-IRANSansXMedium text-shade3'>
                            {compony}
                          </span>
                        </div>
                        <div className='flex justify-end items-center w-full flex-wrap gap-1 md:gap-2 text-[10px] md:text-xs text-error child:p-1.5 child:rounded-lg'>
                          <span className='bg-errorLight2xl'>
                            {sitLeft} صندلی باقی مانده
                          </span>
                          <span
                            className={
                              returnable
                                ? "bg-successLight"
                                : "bg-errorLight2xl"
                            }
                          >
                            {returnable ? "قابل استرداد" : "  غیر قابل استرداد"}
                          </span>
                          <span className='bg-tint1 text-primary'>
                            {ticketLevel}
                          </span>
                          <span className='bg-tint1 text-primary'>سیستمی</span>
                        </div>
                      </div>
                      <div className='flex flex-col md:flex-row gap-2 md:gap-6 h-full'>
                        {/* ticket details */}
                        <div className='flex flex-col gap-2 md:gap-4 w-full lg:min-w-[60%] sm:text-nowrap'>
                          <div className='flex items-center justify-between md:items-start md:flex-col gap-2 text-center text-xs sm:text-sm lg:text-base'>
                            <h6 className='flex flex-col md:flex-row gap-1 '>
                              <span>{takeOff}</span>
                              <span>
                                {sourceCity} فرودگاه {sourceAirport}
                              </span>
                              <span>{date}</span>
                            </h6>
                            {middleStop && (
                              <div className='flex-all gap-4 border-dashed border-b md:border-b-transparent md:border-r w-24 md:w-fit md:h-20 border-gray3 relative md:pr-4 md:mr-5'>
                                <span className='flex-all absolute bottom-0 right-0 left-0 mx-auto md:mx-0 md:-right-5 my-auto w-full h-full md:w-10 text-primary md:-rotate-90'>
                                  <AirPlaneIconPopularServices />
                                </span>
                                <span className='md:hidden absolute bottom-2 text-[10px]'>
                                  توقف در امان
                                </span>
                                <div className='hidden md:flex items-center gap-2 text-sm text-warning bg-warningLight2xl p-1 rounded-lg'>
                                  <span>15:35</span>
                                  <span>توقف در امان،فرودگاه Queen Alia</span>
                                </div>
                              </div>
                            )}
                            {middleStop && (
                              <h6 className='hidden md:flex flex-col md:flex-row gap-1 '>
                                <span>17:00</span>
                                <span>امان، فرودگاه Queen Alia</span>
                                <span>{date}</span>
                              </h6>
                            )}
                            <div className='hidden md:flex items-center gap-4 w-fit border-dashed border-r h-20 border-gray3 relative pr-4 mr-5'>
                              <span className='flex-all absolute top-0 bottom-0 -right-5 my-auto h-full left-0 w-10 text-primary -rotate-90'>
                                <AirPlaneIconPopularServices />
                              </span>
                            </div>
                            <h6 className='flex flex-col md:flex-row gap-1 text-nowrap '>
                              <span>{landingTime}</span>
                              <span>
                                {destinationCity} ، فرودگاه {destinationAirport}{" "}
                              </span>
                              <span>{date}</span>
                            </h6>
                          </div>
                          {/* flight number ,travel time and ... */}
                          <div className='flex flex-col gap-2 text-xs text-gray6 w-full text-right mt-auto'>
                            <div className='flex  items-center justify-center md:justify-between gap-4'>
                              <span>
                                شماره پرواز <span>{sourceCity}</span> به&nbsp;
                                <span>{destinationCity}</span>:
                                <span className='text-black'>
                                  {flightNumber}
                                </span>
                              </span>
                              {middleStop && (
                                <span>
                                  شماره پرواز <span>دبی</span> به&nbsp;
                                  <span>امان</span>:
                                  <span className='text-black'>195</span>
                                </span>
                              )}
                            </div>
                            <div className='flex items-center justify-center md:justify-between gap-4'>
                              <span>
                                طول مدت سفر:
                                <span className='text-black'>
                                  {travelTime} ساعت
                                </span>
                              </span>
                              <span>
                                بارمجاز:
                                <span className='text-black'> 20 کیلوگرم</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* price details */}
                        <div className='flex flex-col mt-auto w-full gap-3 md:text-sm text-xs'>
                          <div className='flex flex-col w-full gap-3 md:gap-4 border border-gray3 shadow-sm rounded-lg p-3 '>
                            <h6 className='font-IRANSansXBold md:text-lg'>
                              جزئیات قیمت
                            </h6>
                            <div className='flex items-center justify-between gap-4'>
                              <span>قیمت بزرگسال:</span>
                              <span>
                                {price.toLocaleString()}
                                <span className='text-[10px] pr-1'>تومان</span>
                              </span>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                              <span>قیمت کودک:</span>
                              <span>
                                {childrenPrice.toLocaleString()}
                                <span className='text-[10px] pr-1'>تومان</span>
                              </span>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                              <span>مالیات و عوارض</span>
                              <span>
                                143,000
                                <span className='text-[10px] pr-1'>تومان</span>
                              </span>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                              <span>خدمات</span>
                              <span>
                                0<span className='text-[10px] pr-1'>تومان</span>
                              </span>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                              <span>مالیات بر ارزش افزوده</span>
                              <span>
                                0<span className='text-[10px] pr-1'>تومان</span>
                              </span>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                              <h6 className='text-xs text-primary'>
                                مجموع پرداختی:
                              </h6>
                              <span className='text-left font-IRANSansXBold text-primary'>
                                {passengers.adults * price +
                                  passengers.children * childrenPrice +
                                  passengers.baby * childrenPrice +
                                  143000}
                                <span className='text-[10px] pr-1'>تومان</span>
                              </span>
                            </div>
                          </div>
                          <div className='flex items-end justify-end w-full h-full'>
                            <button
                              onClick={() =>
                                setSelectedTabIndex((perv) => perv + 1)
                              }
                              className='flex-all text-white w-full text-sm py-1.5 bg-primary rounded-lg'
                            >
                              ادامه
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* tab-2 */}
                    </Tab.Panel>
                    {/* tab-2 */}
                    <Tab.Panel className='flex flex-col justify-between w-full h-full'>
                      <div className='space-y-3'>
                        <div className='flex flex-col gap-3 md:gap-6'>
                          <h6 className='font-IRANSansXBold'>
                            قوانین استرداد بلیط
                          </h6>
                          <div className='flex flex-col gap-4 text-sm text-gray8 child:flex child:items-center child:gap-1'>
                            <div>
                              <span>
                                <TicketIcon classes='hidden md:inline w-4 md:w-5 md:h-5 text-errorLight' />
                              </span>
                              <span className='font-IRANSansXMedium text-errorLight text-sm '>
                                30 درصد جریمه:
                              </span>
                              <span>
                                از ساعت 11:00 صبح 8 روز قبل از پرواز تا ساعت
                                11:00 صبح 3 روز قبل از پرواز.
                              </span>
                            </div>
                            <div>
                              <span>
                                <TicketIcon classes='hidden md:inline w-4 md:w-5 md:h-5 text-errorLight' />
                              </span>
                              <span className='font-IRANSansXMedium text-errorLight text-sm '>
                                55 درصد جریمه:
                              </span>
                              <span>
                                از زمان صدور بلیط تا ساعت 11:00 صبح 8 روز قبل از
                                پرواز.
                              </span>
                            </div>
                            <div>
                              <span>
                                <TicketIcon classes='hidden md:inline w-4 md:w-5 md:h-5 text-errorLight' />
                              </span>
                              <span className='font-IRANSansXMedium text-errorLight text-sm '>
                                80 درصد جریمه:
                              </span>
                              <span>
                                از ساعت 11:00 صبح 3 روز قبل از پرواز تا ساعت
                                11:00 صبح 2 روز قبل از پرواز.
                              </span>
                            </div>
                            <div>
                              <span>
                                <TicketIcon classes='hidden md:inline w-4 md:w-5 md:h-5 text-errorLight' />
                              </span>
                              <span className='font-IRANSansXMedium text-errorLight text-sm '>
                                100 درصد جریمه:
                              </span>
                              <span>
                                از ساعت 11:00 صبح 2 روز قبل از پرواز به بعد.
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className='block bg-gray3 h-0.5 w-full'></span>
                        <div className='flex flex-col gap-3  text-sm text-gray8 '>
                          <h6 className='font-IRANSansXBold text-base'>
                            قوانین تغییرات بلیط
                          </h6>
                          <span>
                            <span className='font-medium'>تا 24 ساعت</span>
                            مانده به پرواز به مسافران جهت تغییر رزرو جریمه ای
                            تعلق نمی‌گیرد.
                          </span>
                          <span>
                            (هزینه تغییر کلاس نرخی دریافت می‌شود) از 24 ساعت
                            مانده به پرواز به بعد به‌ازای هر مسافر در هر مسیر
                            پروازی، جریمه تغییر رزرو معادل
                            <span className='font-medium'>1٬300٬000 تومان</span>
                            ایران (باضافه هزینه تغییر کلاس نرخی) می‌باشد.
                          </span>
                        </div>
                      </div>
                      <div className='flex items-end justify-end'>
                        <button
                          onClick={() =>
                            setSelectedTabIndex((perv) => perv + 1)
                          }
                          className=' text-white w-full text-sm xs:w-1/3 py-1.5 bg-primary rounded-lg'
                        >
                          ادامه
                        </button>
                      </div>
                    </Tab.Panel>
                    {/* tab-3 */}
                    <Tab.Panel className='flex flex-col justify-between h-full'>
                      <div className='flex flex-col child:inline-block w-[90%] space-y-4 text-justify text-sm'>
                        <h6 className='font-IRANSansXBold text-lg'>
                          قوانین عمومی سفر
                        </h6>
                        <span>
                          <span className='font-IRANSansXMedium pl-1'>
                            ساعت الزامی حضور:
                          </span>
                          از 4 ساعت قبل پروزا حضور الزامی است و 1 ساعت قبل پرواز
                          سیستمهای پذیرش مسافر بسته خواهند شد.
                        </span>
                        <span>
                          <span className='font-IRANSansXMedium pl-1'>
                            مسافران سیستمی بیزینس کلاس:
                          </span>
                          مسافر که کلاس پروازی بیزینسی را انتخاب کردند می‌توانند
                          به طور رایگان از سالن فرودگاه امام جهت پروازهای خروجی
                          استفاده کنند
                        </span>
                        <span>
                          <span className='font-IRANSansXMedium pl-1'>
                            اقدام اخذ ویزا:
                          </span>
                          در سفر به کشورهایی که به ویزا احتیاج دارند، لطفا قبل
                          از خرید بلیط، به تاریخ شروع و انقضای ویزا و حداکثر
                          زمان تعیین‌شده برای اقامت توسط سفارت (که در ویزا نوشته
                          شده است) توجه کنید. مسئولیت پیش‌آمدن هر مشکلی
                          دراین‌باره به عهده مسافر است.
                        </span>
                      </div>
                      <div className='flex justify-end items-end'>
                        <button
                          onClick={() =>
                            setSelectedTabIndex((perv) => perv + 1)
                          }
                          className=' text-white  w-full text-sm xs:w-1/3 py-1.5 bg-primary rounded-lg'
                        >
                          ادامه
                        </button>
                      </div>
                    </Tab.Panel>
                    {/* tab-4 */}
                    <Tab.Panel className='flex flex-col justify-between h-full'>
                      <div className='space-y-3'>
                        <div className='flex flex-col gap-3 md:gap-6'>
                          <h6 className='font-IRANSansXBold'>قوانین بار</h6>
                          <div className='flex flex-col gap-4 text-sm text-gray8 child:flex child:items-center child:gap-1'>
                            <div>
                              <span>
                                <BagIcon classes='hidden md:inline w-4 md:w-5 md:h-5' />
                              </span>
                              <span className='font-IRANSansXMedium text-sm '>
                                حداکثر تعداد بسته:
                              </span>
                              <span>
                                به ازای هر مسافر برابر 2 بسته می باشد.
                              </span>
                            </div>
                            <div>
                              <span>
                                <BagIcon classes='hidden md:inline w-4 md:w-5 md:h-5' />
                              </span>
                              <span className='font-IRANSansXMedium text-sm '>
                                میزان بار دستی مجاز:
                              </span>
                              <span>5 کیلوگرم</span>
                            </div>
                            <div>
                              <span>
                                <BagIcon classes='hidden md:inline w-4 md:w-5 md:h-5' />
                              </span>
                              <span className='font-IRANSansXMedium text-sm '>
                                میزان بار مجاز برای بزرگسال و کودک:
                              </span>
                              <span>30 کیلوگرم</span>
                            </div>
                            <div>
                              <span>
                                <BagIcon classes='hidden md:inline w-4 md:w-5 md:h-5' />
                              </span>
                              <span className='font-IRANSansXMedium text-sm '>
                                میزان بار مجاز برای نوزاد:
                              </span>
                              <span>10 کیلوگرم.</span>
                            </div>
                          </div>
                        </div>
                        <span className='block bg-gray3 h-0.5 w-full'></span>
                        <div className='flex flex-col gap-3  text-sm text-gray8 '>
                          <h6 className='font-IRANSansXBold text-base'>
                            قوانین تغییرات بار
                          </h6>
                          <span>
                            هزینه بار اضافی در فرودگاه شهر مبدا برابر 200٬000
                            تومان ایران می‌باشد.
                          </span>
                        </div>
                      </div>
                      <div className='flex justify-end items-end'>
                        <button
                          onClick={handleCheckout}
                          className=' text-white  w-full text-sm xs:w-1/3 py-1.5 bg-primary rounded-lg'
                        >
                          تایید و ادامه
                        </button>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetailItem;
