import React, { useState } from "react";
import LandingImage from "../components/LandingImage";
import { EmailIcon, MapIcon, PhoneIcon } from "../components/UI/icons";
import CustomInput from "../components/UI/CustomInput";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const ContactUs = () => {
  const [contactUsForm, setContactUsForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    massage: "",
  });
  const changeInputHandler = (event, identifier) => {
    setContactUsForm((prev) => {
      return {
        ...prev,
        [identifier]: event.target.value,
      };
    });
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleSentMessage = (data, e) => {
    console.log("first");
    console.log(data);
    toast.success(`${data.user_fullName} پیام شما دریافت شد`);
    reset();
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <LandingImage bgClass='contactUsBg' />
      <div className='container py-7 md:py-14 space-y-6 md:space-y-10  md:text-xl text-justify text-gray7 overflow-hidden'>
        <h6 className='text-xl xs:text-2xl md:text-3xl py-4 text-primary border-b-2 border-primary w-fit'>
          تماس با بیلیتو
        </h6>
        <p>
          ما در مجموعه بیلیتو همواره به نظرات، پیشنهادات و سوالات شما عزیزان
          ارزش قائلیم و مشتاقانه منتظر کمک به شما هستیم.
        </p>
        <p>
          لطفا پیش از ارسال ایمیل یا تماس تلفنی، ابتدا پرسش های متداول را مشاهده
          کنید. در صورتی که پاسخ سوالات خود را در بخش سوالات متداول نیافتید، این
          افتخار را داریم تا در هر ساعتی از شبانه روز و تمامی روزهای هفته
          پاسخگوی شما باشیم.
        </p>
        {/*  */}
        <div className='flex  flex-col md:flex-row gap-4 child:md:w-1/2 p-3 md:p-6 border border-gray3 rounded-lg'>
          <div className='flex flex-col text-sm md:text-base space-y-5 md:space-y-10 h-full'>
            <h6 className='text-xl md:text-2xl text-gray9 font-IRANSansXMedium'>
              راه‌های ارتباطی با بیلیتو
            </h6>
            <div className='flex flex-col gap-4 md:gap-8'>
              <div className='flex items-center gap-2'>
                <span className='flex items-center gap-1 text-gray9 '>
                  <MapIcon />
                  دفتر مرکزی:
                </span>
                <span>
                  تهران، میدان آزادی، خیابان آزادی، خیابان جیحون، طوس غربی{" "}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='flex items-center gap-1 text-gray9 '>
                  <PhoneIcon />
                  تلفن تماس:
                </span>
                <span>32 54 7691 -021</span>
              </div>
              <div className='flex flex-wrap items-center gap-2'>
                <span className='flex items-center gap-1 text-gray9 '>
                  <EmailIcon />
                  ایمیل:
                </span>
                <span>BilitoFilghts@email.com</span>
              </div>
            </div>
          </div>
          {/* map */}
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87220.7724447407!2d51.412932559088766!3d35.66810354050619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dfe05737fbcc9%3A0x274833de5c05c70c!2sAzadi%20Square%2C%20Tehran%2C%20Iran!5e0!3m2!1sen!2sbh!4v1711728805593!5m2!1sen!2sbh'
            className=' w-full h-[300px]'
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
        <h6 className='md:text-xl font-IRANSansXMedium text-gray9'>
          درصورتی که سوالی دارید یا نیاز به راهنمایی دارید، لطفا از فرم زیر برای
          تماس با ما استفاده کنید. تیم پشتیبانی ما در اسرع وقت پاسخگوی شما خواهد
          بود.
        </h6>
        <div className=' border border-gray3 p-6 rounded-lg space-y-5 md:space-y-10'>
          <h6 className='text-xl md:text-2xl font-IRANSansXBold text-gray9'>
            فرم تماس با ما
          </h6>
          <span className='block h-0.5 w-full bg-gray3'></span>
          <form
            onSubmit={handleSubmit(handleSentMessage)}
            className='flex items-center flex-col md:flex-row gap-4 child:md:w-1/2 h-auto'
          >
            <div className='flex flex-col gap-6 w-full h-full'>
              <CustomInput
                register={register}
                watch={watch}
                errors={errors}
                placeHolder='نام و نام خانوادگی'
                identifier='fullName'
                inputIdentifier='user'
              />
              <CustomInput
                register={register}
                watch={watch}
                errors={errors}
                placeHolder='ایمیل'
                identifier='email'
                inputIdentifier='user'
              />
              <CustomInput
                register={register}
                watch={watch}
                errors={errors}
                placeHolder='شماره تماس'
                identifier='phone'
                inputType='number'
                inputIdentifier='user'
              />
              <CustomInput
                register={register}
                watch={watch}
                errors={errors}
                placeHolder='موضوع'
                identifier='subject'
                inputIdentifier='user'
              />
            </div>
            <div className='h-full w-full'>
              <textarea
                {...register("user_message", {
                  required: "لطفا متن پیام خود را وارد کنید",
                })}
                className='w-full h-auto outline-none border border-gray4 rounded-lg p-3'
                rows='10'
                placeholder='متن پیام'
              />

              <span
                className={`flex text-sm text-error transition-all h-4 mb-1  ${
                  errors.user_message
                    ? "opacity-100 visible w-full"
                    : "opacity-0 invisible w-0"
                }`}
              >
                {errors.user_message?.message}
              </span>
              <button
                type='submit'
                className='bg-primary text-white w-full rounded-lg py-2 transition-all active:scale-95 active:-translate-y-1'
              >
                ارسال
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
