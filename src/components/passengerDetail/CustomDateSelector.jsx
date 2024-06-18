import React, { useState, useRef } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import opacity from "react-element-popper/animations/opacity";
import { Controller } from "react-hook-form";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { CalenderIcon } from "../UI/icons";

const CustomDateSelector = ({
  identifier,
  inputIdentifier,
  placeHolder,
  control,
  watch,
  errors,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleAgeSelectorFocus = () => {
    setIsFocused(true);
  };
  const handleAgeSelectorBlur = () => {
    setIsFocused(false);
  };
  const datePickerRef = useRef();
  const datePickerValue = watch(`${inputIdentifier}_${identifier}`);
  return (
    <div className='relative flex flex-col items-center w-auto'>
      <div
        className={`float-container py-2 md:py-3 w-full relative flex flex-col rounded-lg px-2 text-right shadow-md transition-all duration-200 border border-gray3 ${
          isFocused || datePickerValue ? "active " : ""
        } ${isFocused && "border-primary"}`}
      >
        <Controller
          control={control}
          name={`${inputIdentifier}_${identifier}`}
          rules={{ required: "لطفا تاریخ را انتخاب کنید." }}
          render={({ field: { onChange, name, value } }) => (
            <div className='h-full w-full relative child:w-full'>
              <DatePicker
                animations={[opacity()]}
                value={value || ""}
                inputClass='float-field text-sm md:text-base  w-full outline-none border-none text-right bg-white z-20 cursor-pointer'
                onChange={(date) => {
                  onChange(date?.isValid ? date.format("DD MMMM YYYY") : "");
                }}
                format={"DD MMMM YYYY"}
                onOpen={handleAgeSelectorFocus}
                onClose={handleAgeSelectorBlur}
                calendar={persian}
                locale={persian_fa}
                ref={datePickerRef}
                calendarPosition='bottom-center'
                // render={<InputIcon className='h-fit w-full' />}
              />
              <div className=''>
                <span
                  className='md:hidden lg:block absolute cursor-pointer left-0 top-0 bottom-0 my-auto w-fit h-fit'
                  onClick={() => datePickerRef.current.openCalendar()}
                >
                  <CalenderIcon
                    classes={`w-5 h-5 ${isFocused && "text-primary"}`}
                  />
                </span>
              </div>
            </div>
          )}
        />
        <label
          htmlFor='float-field'
          className={`float-label absolute top-0 transition-all duration-200 text-sm lg:text-base  ${
            isFocused ? "move-up text-primary" : ""
          }`}
        >
          {placeHolder}
        </label>
      </div>
      <span
        className={`flex text-xs md:text-sm text-errorLight transition-all mt-1 pr-1 h-4  ${
          errors[`${inputIdentifier}_${identifier}`]
            ? "opacity-100 visible w-full"
            : "opacity-0 invisible w-0"
        }`}
      >
        {errors[`${inputIdentifier}_${identifier}`]?.message}
      </span>
    </div>
  );
};

export default CustomDateSelector;
