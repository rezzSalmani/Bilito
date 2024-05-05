import React, { useState } from "react";
import UserInfoItem from "./UserInfoItem";
import {
  EditIcon,
  LocationIcon,
  PhoneIcon,
  UserCircleIcon,
  UserIcon,
} from "../UI/icons";
import CustomInput from "../UI/CustomInput";
import { useForm } from "react-hook-form";
import CustomGenderSelector from "../passengerDetail/CustomGenderSelector";
import CustomDateSelector from "../passengerDetail/CustomDateSelector";
import ButtonPrimary from "../UI/ButtonPrimary.jsx";
const UserInformation = ({ userInformation, setUserInformation }) => {
  const [isEditing, setIsEditing] = useState(true);

  const changeUserInformation = (identifier, value) => {
    setUserInformation((prev) => {
      return {
        ...prev,
        [identifier]: value,
      };
    });
  };
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm();
  const sendNewUserInformation = (data) => {
    if (isValid) {
      const getArrayForm = Object.entries(data).map(([key, value]) => ({
        key,
        value,
      }));
      getArrayForm.forEach((inputData) =>
        changeUserInformation(inputData.key, inputData.value.trim())
      );
      console.log(getArrayForm);
      setIsEditing(true);
    }
  };
  return (
    <div className='space-y-4 md:space-y-6 lg:space-y-8 w-full '>
      <h4 className='font-IRANSansXBold text-xl text-gray8'>
        اطلاعات حساب کاربری
      </h4>
      <div className='flex border border-gray4 rounded-lg shadow-md p-4 md:p-6 '>
        <div
          className={`flex-col  xs:flex-row gap-6 w-full child:w-full last:child:w-fit ${
            isEditing ? "flex" : "hidden"
          }`}
        >
          <div>
            <UserInfoItem
              title='نام و نام خانوادگی'
              value={userInformation.user_fullName}
            />
            <UserInfoItem
              title='کد ملی'
              value={userInformation.user_nationalCode}
            />
            <UserInfoItem
              title='ملیت'
              value={userInformation.user_nationality}
            />
          </div>
          <div>
            <UserInfoItem title='جنسیت' value={userInformation.user_gender} />
            <UserInfoItem
              title='تاریخ تولد'
              value={userInformation.user_birthDate}
            />
            <UserInfoItem
              title='شماره تماس'
              value={userInformation.user_phoneNumber}
            />
          </div>
          <div
            onClick={() => setIsEditing((prev) => !prev)}
            className='flex items-start justify-end text-nowrap gap-2 text-primary cursor-pointer h-fit text-sm lg:text-base'
          >
            <EditIcon />
            <span>ویرایش اطلاعات</span>
          </div>
        </div>
        {/* edit information */}
        <form
          onSubmit={handleSubmit(sendNewUserInformation)}
          className={`flex-col xs:flex-row items-center xs:items-start gap-2 w-full ${
            isEditing ? "hidden" : "flex"
          }`}
        >
          <div className='flex flex-col xs:flex-row items-center w-full gap-2 lg:gap-8'>
            <div className='flex flex-col gap-3 w-full xs:w-auto'>
              <CustomInput
                placeHolder='نام و نام خانوادگی'
                identifier='fullName'
                inputName='fullName'
                inputIdentifier='user'
                register={register}
                watch={watch}
                errors={errors}
                icon={<UserIcon />}
              />
              <CustomInput
                placeHolder='کد ملی'
                identifier='nationalCode'
                inputName='nationalCode'
                inputIdentifier='user'
                inputType='number'
                register={register}
                watch={watch}
                errors={errors}
                icon={<UserIcon />}
                min='10'
                max='12'
              />
              <CustomInput
                placeHolder='ملیت'
                identifier='nationality'
                inputName='nationality'
                inputIdentifier='user'
                register={register}
                watch={watch}
                errors={errors}
                icon={<LocationIcon />}
              />
            </div>
            <div className='flex flex-col gap-3 w-full xs:w-auto'>
              <CustomGenderSelector
                identifier='gender'
                inputName='gender'
                inputIdentifier='user'
                register={register}
                watch={watch}
                errors={errors}
                control={control}
                icon={<UserCircleIcon />}
              />
              <CustomDateSelector
                placeHolder='تاریخ تولد'
                identifier='birthDate'
                inputName='birthDate'
                inputIdentifier='user'
                control={control}
                watch={watch}
                errors={errors}
              />
              <CustomInput
                placeHolder='شماره تماس'
                identifier='phoneNumber'
                inputName='phoneNumber'
                inputType='number'
                inputIdentifier='user'
                register={register}
                watch={watch}
                errors={errors}
                icon={<PhoneIcon />}
                min='10'
                max='12'
              />
            </div>
          </div>
          <div className='flex xs:items-end xs:mb-4 xs:justify-end w-full xs:w-auto '>
            <ButtonPrimary
              text='ثبت'
              classes='px-8 lg:px-12 py-3 justify-end rounded-lg w-full xs:w-auto'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInformation;
