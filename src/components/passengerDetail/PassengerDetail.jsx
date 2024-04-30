import React, { useRef, useState } from "react";
import CustomInput from "../UI/CustomInput";
import CustomGenderSelector from "./CustomGenderSelector";
import CustomDateSelector from "./CustomDateSelector";
import {
  UserIcon,
  UserCircleIcon,
  LocationIcon,
  TagIcon,
  InternetIcon,
  DocumentCheckIcon,
} from "../UI/icons";
const PassengerDetail = ({
  age = "بزرگسال",
  inputIdentifier = "",
  register,
  errors,
  watch,
  control,
}) => {
  const [passengerDetails, setPassengerDetails] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    nationality: "",
    nationalCode: "",
    passPortNumber: "",
    dateOfBirth: null,
    passPortExpiry: null,
  });

  // const [isError, setIsError] = useState("");

  const changeInputHandler = (event, identifier) => {
    setIsError("");
    setPassengerDetails((prev) => {
      return {
        ...prev,
        [identifier]: event.target.value,
      };
    });
  };
  const userAgeDateHandler = (value, identifier) => {
    setIsError("");
    setPassengerDetails((prev) => {
      return {
        ...prev,
        [identifier]: value,
      };
    });
  };
  const changeGenderHandler = (value) => {
    setIsError("");
    setPassengerDetails((prev) => {
      return {
        ...prev,
        gender: value,
      };
    });
  };

  return (
    <div className='space-y-4 py-5 md:py-10 z-10'>
      <h6 className='font-IRANSansXMedium text-right'>{age}</h6>
      <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        <input
          type='text'
          {...register(inputIdentifier + "_" + "age")}
          defaultValue={age}
          className='hidden'
        />
        <CustomInput
          placeHolder='نام لاتین'
          identifier='firstName'
          inputName={inputIdentifier + "firstName"}
          inputIdentifier={inputIdentifier}
          register={register}
          watch={watch}
          errors={errors}
          icon={<UserIcon />}
        />
        <CustomInput
          placeHolder='نام خونوادگی لاتین'
          identifier='lastName'
          inputName={inputIdentifier + "lastName"}
          inputIdentifier={inputIdentifier}
          register={register}
          watch={watch}
          errors={errors}
          icon={<UserIcon />}
        />
        <CustomGenderSelector
          identifier='gender'
          inputName={inputIdentifier + "gender"}
          inputIdentifier={inputIdentifier}
          register={register}
          watch={watch}
          errors={errors}
          control={control}
          icon={<UserCircleIcon />}
        />
        <CustomDateSelector
          placeHolder='تاریخ تولد'
          identifier='dateOfBirth'
          inputName={inputIdentifier + "birthDate"}
          inputIdentifier={inputIdentifier}
          control={control}
          watch={watch}
          errors={errors}
        />
      </div>
      <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        <CustomInput
          placeHolder='ملیت'
          identifier='nationality'
          inputName={inputIdentifier + "nationality"}
          inputIdentifier={inputIdentifier}
          register={register}
          watch={watch}
          errors={errors}
          icon={<LocationIcon />}
        />
        <CustomInput
          placeHolder='کد ملی'
          identifier='nationalCode'
          inputType='number'
          inputName={inputIdentifier + "nationalCode"}
          inputIdentifier={inputIdentifier}
          register={register}
          watch={watch}
          errors={errors}
          icon={<TagIcon />}
        />
        <CustomInput
          placeHolder='شماره پاسپورت'
          identifier='passPortNumber'
          inputIdentifier={inputIdentifier}
          inputType='number'
          inputName={inputIdentifier + "passPortNumber"}
          register={register}
          watch={watch}
          errors={errors}
          icon={<DocumentCheckIcon />}
        />
        <CustomDateSelector
          placeHolder='تاریخ انقضا پاسپورت'
          identifier='passPortExpiry'
          inputName={inputIdentifier + "passPortExpiry"}
          inputIdentifier={inputIdentifier}
          control={control}
          watch={watch}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default PassengerDetail;
