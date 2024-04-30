import React, { useEffect, useState } from "react";
import PassengerDetail from "../passengerDetail/PassengerDetail";
import CustomInput from "../UI/CustomInput";
import { useFindTicketContext } from "../../store/FindTicketContext";
import { useForm } from "react-hook-form";
import { useTicketBuyingProcess } from "../../store/TicketBuyingProcess";
import { useNavigate } from "react-router-dom";
import { EmailIcon, PhoneIcon } from "../UI/icons";
import { useAuthContext } from "../../store/AuthContext";

function convertObjectToArray(inputObject) {
  const resultArray = [];
  let tempObject = {};
  let counter = 0;

  for (const key in inputObject) {
    // Remove the key name until the second _ and keep the rest
    const keyParts = key.split("_");
    const newKey = keyParts.splice(keyParts.length > 2 ? 2 : 0).join("_");
    tempObject[newKey] = inputObject[key];
    counter++;

    if (counter === 9) {
      resultArray.push(tempObject);
      tempObject = {};
      counter = 0;
    }
  }
  // In case the last object has less than 8 properties
  if (counter > 0) {
    resultArray.push(tempObject);
  }
  return resultArray;
}
const PassengersInformation = () => {
  // state for user Contact Information
  const [userEmail, setEmail] = useState("");
  const [userPhone, setPhoneNumber] = useState("");
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm();
  const {
    updatePassengersInformation,
    updateTicketBuyingStatus,
    tempSelectedTicket,
    updateContactInformation,
  } = useTicketBuyingProcess();

  // setDefault value for user Contact Information
  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
      setPhoneNumber(currentUser.user_metadata.phone || "");
    }
  }, [currentUser]);

  useEffect(() => {
    if (!tempSelectedTicket) return navigate("/");
  }, [tempSelectedTicket]);

  const handleSentFormData = (data, e) => {
    let result = convertObjectToArray(data);
    const contactInfo = result.splice(-1);

    if (isValid && result.length > 0) {
      updatePassengersInformation(result);
      updateContactInformation(contactInfo);
      updateTicketBuyingStatus("conformation");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSentFormData)} className='space-y-10'>
      <div className='border border-gray3 rounded-lg p-3 xs:p-6 '>
        <div className='flex items-center justify-between w-full '>
          <h6 className='text-sm xs:text-base font-IRANSansXBold'>
            مشخصات مسافران
          </h6>
          <div className='text-xs xs:text-sm'>
            <span>زمان باقی مانده:</span>
            <span className='text-errorLight'>07:23</span>
          </div>
        </div>
        {tempSelectedTicket && (
          <div className='w-full divide-y'>
            {Array.from(
              { length: tempSelectedTicket.passengers.adults },
              (_, index) => (
                <PassengerDetail
                  age='بزرگسال'
                  inputIdentifier={`${index}_adult`}
                  key={index}
                  register={register}
                  errors={errors}
                  watch={watch}
                  control={control}
                />
              )
            )}
            {Array.from(
              { length: tempSelectedTicket.passengers.children },
              (_, index) => (
                <PassengerDetail
                  age='کودک'
                  inputIdentifier={`${index}_child`}
                  key={index}
                  register={register}
                  errors={errors}
                  watch={watch}
                  control={control}
                />
              )
            )}
            {Array.from(
              { length: tempSelectedTicket.passengers.baby },
              (_, index) => (
                <PassengerDetail
                  age='نوزاد'
                  inputIdentifier={`${index}_baby`}
                  key={index}
                  register={register}
                  errors={errors}
                  watch={watch}
                  control={control}
                />
              )
            )}
          </div>
        )}
      </div>
      <div className='border border-gray3 rounded-lg p-3 xs:p-6 space-y-6'>
        <h6 className='font-IRANSansXBold'>اطلاعات تماس</h6>
        <p className='text-gray6 text-sm'>
          در صورت مغایرت اطلاعات تماس این فرم با اطلاعات درج شده در حساب کاربری،
          بلیط و تاییدیه خرید به اطلاعات تماس همین فرم ارسال خواهد شد. همچنین
          «اعلام تغییرات بلیط» یا «دریافت تاییدیه» از یکی از کانال‌های «اطلاعات
          تماس حساب کاربری» یا «اطلاعات همین فرم» صورت خواهد گرفت و بیلیتو متعهد
          به برقراری ارتباط با یکی از این کانال‌هاست. خواهشمندیم هر دو کانال را
          در دسترس نگه دارید.
        </p>
        <div className='flex flex-col xs:flex-row justify-center items-center gap-4 w-full child:w-full  child:xs:w-auto'>
          <CustomInput
            inputIdentifier='emailInformation'
            placeHolder='ایمیل'
            identifier='email'
            inputType='email'
            register={register}
            errors={errors}
            watch={watch}
            icon={<EmailIcon />}
            defaultValue={userEmail}
            setValue={setValue}
          />
          <CustomInput
            inputIdentifier='phoneInformation'
            placeHolder='شماره تلفن'
            identifier='phone'
            inputType='number'
            register={register}
            errors={errors}
            watch={watch}
            icon={<PhoneIcon />}
            defaultValue={userPhone}
            setValue={setValue}
          />
        </div>
      </div>
      <div className='flex-all'>
        {/* continue */}
        <button
          type='submit'
          // disabled={isSubmitting}
          className={`w-full xs:w-1/2  text-white md:w-1/3 rounded-lg  h-10 ${
            isValid ? "bg-primary" : "bg-tint5"
          }`}
        >
          {isSubmitting ? "در حال ارسال" : "ادامه"}
        </button>
      </div>
    </form>
  );
};

export default PassengersInformation;
