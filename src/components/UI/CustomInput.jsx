import React, { useEffect, useState } from "react";
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
    required: `لطفا ${placeHolder} را وارد کنید.`,
    minLength:
      (inputType !== "email" && {
        value: min,
        message: `لطفا حداقل ${min} کاراکتر وارد کنید`,
      }) ||
      "",
    maxLength:
      (inputType !== "email" && {
        value: max,
        message: `لطفا حداکثر ${max} کاراکتر وارد کنید`,
      }) ||
      "",

    // valueAsNumber: inputType === "number",
    pattern:
      (inputType === "email" && {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: " فرمت ایمیل اشتباه میباشد.",
      }) ||
      "",
  };
  return (
    <div className='flex flex-col'>
      <div
        className={`float-container w-auto relative flex flex-col rounded-lg px-2 py-2 md:py-3 text-right border border-gray3 shadow-md transition-all duration-200 text-gray8 ${
          isFocused || myInputValue ? "active " : ""
        } ${isFocused && "border-primary"}`}
        // onClick={handleFocus}
        // onBlur={() => setIsFocused(false)}
      >
        <input
          type={inputType}
          className='float-field w-full h-full outline-none border-none bg-white'
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
          className={`float-label absolute top-0  transition-all duration-200 text-sm lg:text-base  ${
            isFocused ? "move-up text-primary" : ""
          }`}
        >
          {placeHolder}
        </label>
        {icon && (
          <span
            className={`absolute top-0 left-2 translate-y-1 md:translate-y-1/2 mt-1 ${
              isFocused ? "text-primary" : "text-gray7"
            }`}
          >
            {icon}
          </span>
        )}
      </div>
      <span
        className={`flex text-xs md:text-sm text-errorLight transition-all pr-1 h-4 mt-1  ${
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
