import React from "react";

const LandingImage = ({
  bgClass = "homeDesktopLinerGradient",
  mainTitle = "راحتی و سرعت در",
  secondTitle = true,
}) => {
  return (
    <div
      className={`flex flex-col relative h-[240px] md:h-[440px] bg-center bg-cover bg-no-repeat ${bgClass}`}
    >
      <h1 className='container flex flex-col justify-start pt-8 sm:pt-20 sm:gap-6 h-full font-IRANSansXBold text-xl md:text-3xl text-white w-4/5'>
        <span>{mainTitle}</span>
        {secondTitle && <span>رزرو بلیط هواپیما با بیلیتو</span>}
      </h1>
    </div>
  );
};

export default LandingImage;
