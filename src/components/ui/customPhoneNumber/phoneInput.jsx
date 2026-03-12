import React, { useEffect, useRef, useState } from "react";
import { NON_DIGIT_REGEX, US_PHONE_FORMAT_REGEX } from '@/lib/regx.constant';
import { getPhoneNumberLengthRange} from "@/lib/global";
import { PHONE_NUMBER_MAX_DIGITS } from "@/lib/config";
import { isValidNumber } from "libphonenumber-js";
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'

const CustomPhoneNumberInputField = (props) =>{
    const {
        phoneNumberValue,
        onPhoneNumberChanges,
        customPhoneNumberFieldStructure,
        customPhoneNumberFieldWrapper,
        customIntlTelInputContainer,
        customIntlTelInputWrapper,
        intlInputFieldName,
        intlInputFieldId,
        phoneNumberDefaultValue,
        useSeparateDialCode,
        useNationalMode,
        onPhoneNumberFlagChanges,
        onlyCountries,
        preferredCountries,
        country,
        tabindex,
        onKeyDown,
        readonly = false,
        hideFlags = true
    } = props;
    const [phoneNumber, setPhoneNumber] = useState();
    const inputRef = useRef(null);
    useEffect(()=>{
        setPhoneNumber(phoneNumberValue);
    },[phoneNumberValue]);

    useEffect(() => {
        if (inputRef.current) {
          const inputElement = inputRef.current.querySelector('input');
          if (inputElement) {
            inputElement.tabIndex = tabindex;
            inputElement.onkeydown = (e) => {
    
              const cleaned = inputElement?.value?.replace(NON_DIGIT_REGEX, '');
              if (cleaned?.length >= 10 && /\d/.test(e?.key)) {
                e?.preventDefault();
              }
    
              if (e.key === 'Enter') {
                e.preventDefault();
                const nextElement = document.querySelector(`[tabindex="${tabindex + 1}"]`);
                if (nextElement) {
                  nextElement.focus();
                }
              }
            };

            inputElement.onblur = () => {
                const rawValue = inputElement.value?.replace(NON_DIGIT_REGEX, '') || '';
                const startsWith5 = rawValue.charAt(0) === '5';
        
                if (!rawValue || rawValue.length < 9) {
                  // trigger red border (error)
                  props.setFieldErrors?.((prev) => ({
                    ...prev,
                    phoneNumberValue: true,
                  }));
        
                  props.setPhoneNumberSignUpData?.((prev) => ({
                    ...prev,
                    validateErrorMsg: rawValue.length === 0
                      ? props.locale?.phoneNumberRequired || "Phone number is required"
                        : props.locale?.phoneNumberInvalid || "Phone number is not valid"
                  }));
                } else {
                  // clear error
                  props.setFieldErrors?.((prev) => ({
                    ...prev,
                    phoneNumberValue: false,
                  }));
                }
            }
          }
        }
      }, [inputRef, tabindex, props]);

    const formatPhoneNumber = (value) => {
        if (!value) return value;

        const cleaned = value.replace(NON_DIGIT_REGEX, '');
        const match = cleaned.match(US_PHONE_FORMAT_REGEX);

        if (match) {
            return [match[1], match[2], match[3]].filter(Boolean).join('-');
        }

        return value;
    };

    const resolveCountryIso2 = () => {
        // Keep existing props API; default to US since the app config uses `us`
        const iso2 = (country || defaultCountryCode || "us").toString().toLowerCase();
        return iso2;
    };

    const resolveDialCode = (iso2Lower) => {
        // Minimal mapping for current usage (onlyCountries=['us'])
        if (iso2Lower === "us") return "+1";
        return "";
    };

    const handlePhoneNumberChange = (e) => {
        let value = e?.target?.value ?? "";
        let phoneStartWithZero = 0;
        const iso2Lower = resolveCountryIso2();
        const iso2Upper = iso2Lower.toUpperCase();
        let maxDigitForPhoneNumber = {
            min: PHONE_NUMBER_MAX_DIGITS,
            max: PHONE_NUMBER_MAX_DIGITS
        };
        if (value?.startsWith(0)) phoneStartWithZero = 1;

        // Get old formatted value and cursor position BEFORE any processing
        const inputElement = document.getElementById(intlInputFieldId);
        const oldFormattedValue = phoneNumber || (inputElement ? inputElement.value : '');
        const oldCursorPos = inputElement ? inputElement.selectionStart : 0;

        value = value.replace(NON_DIGIT_REGEX, '');
        if(value?.length > 0 && iso2Upper?.length > 0){
            maxDigitForPhoneNumber = getPhoneNumberLengthRange(iso2Upper);
        }
        
        // Enforce max digits (keeping prior behavior)
        if (value?.length > (maxDigitForPhoneNumber?.max || PHONE_NUMBER_MAX_DIGITS)) {
            value = value.slice(0, (maxDigitForPhoneNumber?.max || PHONE_NUMBER_MAX_DIGITS));
        }

        const formattedNumber = formatPhoneNumber(value);
        setPhoneNumber(formattedNumber);

        // Preserve cursor position in formatted number (with hyphens)
        if (inputElement && oldCursorPos !== null && oldFormattedValue) {
            setTimeout(() => {
                // Count digits before cursor in old formatted value (includes hyphens like "123-456")
                const oldSubstringBeforeCursor = oldFormattedValue.substring(0, oldCursorPos);
                const digitsBeforeCursor = oldSubstringBeforeCursor.replace(NON_DIGIT_REGEX, '').length;
                
                // Check if we're adding or removing digits
                const oldDigitCount = oldFormattedValue.replace(NON_DIGIT_REGEX, '').length;
                const newDigitCount = formattedNumber.replace(NON_DIGIT_REGEX, '').length;
                const isAdding = newDigitCount > oldDigitCount;
                const wasAtEnd = oldCursorPos >= oldFormattedValue.length;
                
                // If we were at the end and adding, place cursor at end of new value
                if (wasAtEnd && isAdding) {
                    inputElement.setSelectionRange(formattedNumber.length, formattedNumber.length);
                    return;
                }
                
                // Find position in new formatted value (with hyphens) with same digit count
                let newCursorPos = 0;
                let digitCount = 0;
                
                // Iterate through new formatted number (includes hyphens like "123-456-7890")
                for (let i = 0; i < formattedNumber.length; i++) {
                    if (/\d/.test(formattedNumber[i])) {
                        digitCount++;
                        // When we reach the target digit count
                        if (digitCount === digitsBeforeCursor) {
                            if (isAdding) {
                                // When adding, place cursor after the next digit (the newly added one)
                                // Continue to find the next digit after this one
                                for (let j = i + 1; j < formattedNumber.length; j++) {
                                    if (/\d/.test(formattedNumber[j])) {
                                        newCursorPos = j + 1;
                                        // Skip any hyphens immediately after
                                        while (newCursorPos < formattedNumber.length && formattedNumber[newCursorPos] === '-') {
                                            newCursorPos++;
                                        }
                                        break;
                                    }
                                }
                                // If no next digit found, place at end
                                if (newCursorPos === 0) {
                                    newCursorPos = formattedNumber.length;
                                }
                            } else {
                                // When deleting, place cursor after this digit
                                newCursorPos = i + 1;
                            }
                            break;
                        }
                    }
                }
                
                // If we haven't found enough digits, set to end
                if (digitCount < digitsBeforeCursor) {
                    newCursorPos = formattedNumber.length;
                } else if (digitsBeforeCursor === 0) {
                    // If no digits before cursor, place at start
                    newCursorPos = 0;
                }
                
                inputElement.setSelectionRange(newCursorPos, newCursorPos);
            }, 0);
        }
        const isValidLibPhone = isValidNumber(value, iso2Upper);
        const dialCode = resolveDialCode(iso2Lower);
        const phoneObjectData = {
            mobile: formattedNumber,
            countryCode: dialCode,
            sortCountryCode: iso2Upper,
            isValid: isValidLibPhone
        };
        onPhoneNumberChanges && onPhoneNumberChanges(phoneObjectData, []);
    };

    const handleBlur = () => {
        const inputElement = document.getElementById(intlInputFieldId);
        const rawValue = (inputElement?.value || '')?.replace(NON_DIGIT_REGEX, '') || '';
        if (!rawValue || rawValue.length < 9) {
            props.setFieldErrors?.((prev) => ({
                ...prev,
                phoneNumberValue: true,
            }));

            props.setPhoneNumberSignUpData?.((prev) => ({
                ...prev,
                validateErrorMsg: rawValue.length === 0
                    ? props.locale?.phoneNumberRequired || "Phone number is required"
                    : props.locale?.phoneNumberInvalid || "Phone number is not valid"
            }));
        } else {
            props.setFieldErrors?.((prev) => ({
                ...prev,
                phoneNumberValue: false,
            }));
        }
    };

    return (
        <div className={customPhoneNumberFieldStructure} ref={inputRef}>
            <div className={customPhoneNumberFieldWrapper}>
                <div className={customIntlTelInputContainer}>
                    {/* Dial code box (kept for layout compatibility with prior component) */}
                    {useSeparateDialCode ? (
                        <div
                            className="flex items-center justify-center px-3 select-none text-sm text-muted-foreground"
                            aria-hidden="true"
                            style={{ width: 60 }}
                        >
                            {resolveDialCode(resolveCountryIso2()) || ""}
                        </div>
                    ) : null}
                    <input
                        id={intlInputFieldId}
                        name={intlInputFieldName}
                        className={customIntlTelInputWrapper}
                        value={phoneNumber || ""}
                        defaultValue={phoneNumberDefaultValue}
                        onChange={handlePhoneNumberChange}
                        onBlur={handleBlur}
                        onKeyDown={onKeyDown}
                        tabIndex={tabindex}
                        disabled={readonly}
                        inputMode="numeric"
                        autoComplete="tel"
                        placeholder={props.placeholder || "XXX-XXX-XXXX"}
                    />
                </div>
            </div>
        </div>
    )

}

export default CustomPhoneNumberInputField;