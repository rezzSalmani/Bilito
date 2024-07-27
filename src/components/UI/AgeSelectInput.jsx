import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from "react-multi-date-picker/components/input_icon";

const AgeSelectInput = ({ label, setValue, valueType, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleAgeSelectorFocus = () => {
    setIsFocused(true);
  };
  const handleAgeSelectorBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`float-container w-[180px] relative flex flex-col rounded-lg px-4 text-right border shadow-md transition-all duration-200 ${
        isFocused || valueType ? "active " : ""
      } ${isFocused && "border-primary"}`}
    >
      <DatePicker
        animations={[opacity()]}
        inputClass='float-field py-4 outline-none border-none text-right bg-white w-[80px] h-[40px] md:h-[48px]'
        value={valueType}
        onChange={(valueType) => {
          setValue(valueType);
        }}
        onOpen={handleAgeSelectorFocus}
        onClose={handleAgeSelectorBlur}
        calendar={persian}
        locale={persian_fa}
        calendarPosition='bottom-center'
        render={<InputIcon className='h-full w-full' />}
        {...props}
      />
      <label
        htmlFor='float-field'
        className={`float-label absolute transition-all duration-200 ${
          isFocused ? "move-up" : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default AgeSelectInput;
