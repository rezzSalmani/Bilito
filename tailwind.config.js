/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "0,625rem",
        },
      },
      colors: {
        "primary": "#1D91CC",
        "tint5": "#77BDE0",
        "tint4": "#A5D3EB",
        "tint3": "#BBDEF0",
        "tint2": "#D2E9F5",
        "tint1": "#E8F4FA",

        "shade5": "#061D29",
        "shade4": "#092B3D",
        "shade3": "#0C3A52",
        "shade2": "#11577A",
        "shade1": "#1774A3",

        "black": "#0C0C0C",
        "gray9": "#202020",
        "gray8": "#404040",
        "gray7": "#606060",
        "gray6": "#868686",
        "gray5": "#ADADAD",
        "gray4": "#CBCBCB",
        "gray3": "#DFDFDF",
        "gray2": "#EDEDED",
        "gray1": "#F9F9F9",

        "error": "#C30000",
        "errorLight": "#ED2E2E",
        "errorLight2xl": "#FFF2F2",
        "success": "#00966D",
        "successLight": "#00BA88",
        "successLight2xl": "#F3FDFA",
        "warning": "#A9791C",
        "warningLight2xl": "#F4B740",
        "warningLight2xl": "#FFF8E1",
      },
      fontFamily: {
        "IRANSansXRegular": "IRANSansX Regular",
        "IRANSansXMedium": "IRANSansX Medium",
        // "IRANSansXDemiBold": "IRANSansX DemiBold",
        "IRANSansXBold": "IRANSansX Bold",
        // "YekanBakhRegular": "YekanBakh Regular",
        // "YekanBakhMedium": "YekanBakh Medium",
        // "YekanBakhBold": "YekanBakh Bold",
      },
      animation: {
        marquee: "marquee 5s linear infinite",
      },
      backgroundImage: {
        // "homePageDesktop": "",
      },
    },
    screens: {
      "xs": "480px",
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1220px",
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "&>*");
      addVariant("child-hover", "&>*:hover");
    },
  ],
};
