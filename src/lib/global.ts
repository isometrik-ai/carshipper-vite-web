import { CountryCode, getExampleNumber } from "libphonenumber-js/max";
import examples from "libphonenumber-js/examples.mobile.json"; 

export const getPhoneNumberLengthRange = (countryCode:CountryCode) => {
    const exampleNumber = getExampleNumber(countryCode, examples);
    if (exampleNumber) {
      const nationalNumber = exampleNumber.nationalNumber;
      return { min: nationalNumber.length, max: nationalNumber.length };
    } else {
      return { min: 0, max: 0 }; // Fallback if no example found
    }
  };