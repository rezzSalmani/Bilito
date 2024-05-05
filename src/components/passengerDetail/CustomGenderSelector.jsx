import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Listbox } from "@headlessui/react";
const CustomGenderSelector = ({
  identifier,
  inputIdentifier,
  onBlurInput = "",
  errors,
  control,
  watch,
  icon = false,
}) => {
  const [isGenderInputFocused, setIsGenderInputFocused] = useState(false);
  const [isOption, setIsOption] = useState(false);
  const subMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
        setIsOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleFocus = () => {
    setIsGenderInputFocused(true);
  };
  const handleBlur = () => {
    setIsGenderInputFocused(false);
    if (onBlurInput) onBlurInput(value, "جنسبت");
  };

  const chooseOption = (userGender) => {
    onChange(userGender);
    setIsOption(false);
  };

  const genderPickerValue = watch(`${inputIdentifier}_${identifier}`);

  return (
    <div className='flex flex-col h-full ' ref={subMenuRef}>
      <Controller
        control={control}
        name={`${inputIdentifier}_${identifier}`}
        rules={{ required: "جنسیت را انتخاب کنید." }}
        render={({ field: { onChange, onBlur, value = "جنسیت" } }) => (
          <Listbox
            value={value}
            onChange={onChange}
            as={"div"}
            className='relative w-auto  h-full text-right transition-all duration-200 text-gray8 '
          >
            {({ open }) => (
              <>
                <Listbox.Button
                  className={`flex items-center h-[56px] justify-between w-full text-right border transition-all duration-200 shadow-md rounded-lg px-2 ${
                    open ? "border-primary text-primary" : "border-gray4"
                  }`}
                >
                  <span>{value || "جنسیت"}</span>
                  {icon && <span>{icon}</span>}
                </Listbox.Button>
                <Listbox.Options className='absolute bg-white w-full top-[100%] right-0 left-0 mx-auto border border-gray4 rounded-lg z-10 divide-y child:px-2 child:cursor-pointer child:py-2 child-hover:bg-tint1 child:transition-all '>
                  <Listbox.Option value={"مرد"}>مرد</Listbox.Option>
                  <Listbox.Option value={"زن"}>زن</Listbox.Option>
                </Listbox.Options>
              </>
            )}
          </Listbox>
        )}
      />
      <span
        className={`flex text-sm text-errorLight transition-all h-4  ${
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

export default CustomGenderSelector;
