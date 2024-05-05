import React, { useEffect, useState } from "react";
import {
  AirPlane,
  EditIcon,
  LogOutIcon,
  TicketIcon,
  UserIcon,
} from "../components/UI/icons";
import UserInformation from "../components/dashBoard/UserInformation";
import { useAuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import LogOutModal from "../components/header/LogOutModal";
import toast from "react-hot-toast";
import { supabase } from "../supabaseClient";
import UserTickets from "../components/dashBoard/UserTickets";
const sections = [
  {
    title: "اطلاعات حساب کاربری",
    icon: <UserIcon />,
    identifier: "user_information",
  },
  { title: " سفر های من", icon: <AirPlane />, identifier: "user_tickets" },
  { title: " تیکت های من", icon: <TicketIcon />, identifier: "user_message" },
  { title: " خروج از حساب کاربری", icon: <LogOutIcon />, identifier: "logOut" },
];
const UserDashBoard = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState({
    user_fullName: currentUser?.user_metadata?.username || "_",
    user_nationalCode: "_",
    user_nationality: "_",
    user_gender: "_",
    user_birthDate: "_",
    user_phoneNumber: currentUser?.user_metadata?.phone || "_",
  });
  const [activeSection, setActiveSection] = useState("user_information");
  useEffect(() => {
    if (currentUser) {
      setUserInformation((prev) => {
        return {
          ...prev,
          "user_fullName": currentUser.user_metadata.username || "_",
          "user_phoneNumber": currentUser.user_metadata.phone || "_",
        };
      });
    } else {
      navigate("/");
    }
  }, [currentUser]);
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
    if (identifier === "logOut") handleLogOut();
  };
  return (
    <section className='flex flex-col md:flex-row gap-6 container py-8'>
      <div className='min-w-[30%] lg:min-w-[23%] border border-gray4 rounded-lg p-2 lg:p-4 py-6 space-y-4 shadow-md'>
        <div className='flex items-center flex-col gap-4'>
          <div className='relative w-fit h-fit'>
            <img
              src='images/user.jpg'
              alt='user'
              className='rounded-full w-24 lg:w-36 h-24 lg:h-36 object-cover'
            />
            <span className='absolute -bottom-3 cursor-pointer right-[10%] bg-white p-2 rounded-lg'>
              <EditIcon />
            </span>
          </div>
          <div className='font-IRANSansXBold text-gray6 text-center'>
            <h6>{userInformation.user_fullName || "_"}</h6>
            <span className='text-xs md:text-sm'>
              {currentUser?.email || "_"}
            </span>
          </div>
        </div>
        <span className='h-0.5 block w-full bg-gray4 rounded-lg '></span>
        <div>
          <ul className='space-y-4 child:flex child:items-center child:justify-between child:gap-1 text-gray8  child:cursor-pointer child-hover:bg-tint1 child-hover:text-primary last:child-hover:text-error child:transition-all child:duration-200 child:py-1 child:rounded-lg child:px-2 child:child:flex child:child:gap-2'>
            {sections.map((section, index) => (
              <li
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
                    className={`w-3 h-3 rounded-full bg-primary ${
                      isLoading && "animate-ping"
                    }`}
                  ></span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {activeSection === "user_information" && (
        <UserInformation
          setUserInformation={setUserInformation}
          userInformation={userInformation}
        />
      )}
      {activeSection === "user_tickets" && <UserTickets />}
    </section>
  );
};

export default UserDashBoard;
