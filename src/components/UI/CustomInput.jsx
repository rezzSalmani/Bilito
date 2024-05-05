import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CustomInput = ({
  placeHolder = "تایپ کنید",
  identifier,
  inputType = "text",
  icon = false,
  inputName = "",
  inputIdentifier,
  min = 3,
  max = 40,
  register,
  errors,
  watch,
  validations = true,
  setValue,
  defaultValue = "",
}) => {
  const handleFocus = () => {
    setIsFocused(true);
  };
  const [isFocused, setIsFocused] = useState(false);
  const myInputValue = watch(`${inputIdentifier}_${identifier}`);
  useEffect(() => {
    if (setValue) setValue(`${inputIdentifier}_${identifier}`, defaultValue);
  }, [defaultValue]);

  const validation = validations && {
    value: defaultValue,
    required: `لطفا ${placeHolder} را وارد کنید`,
    minLength: {
      value: min,
      message: `لطفا حداقل ${min} کاراکتر وارد کنید`,
    },
    maxLength: {
      value: max,
      message: `لطفا حداکثر ${max} کاراکتر وارد کنید`,
    },
    // valueAsNumber: inputType === "number",
    pattern:
      (inputType === "email" && {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: " فرمت ایمیل اشتباه میباشد.",
      }) ||
      "",
  };
  return (
    <div className='flex flex-col '>
      <div
        className={`float-container w-auto relative flex rounded-lg px-2 text-right border shadow-md transition-all duration-200 text-gray8 ${
          isFocused || myInputValue ? "active " : ""
        } ${isFocused && "border-primary"}`}
        onClick={handleFocus}
      >
        <input
          type={inputType}
          className='float-field py-4 outline-none border-none w-full bg-white'
          onFocus={handleFocus}
          name={inputName}
          // onChange={() => onChange(event, `${identifier}`)}
          {...register(`${inputIdentifier}_${identifier}`, {
            ...validation,
            onBlur: () => {
              setIsFocused(false);
            },
          })}
        />
        <label
          htmlFor={inputName}
          className={`float-label absolute transition-all duration-200 text-sm lg:text-base  ${
            isFocused ? "move-up" : ""
          }`}
        >
          {placeHolder}
        </label>
        {icon && (
          <span
            className={`absolute left-2 translate-y-1/2 mt-1 ${
              isFocused ? "text-primary" : "text-gray7"
            }`}
          >
            {icon}
          </span>
        )}
      </div>
      <span
        className={`flex text-sm text-errorLight transition-all h-4 mt-1  ${
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

export default CustomInput;
