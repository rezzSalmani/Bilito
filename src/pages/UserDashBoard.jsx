import React, { useEffect, useState } from "react";
import {
  AirPlane,
  CreditCartIcon,
  EditIcon,
  LogOutIcon,
  TicketIcon,
  UserIcon,
} from "../components/UI/icons";
import UserInformation from "../components/dashBoard/UserInformation";
import { useAuthContext } from "../store/AuthContext";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import LogOutModal from "../components/Authentication/LogOutModal";
import toast from "react-hot-toast";
import { supabase } from "../supabaseClient";
import UserTickets from "../components/dashBoard/UserTickets";
import UserSupport from "../components/dashBoard/UserSupport";
import UserWallet from "../components/dashBoard/UserWallet";
export const SECTIONS = [
  {
    title: "اطلاعات حساب کاربری",
    icon: <UserIcon />,
    identifier: "userInformation",
  },
  { title: " سفر های من", icon: <AirPlane />, identifier: "userTickets" },
  { title: " تیکت های من", icon: <TicketIcon />, identifier: "userSupport" },
  { title: " کیف پول", icon: <CreditCartIcon />, identifier: "userWallet" },
];
const UserDashBoard = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const subPath = location.pathname.split("/").pop() || "userTicket";
  const [activeSection, setActiveSection] = useState(subPath);
  useEffect(() => {
    const user = localStorage.getItem("Bilito-user");
    if (!user) navigate("/");
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      toast.error("مشکلی وحود دارد!");
    }
    toast.success("شما با موفقیت خارج شدید.");
    setIsLoading(false);
    navigate("/");
  };
  const handleChangeSection = (identifier) => {
    if (identifier !== "logOut") setActiveSection(identifier);
    // if (identifier === "logOut") {
    //   setActiveSection(identifier);
    //   handleLogOut();
    // }
  };
  return (
    <section className='flex flex-col md:flex-row gap-4 lg:gap-6 container py-8'>
      <div className='min-w-[30%] lg:min-w-[23%] h-fit border border-gray4 rounded-lg p-2 lg:p-4 space-y-4 shadow-md'>
        <div className='flex items-center flex-col gap-4'>
          <div className='relative w-fit h-fit'>
            <img
              src='/images/user.jpg'
              alt='user'
              className='rounded-full w-24 lg:w-36 h-24 lg:h-36 object-cover'
            />
            <span className='absolute -bottom-3 cursor-pointer right-[10%] bg-white p-2 rounded-lg'>
              <EditIcon />
            </span>
          </div>
          <div className='font-IRANSansXBold text-gray6 text-center'>
            <h6>{currentUser?.user_metadata?.username || "_"}</h6>
            <span className='text-xs md:text-sm'>
              {currentUser?.email || "_"}
            </span>
          </div>
        </div>
        <span className='h-0.5 block w-full bg-gray4 rounded-lg '></span>
        <div className='md:space-y-2 child:flex child:items-center child:justify-between child:gap-1 text-gray8 child:cursor-pointer child-hover:md:bg-tint1 child-hover:md:text-primary last:child-hover:text-error child:transition-all child:duration-200 child:py-2 child:rounded-lg child:px-2 child:child:flex child:child:gap-2 child:w-full font-IRANSansXMedium'>
          {SECTIONS.map((section, index) => (
            <Link
              to={`/dashBoard/${section.identifier}`}
              onClick={() => handleChangeSection(section.identifier)}
              key={index}
              className={`text-sm xl:text-base ${
                section.identifier === "logOut" && "text-error"
              }`}
            >
              <span>
                {section.icon}
                {section.title}
              </span>
              {activeSection === section.identifier && (
                <span
                  className={`w-2 h-2 rounded-full bg-primary animate-ping`}
                ></span>
              )}
            </Link>
          ))}
          <LogOutModal
            customButton={
              <button className='text-sm xl:text-base text-error'>
                <span className='flex gap-1'>
                  <LogOutIcon />
                  <span>خروج از حساب کاربری</span>
                </span>
              </button>
            }
          />
        </div>
      </div>

      <Outlet />
    </section>
  );
};

export default UserDashBoard;
