import React from "react";
import {
  CircleSpinner,
  CirclesSpinner,
  CloseCircleIcon,
  EmailIcon,
  LockIcon,
  PhoneIcon,
  UserIcon,
} from "../UI/icons";
import CustomInput from "../UI/CustomInput";
import { removeIdentifierFromSingUpForm } from "../../util/util";
import { supabase } from "../../supabaseClient";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignUpForm = ({
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
  const handleSingUp = async (values) => {
    console.log("first");
    const pureValues = removeIdentifierFromSingUpForm(values);
    console.log(pureValues);
    if (!pureValues.policy)
      return setIsError("لطفا قوانین را خوانده و اعمال کنید");
    setIsLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: pureValues.signUpEmail,
        password: pureValues.signUpPassword,
        options: {
          data: {
            username: pureValues.signUpUsername,
            phone: pureValues.signUpPhone,
            tickets: [],
          },
        },
      });
      // const { error: insertError } = await supabase
      //   .from("users")
      //   .insert({ user_id: data.user.id, username: userData.userName });
      if (signUpError) {
        throw new Error(signUpError.message);
      } else {
        toast.success("شما  با موفقیت ثبت نام شدید.");
        closeModal();
      }
    } catch (error) {
      switch (error.message) {
        case "Password should be at least 6 characters.":
          setIsError("رمزعبور باید حداقل 6 کاراکتر باشد.");
          break;
        case "Unable to validate email address: invalid format":
          setIsError("ایمیل نا معتبر است.");
          break;
        case "User already registered":
          setIsError("ایمیل قبلا ثبت نام شده است.");
          break;
        default:
          console.error(error);
          toast.error("ثبت نام موفقیت آمیز نبود!");
          closeModal();
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className={`absolute h-auto w-screen xs:w-[400px] md:w-[600px] flex-all flex-col gap-4 text-center bg-white  py-6 md:py-10 px-4 md:px-6 rounded-lg shadow-md overflow-hidden`}
      style={{
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
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
        <h6 className='font-IRANSansXBold text-2xl md:text-3xl'>عضویت</h6>
        <div className='flex items-center gap-2 text-gray6'>
          <span>قبلا ثبت نام کرده اید؟</span>
          <span
            className='text-primary font-IRANSansXMedium cursor-pointer'
            onClick={() => {
              changeForm();
              reset();
            }}
          >
            وارد شوید
          </span>
        </div>
        <form
          onSubmit={handleSubmit(handleSingUp)}
          className=' md:w-4/5 md:space-y-2 w-full'
        >
          <CustomInput
            register={register}
            errors={errors}
            watch={watch}
            placeHolder='نام کاربری'
            inputIdentifier={"signUp"}
            identifier='signUpUsername'
            icon={<UserIcon />}
          />
          <CustomInput
            register={register}
            errors={errors}
            watch={watch}
            placeHolder='آدرس ایمیل'
            inputIdentifier={"signUp"}
            identifier='signUpEmail'
            inputType='email'
            icon={<EmailIcon />}
          />
          <CustomInput
            register={register}
            errors={errors}
            watch={watch}
            placeHolder='شماره همراه (اختیاری)'
            identifier='signUpPhone'
            inputIdentifier={"signUp"}
            inputType='number'
            icon={<PhoneIcon />}
            validations={false}
          />
          <CustomInput
            register={register}
            errors={errors}
            watch={watch}
            placeHolder='رمز عبور'
            identifier='signUpPassword'
            inputIdentifier={"signUp"}
            inputType='password'
            icon={<LockIcon />}
            min={6}
            max={12}
          />
          {
            <span
              className={`flex text-errorLight text-sm text-right mt-2 transition-all h-6 ${
                isError ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {isError}
            </span>
          }
          <div className='inline-flex items-center text-right gap-1 text-sm'>
            <label
              className='relative flex items-center p-1.5 rounded-full '
              htmlFor='policy'
            >
              <input
                id='policy'
                name='policy'
                type='checkbox'
                {...register("policy", { onChange: () => setIsError() })}
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-tint5 checked:bg-tint5 checked:before:bg-tint5 hover:before:opacity-10"
              />
              <span className='absolute text-white  transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-3.5 w-3.5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  stroke='currentColor'
                  strokeWidth='1'
                >
                  <path
                    clipRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  ></path>
                </svg>
              </span>
            </label>

            <label
              className='my-px font-light text-gray7 select-none text-sm'
              htmlFor='policy'
            >
              با ورود و ثبت‌نام در سایت با{" "}
              <span className='text-primary  font-IRANSansXMedium cursor-pointer'>
                قوانین بیلیتو
              </span>{" "}
              موافقت می‌کنم.
            </label>
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className='flex items-center justify-center font-IRANSansXMedium w-full bg-primary text-white py-1.5 rounded-lg transition-all active:-translate-y-1 active:scale-95 active:shadow-md'
          >
            {isLoading ? <CirclesSpinner /> : "ثبت نام شوید"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
