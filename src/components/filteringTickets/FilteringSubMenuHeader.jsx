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
        className={`transition-all duration-75 ease-in flex flex-col ${
          subMenu
            ? "h-fit visible opacity-100 translate-y-2 pb-2"
            : "h-0 invisible opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
