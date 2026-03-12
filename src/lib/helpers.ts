import { NUMBER_FROM_STRING_REGEX } from "./regx.constant";

export const emailValidator = (input: string): boolean => {
    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return pattern.test(input);
  };

export const getFirstNumberFromString = (value: string): number => {
    const match = value?.match(NUMBER_FROM_STRING_REGEX);
    return match ? Number(match[0]) : 1;
};