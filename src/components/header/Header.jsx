import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import {
  AboutUsIcon,
  AirPlane,
  BarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseCircleIcon,
  HomeIcon,
  PhoneIcon,
  QuestionIcon,
  SupportIcon,
  TicketIcon,
  UserIcon,
} from "../UI/icons";
import { Popover, Transition } from "@headlessui/react";
import AuthForms from "../Authentication/AuthForms.jsx";
import { useAuthContext } from "../../store/AuthContext.jsx";
import LogOutModal from "../Authentication/LogOutModal.jsx";
import toast from "react-hot-toast";
const Header = () => {
  const [openMobileMenu, setMobileOpenMenu] = useState(false);
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;
  useEffect(() => {
    setMobileOpenMenu(false);
  }, [currentRoute]);
  console.log(currentRoute);
  return (
    <header className='sticky top-0 bg-white z-10'>
      {/* desktop menu */}
      <div className=' container hidden md:flex items-center justify-between bg-white h-[104px] '>
        <div className='flex items-center gap-8 xl:gap-14'>
          <Link to='/'>
            <img
              src='/images/mainLogo.svg'
              alt='Logo'
              className='w-[100px] xl:w-[148px]'
            />
          </Link>
          <ul className='flex items-center gap-4 xl:gap-8 child:py-2 w-full font-IRANSansXDemiBold lg:text-xl text-right child:min-h-full child:relative'>
            <li>
              <NavLink to='/'>صفحه اصلی</NavLink>
              <span
                className={`absolute left-0 right-0 mx-auto bottom-0 h-0.5 rounded-xl bg-primary transition-all ease-linear duration-200 delay-100 ${
                  currentRoute === "/"
                    ? "w-full opacity-100 visible"
                    : "w-0 opacity-0 invisible"
                }`}
              ></span>
            </li>
            <li>
              <NavLink to='/insurance'>بیمه مسافرتی</NavLink>
              <span
                className={`absolute left-0 right-0 mx-auto bottom-0 h-0.5 rounded-xl bg-primary transition-all ease-linear duration-200 delay-100 ${
                  currentRoute === "/insurance"
                    ? "w-full opacity-100 visible"
                    : "w-0 opacity-0 invisible"
                }`}
              ></span>
            </li>
            <li>
              <NavLink
                to='/dashBoard/userTickets'
                onClick={(event) => {
                  if (!currentUser) {
                    event.preventDefault();
                    navigate("/");
                    toast.error("لطفا ابتدا وارد سایت شوید!");
                  }
                }}
              >
                سفرهای من
              </NavLink>
              <span
                className={`absolute left-0 right-0 mx-auto bottom-0 h-0.5 rounded-xl bg-primary transition-all ease-linear duration-200 delay-100 ${
                  currentRoute.startsWith("/dashBoard")
                    ? "w-full opacity-100 visible"
                    : "w-0 opacity-0 invisible"
                }`}
              ></span>
            </li>
            <Popover as='li' className='relative'>
              {({ open }) => (
                <>
                  <Popover.Button className='flex items-center gap-2 h-full outline-none'>
                    سایر موارد
                    {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </Popover.Button>
                  <span
                    className={`absolute left-0 right-0 mx-auto bottom-0 h-0.5 rounded-xl bg-primary transition-all ease-linear duration-200 delay-100 ${
                      currentRoute === "/guide" ||
                      currentRoute === "/about-us" ||
                      currentRoute === "/contact-us"
                        ? "w-full opacity-100 visible"
                        : "w-0 opacity-0 invisible"
                    }`}
                  ></span>
                  <Popover.Panel>
                    {({ close }) => (
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
                              <button
                                onClick={() => {
                                  navigate("/"), close();
                                }}
                              >
                                سوالات متداول
                              </button>
                            </li>
                            <li>
                              <SupportIcon />
                              <button
                                onClick={() => {
                                  navigate("/guide"), close();
                                }}
                              >
                                راهنمای خرید
                              </button>
                            </li>
                            <li>
                              <AboutUsIcon />
                              <button
                                onClick={() => {
                                  navigate("/about-us"), close();
                                }}
                              >
                                درباره ما
                              </button>
                            </li>
                            <li>
                              <PhoneIcon />
                              <button
                                onClick={() => {
                                  navigate("contact-us"), close();
                                }}
                              >
                                تماس با ما
                              </button>
                            </li>
                          </ul>
                        </div>
                      </Transition>
                    )}
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
          {currentUser !== null ? <LogOutModal /> : <AuthForms />}
        </div>
      </div>
      {/* mobile menu */}
      <div className=' flex items-center justify-between w-full bg-white py-4 px-5 md:hidden child:cursor-pointer'>
        <span onClick={() => setMobileOpenMenu((perv) => !perv)}>
          {openMobileMenu ? <CloseCircleIcon /> : <BarIcon />}
        </span>
        <Link to='/'>
          <img src='/images/mainLogo.svg' alt='Logo' className='w-[100px] ' />
        </Link>
        <span onClick={() => setMobileOpenMenu(false)}>
          {currentUser !== null ? <LogOutModal /> : <AuthForms />}
        </span>
      </div>
      <div
        className={`md:hidden fixed w-full inset-0 bg-white z-10 transition-all ease-linear ${
          openMobileMenu
            ? "h-[calc(100vh-65px)] opacity-100 visible translate-y-16"
            : "opacity-0 h-0 invisible"
        }`}
      >
        <ul className='container flex-all flex-col child:w-fit child:child:inline-flex child:child:justify-start child:child:gap-2 child:p-2 space-y-3 pt-10 child-hover:text-tint5 transition-all child:transition-all'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? "text-primary " : "")}
            >
              <HomeIcon />
              صفحه اصلی
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/insurance'
              className={({ isActive }) => (isActive ? "text-primary " : "")}
            >
              <TicketIcon />
              بیمه مسافرتی
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/dashBoard/userTickets'
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
              to='/guide'
              className={({ isActive }) => (isActive ? "text-primary " : "")}
            >
              <QuestionIcon />
              راهنمای
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/dashBoard/userInformation'
              className={({ isActive }) => (isActive ? "text-primary" : "")}
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
    </header>
  );
};

export default Header;
