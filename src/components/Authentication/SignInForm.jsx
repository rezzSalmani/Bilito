import React from "react";
import CustomInput from "../UI/CustomInput";
import {
  CircleSpinner,
  CirclesSpinner,
  CloseCircleIcon,
  EmailIcon,
  LockIcon,
} from "../UI/icons";
import { useForm } from "react-hook-form";
import { supabase } from "../../supabaseClient";
import { removeIdentifierFromSingUpForm } from "../../util/util";
import toast from "react-hot-toast";

const SignInForm = ({
  closeModal,
  changeForm,
  isError,
  isLoading,
  setIsError,
  setIsLoading,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm();
  const handleSingIn = async (values) => {
    const pureValues = removeIdentifierFromSingUpForm(values);
    console.log(pureValues);
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: pureValues.signInEmail,
        password: pureValues.signInPassword,
      });
      if (error) {
        throw new Error(error.message);
      } else {
        toast.success("شما  با موفقیت وارد شدید.");
        closeModal();
      }
    } catch (error) {
      if (error.message === "Invalid login credentials") {
        setIsError("ایمیل یا رمز عبور نا معتبر است.");
      } else {
        console.error(error);
      }
      toast.error("ورود موفقیت آمیز نبود!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className={`absolute h-auto w-screen xs:w-[400px] md:w-[600px] flex-all flex-col gap-4 text-center bg-white  py-6 md:py-10 px-4 md:px-6 rounded-lg shadow-md overflow-hidden`}
      style={{
        backfaceVisibility: "hidden",
      }}
    >
      <span className='absolute left-4 top-4' onClick={closeModal}>
        <CloseCircleIcon classes='w-7 h-7' />
      </span>
      <img
        src='/images/mainLogo.svg'
        alt='Logo'
        className='w-[100px] md:w-[148px]'
      />
      <div className='flex-all flex-col space-y-4 w-full'>
        <h6 className='font-IRANSansXBold text-2xl md:text-3xl '>ورود</h6>
        <div className='flex items-center gap-2 text-gray6'>
          <span>قبلا ثبت نام نکرده اید؟</span>
          <span
            className='text-primary font-IRANSansXMedium cursor-pointer'
            onClick={() => {
              changeForm();
              reset();
            }}
          >
            عضو شوید
          </span>
        </div>
        <form
          onSubmit={handleSubmit(handleSingIn)}
          className='md:w-4/5  md:space-y-2 w-full'
        >
          <CustomInput
            register={register}
            errors={errors}
            watch={watch}
            placeHolder='آدرس ایمیل'
            inputIdentifier={"user"}
            identifier='signInEmail'
            inputType='email'
            icon={<EmailIcon />}
          />

          <CustomInput
            register={register}
            errors={errors}
            watch={watch}
            placeHolder='رمز عبور'
            inputIdentifier={"user"}
            identifier='signInPassword'
            inputType='password'
            icon={<LockIcon />}
            min={6}
            max={12}
          />
          {
            <span
              className={`flex text-errorLight text-sm text-right mt-2 transition-all h-6 ${
                isError ? "opacity-100 visible " : "opacity-0 invisible "
              }`}
            >
              {isError}
            </span>
          }
          <button
            disabled={isLoading}
            className='w-full  bg-primary font-IRANSansXMedium text-white py-2 rounded-lg transition-all active:-translate-y-1 active:scale-95 active:shadow-lg'
            type='submit'
          >
            {isLoading ? (
              <span className='flex items-center justify-center'>
                <CirclesSpinner />
              </span>
            ) : (
              "وارد شوید"
            )}
          </button>

          <button
            type='button'
            className='border border-gray3 w-full py-1.5 rounded-lg shadow-md text-sm md:text-base cursor-pointer mt-2'
            onClick={() =>
              toast("این قسمت در حال توسعه است.", {
                icon: "❌",
              })
            }
          >
            رمز عبور خود را فراموش کرده اید؟
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
