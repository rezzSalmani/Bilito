import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import opacity from "react-element-popper/animations/opacity";
import { Controller } from "react-hook-form";
import InputIcon from "react-multi-date-picker/components/input_icon";
import AgeSelectInput from "../UI/AgeSelectInput";
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
        className={`float-container h-[56px]  w-full relative flex flex-col rounded-lg px-2 text-right border shadow-md transition-all duration-200 ${
          isFocused || datePickerValue ? "active " : ""
        } ${isFocused && "border-primary"}`}
      >
        <Controller
          control={control}
          name={`${inputIdentifier}_${identifier}`}
          rules={{ required: "لطفا تاریخ را انتخاب کنید" }}
          render={({ field: { onChange, name, value } }) => (
            <div className='h-full w-full relative'>
              <DatePicker
                animations={[opacity()]}
                value={value || ""}
                inputClass='float-field text-sm md:text-base w-full py-4 outline-none border-none text-right bg-white z-20 cursor-pointer'
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
              <span
                className='md:hidden lg:block absolute cursor-pointer left-2 top-0 bottom-0 my-auto w-fit h-fit'
                onClick={() => datePickerRef.current.openCalendar()}
              >
                <CalenderIcon
                  classes={`w-5 h-5 ${isFocused && "text-primary"}`}
                />
              </span>
            </div>
          )}
        />

        <label
          htmlFor='float-field'
          className={`float-label absolute transition-all duration-200 text-sm lg:text-base ${
            isFocused ? "move-up text-primary" : ""
          }`}
        >
          {placeHolder}
        </label>
      </div>
      <span
        className={`flex text-sm text-errorLight transition-all h-4  ${
          errors[`${inputIdentifier}_${identifier}`]
            ? "opacity-100 visible w-full"
            : "opacity-0 invisible w-0"
        }`}
      >
        {errors[`${inputIdentifier}_${identifier}`]?.message}
      </span>
      {/* <AgeSelectInput
        label='روز'
        setValue={setDay}
        valueType={dateOfBirth}
        format='DD'
        hideMonth
        hideYear
        buttons={false}
      /> */}
      {/* <AgeSelectInput
        label='ماه'
        setValue={setMonth}
        valueType={month}
        format='MMMM'
        onlyMonthPicker
      />
      <AgeSelectInput
        label='سال'
        setValue={setYear}
        valueType={year}
        format='YYYY'
        onlyYearPicker
      /> */}
    </div>
  );
};

export default CustomDateSelector;
