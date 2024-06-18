import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({ button, isOpen, closeModal, children }) {
  return (
    <>
      {/* <div
        className='flex items-center justify-center w-full md:w-auto'
        onClick={openModal}
      >
      </div> */}
      {button}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 backdrop-blur' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center  text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out transition-all duration-200'
                enterFrom='scale-0 h-0 opacity-0'
                enterTo='scale-100 h-full opacity-100'
                leave='ease-in transition-all duration-200'
                leaveFrom='scale-100 h-full opacity-100'
                leaveTo='scale-0 h-0 opacity-0'
              >
                <Dialog.Panel className='w-auto h-auto transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
