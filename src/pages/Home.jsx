import React, { useEffect, useRef, useState } from "react";
import {
  CloseCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  AirPlaneIconPopularServices,
  ChevronUpIcon,
  PcIcon,
  HeadphoneIcon,
  InternetIcon,
  CartIcon,
  QuestionIcon,
} from "../components/UI/icons";
import { Transition, Disclosure } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SearchTicketBox from "../components/ticket/SearchTicketBox";
import LandingImage from "../components/LandingImage";
import { useFindTicketContext } from "../store/FindTicketContext";
import { useNavigate } from "react-router-dom";
import {
  popularCities,
  popularCitiesFlights,
  frequentQuestions,
  tempHistoryCity,
} from "../data/localData";

const Home = () => {
  const [popularCitySelected, setPopularCitySelected] = useState("تهران");
  const historSwiperRef = useRef(null);
  const navigate = useNavigate();
  const { findTicketBasedHistory } = useFindTicketContext();
  const [searchTicketHistory, setSearchTicketHistory] =
    useState(tempHistoryCity);
  const [isMarquee, setIsMarquee] = useState(
    Array(searchTicketHistory.length).fill(false)
  );
  const handleRemoveItem = (itemId) => {
    const updatedItems = searchTicketHistory.filter(
      (item) => item.id !== itemId
    );
    setSearchTicketHistory(updatedItems);
  };
  const handleSearchTicketByHistory = (sourceCity, distentionCity) => {
    findTicketBasedHistory(sourceCity, distentionCity);
    navigate("flights");
  };
  useEffect(() => {
    const newIsMarquee = searchTicketHistory.map((history) => {
      const text = ` ${history.sourceCity} به ${history.distentionCity};`;
      return text.length > 15;
    });
    setIsMarquee(newIsMarquee);
  }, [searchTicketHistory]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  return (
    <main className='flex flex-col w-full '>
      {/* Landing Image */}
      <LandingImage secondTitle={true} mainTitle='راحتی و سرعت در' />
      {/* ticket search  */}
      <div className='flex relative'>
        <SearchTicketBox />
      </div>
      {/* history */}
      <div className='container space-y-4 mt-10 md:mt-52 lg:mt-48 my-6 md:my-10'>
        <div className=' flex text-lg justify-between items-center'>
          <h6 className='text-gray8 flex items-center gap-2'>
            <span className=' flex-all w-7 h-7 bg-tint2 rounded-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
            </span>
            <span> تاریخچه جستجو</span>
          </h6>
          <span className='text-primary text-sm md:text-base cursor-pointer'>
            پاک کردن همه
          </span>
        </div>
        <div className='container flex items-center justify-between'>
          <span className=' border p-2 rounded-lg nextElement'>
            <ChevronRightIcon />
          </span>
          <div className='flex overflow-hidden items-start justify-start text-sm'>
            <Swiper
              ref={historSwiperRef}
              spaceBetween={10}
              slidesPerView={"auto"}
              navigation={{
                prevEl: ".prevElement",
                nextEl: ".nextElement",
              }}
              modules={[Navigation]}
            >
              {searchTicketHistory.map((history, index) => (
                <SwiperSlide
                  dir='rtl'
                  key={history.id}
                  className=' px-2  w-fit '
                  // style={{ transform: `translateX(${sliderPosition}px)` }}
                >
                  <div className='flex items-center px-2 sm:w-[140px] text-nowrap gap-1 border rounded-lg py-2 shadow-md '>
                    <span onClick={() => handleRemoveItem(history.id)}>
                      <CloseCircleIcon classes='w-4 h-4 md:w-5 md:h-5' />
                    </span>
                    <div
                      className='flex items-center gap-1 cursor-pointer w-fit relative overflow-hidden '
                      onClick={() =>
                        handleSearchTicketByHistory(
                          history.sourceCity,
                          history.distentionCity
                        )
                      }
                    >
                      {/* if not fit "animate-marquee" class */}
                      <span
                        className={`flex items-center gap-1 cursor-pointer w-fit gap-1 whitespace-nowrap ${
                          isMarquee[index] ? "animate-marquee" : ""
                        }`}
                      >
                        {history.sourceCity}
                        &nbsp; به &nbsp;
                        {history.distentionCity}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <span className=' border p-2 rounded-lg prevElement'>
            <ChevronLeftIcon />
          </span>
        </div>
      </div>
      {/* services */}
      <div className='container flex flex-col md:flex-row items-center gap-3 lg:gap-6 my-7 md:my-10  '>
        <div className='services1 relative w-full h-[152px] md:h-[328px] bg-cover bg-center bg-no-repeat rounded-lg shadow-2xl'>
          <div className='absolute bottom-0 right-0 p-6 text-white flex flex-col gap-2'>
            <span className='font-IRANSansXBold sm:text-xl'>
              بهترین فصل شنا
            </span>
            <span className='font-IRANSansXMedium text-xs sm:text-sm border border-white rounded-lg p-2'>
              خرید بلیط پرواز‌های کیش
            </span>
          </div>
        </div>
        <div className='services2 relative w-full h-[152px] md:h-[328px] bg-cover bg-center bg-no-repeat rounded-lg shadow-2xl'>
          <div className='absolute bottom-0 right-0 p-6 text-white flex flex-col gap-2'>
            <span className='font-IRANSansXBold sm:text-xl'>سفر به ترکیه</span>
            <span className='font-IRANSansXMedium text-xs sm:text-sm border border-white rounded-lg p-2'>
              خرید بلیط پرواز‌های ترکیه
            </span>
          </div>
        </div>
        <div className='flex flex-col justify-between gap-3 md:gap-6 w-full'>
          <div className='services3 relative w-full md:w-[220px] lg:w-[392px] h-[152px] bg-cover bg-center bg-no-repeat rounded-lg shadow-2xl'>
            <div className='absolute bottom-0 right-0 p-6 text-white flex flex-col gap-2'>
              <span className='font-IRANSansXBold sm:text-xl'>
                دنیایی از تاریخ و هنر
              </span>
              <span className='font-IRANSansXMedium text-xs sm:text-sm border border-white rounded-lg p-2'>
                خرید بلیط پرواز‌های شیراز
              </span>
            </div>
          </div>
          <div className='services4 relative w-full md:w-[220px] lg:w-[392px] h-[152px] bg-cover bg-center bg-no-repeat rounded-lg shadow-2xl'>
            <div className='absolute bottom-0 right-0 p-6 text-white flex flex-col gap-2'>
              <span className='font-IRANSansXBold sm:text-xl'>
                شگفتی در صحرا
              </span>
              <span className='font-IRANSansXMedium text-xs sm:text-sm border border-white rounded-lg p-2'>
                خرید بلیط پرواز‌های دبی
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* popular services */}
      <div className='container space-y-6 my-7 md:my-10 '>
        <h6 className='font-IRANSansXBold sm:text-xl text-black'>
          پرطرفدار ترین پروازهای داخلی
        </h6>
        <div className='flex items-center flex-wrap  gap-2'>
          {popularCities.map((city) => (
            <span
              onClick={() => setPopularCitySelected(city)}
              className={`text-lg px-4 py-1 rounded-lg transition-colors shadow-md cursor-pointer ${
                popularCitySelected === city
                  ? "bg-tint1 text-primary"
                  : "bg-white text-gray7"
              }`}
              key={city}
            >
              {city}
            </span>
          ))}
        </div>
        {popularCitiesFlights
          .filter((item) => item.title === popularCitySelected)
          .map((item) => (
            <Swiper
              spaceBetween={10}
              slidesPerView={"auto"}
              centeredSlides={false}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
              }}
              modules={[Autoplay]}
              className='flex items-center justify-center pt-4  overflow-hidden'
              key={item.id}
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
              //     slidesPerView: 3,
              //     spaceBetween: 160,
              //   },
              //   1024: {
              //     slidesPerView: 4,
              //     spaceBetween: 10,
              //   },
              // }}
            >
              {item.flights.map((flight) => (
                <SwiperSlide
                  className='flex items-center w-fit shadow-md '
                  key={flight.id}
                >
                  <img
                    src={flight.image}
                    alt={flight.from}
                    className='h-full w-[68px] sm:w-auto object-contain rounded-r-md'
                  />

                  <div className='flex items-center justify-between h-[74px] sm:h-[88px] flex-col border border-gray2 rounded-md overflow-hidden divide-y divide-gray2 child:px-4 w-full xs:w-fit  child:bg-white'>
                    {/* city Names */}
                    <div className='flex-all gap-2 items-center w-full h-full '>
                      <span
                        className={`text-xs md:text-base ${
                          popularCitySelected === flight.from && "text-primary"
                        }`}
                      >
                        {flight.from}
                      </span>
                      <AirPlaneIconPopularServices />
                      <span
                        className={`text-xs md:text-base ${
                          popularCitySelected === flight.to && "text-primary"
                        }`}
                      >
                        {flight.to}
                      </span>
                    </div>
                    {/* price */}
                    <div className='flex-all w-full h-full flex-row items-center gap-2'>
                      <span className='text-xs text-gray6'>شروع قیمت از:</span>
                      <span className='text-gray9 text-sm sm:textbase'>
                        {flight.price.toLocaleString("fa-IR")}
                        <span className='text-[10px] mr-1'>تومان</span>
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ))}
        {popularCitiesFlights.findIndex(
          (item) => item.title === popularCitySelected
        ) === -1 && (
          <span className='block text-xl text-center py-4 text-gray6'>
            موردی برای نمایش وجود ندارد.
          </span>
        )}
      </div>
      {/* fequent questions */}
      <div className='container text-gray8 space-y-6 my-7'>
        <h6 className='font-IRANSansXBold sm:text-xl '>سوالات متداول</h6>
        <div className='border border-gray2 rounded-lg shadow-sm divide-y divide-gray2 '>
          {frequentQuestions.map((question, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button className='flex w-full justify-between gap-2 px-4 py-3 md:py-4 text-right hover:bg-tint1 transition-all focus:outline-none focus-visible:ring child:transition-all focus-visible:ring-purple-500/75'>
                    <span
                      className={`flex items-center gap-2  ${
                        open
                          ? "text-primary text-base md:text-lg lg:text-xl font-IRANSansXBold"
                          : "text-sm md:text-base lg:text-lg font-IRANSansXMedium"
                      } `}
                    >
                      <span className='flex-all w-5 h-5 bg-tint2 rounded-full text-primary  '>
                        <QuestionIcon />
                      </span>

                      {question.title}
                    </span>
                    <ChevronUpIcon
                      classes={`w-4 h-4 md:w-5 md:h-5  ${
                        open ? " rotate-180 transform text-primary" : ""
                      } `}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter='transition-all duration-200 ease-out'
                    enterFrom='h-0 opacity-0 -translate-y-2'
                    enterTo='h-full opacity-100 translate-y-0'
                    leave='transition-all duration-200 ease-out'
                    leaveFrom='h-full opacity-100 translate-y-0'
                    leaveTo=' h-0 opacity-0 -translate-y-8'
                  >
                    <Disclosure.Panel className='px-4 pb-2 pt-4 text-sm md:text-base  text-gray6 text-justify '>
                      {question.text}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
      {/* benfifts */}
      <div className=' mt-14 bg-tint2 py-7 rounded-lg shadow-sm'>
        <div className='container flex items-center justify-evenly gap-2 text-shade4 text-xs xs:text-sm md:text-xl text-center md:font-IRANSansXBold child:flex-all child:flex-col child:gap-3 child:md:ga'>
          <div>
            <span className='p-1.5 md:p-3.5 rounded-xl md:rounded-3xl border border-primary bg-white'>
              <PcIcon />
            </span>
            <span>دسترسی آسان و راحت</span>
          </div>
          <div>
            <span className='p-1.5 md:p-3.5 rounded-xl md:rounded-3xl border border-primary bg-white '>
              <HeadphoneIcon />
            </span>
            <span>پاسخگویی 24 ساعته</span>
          </div>
          <div>
            <span className='p-1.5 md:p-3.5 rounded-xl md:rounded-3xl border border-primary bg-white'>
              <InternetIcon />
            </span>
            <span>خدمات آنلاین</span>
          </div>
          <div>
            <span className='p-1.5 md:p-3.5 rounded-xl md:rounded-3xl border border-primary bg-white'>
              <CartIcon />
            </span>
            <span>کمترین نرخ خرید بلیط</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
