import React, { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "../UI/icons";
const sortingOptions = [
  { name: "پیشنهاد بیلیتو" },
  { name: "ارزان‌ترین" },
  { name: "گران‌ترین" },
  { name: "سریع‌ترین" },
];
const SortingTickets = () => {
  const [sortingSelected, setSortingSelected] = useState(sortingOptions[1]);
  return (
    <Listbox
      value={sortingSelected}
      onChange={setSortingSelected}
      as={"div"}
      className='relative flex flex-col w-1/2 xs:w-1/3 md:w-full shadow-md h-full border-gray3 '
    >
      <>
        <Listbox.Button className='w-full cursor-pointer p-2 bg-white flex items-center justify-between focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm border rounded-lg'>
          <span className='block truncate font-IRANSansXMedium'>مرتب سازی</span>
          <ChevronUpDownIcon classes='w-5 h-5 text-shade3' />
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter='ease-out duration-200'
          enterFrom='opacity-0 -translate-y-4'
          enterTo='opacity-100 translate-y-0'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 -translate-y-4'
        >
          <Listbox.Options className='absolute top-10 left-0 right-0 mx-auto mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none text-xs lg:text-sm z-10'>
            {sortingOptions.map((sort, sortIdx) => (
              <Listbox.Option
                key={sortIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-tint1 text-gary7" : "text-gray-900"
                  }`
                }
                value={sort}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected
                          ? "font-IRANSansXMedium text-shade2"
                          : "font-normal"
                      }`}
                    >
                      {sort.name}
                    </span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-primary'>
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </>
    </Listbox>
  );
};

export default SortingTickets;
