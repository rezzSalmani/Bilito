import React, { useRef, useState } from "react";
import { PlusCircle, WalletIcon } from "../UI/icons";
import ButtonPrimary from "../UI/ButtonPrimary";

const UserWallet = () => {
  const [inputPriceValue, setInputPriceValue] = useState(null);
  const [userWalletValue, setUserWalletValue] = useState(0);
  return (
    <div className='w-full space-y-4 md:space-y-6 lg:space-y-8'>
      <div className=''>
        <h6 className='font-IRANSansXBold text-xl text-gray8 text-nowrap'>
          کیف پول
        </h6>
      </div>
      <div className='space-y-3 md:space-y-6 border border-gray4 rounded-lg shadow-md p-4 md:p-6'>
        <div className='flex items-center gap-2'>
          <span>
            <WalletIcon classes='w-5 h-5 md:w-7 md:h-7' />
          </span>
          <h6 className='text-gray9 font-IRANSansXBold md:text-xl'>
            موجودی حساب کاربری
          </h6>
        </div>
        <div className='flex items-center gap-2 font-IRANSansXBold'>
          <span className='text-gray6 md:text-xl'>موجودی کیف پول شما:</span>
          <span className='text-gray9 text-sm md:text-base'>
            {userWalletValue?.toLocaleString() || "0"} هزار تومان
          </span>
        </div>
        <div className='flex items-center gap-1 text-successLight'>
          <span>
            <PlusCircle />
          </span>
          <span>افزایش موجودی</span>
        </div>
        <div className='flex  flex-col xs:flex-row items-center justify-between gap-4 lg:gap-8 child:py-2 child:rounded-lg '>
          <input
            value={inputPriceValue}
            onChange={(e) => setInputPriceValue(Number(e.target.value))}
            type='number'
            placeholder='مبلغ به تومان وارد شود.'
            className='w-full lg:w-[60%] border border-gray3 px-2 outline-none'
          />
          <ButtonPrimary
            onClick={() => {
              setUserWalletValue((prev) => prev + inputPriceValue);
              setInputPriceValue("");
            }}
            text='+ افزایش اعتبار'
            classes='px-4 lg:px-8 text-nowrap w-full xs:w-auto'
          />
        </div>
      </div>
    </div>
  );
};

export default UserWallet;
