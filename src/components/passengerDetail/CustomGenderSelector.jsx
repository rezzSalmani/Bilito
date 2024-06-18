import React, { useState, useEffect, useRef, Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
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
    <div className='flex flex-col h-full' ref={subMenuRef}>
      <Controller
        control={control}
        name={`${inputIdentifier}_${identifier}`}
        rules={{ required: "جنسیت را انتخاب کنید." }}
        render={({ field: { onChange, onBlur, value = "جنسیت" } }) => (
          <Listbox
            value={value}
            onChange={onChange}
            as={"div"}
            className='relative w-auto h-full text-right transition-all duration-200 text-gray8 '
          >
            {({ open }) => (
              <>
                <Listbox.Button
                  className={`flex items-center py-2 md:py-3 justify-between w-full text-right border transition-all duration-200 shadow-md rounded-lg px-2 ${
                    open ? "border-primary text-primary" : "border-gray3"
                  }`}
                >
                  <span>{value || "جنسیت"}</span>
                  {icon && <span>{icon}</span>}
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  enter='ease-out transition-all duration-200'
                  enterFrom='opacity-0 -translate-y-10'
                  enterTo='opacity-100 translate-y-0'
                  leave='ease-in transition-all duration-200'
                  leaveFrom='opacity-100 translate-y-0'
                  leaveTo='opacity-0 -translate-y-10'
                >
                  <Listbox.Options className='absolute bg-white w-full top-[100%] right-0 left-0 mx-auto border border-gray4 rounded-lg z-10 divide-y child:px-2 child:cursor-pointer child:py-2 child-hover:bg-tint1 child:transition-all '>
                    <Listbox.Option value={"مرد"}>مرد</Listbox.Option>
                    <Listbox.Option value={"زن"}>زن</Listbox.Option>
                  </Listbox.Options>
                </Transition>
              </>
            )}
          </Listbox>
        )}
      />
      <span
        className={`flex text-sm text-errorLight transition-all pr-1 h-4  ${
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
