import React from "react";
import {
  AirPlane,
  EditIcon,
  LogOutIcon,
  TicketIcon,
  UserIcon,
} from "../components/UI/icons";
import UserInformation from "../components/dashBoard/UserInformation";

const UserDashBoard = () => {
  return (
    <section className='flex gap-6 container py-8'>
      <div className='min-w-[23%] border border-gray4 rounded-lg p-4 space-y-6 shadow-md'>
        <div className='flex items-center flex-col gap-4'>
          <div className='relative w-fit h-fit'>
            <img
              src='images/user.jpg'
              alt='user'
              className='rounded-full w-36 h-36 object-cover'
            />
            <span className='absolute -bottom-3 cursor-pointer right-[10%] bg-white p-2 rounded-lg'>
              <EditIcon />
            </span>
          </div>
          <div className='font-IRANSansXBold text-gray6'>
            <h6>محمد رضایی</h6>
            <span>09124125412</span>
          </div>
        </div>
        <span className='h-0.5 block w-full bg-gray4 rounded-lg '></span>
        <div className=''>
          <ul className='space-y-2 child:flex child:items-center child:justify-between child:gap-1 text-gray8  child:cursor-pointer child-hover:bg-tint1 child-hover:text-primary last:child-hover:text-error child:transition-all child:duration-200 child:py-1 child:rounded-lg child:px-2 child:child:flex child:child:gap-2'>
            <li>
              <span>
                <UserIcon />
                اطلاعات حساب کاربری
              </span>
              <span className='w-3 h-3 rounded-full bg-primary'></span>
            </li>
            <li>
              <span>
                <AirPlane />
                سفر های من
              </span>
              {/* <span className='w-3 h-3 rounded-full bg-primary'></span> */}
            </li>
            <li>
              <span>
                <TicketIcon />
                تیکت های من
              </span>
              {/* <span className='w-3 h-3 rounded-full bg-primary'></span> */}
            </li>
            <li className='text-error'>
              <span>
                <LogOutIcon />
                خروج از حساب کاربری
              </span>
            </li>
          </ul>
        </div>
      </div>
      <UserInformation />
    </section>
  );
};

export default UserDashBoard;
