import React, { createContext, useContext, useState } from "react";
const FindInsuranceContext = createContext({
  insuranceOptions: {},
  updateInsuranceOptions: () => {},
  updateInsuranceOptionsPassengers: () => {},
});

export const useFindInsuranceContext = () => {
  return useContext(FindInsuranceContext);
};
const FindInsuranceContextProvider = ({ children }) => {
  const [insuranceOptions, setInsuranceOptions] = useState({
    city: "",
    travelTime: "",
    passengers: {
      range0To12: 0,
      range13To65: 1,
      range66To70: 0,
      range71To75: 0,
      range76To80: 0,
      range81ToHigher: 0,
    },
  });

  const updateInsuranceOptions = (identifier, value) => {
    setInsuranceOptions((prev) => {
      return {
        ...prev,
        [identifier]: value,
      };
    });
  };
  const updateInsuranceOptionsPassengers = (identifier, type) => {
    if (type == "increment" && insuranceOptions.passengers[identifier] < 10) {
      setInsuranceOptions((prev) => {
        return {
          ...prev,
          passengers: {
            ...prev.passengers,
            [identifier]: prev.passengers[identifier] + 1,
          },
        };
      });
    }
    if (type == "decrement") {
      setInsuranceOptions((prev) => {
        if (
          (identifier === "range13To65" && prev.passengers.range13To65 === 1) ||
          prev.passengers[identifier] === 0
        )
          return prev;

        return {
          ...prev,
          passengers: {
            ...prev.passengers,
            [identifier]: prev.passengers[identifier] - 1,
          },
        };
      });
    }
  };
  const values = {
    insuranceOptions,
    updateInsuranceOptions,
    updateInsuranceOptionsPassengers,
  };
  return (
    <FindInsuranceContext.Provider value={values}>
      {children}
    </FindInsuranceContext.Provider>
  );
};

export default FindInsuranceContextProvider;
