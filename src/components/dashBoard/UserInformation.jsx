import React, { useState } from "react";
import UserInfoItem from "./UserInfoItem";

const UserInformation = () => {
  const [userInformation, setUserInforamtion] = useState({
    fullName: "",
    gender: "",
    nationalCode: "",
    nationality: "-",
    phoneNumber: "",
  });
  return (
    <div className='space-y-8 w-full '>
      <h4 className='font-IRANSansXBold text-xl text-gray8'>
        اطلاعات حساب کاربری
      </h4>
      <div className='border border-gray4 rounded-lg shadow-md w-full p-6'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <span className='text-gray4'>نام و نام خانوادگی</span>
            <span className='text-gray8 font-IRANSansXBold md:text-xl'>
              محمد رضایی
            </span>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-gray4'>کدملی</span>
            <span className='text-gray8 font-IRANSansXBold md:text-xl'>
              30892581782
            </span>
          </div>
          <UserInfoItem title='ملیت' value={userInformation.nationality} />
        </div>
        <div className=''></div>
      </div>
    </div>
  );
};

export default UserInformation;
