import React from "react";

const UserInfoItem = ({ title = "", value = "" }) => {
  return (
    <div className='flex flex-col gap-1'>
      <span className='text-gray4'>{title}</span>
      <span className='text-gray8 font-IRANSansXBold md:text-xl'>{value}</span>
    </div>
  );
};

export default UserInfoItem;
