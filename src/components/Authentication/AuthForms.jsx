import React, { useState } from "react";
import Modal from "../UI/Modal";
import ButtonPrimary from "../UI/ButtonPrimary";
import { UserIcon } from "../UI/icons";
import { motion } from "framer-motion";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
const AuthForms = () => {
  const [isSingIn, setIsSingIn] = useState(false);
  const [isSingFormModal, setIsSingModal] = useState(false);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function closeModal() {
    setIsSingModal(false);
    setIsError("");
  }

  function openModal() {
    setIsSingModal(true);
  }
  function changeForm() {
    setIsFlipped((prev) => !prev);
    // setIsSingIn((prev) => !prev);
    setIsError("");
  }

  const button = (
    <div>
      <span className='hidden md:flex'>
        <ButtonPrimary
          onClick={() => openModal()}
          classes='py-2 px-4 rounded-lg'
          text='ورود / ثبت نام'
          icon={<UserIcon></UserIcon>}
        />
      </span>
      <span className='flex md:hidden '>
        <span className='p-2 bg-tint1 rounded-md'>
          <UserIcon></UserIcon>
        </span>
      </span>
    </div>
  );
  return (
    <Modal button={button} isOpen={isSingFormModal} closeModal={closeModal}>
      <div
        style={{
          transformStyle: "preserve-3d",
          perspective: "150rem",
        }}
        className='relative  '
      >
        <motion.div
          className={` flex-all w-full h-full transition-all `}
          initial={false}
          style={{
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateY: isFlipped ? 180 : 360 }}
          transition={{ duration: 0.6, animationDirection: "normal" }}
          // onAnimationComplete={() => setIsAnimating(false)}
        >
          <SignInForm
            closeModal={closeModal}
            changeForm={changeForm}
            isError={isError}
            isLoading={isLoading}
            setIsError={setIsError}
            setIsLoading={setIsLoading}
          />
          <SignUpForm
            closeModal={closeModal}
            changeForm={changeForm}
            isError={isError}
            isLoading={isLoading}
            setIsError={setIsError}
            setIsLoading={setIsLoading}
          />
        </motion.div>
      </div>
      {/* <motion.div
        className={`relative flex-all h-[700px] w-screen xs:w-[400px] md:w-[600px] transition-all bg-emerald-400`}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 360 }}
        transition={{ duration: 0.6, animationDirection: "normal" }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
      
      </motion.div> */}
    </Modal>
  );
};

export default AuthForms;
