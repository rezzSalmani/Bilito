import React from "react";
import LandingImage from "../components/LandingImage";

const AboutUs = () => {
  return (
    <div>
      <LandingImage
        bgClass='aboutUsBgGradient'
        mainTitle='همراه با ما به مسیری از راحتی ، سرعت و خدمات بی نظیر پرواز کنید'
        secondTitle={false}
      />
      <div className='container py-7 md:py-14 space-y-6 md:space-y-10  md:text-xl text-justify'>
        <h6 className='text-xl xs:text-2xl md:text-3xl py-4 text-primary border-b-2 border-primary w-fit'>
          درباره بیلیتو
        </h6>
        <p className=' text-gray7 '>
          ما در بیلیتو مفتخریم که یکی از پیشروان در صنعت هواپیمایی هستیم و
          خدماتی بی‌نظیر را به مسافران عزیز ارائه می‌دهیم. با تیمی از کارشناسان
          حرفه‌ای در زمینه‌ی هواپیمایی، ما بهترین شرایط و تجربه را برای سفرهای
          شما فراهم می‌کنیم
        </p>
        <div className='space-y-6'>
          <div className='space-y-3'>
            <h5 className=' text-xl md:text-2xl font-IRANSansXBold '>
              اهداف ما
            </h5>
            <p className='text-gray6 '>
              هدف اصلی ما در بیلیتو، ارائه‌ی خدماتی با کیفیت و استاندارد در سطح
              بین‌المللی است. با تمرکز بر رضایت مشتریان، ما سعی می‌کنیم تجربه‌ی
              سفر شما را به یک تجربه‌ی لاکچری و ناشناخته تبدیل کنیم. از لحظه‌ی
              رزرو تا رسیدن به مقصد، ما همراه شما خواهیم بود و اطمینان می‌دهیم
              که هر جزئیات سفر شما به بهترین شکل ممکن انجام شود.
            </p>
          </div>
          <div className='space-y-3'>
            <h5 className=' text-xl md:text-2xl font-IRANSansXBold '>
              خدمات ما
            </h5>
            <p className='text-gray6 '>
              در بیلیتو، ما مجموعه‌ای از خدمات شگفت‌انگیز را برای شما آماده
              کرده‌ایم. از رزرو آنلاین سریع و آسان، تا پروازهای راحت و امکانات
              لوکس در هواپیما، همه‌ی جزئیات سفر شما تحت نظر ماست. همچنین، با تیم
              پشتیبانی ما در دسترس شما هستیم تا در صورت بروز هرگونه مشکل یا
              سوال، به شما کمک کنیم.
            </p>
          </div>
        </div>
        <h6 className='text-xl font-IRANSansXMedium'>
          با تشکر از انتخاب شما برای سفر با بیلیتو. ما در انتظار خدمت‌رسانی به
          شما هستیم و امیدواریم که تجربه‌ی سفری فوق‌العاده را برای شما فراهم
          کنیم
        </h6>
      </div>
    </div>
  );
};

export default AboutUs;
