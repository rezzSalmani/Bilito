import React from "react";
import { Link } from "react-router-dom";
import {
  AppStoreIcon,
  FaceBookIcon,
  GooglePlayIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
} from "../UI/icons";

const Footer = () => {
  return (
    <footer className='container pt-6 my-7 md:mt-14 border-t border-gray3 text-center sm:text-right'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4 w-full '>
        <div className='flex flex-col justify-center items-center sm:items-start child:block gap-3 lg:gap-5 text-gray7 text-sm lg:text-base'>
          <img
            src='/images/mainLogo.svg'
            alt='Logo'
            className='w-[100px] xl:w-[148px]'
          />
          <span>تلفن پشتیبانی: 98 76 54 32_021</span>
          <span>
            آدرس دفتر مرکزی: تهران، میدان آزادی، خیابان آزادی، خیابان جیحون، طوس
            غربی.
          </span>
        </div>
        <div className='flex gap-4 md:gap-6 sm:w-1/2 justify-center text-right items-start xs:text-nowrap '>
          <div className='space-y-3'>
            <h4 className='text-sm sm:text-lg lg:text-xl font-IRANSansXMedium mt-2'>
              بیلیتو
            </h4>
            <ul className='text-xs md:text-sm text-gray7 child-hover:scale-110 child:transition-all'>
              <li>
                <Link to='/about-us'>درباره ما</Link>
              </li>
              <li>
                <Link to='/contact-us'>تماس با ما</Link>
              </li>
              <li>
                <Link to='/plus'>بیلیتو پلاس</Link>
              </li>
              <li>
                <Link to='/insurance'>بیمه مسافرتی</Link>
              </li>
              <li>
                <Link to='/blogs'>مجله مسافرتی</Link>
              </li>
            </ul>
          </div>
          <div className='space-y-3'>
            <h4 className='text-sm sm:text-lg lg:text-xl font-IRANSansXMedium mt-2'>
              خدمات مشتریان
            </h4>
            <ul className='text-xs md:text-sm text-gray7 child-hover:scale-110 child:transition-all'>
              <li>
                <Link to='/'>مرکز پشتیبانی آنلاین</Link>
              </li>
              <li>
                <Link to='/'>راهنمای خرید</Link>
              </li>
              <li>
                <Link to='/'>راهنمای استرداد</Link>
              </li>
              <li>
                <Link to='/'>قوانین و مقررات</Link>
              </li>
              <li>
                <Link to='/'>پرسش و پاسخ</Link>
              </li>
            </ul>
          </div>
          <div className='space-y-3'>
            <h4 className='text-sm sm:text-lg lg:text-xl font-IRANSansXMedium mt-2'>
              اطلاعات تکمیلی
            </h4>
            <ul className='text-xs md:text-sm text-gray7 child-hover:scale-110 child:transition-all'>
              <li>
                <Link to='/'>فروش سازمانی</Link>
              </li>
              <li>
                <Link to='/'>همکاری با آژانس‌ها</Link>
              </li>
              <li>
                <Link to='/'>فرصت‌های شغلی</Link>
              </li>
              <li>
                <Link to='/'>سنجش رضایتمندی</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row items-center sm:items-end gap-4 justify-between my-8'>
        <div className='space-y-4 '>
          <h6 className='text-xl text-gray8 font-IRANSansXBold'>
            اپلیکیشن بیلیتو
          </h6>
          <span className='text-gray7 text-sm sm:text-base inline-block'>
            با نصب اپلیکیشن بیلیتو راحتی و سرعت در رزرو بلیط هواپیما را داشته
            باشید.
          </span>
        </div>
        <div className='flex sm:flex-row items-center justify-center gap-2 flex-wrap sm:w-1/2 child:flex-all child:rounded-xl text-white text-xs md:text-base text-nowrap child:cursor-pointer child:bg-shade1'>
          <span className='flex items-center w-full xs:w-[142px] lg:w-[182px] gap-2 py-1.5 lg:py-2.5 px-3 '>
            Play Store
            <GooglePlayIcon />
          </span>
          <span className='flex items-center w-full xs:w-[142px] lg:w-[182px] gap-2 py-1.5 lg:py-2.5 px-3 '>
            Apple Store
            <AppStoreIcon />
          </span>
        </div>
      </div>
      <div className='flex flex-col xs:flex-row items-center gap-4 justify-between child:md:w-1/2 my-4'>
        <div className='space-y-2 '>
          <div className='flex flex-wrap items-center gap-3 sm:gap-4 child-hover:scale-110 child:transition-all child:cursor-pointer'>
            <TelegramIcon />
            <LinkedinIcon />
            <InstagramIcon />
            <TwitterIcon />
            <FaceBookIcon />
          </div>
          <span className='text-gray7 text-sm inline-block'>
            rezasalamni.dev@gmail.com
          </span>
        </div>
        <div className='flex flex-wrap justify-center items-center sm:gap-5 '>
          <img src='/images/certificate1.jpg' alt='certificate1' />
          <img src='/images/certificate2.jpg' alt='certificate2' />
          <img src='/images/certificate3.jpg' alt='certificate3' />
          <img src='/images/certificate4.jpg' alt='certificate4' />
          <img src='/images/certificate5.jpg' alt='certificate5' />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
