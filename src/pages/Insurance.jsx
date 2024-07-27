import React, { Fragment, useState } from "react";
import LandingImage from "../components/UI/LandingImage";
import CustomInput from "../components/UI/CustomInput.jsx";
import { useForm } from "react-hook-form";
import { Listbox, Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LocationIcon,
  MinusCircle,
  PlusCircle,
  SearchIcon,
  TimeIcon,
  DocumentPlusIcon,
  ArrowPathIcon,
  SupportIcon,
  AirPlane,
  CreditCartIcon,
  CloseCircleIcon,
} from "../components/UI/icons.jsx";
import ButtonPrimary from "../components/UI/ButtonPrimary.jsx";
import { useFindInsuranceContext } from "../store/FindInsuranceContext.jsx";
import {
  internationalCitiesInsurance,
  travelTimes,
  passengerRange,
} from "../data/localData";
import Modal from "../components/UI/Modal.jsx";
const servicesDetails = [
  {
    id: 1,
    title: "هزینه های پزشکی",
    icon: <DocumentPlusIcon classes='w-4 h-4 md:w-5 md:h-5' />,
    des: "هزینه مراقبت پزشکی و بستری در بیمارستان برای درمان بیماری‌ها یا حوادث و صدمات مختلف.",
  },
  {
    id: 2,
    title: "هزینه های دندانپزشکی",
    icon: <ArrowPathIcon classes='w-4 h-4 md:w-5 md:h-5' />,
    des: "درمان ضروری برای درمان عفونت شدید، دندان درد، کشیدن دندان و...",
  },
  {
    id: 3,
    title: "جبران هزینه دارو",
    icon: <SupportIcon classes='w-4 h-4 md:w-5 md:h-5' />,
    des: "در صورت مفقود شدن داروهای همراه مسافر (به شرط ضروری بودن مصرف آن‌ها) و ارسال مجدد داروهای مورد نیاز بیمه‌شده.",
  },
  {
    id: 4,
    title: "هزینه‌های بازگشت",
    icon: <AirPlane classes='w-4 h-4 md:w-5 md:h-5' />,
    des: "در صورت ابتلا به بیماری یا وقوع حادثه‌ای که بیش از 10 روز نیاز به بستری شدن در بیمارستان داشته باشد.",
  },
  {
    id: 5,
    title: "جبران خسارت اموال",
    icon: <CreditCartIcon classes='w-4 h-4 md:w-5 md:h-5' />,
    des: "بیمهه مسافرتی می‌تواند در صورت خسارت، سرقت یا از دست رفتن وسایل شخصی و اموال شما در سفر تأمین کند",
  },
];

const Insurance = () => {
  const {
    insuranceOptions,
    updateInsuranceOptions,
    updateInsuranceOptionsPassengers,
  } = useFindInsuranceContext();
  const [isModal, setIsModal] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   control,
  //   setValue,
  //   formState: { errors, isSubmitting, isValid },
  // } = useForm({
  //   defaultValues: {
  //     range0To12: 0,
  //     range13To65: 0,
  //     range66To70: 0,
  //     range71To75: 0,
  //     range76To80: 0,
  //     range81ToHigher: 0,
  //   },
  // });
  const [error, setError] = useState("");
  // const handleInputChange = (inputIdentifier, type) => {
  //   const value = watch(inputIdentifier);
  //   setError("");
  //   if (type === "increment") {
  //     if (value < 30) {
  //       setValue(inputIdentifier, value + 1);
  //     } else {
  //       setError("بیشتر از این مقدار قابل انتخاب نیست.");
  //     }
  //   } else if (type === "decrement") {
  //     if (value > 0) {
  //       setValue(inputIdentifier, value - 1);
  //     } else {
  //       setError("کمتر از این مقدار قابل انتخاب نیست.");
  //     }
  //     //
  //   }
  // };
  const button = (
    <ButtonPrimary
      text='جستجو'
      type='submit'
      onClick={() => setIsModal(true)}
      classes='h-full w-full md:w-fit px-4 md:px-8 lg:px-12 rounded-lg py-1.5 md:py-3 mb-auto'
      icon={<SearchIcon />}
    />
  );
  return (
    <section className='h-full w-full'>
      <LandingImage bgClass='insuranceBg' />
      {/* insurance search box */}
      <div className='container relative '>
        <div className='h-auto w-full md:absolute -top-40 left-0 right-0 mx-auto flex items-center flex-col md:flex-row justify-between gap-2 mt-4 md:gap-6 lg:gap-10 xl:gap-20 p-4 md:p-6 bg-white rounded-lg shadow-md z-10'>
          <div className='flex w-full flex-col md:flex-row items-center gap-3 lg:gap-6 child:w-full'>
            {/* city */}
            <Listbox
              value={insuranceOptions.city}
              onChange={(value) => {
                updateInsuranceOptions("city", value);
              }}
            >
              {({ open }) => (
                <div className='relative child:flex h-full w-full '>
                  <Listbox.Button className='flex items-center justify-between h-[50px] w-full font-IRANSansXBold border border-gray4 rounded-lg px-2'>
                    {insuranceOptions.city ? (
                      <span>{insuranceOptions.city}</span>
                    ) : (
                      <span>کشور مقصد</span>
                    )}
                    <span>
                      {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    enter='ease-out transition-all duration-200'
                    enterFrom='opacity-0 -translate-y-10'
                    enterTo='opacity-100 translate-y-0'
                    leave='ease-in transition-all duration-200'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 -translate-y-10'
                  >
                    <Listbox.Options className='absolute top-[90%] max-h-64 overflow-auto left-0 flex flex-col bg-white rounded-lg border w-full z-20'>
                      {internationalCitiesInsurance.map((city) => (
                        <Listbox.Option
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 0 pr-4 rounded-lg ${
                              active ? "bg-gray3 text-black" : "text-gray-900"
                            }`
                          }
                          value={city}
                          key={city}
                        >
                          {({ selected }) => (
                            <>
                              <div className='flex items-center gap-1'>
                                <span
                                  className={`${selected && "text-success"}`}
                                >
                                  <LocationIcon classes='w-4 h-4' />
                                </span>
                                <span
                                  className={`block truncate ${
                                    selected
                                      ? "font-medium text-success"
                                      : "font-normal"
                                  }`}
                                >
                                  {city}
                                </span>
                              </div>
                              {selected ? (
                                <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-success'>
                                  <CheckIcon />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              )}
            </Listbox>
            {/* travel time */}
            <Listbox
              value={insuranceOptions.travelTime}
              onChange={(value) => {
                updateInsuranceOptions("travelTime", value);
              }}
            >
              {({ open }) => (
                <div className='relative child:flex h-full w-full '>
                  <Listbox.Button className='flex items-center justify-between h-[50px] w-full font-IRANSansXBold border border-gray4 rounded-lg px-2'>
                    {insuranceOptions.travelTime ? (
                      <span>{insuranceOptions.travelTime}</span>
                    ) : (
                      <span>مدت سفر</span>
                    )}
                    <span>
                      {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    enter='ease-out transition-all duration-200'
                    enterFrom='opacity-0 -translate-y-10'
                    enterTo='opacity-100 translate-y-0'
                    leave='ease-in transition-all duration-200'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 -translate-y-10'
                  >
                    <Listbox.Options className='absolute top-[90%] max-h-64 overflow-auto left-0 flex flex-col bg-white rounded-lg border w-full z-20'>
                      {travelTimes.map((period) => (
                        <Listbox.Option
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 0 pr-4 rounded-lg ${
                              active ? "bg-gray3 text-black" : "text-gray-900"
                            }`
                          }
                          value={period}
                          key={period}
                        >
                          {({ selected }) => (
                            <>
                              <div className='flex items-center gap-1'>
                                <span
                                  className={`${selected && "text-success"}`}
                                >
                                  <TimeIcon classes='w-4 h-4' />
                                </span>
                                <span
                                  className={`block truncate ${
                                    selected
                                      ? "font-medium text-success"
                                      : "font-normal"
                                  }`}
                                >
                                  {period}
                                </span>
                              </div>
                              {selected ? (
                                <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-success'>
                                  <CheckIcon />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              )}
            </Listbox>
            {/* passengers */}
            <Menu as='div' className='relative flex flex-col text-right'>
              {({ open }) => (
                <>
                  <Menu.Button className=' flex justify-between items-center h-[50px] w-full font-IRANSansXBold border border-gray4 rounded-lg py-4 px-2'>
                    <span>مسافران</span>
                    <span>
                      {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </span>
                  </Menu.Button>
                  {/* <span
                className={`flex text-sm text-errorLight transition-all h-4 mt-1 ${
                  error
                    ? "visible opacity-100 w-full"
                    : "invisible opacity-0 w-0 "
                }`}
              >
                {error && error}
              </span> */}
                  <Transition
                    as={Fragment}
                    enter='ease-out transition-all duration-200'
                    enterFrom='opacity-0 -translate-y-10'
                    enterTo='opacity-100 translate-y-0'
                    leave='ease-in transition-all duration-200'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 -translate-y-10'
                  >
                    <Menu.Items
                      static
                      className='absolute w-full sm:min-w-max md:w-full top-[90%] max-h-64 overflow-auto right-0 mt-2 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg z-20 font-IRANSansXMedium'
                    >
                      {passengerRange.map((passenger) => (
                        <Menu.Item
                          key={passenger.identifier}
                          disabled
                          as={"div"}
                          className='flex items-center gap-6 justify-between px-3 py-3 text-nowrap '
                        >
                          {/* {active ? <span>active</span> : <span>not active</span>} */}

                          <span className='text-gray7 text-sm mr-2'>
                            {passenger.title}
                          </span>

                          <div className='flex justify-center md:w-[120px] items-center gap-2 child:flex-all'>
                            <span
                              onClick={() =>
                                updateInsuranceOptionsPassengers(
                                  passenger.identifier,
                                  "increment"
                                )
                              }
                              className='bg-primary text-white rounded-full cursor-pointer'
                            >
                              <PlusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                            </span>
                            <span className='w-10 text-center outline-none '>
                              {
                                insuranceOptions.passengers[
                                  passenger.identifier
                                ]
                              }
                            </span>
                            <span
                              onClick={() =>
                                updateInsuranceOptionsPassengers(
                                  passenger.identifier,
                                  "decrement"
                                )
                              }
                              className={`text-white rounded-full cursor-pointer ${
                                passenger.identifier === "range13To65" &&
                                insuranceOptions.passengers[
                                  passenger.identifier
                                ] === 1
                                  ? "bg-gray4"
                                  : "bg-primary"
                              }`}
                            >
                              <MinusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                            </span>
                          </div>
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
          <Modal
            button={button}
            closeModal={() => setIsModal(false)}
            isOpen={isModal}
          >
            <div className='flex flex-col items-center justify-center gap-4 text-center w-72 h-40 bg-white rounded-lg border-gray-400 p-2'>
              <h6 className='text-errorLight'>
                متاسفانه بیمه ای در حال حاضر وجود ندارد لطفا بعدا تلاش کنید.
              </h6>
              <button
                className='flex items-center gap-2 border bg-warning text-zinc-200 rounded-lg px-3 py-1'
                onClick={() => setIsModal(false)}
              >
                <span>
                  <CloseCircleIcon />
                </span>
                <span>بستن</span>{" "}
              </button>
            </div>
          </Modal>
        </div>
        {/* description */}
        <div className='my-10 md:my-20 space-y-6 md:space-y-10'>
          <h2 className='text-gray9 text-lg xs:text-2x font-IRANSansXBold'>
            بیمه مسافرتی چیست؟
          </h2>
          <div className='text-gray7 text-sm xs:text-sm md:text-lg space-y-2'>
            <p>
              بیمه مسافرتی (Travel Insurance) یک نوع بیمه است که برای پوشش
              هزینه‌ها و خسارات مرتبط با سفرهای بین‌المللی یا داخلی ارائه
              می‌شود. این بیمه معمولاً توسط شرکت‌های بیمه عرضه می‌شود و شامل
              تعدادی پوشش است که می‌تواند شامل پوشش هزینه‌های پزشکی اضطراری،
              پوشش لغو سفر، پوشش بیمه مسافرتی برای خسارت اموال، مسئولیت مدنی و
              پوشش تأخیرات و لغو پرواز باشد.
            </p>
            <p>
              یکی از اصلی‌ترین پوشش‌های بیمه مسافرتی پوشش هزینه‌های پزشکی است.
              اگر در سفر به بیماری یا حادثه‌ای برخورد کنید و نیاز به درمان داشته
              باشید، بیمه مسافرتی ممکن است هزینه‌های مرتبط با ویزیت پزشک، بستری
              در بیمارستان، داروها و معالجه‌های دیگر را پوشش دهد
            </p>
          </div>
        </div>
        {/* services */}
        <div className='my-10 md:my-20 space-y-6 md:space-y-10'>
          <h2 className='text-gray9 text-lg xs:text-2xl md:text-3xl font-IRANSansXBold'>
            خدمات بیمه مسافرتی
          </h2>
          <div className='space-y-4'>
            <p className='text-gray7 text-sm md:text-lg space-y-1'>
              خدمات بیمه مسافرتی شامل مجموعه‌ای از خدماتی هستند که توسط شرکت‌های
              بیمه به بیمه‌گزاران ارائه می‌شوند. این خدمات در ارتباط با موارد
              مختلفی از جمله پوشش‌ها، مشاوره‌ها و خدمات اضافی مرتبط با سفرها
              ارائه می‌شود. به طور کلی، خدمات بیمه مسافرتی عبارتند از:
            </p>
            {servicesDetails.map((item) => (
              <div
                className='flex items-center gap-1 text-xs xs:text-sm'
                key={item.id}
              >
                <span>{item.icon}</span>
                <span className=' md:text-xl font-IRANSansXMedium text-gray8 '>
                  {item.title}:
                </span>
                <p className=' md:text-lg line-clamp-2 text-gray7'>
                  {item.des}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Prices */}
        <div className='my-10 md:my-20 space-y-6 md:space-y-10 '>
          <h2 className='text-gray9 text-lg xs:text-2xl md:text-3xl font-IRANSansXBold'>
            خدمات بیمه مسافرتی
          </h2>
          <div className='text-xs xs:text-sm md:text-xl space-y-2 child:text-gray7'>
            <p>
              <span className='text-gray9 font-IRANSansXMedium'>
                مقصد سفر:{" "}
              </span>
              مقصد سفر یکی از عوامل اصلی در تعیین قیمت بیمه مسافرتی است. برخی
              مقاصد سفر به دلیل خطرات بیشتر، هزینه درمان بالاتر یا موارد دیگر،
              قیمت بیمه بیشتری دارند.
            </p>
            <p>
              <span className='text-gray9 font-IRANSansXMedium'>
                مدت زمان سفر:
              </span>
              مدت زمان سفر نیز تأثیر قابل توجهی در قیمت بیمه دارد. معمولاً هرچه
              مدت زمان سفر بیشتر باشد، قیمت بیمه مسافرتی نیز بالاتر خواهد بود
            </p>
            <p>
              <span className='text-gray9 font-IRANSansXMedium'>
                {" "}
                سن و تعداد مسافران:
              </span>
              سن و تعداد مسافران ممکن است نیز تأثیرگذار باشند. برخی بیمه‌گزاران
              در سنین بالا ممکن است قیمت بیمه بیشتری داشته باشند. همچنین، در
              صورتی که تعداد مسافران بیشتر باشد، قیمت بیمه ممکن است بیشتر شود.
            </p>
          </div>
          <div className='flex flex-col md:flex-row items-center justify-between bg-tint1 rounded-lg p-2 md:p-4'>
            <table className='border border-tint3 text-center w-full'>
              <thead className='bg-tint2 child:child:border child:child:border-tint3 child:child:p-2 text-sm  md:text-xl'>
                <tr className=' child:border child:border-tint3 '>
                  <th className=''>عوامل موثر در تعیین قیمت</th>
                  <th>نحوه محاسبه در فرمول تعیین حق بیمه</th>
                </tr>
              </thead>
              <tbody className=' child:child:border child:child:border-tint3 child:child:p-2 text-xs xs:text-sm md:text-base'>
                <tr className='text-gray9 md:text-lg'>
                  <td>سن مسافر</td>
                  <td>
                    تا ۱۲ سال/ ۱۳ تا ۶۵ سال/ 66 تا 70 سال/ ۷۱ تا ۷۵ سال/ ۷۶ تا
                    ۸۰ سال{" "}
                  </td>
                </tr>
                <tr className='text-gray9 md:text-lg'>
                  <td>مدت سفر</td>
                  <td>
                    ۱ تا ۷ روز/ ۸ تا ۱۵ روز/ ۱۶ تا ۲۳ روز/ ۲۴ تا ۳۱ روز/ ۳۲ تا
                    ۴۵ روز/ ۶۳ تا ۹۲ روز/ ۶ ماهه/ ۱ ساله
                  </td>
                </tr>
                <tr className='text-gray9 md:text-lg'>
                  <td>مقصد سفر</td>
                  <td>بر اساس مناطق جغرافیایی مختلف</td>
                </tr>
              </tbody>
            </table>
            <img
              src='images/airplane-passpoart.png'
              alt='airplane-passpoart'
              className='max-w-[180px] h-full'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insurance;
