import React from "react";

const UserInfoItem = ({ title = "", value = "" }) => {
  return (
    <div className='flex flex-col gap-1 h-16'>
      <span className='text-gray4'>{title}</span>
      <span className='text-gray7 font-IRANSansXBold lg:text-lg'>{value}</span>
    </div>
  );
};

export default UserInfoItem;
