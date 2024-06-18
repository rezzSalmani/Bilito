import React from "react";

const ButtonPrimary = ({ text, icon, classes = "", ...props }) => {
  if (!text) {
    console.error('ButtonPrimary component requires a "text" prop.');
    return null;
  }

  return (
    <button
      className={`bg-primary flex items-center justify-center gap-2 text-white font-IRANSansXMedium transition-all hover:shadow-xl active:scale-95 active:translate-y-1 ${classes}`}
      {...props}
    >
      {icon && icon}
      {text}
    </button>
  );
};

export default ButtonPrimary;
