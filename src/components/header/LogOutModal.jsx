import React, { useState } from "react";
import Modal from "../UI/Modal";
import ButtonPrimary from "../UI/ButtonPrimary";
import { UserIcon } from "../UI/icons";
import { useAuthContext } from "../../store/AuthContext.jsx";
import { set } from "react-hook-form";
import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";
const LogOutModal = () => {
  const [isExistModal, setIsExistModal] = useState(false);
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogOut = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    toast.success("شما با موفقیت خارج شدید.");
    setIsLoading(false);
    setIsExistModal(false);
  };
  const Button = (
    <div>
      <ButtonPrimary
        classes='hidden md:flex flex-row-reverse py-2 px-4 rounded-lg items-center'
        text={currentUser.user_metadata.username}
        icon={<UserIcon />}
        // className='flex items-center gap-2 border border-gray-3 rounded-lg text-white bg-primary px-3 py-1.5'
      />
      <span className='flex md:hidden '>
        <span className='p-2 bg-tint1 rounded-md'>
          <UserIcon></UserIcon>
        </span>
      </span>
    </div>
  );
  return (
    <Modal
      button={Button}
      closeModal={() => setIsExistModal(false)}
      openModal={() => setIsExistModal(true)}
      isOpen={isExistModal}
    >
      <div className='flex items-center justify-center flex-col gap-6 md:gap-10 bg-white w-[300px] h-[200px] rounded-lg shadow-md'>
        <h6>آیا از خروج اطمینان دارید؟</h6>
        <div className='flex items-center gap-4 child:px-6 child:py-1 child:border child:border-gray-200 child:rounded-lg text-white font-IRANSansXBold'>
          <button
            disabled={isLoading}
            onClick={handleLogOut}
            className='bg-successLight'
          >
            {isLoading ? "خروج ..." : "بله"}
          </button>
          <button
            disabled={isLoading}
            onClick={() => setIsExistModal(false)}
            className='bg-errorLight'
          >
            خیر
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
