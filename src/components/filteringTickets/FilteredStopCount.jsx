import React from "react";
import { FilteringSubMenuHeader } from "./FilteringSubMenuHeader";
const stopScenarios = ["همه", "مستقیم", "یک", "دو یا بیشتر"];
const FilteredStopCount = () => {
  return (
    <FilteringSubMenuHeader title='تعداد توقف'>
      {stopScenarios.map((item, index) => (
        <div className='inline-flex items-center text-sm' key={index}>
          <label
            className='relative flex items-center p-1.5 rounded-full cursor-pointer'
            htmlFor={item}
          >
            <input
              name='type'
              type='radio'
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-tint5 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-tint5 checked:before:bg-tint5 hover:before:opacity-10"
              id={item}
            />
            <span className='absolute text-tint5 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5'
                viewBox='0 0 16 16'
                fill='currentColor'
              >
                <circle data-name='ellipse' cx='8' cy='8' r='8'></circle>
              </svg>
            </span>
          </label>
          <label
            className='mt-px font-light text-gray7 cursor-pointer select-none'
            htmlFor={item}
          >
            {item}
          </label>
        </div>
      ))}
    </FilteringSubMenuHeader>
  );
};

export default FilteredStopCount;
