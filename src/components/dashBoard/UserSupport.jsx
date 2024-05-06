import { Listbox } from "@headlessui/react";
import React, { useState } from "react";
import {
  ArrowUturnLeftIcon,
  CalenderIcon,
  CheckIcon,
  ChevronDownIcon,
  DislikeIcon,
  LikeSolidIcon,
  SearchTicketIcon,
  TrashIcon,
} from "../UI/icons";
const sorts = [
  { id: "s1", title: "جدید ترین", value: "newest" },
  { id: "s2", title: "قدیمی ترین", value: "oldest" },
  { id: "s3", title: "کنسلی ها", value: "cancels" },
  { id: "s4", title: "تاخیر ها", value: "lateness" },
];
const UserSupport = () => {
  const [sort, setSort] = useState("");
  return (
    <div className='w-full space-y-4 md:space-y-6 lg:space-y-8 '>
      <div className='flex items-center justify-between w-full'>
        <h4 className='font-IRANSansXBold text-xl text-gray8 text-nowrap'>
          تیکت های من
        </h4>
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
      </div>
      <div>
        <div className='space-y-4 border border-gray4 shadow-md rounded-lg p-4 md:p-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1 font-IRANSansXMedium text-sm text-gray6'>
              <span>
                <CalenderIcon />
              </span>
              <span>۱۴۰۲/۶/۰۷</span>
              <span> - ۱۴:۵۳</span>
            </div>
            <span className='text-errorLight cursor-pointer'>
              <TrashIcon />
            </span>
          </div>

          <h6 className='text-gray6 text-sm md:text-base  lg:text-xl'>
            چگونه می‌توانم از سایت شما بلیط اوکراین را رزرو کنم؟
          </h6>
          <div className='flex items-center w-full justify-between gap-4'>
            <div className='flex items-center gap-2'>
              <span>
                <ArrowUturnLeftIcon />
              </span>
              <h6 className='text-gray8  text-sm md:text-base lg:text-xl'>
                با سلام و وقت بخیر. لطفا به قسمت راهنمای تهیه بلیط در بخش هدر
                مراجعه نمایید.
              </h6>
            </div>
            <div className='flex flex-col xs:flex-row items-center gap-2 child-hover:cursor-pointer'>
              <span className=' text-gray6'>
                <DislikeIcon />
              </span>
              <span>
                <LikeSolidIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center border-t'>
        <span>
          <SearchTicketIcon />
        </span>
        <span className='font-IRANSansXBold text-gray6 border border-gary2 rounded-lg py-2 px-4'>
          شما هیچ تیکتی دریافت نکردید.
        </span>
      </div>
    </div>
  );
};

export default UserSupport;
