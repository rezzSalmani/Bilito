import React, { Fragment } from "react";
import LandingImage from "../components/LandingImage";
import CustomInput from "../components/UI/CustomInput.jsx";
import { useForm } from "react-hook-form";
import { Menu, Transition } from "@headlessui/react";
import { MinusCircle, PlusCircle } from "../components/UI/icons.jsx";
const Insurance = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm();
  return (
    <section>
      <LandingImage bgClass='insuranceBg' />
      {/* insurance search box */}
      <div className='container'>
        <div className='flex  items-center bg-white rounded-lg p-6 shadow-md'>
          <CustomInput
            register={register}
            errors={errors}
            watch={watch}
            identifier='countryDistention'
            inputIdentifier='user'
            placeHolder='کشور مقصد'
          />
          <CustomInput
            register={register}
            errors={errors}
            watch={watch}
            identifier='travelPeriodTime'
            inputIdentifier='user'
            placeHolder='مدت سفر'
          />
          <Menu as='div' className='relative flex h-full w-full text-right'>
            <Menu.Button className='flex items-center w-full h-full font-IRANSansXBold'>
              مسافران
            </Menu.Button>
            <Transition
              as={Fragment}
              enter='ease-out duration-100'
              enterFrom='opacity-0 -translate-y-4'
              enterTo='opacity-100 translate-y-0'
              leave='ease-in duration-100'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 -translate-y-4'
            >
              <Menu.Items
                static
                className='absolute w-full sm:min-w-max md:w-auto top-[90%] right-0 mt-2 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg z-20 font-IRANSansXMedium'
              >
                <Menu.Item
                  disabled
                  as={"div"}
                  className='flex items-center gap-6 justify-between px-3 py-4 text-nowrap '
                >
                  <div>
                    {/* {active ? <span>active</span> : <span>not active</span>} */}
                    بزرگسال
                    <span className='text-gray5 text-xs mr-2'>
                      ۱۲ سال به بالا
                    </span>
                  </div>
                  <div className='flex items-center gap-2 child:flex-all'>
                    <span
                      onClick={() =>
                        updateSearchFlightPassengersParameters(
                          "adults",
                          "increment"
                        )
                      }
                      className='bg-primary text-white rounded-full cursor-pointer'
                    >
                      <PlusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                    </span>
                    {/* <span className='w-7'>{"w"}</span> */}
                    <input
                      type='number'
                      {...register("range-0-12")}
                      className='[&::-webkit-slider-thumb]:bg-blue'
                    />
                    <span
                      onClick={() =>
                        updateSearchFlightPassengersParameters(
                          "adults",
                          "decrement"
                        )
                      }
                      //   className={` text-white rounded-full cursor-pointer ${
                      //     '' == 1 ? "bg-gray5" : "bg-primary"
                      //   }`}
                    >
                      <MinusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                    </span>
                  </div>
                </Menu.Item>
                <Menu.Item
                  disabled
                  as={"div"}
                  className='flex items-center gap-6 justify-between px-3 py-4 text-nowrap '
                >
                  <div>
                    {/* {active ? <span>active</span> : <span>not active</span>} */}
                    کودک
                    <span className='text-gray5 text-xs mr-2'>2 تا 12 سال</span>
                  </div>
                  <div className='flex items-center gap-2 child:flex-all'>
                    <span
                      onClick={() =>
                        updateSearchFlightPassengersParameters(
                          "children",
                          "increment"
                        )
                      }
                      className='bg-primary text-white rounded-full cursor-pointer'
                    >
                      <PlusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                    </span>
                    <span className='w-7'>{"2"}</span>
                    <span
                      onClick={() =>
                        updateSearchFlightPassengersParameters(
                          "children",
                          "decrement"
                        )
                      }
                      className='bg-primary text-white rounded-full cursor-pointer'
                    >
                      <MinusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                    </span>
                  </div>
                </Menu.Item>
                <Menu.Item
                  disabled
                  as={"div"}
                  className='flex items-center gap-6 justify-between px-3 py-4 text-nowrap '
                >
                  <div>
                    {/* {active ? <span>active</span> : <span>not active</span>} */}
                    نوزاد
                    <span className='text-gray5 text-xs mr-2'>تا 2 سال</span>
                  </div>
                  <div className='flex items-center gap-2 child:flex-all'>
                    <span
                      onClick={() =>
                        updateSearchFlightPassengersParameters(
                          "baby",
                          "increment"
                        )
                      }
                      className='bg-primary text-white rounded-full cursor-pointer'
                    >
                      <PlusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                    </span>
                    <span className='w-7'>{"d"}</span>
                    <span
                      onClick={() =>
                        updateSearchFlightPassengersParameters(
                          "baby",
                          "decrement"
                        )
                      }
                      className='bg-primary text-white rounded-full cursor-pointer'
                    >
                      <MinusCircle classes='w-5 h-5 md:w-6 md:h-6' />
                    </span>
                  </div>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </section>
  );
};

export default Insurance;
