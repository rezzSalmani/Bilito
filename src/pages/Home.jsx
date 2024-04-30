import React, { useRef, useState } from "react";
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
const popularCities = ["تهران", "مشهد", "شیراز", "کیش"];
const popularCitiesFlights = [
  {
    id: "c1",
    title: "تهران",
    flights: [
      {
        id: "f1",
        from: "شیراز",
        to: "تهران",
        price: 1700000,
        image: "/images/popularServices1.jpg",
      },
      {
        id: "f2",
        from: "تهران",
        to: "کیش",
        price: 2500000,
        image: "/images/popularServices2.jpg",
      },
      {
        id: "f3",
        from: "تهران",
        to: "مشهد",
        price: 1500000,
        image: "/images/popularServices3.jpg",
      },
      {
        id: "f4",
        from: "مشهد",
        to: "تهران",
        price: 1500000,
        image: "/images/popularServices4.jpg",
      },
    ],
  },
];
const frequentQuestions = [
  {
    title: "در هر پرواز میزان بار مجاز چقدر است؟",
    text: "بلیط تمام خطوط هوایی دنیا در سایت بیلیتو موجود است، چه پروازهایی که مبدا یا مقصد آنها ایران است و چه پروازهای داخلی دورترین کشورهای دنیا. پروازهای ایرلاین‌هایی مثل لوفت‌هانزا، امارات، قطرایرویز، ترکیش‌ایر، ایرفرانس، کی‌ال‌ام، آئروفلوت، آلیتالیا، اوکراینی، ایرایژیا، پگاسوس و ده‌ها ایرلاین دیگر در بیلیتو قابل تهیه هستند. همچنین بلیط پروازهای خارجیِ شرکت‌های هواپیمایی داخلی مانند ماهان، ایران‌ایر، قشم ایر، آتا و... نیز روی سایت بیلیتو به فروش می‌رسد.",
  },
  {
    title: "نرخ بلیط هواپیما برای نوزادان و کودکان زیر 12سال چگونه است؟",
    text: "بلیط تمام خطوط هوایی دنیا در سایت بیلیتو موجود است، چه پروازهایی که مبدا یا مقصد آنها ایران است و چه پروازهای داخلی دورترین کشورهای دنیا. پروازهای ایرلاین‌هایی مثل لوفت‌هانزا، امارات، قطرایرویز، ترکیش‌ایر، ایرفرانس، کی‌ال‌ام، آئروفلوت، آلیتالیا، اوکراینی، ایرایژیا، پگاسوس و ده‌ها ایرلاین دیگر در بیلیتو قابل تهیه هستند. همچنین بلیط پروازهای خارجیِ شرکت‌های هواپیمایی داخلی مانند ماهان، ایران‌ایر، قشم ایر، آتا و... نیز روی سایت بیلیتو به فروش می‌رسد.",
  },
  {
    title: "آیا پس از خرید اینترنتی بلیط هواپیما امکان استرداد آن وجود دارد؟",
    text: "بلیط تمام خطوط هوایی دنیا در سایت بیلیتو موجود است، چه پروازهایی که مبدا یا مقصد آنها ایران است و چه پروازهای داخلی دورترین کشورهای دنیا. پروازهای ایرلاین‌هایی مثل لوفت‌هانزا، امارات، قطرایرویز، ترکیش‌ایر، ایرفرانس، کی‌ال‌ام، آئروفلوت، آلیتالیا، اوکراینی، ایرایژیا، پگاسوس و ده‌ها ایرلاین دیگر در بیلیتو قابل تهیه هستند. همچنین بلیط پروازهای خارجیِ شرکت‌های هواپیمایی داخلی مانند ماهان، ایران‌ایر، قشم ایر، آتا و... نیز روی سایت بیلیتو به فروش می‌رسد.",
  },
  {
    title:
      "آیا پس از خرید بلیط هواپیما امکان تغییر نام یا نام خانوادگی وجود دارد؟",
    text: "بلیط تمام خطوط هوایی دنیا در سایت بیلیتو موجود است، چه پروازهایی که مبدا یا مقصد آنها ایران است و چه پروازهای داخلی دورترین کشورهای دنیا. پروازهای ایرلاین‌هایی مثل لوفت‌هانزا، امارات، قطرایرویز، ترکیش‌ایر، ایرفرانس، کی‌ال‌ام، آئروفلوت، آلیتالیا، اوکراینی، ایرایژیا، پگاسوس و ده‌ها ایرلاین دیگر در بیلیتو قابل تهیه هستند. همچنین بلیط پروازهای خارجیِ شرکت‌های هواپیمایی داخلی مانند ماهان، ایران‌ایر، قشم ایر، آتا و... نیز روی سایت بیلیتو به فروش می‌رسد.",
  },
  {
    title:
      "هنگامی که از سایت خرید بلیط هواپیما رزرو بلیط را انجام می‌دهیم امکان انتخاب صندلی مورد نظرمان وجود دارد؟",
    text: "بلیط تمام خطوط هوایی دنیا در سایت بیلیتو موجود است، چه پروازهایی که مبدا یا مقصد آنها ایران است و چه پروازهای داخلی دورترین کشورهای دنیا. پروازهای ایرلاین‌هایی مثل لوفت‌هانزا، امارات، قطرایرویز، ترکیش‌ایر، ایرفرانس، کی‌ال‌ام، آئروفلوت، آلیتالیا، اوکراینی، ایرایژیا، پگاسوس و ده‌ها ایرلاین دیگر در بیلیتو قابل تهیه هستند. همچنین بلیط پروازهای خارجیِ شرکت‌های هواپیمایی داخلی مانند ماهان، ایران‌ایر، قشم ایر، آتا و... نیز روی سایت بیلیتو به فروش می‌رسد.",
  },
  {
    title:
      "بلیط پرواز چه کشورها ایرلاین‌هایی را می‌توانم‌ در سایت بیلیتو جستجو و خریداری کنم؟",
    text: "بلیط تمام خطوط هوایی دنیا در سایت بیلیتو موجود است، چه پروازهایی که مبدا یا مقصد آنها ایران است و چه پروازهای داخلی دورترین کشورهای دنیا. پروازهای ایرلاین‌هایی مثل لوفت‌هانزا، امارات، قطرایرویز، ترکیش‌ایر، ایرفرانس، کی‌ال‌ام، آئروفلوت، آلیتالیا، اوکراینی، ایرایژیا، پگاسوس و ده‌ها ایرلاین دیگر در بیلیتو قابل تهیه هستند. همچنین بلیط پروازهای خارجیِ شرکت‌های هواپیمایی داخلی مانند ماهان، ایران‌ایر، قشم ایر، آتا و... نیز روی سایت بیلیتو به فروش می‌رسد.",
  },
  {
    title: "چطور تاریخ پرواز را تغییر دهیم؟",
    text: "بلیط تمام خطوط هوایی دنیا در سایت بیلیتو موجود است، چه پروازهایی که مبدا یا مقصد آنها ایران است و چه پروازهای داخلی دورترین کشورهای دنیا. پروازهای ایرلاین‌هایی مثل لوفت‌هانزا، امارات، قطرایرویز، ترکیش‌ایر، ایرفرانس، کی‌ال‌ام، آئروفلوت، آلیتالیا، اوکراینی، ایرایژیا، پگاسوس و ده‌ها ایرلاین دیگر در بیلیتو قابل تهیه هستند. همچنین بلیط پروازهای خارجیِ شرکت‌های هواپیمایی داخلی مانند ماهان، ایران‌ایر، قشم ایر، آتا و... نیز روی سایت بیلیتو به فروش می‌رسد.",
  },
];

const Home = () => {
  const [popularCitySelected, setPopularCitySelected] = useState("تهران");
  const historSwiperRef = useRef(null);
  const naviagte = useNavigate();
  const { findTicketBasedHistory } = useFindTicketContext();

  const [HISTORY, setHISTORY] = useState([
    { id: 1, sourceCity: "تهران", distentionCity: "مشهد" },
    { id: 2, sourceCity: "مشهد", distentionCity: "تهران" },
    { id: 3, sourceCity: "تهران", distentionCity: "شیراز" },
    { id: 4, sourceCity: "شیراز", distentionCity: "مشهد" },
    { id: 5, sourceCity: "مشهد", distentionCity: "شیراز" },
    { id: 6, sourceCity: "تهران", distentionCity: "مشهد" },
    { id: 7, sourceCity: "شیراز", distentionCity: "تهران" },
    { id: 8, sourceCity: "روسیه", distentionCity: "ایران" },
    { id: 9, sourceCity: "تهران", distentionCity: "کیش" },
  ]);
  const handleRemoveItem = (itemId) => {
    const updatedItems = HISTORY.filter((item) => item.id !== itemId);
    setHISTORY(updatedItems);
  };

  const handleSearchTicketByHistory = (sourceCity, distentionCity) => {
    findTicketBasedHistory(sourceCity, distentionCity);
    naviagte("flights");
  };
  return (
    <main className='flex flex-col w-full '>
      {/* Landing Image */}
      <LandingImage />
      {/* ticket search  */}
      <div className='flex relative'>
        <SearchTicketBox />
      </div>
      {/* history */}
      <div className='container space-y-4 mt-10 md:mt-52 lg:mt-48 my-6 md:my-10'>
        <div className=' flex text-lg justify-between items-center'>
          <h6 className='text-gray8 flex items-center gap-2'>
            <span className=' flex-all w-7 h-7 bg-tint2 rounded-full'>
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
              centeredSlides={false}
            >
              {HISTORY.map((history, index) => (
                <SwiperSlide
                  dir='rtl'
                  key={history.id}
                  className=' px-2  w-fit '
                  // style={{ transform: `translateX(${sliderPosition}px)` }}
                >
                  <div className='flex items-center px-2 sm:w-[165px] text-nowrap gap-1 border rounded-lg py-2 shadow-md overflow-hidden'>
                    <span onClick={() => handleRemoveItem(history.id)}>
                      <CloseCircleIcon classes='w-4 h-4 md:w-5 md:h-5' />
                    </span>
                    <div
                      className='flex items-center gap-1 cursor-pointer'
                      onClick={() =>
                        handleSearchTicketByHistory(
                          history.sourceCity,
                          history.distentionCity
                        )
                      }
                    >
                      <span>{history.sourceCity}</span>
                      به
                      <span>{history.distentionCity}</span>
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
      <div className='container space-y-6 my-7 md:my-10'>
        <h6 className='font-IRANSansXBold sm:text-xl text-black'>
          پرطرفدار ترین پروازهای داخلی
        </h6>
        <div className='flex items-center flex-wrap  gap-2'>
          {popularCities.map((city) => (
            <span
              onClick={() => setPopularCitySelected(city)}
              className={`text-lg px-4 py-1 rounded-lg transition-colors shadow-md ${
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
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className='flex items-center justify-center  w-full gap-2 pt-4'
              key={item.id}
              breakpoints={{
                380: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                  centeredSlides: false,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 70,
                  centeredSlides: false,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                  centeredSlides: false,
                },
              }}
            >
              {item.flights.map((flight) => (
                <SwiperSlide
                  className='flex items-center w-full shadow-md '
                  key={flight.id}
                >
                  <img
                    src={flight.image}
                    alt={flight.from}
                    className='h-full w-[68px] sm:w-auto object-contain'
                  />

                  <div className='flex items-center justify-between h-[74px] sm:h-[88px] flex-col border border-gray2 rounded-md divide-y divide-gray2 child:px-4 w-full xs:w-fit  child:bg-white'>
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
                  <Disclosure.Button className='flex w-full justify-between gap-2 px-4 py-3 md:py-4 text-right hover:bg-gray2 transition-all focus:outline-none focus-visible:ring child:transition-all focus-visible:ring-purple-500/75'>
                    <span
                      className={`flex items-center gap-2 ${
                        open
                          ? "text-primary text-xs md:text-sm lg:text-base font-IRANSansXBold"
                          : "text-xs  md:text-sm lg:text-lg font-IRANSansXMedium"
                      } `}
                    >
                      <span className='flex-all w-5 h-5 bg-tint2 rounded-full text-primary'>
                        <QuestionIcon />
                      </span>

                      {question.title}
                    </span>
                    <ChevronUpIcon
                      classes={`w-4 h-4 md:w-5 md:h-5 ${
                        open ? " rotate-180 transform text-primary" : ""
                      } `}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform -translate-y-2 opacity-0'
                    enterTo='transform translate-y-0 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform translate-y-0 opacity-100'
                    leaveTo='transform -translate-y-2 opacity-0'
                  >
                    <Disclosure.Panel className='px-4 pb-2 pt-4 text-[10px] md:text-lg text-gray6 text-justify'>
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
      <div className='container flex items-center justify-evenly gap-2 text-shade4 text-xs xs:text-sm md:text-xl text-center md:font-IRANSansXBold mt-14 bg-tint1 py-7 rounded-lg shadow-md'>
        <div className='flex-all flex-col gap-3 md:gap-6 '>
          <span className='p-1.5 md:p-3.5 rounded-xl md:rounded-3xl border border-primary '>
            <PcIcon />
          </span>
          <span>دسترسی آسان و راحت</span>
        </div>
        <div className='flex-all flex-col gap-3 md:gap-6'>
          <span className='p-1.5 md:p-3.5 rounded-xl md:rounded-3xl border border-primary '>
            <HeadphoneIcon />
          </span>
          <span>پاسخگویی 24 ساعته</span>
        </div>
        <div className='flex-all flex-col gap-3 md:gap-6'>
          <span className='p-1.5 md:p-3.5 rounded-xl md:rounded-3xl border border-primary '>
            <InternetIcon />
          </span>
          <span>خدمات آنلاین</span>
        </div>
        <div className='flex-all flex-col gap-3 md:gap-6'>
          <span className='p-1.5 md:p-3.5 rounded-xl md:rounded-3xl border border-primary '>
            <CartIcon />
          </span>
          <span>کمترین نرخ خرید بلیط</span>
        </div>
      </div>
    </main>
  );
};

export default Home;
