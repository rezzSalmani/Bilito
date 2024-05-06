import React, { useState } from "react";
import {
  AirPlane,
  AirPlaneIconPopularServices,
  BagIcon,
  ChatBubbleIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseCircleIcon,
  SearchIcon,
  CheckIcon,
  TimeIcon,
  TrashIcon,
} from "../UI/icons";
import { Listbox } from "@headlessui/react";
import Modal from "../UI/Modal";
const sorts = [
  { id: "s1", title: "جدید ترین", value: "newest" },
  { id: "s2", title: "قدیمی ترین", value: "oldest" },
  { id: "s3", title: "کنسلی ها", value: "cancels" },
  { id: "s4", title: "تاخیر ها", value: "lateness" },
];
const UserTickets = () => {
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const Button = (
    <span className='cursor-pointer relative'>
      <span className='absolute -top-2 right-0 w-fit h-fit p-0.5 text-xs text-errorLight font-IRANSansXBold bg-white '>
        2
      </span>
      <span>
        <ChatBubbleIcon classes='w-5 md:w-7 h-5 md:h-7' />
      </span>
    </span>
  );
  return (
    <div className='w-full text-gray8 space-y-4 md:space-y-6 lg:space-y-8 '>
      <div className='relative flex items-center justify-between gap-4 w-full'>
        <h4 className='font-IRANSansXBold text-xl text-gray8 text-nowrap'>
          سفر های من
        </h4>
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <input
              type='text'
              className='w-full xs:w-48 lg:w-[350px] py-1.5 px-2 border border-gray4 rounded-lg shadow-sm outline-none group focus:border-tint3 placeholder:text-sm'
              name=''
              id=''
              placeholder='جستوجو'
            />
            <span className='absolute left-2 bottom-0 top-0 my-auto w-fit h-fit '>
              <SearchIcon />
            </span>
          </div>
          <Listbox
            value={sort}
            onChange={setSort}
            as={"div"}
            className='relative text-sm md:text-base'
          >
            <Listbox.Button className='flex items-center gap-1 border border-gray4 px-2 lg:px-6 py-1.5 rounded-lg '>
              <span>مرتب سازی</span>
              <span>
                <ChevronDownIcon classes='w-4 h-4' />
              </span>
            </Listbox.Button>
            <Listbox.Options className='absolute bg-white left-0 right-0 mx-auto top-10 border rounded-lg child:py-1 child:px-1 divide-y'>
              {sorts.map((sortItem) => (
                <Listbox.Option
                  key={sortItem.id}
                  value={sortItem.value}
                  className={({ active }) =>
                    ` ${active ? "bg-tint1" : "bg-white"}`
                  }
                >
                  {({ selected }) => (
                    <div
                      className={`flex items-center justify-between cursor-pointer ${
                        selected && "text-successLight"
                      }`}
                    >
                      <span>{sortItem.title}</span>
                      {selected && (
                        <span>
                          <CheckIcon />
                        </span>
                      )}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
          <span>
            <Modal
              button={Button}
              isOpen={isMessageOpen}
              closeModal={() => setIsMessageOpen(false)}
              openModal={() => setIsMessageOpen(true)}
            >
              <div className=' p-4 md:p-6 space-y-4 w-[400px] md:w-[550px] lg:w-[650px]'>
                <div className='space-y-4 border border-tint5 rounded-lg p-4 md:p-6 text-sm'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2 text-warning '>
                      <span>1402/06/25</span>
                      <span>23:40</span>
                    </div>
                    <span className='text-error cursor-pointer'>
                      <TrashIcon />
                    </span>
                  </div>
                  <h6 className='text-right'>
                    پرواز شماره 165 از استانبول به دبی در تاریخ 6شهریور 1402 در
                    ساعت 21:50، به مدت 2 ساعت تاخیر دارد.
                  </h6>
                </div>
                <div className='space-y-4 border border-tint5 rounded-lg p-4 md:p-6 text-sm'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2 text-warning '>
                      <span>1402/06/25</span>
                      <span>23:40</span>
                    </div>
                    <span className='text-error cursor-pointer'>
                      <TrashIcon />
                    </span>
                  </div>
                  <h6 className='text-right'>
                    پرواز شماره 165 از استانبول به دبی در تاریخ 6شهریور 1402 در
                    ساعت 21:50، به مدت 2 ساعت تاخیر دارد.
                  </h6>
                </div>
                <div className='flex flex-col items-center justify-center gap-2'>
                  <h6>پیامی وجود ندارد.</h6>
                  <span
                    className='text-error cursor-pointer'
                    onClick={() => setIsMessageOpen(false)}
                  >
                    <CloseCircleIcon />
                  </span>
                </div>
              </div>
            </Modal>
          </span>
        </div>
      </div>
      {/* tickets */}
      <div>
        <div
          className={`border border-gray3 rounded-lg shadow-md p-4 md:p-6  ${
            isTicketOpen && "space-y-6"
          }`}
        >
          {/* first row */}
          {!isTicketOpen && (
            <h6 className={`flex items-center gap-2 md:text-lg mb-4`}>
              <span>
                <AirPlane />
              </span>
              پرواز
              <span>....</span>
              به
              <span>....</span>
            </h6>
          )}
          <div className='flex flex-wrap items-center justify-between gap-4 child:flex child:gap-2 child:items-center'>
            {isTicketOpen && (
              <h6 className='lg:text-lg transition-all duration-200'>
                <span>
                  <AirPlane />
                </span>
                پرواز
                <span>....</span>
                به
                <span>....</span>
              </h6>
            )}
            <div className='text-sm'>
              <span className='text-gray6'>شماره رزور :</span>
              <span className='text-gray8'>......</span>
            </div>
            <div className='text-sm'>
              <span className='text-gray6'>تاریخ رزور :</span>
              <span className='text-gray8'>......</span>
            </div>
            <div className='text-sm'>
              <span className='text-gray6'>تاریخ پرواز :</span>
              <span className='text-gray8'>......</span>
            </div>
            <div className='text-sm'>
              <span className='text-gray6'> مبلغ کل سفارش :</span>
              <span className='text-gray8'>......</span>
            </div>
            {!isTicketOpen && (
              <button
                className='flex items-center justify-end gap-1 text-sm  text-primary cursor-pointer text-nowrap'
                onClick={() => setIsTicketOpen((prev) => !prev)}
              >
                جزئیات سفر
                <span>
                  <ChevronDownIcon classes='w-4 h-4' />
                </span>
              </button>
            )}
          </div>
          <div
            className={`flex flex-col justify-end w-full transition-all duration-200 ${
              isTicketOpen
                ? "h-full opacity-100 visible space-y-6"
                : "h-0 opacity-0 invisible"
            }`}
          >
            {/* second row */}
            <div className='flex flex-wrap gap-4 items-center justify-center md:justify-between divide-y xs:divide-none'>
              <div className='flex flex-wrap justify-center items-center gap-4 xs:gap-4'>
                <img
                  src='/images/companies/mahan.png'
                  alt='company image'
                  className='w-8 lg:w-12 h-8 lg:h-12 rounded-full object-cover'
                />
                <div className='flex items-center gap-2 xs:gap-4'>
                  <div className='flex flex-col'>
                    <span className='text-sm xs:text-base font-IRANSansXBold'>
                      24:21
                    </span>
                    <span className='text-xs xs:text-sm text-gray6'>
                      استانبول
                    </span>
                  </div>
                  {/* travelTime / allowed wight */}
                  <div className='flex lg:w-fit flex-col gap-3 xs:gap-4 child:flex-all child:gap-1 text-xs md:text-sm text-gray6'>
                    <span>
                      <TimeIcon classes='w-4 h-4' />
                      02:00
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
                  <div className='flex flex-col'>
                    <span className=' text-sm xs:text-base font-IRANSansXBold'>
                      21:21
                    </span>
                    <span className='text-xs xs:text-sm text-sm text-gray6'>
                      دبی
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-4 text-xs xs:text-sm child:flex child:flex-col child:gap-1 pt-3 xs:pt-0'>
                <div className=''>
                  <span className='text-gray6'>شماره پرواز:</span>
                  <span>2412</span>
                </div>
                <div className=''>
                  <span className='text-gray6'>کلاس پرواز:</span>
                  <span>کوانومی</span>
                </div>
                <div className=''>
                  <span className='text-gray6'>وضعیت:</span>
                  <span className='flex items-center gap-1 text-success'>
                    <CheckCircleIcon classes='w-4 h-4' />
                    تایید شده
                  </span>
                </div>
              </div>
            </div>
            {/* third row */}
            <div>
              <table className='hidden md:block space-y-2 w-full text-right '>
                <thead>
                  <tr className='flex child:w-full child:lg:w-28 gap-6 text-gray6 text-base '>
                    <th>نام مسافر</th>
                    <th>ملیت</th>
                    <th>تاریخ تولد</th>
                    <th className='text-sm'>کدملی/شماره گذرنامه</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='flex child:w-full child:lg:w-28 gap-6 text-gray9 text-sm '>
                    <td>خانم شیوا ارغوان</td>
                    <td>ایرانی</td>
                    <td>1375/04/25</td>
                    <td>123456789987</td>
                  </tr>
                </tbody>
              </table>
              <table className='flex md:hidden items-center gap-4  space-y-2 w-full text-right '>
                <thead>
                  <tr className='flex items-center justify-center w-full flex-col child:w-full  gap-2 text-gray6 text-sm  '>
                    <th>نام مسافر</th>
                    <th>ملیت</th>
                    <th>تاریخ تولد</th>
                    <th className='text-sm'>کدملی/شماره گذرنامه</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='flex items-center justify-center w-full flex-col child:w-full  gap-2 text-gray9 text-sm '>
                    <td>خانم شیوا ارغوان</td>
                    <td>ایرانی</td>
                    <td>1375/04/25</td>
                    <td>123456789987</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* close btn */}
            <div className='flex items-end justify-end w-full'>
              <button
                className='flex items-center gap-1 text-sm w-fit text-primary cursor-pointer'
                onClick={() => setIsTicketOpen((prev) => !prev)}
              >
                <span>بستن</span>
                <span>
                  <ChevronUpIcon classes='w-4 h-4' />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTickets;
