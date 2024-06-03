import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "../UI/icons";
export const FilteringSubMenuHeader = ({ title, children }) => {
  const [subMenu, setSubMenu] = useState(false);
  return (
    <div className='w-full'>
      <div className='text-shade3 flex items-start justify-between w-full text-sm font-IRANSansXBold'>
        <span>{title}</span>
        <span className='cursor-pointer' onClick={() => setSubMenu(!subMenu)}>
          {subMenu ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </span>
      </div>
      <div
        className={`flex flex-col transition-all ease-in-out duration-200 ${
          subMenu
            ? "opacity-100 visible h-fit translate-y-2 pb-2"
            : "opacity-0 invisible h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
