import React, { useState } from "react";
import Modal from "../UI/Modal.jsx";
import ButtonPrimary from "../UI/ButtonPrimary.jsx";
import { CircleSpinner, UserIcon } from "../UI/icons.jsx";
import { useAuthContext } from "../../store/AuthContext.jsx";
import { supabase } from "../../supabaseClient.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LogOutModal = ({ customButton = null }) => {
  const [isExistModal, setIsExistModal] = useState(false);
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
      toast.success("شما با موفقیت خارج شدید.");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("خروج موفقیت آمیز نبود!");
    } finally {
      setIsLoading(false);
      setIsExistModal(false);
    }
  };
  const Button = customButton ? (
    <div onClick={() => setIsExistModal(true)}>{customButton}</div>
  ) : (
    <div onClick={() => setIsExistModal(true)}>
      <ButtonPrimary
        classes='hidden md:flex flex-row-reverse py-2 px-4 rounded-lg items-center'
        text={currentUser?.user_metadata.username || "_"}
        icon={<UserIcon />}
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
            {isLoading ? (
              <span>
                <CircleSpinner />
              </span>
            ) : (
              "بله"
            )}
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
