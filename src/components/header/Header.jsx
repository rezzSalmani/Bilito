import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import ButtonPrimary from "../UI/ButtonPrimary";
import {
  AboutUsIcon,
  AirPlane,
  BarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseCircleIcon,
  PhoneIcon,
  QuestionIcon,
  SupportIcon,
  UserIcon,
} from "../UI/icons";
import { Popover, Transition } from "@headlessui/react";
import SingUpSingInForm from "./SingUpSingInForm";
import { useFindTicketContext } from "../../store/FindTicketContext";
import { supabase } from "../../supabaseClient";
import { useAuthContext } from "../../store/authContext";
const Header = () => {
  const [openMobileMenu, setMobileOpenMenu] = useState(false);
  const { currentUser } = useAuthContext();
  // const [userName, setUserName] = useState("");
  // useEffect(() => {}, []);

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };
  return (
    <section className=' sticky top-0 bg-white z-10'>
      {/* desktop menu */}
      <div className=' container hidden md:flex items-center justify-between bg-white h-[104px] '>
        <div className='flex items-center gap-8 xl:gap-14'>
          <img
            src='/images/mainLogo.svg'
            alt='Logo'
            className='w-[100px] xl:w-[148px]'
          />
          <ul className='flex items-center gap-4 xl:gap-8 child:py-2 w-full font-IRANSansXDemiBold xl:text-xl text-right child:min-h-full'>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive ? "text-primary border-b border-primary" : ""
                }
              >
                صفحه اصلی
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/travel-insurance'
                className={({ isActive }) =>
                  isActive ? "text-primary border-b border-primary" : ""
                }
              >
                بیمه مسافرتی
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/my-travels'
                className={({ isActive }) =>
                  isActive ? "text-primary border-b border-primary" : ""
                }
              >
                سفرهای من
              </NavLink>
            </li>
            <Popover as='li' className='relative'>
              {({ open }) => (
                <>
                  <Popover.Button className='flex items-center gap-2 h-full outline-none'>
                    سایر موارد
                    {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </Popover.Button>
                  <Popover.Panel>
                    <Transition
                      enter='transition duration-100 ease-out'
                      enterFrom='transform scale-95 opacity-0'
                      enterTo='transform scale-100 opacity-100'
                      leave='transition duration-75 ease-out'
                      leaveFrom='transform scale-100 opacity-100'
                      leaveTo='transform scale-95 opacity-0'
                    >
                      <div className='absolute top-10 z-10 w-full'>
                        <ul className='relative w-48 flex bg-white flex-col shadow-md rounded-lg transition-all duration-200 h-full child:px-2 py-2 whitespace-nowrap text-base child:py-2 child:flex child:items-center child:gap-2 child-hover:pr-4 child:transition-all child:duration-200 child-hover:bg-tint1'>
                          <li>
                            <QuestionIcon />
                            <Link to='/'>سوالات متداول</Link>
                          </li>
                          <li>
                            <SupportIcon />

                            <Link to='/guide'>راهنمای خرید</Link>
                          </li>
                          <li>
                            <AboutUsIcon />
                            <Link to='/about-us'>درباره ما</Link>
                          </li>
                          <li>
                            <PhoneIcon />
                            <Link to='/contact-us'>تماس با ما</Link>
                          </li>
                        </ul>
                      </div>
                    </Transition>
                  </Popover.Panel>
                </>
              )}
            </Popover>
          </ul>
        </div>
        <div className='flex items-center gap-6 '>
          <div className='hidden xl:flex items-center gap-2 xl:text-xl '>
            <span>4045_021 پشتیبانی</span>
            <PhoneIcon />
          </div>
          {currentUser !== null ? (
            <ButtonPrimary
              classes='py-2 px-4 rounded-lg flex-row-reverse '
              text={currentUser.user_metadata.username}
              icon={<UserIcon />}
              // className='flex items-center gap-2 border border-gray-3 rounded-lg text-white bg-primary px-3 py-1.5'
              onClick={handleLogOut}
            ></ButtonPrimary>
          ) : (
            <SingUpSingInForm />
          )}
        </div>
      </div>
      {/* mobile menu */}
      <div className=' flex items-center justify-between w-full bg-white py-4 px-5 md:hidden child:cursor-pointer'>
        <span onClick={() => setMobileOpenMenu((perv) => !perv)}>
          {openMobileMenu ? <CloseCircleIcon /> : <BarIcon />}
        </span>
        <img src='/images/mainLogo.svg' alt='Logo' className='w-[100px] ' />
        <span onClick={() => setMobileOpenMenu(false)}>
          <SingUpSingInForm />
        </span>
      </div>
      <div
        className={`md:hidden fixed w-full inset-0 bg-white z-10 transition-all duration-200 ${
          openMobileMenu
            ? "h-[calc(100vh-65px)]  visible opacity-100 translate-y-16"
            : "invisible opacity-0 h-0"
        }`}
      >
        <ul className='container flex-all flex-col child:w-fit  child:child:inline-flex child:child:justify-start child:child:gap-2 child:p-2 space-y-3 pt-10 child-hover:text-tint5 transition-all child:transition-all'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? "text-primary " : "")}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                />
              </svg>
              صفحه اصلی
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/insurance'
              className={({ isActive }) => (isActive ? "text-primary " : "")}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                />
              </svg>
              بیمه مسافرتی
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/my-trips'
              className={({ isActive }) => (isActive ? "text-primary " : "")}
            >
              <AirPlane></AirPlane>
              سفرهای من
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/contact-us'
              className={({ isActive }) => (isActive ? "text-primary " : "")}
            >
              <PhoneIcon />
              تماس با ما
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about-us'
              className={({ isActive }) => (isActive ? "text-primary " : "")}
            >
              <AboutUsIcon />
              درباره ما
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/frequent-questions'
              className={({ isActive }) => (isActive ? "text-primary " : "")}
            >
              <QuestionIcon />
              سوالات متداول
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/login'
              className={({ isActive }) => (isActive ? "text-primary " : "")}
            >
              <UserIcon />
              حساب کاربری
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/support'
              className={({ isActive }) => (isActive ? "text-primary " : "")}
            >
              <SupportIcon />
              <span>4045_021 پشتیبانی</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Header;
