import React, { useEffect,useRef, useState } from "react";
import 'react-intl-tel-input/dist/main.css';
import IntlTelInput from "react-intl-tel-input";
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

    const handlePhoneNumberChange = (...args) => {
        const isValidNumberFromIntl  = args[0];
        let value = args[1];
        let phoneStartWithZero = 0
        const countryData = args[2];
        let maxDigitForPhoneNumber = {
            min: PHONE_NUMBER_MAX_DIGITS,
            max: PHONE_NUMBER_MAX_DIGITS
        };
        if (value?.startsWith(0)) phoneStartWithZero = 1

        // Get old formatted value and cursor position BEFORE any processing
        const inputElement = document.getElementById(intlInputFieldId);
        const oldFormattedValue = phoneNumber || (inputElement ? inputElement.value : '');
        const oldCursorPos = inputElement ? inputElement.selectionStart : 0;

        value = value.replace(NON_DIGIT_REGEX, '');
        if(value?.length > 0 && args[2].iso2?.length > 0){
            maxDigitForPhoneNumber = getPhoneNumberLengthRange(args[2]?.iso2?.toUpperCase());
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
        const isValidLibPhone = isValidNumber(value, countryData?.iso2?.toUpperCase());
        const phoneObjectData = {
            mobile: formattedNumber,
            countryCode: `+${countryData?.dialCode || ''}`,
            sortCountryCode: countryData?.iso2?.toUpperCase(),
            isValid: isValidLibPhone || isValidNumberFromIntl 
        };
        onPhoneNumberChanges && onPhoneNumberChanges(phoneObjectData, args);
    };
    const handlePhoneNumberFlagChange = (...args) => {
        const isValidNumber = args[3];
        const countryData = args[1];
        const phoneObjectData = {
            countryCode: `+${countryData?.dialCode || ''}`,
            sortCountryCode: countryData?.iso2?.toUpperCase(),
            isValid:isValidNumber
        };
        onPhoneNumberFlagChanges && onPhoneNumberFlagChanges(phoneObjectData, args);
    };

    return (
        <div className={customPhoneNumberFieldStructure} ref={inputRef}>
            <div className={customPhoneNumberFieldWrapper}>
                <IntlTelInput
                    containerClassName={customIntlTelInputContainer}
                    inputClassName={customIntlTelInputWrapper}
                    fieldName={intlInputFieldName}
                    fieldId={intlInputFieldId}
                    value={phoneNumber}
                    defaultValue={phoneNumberDefaultValue}
                    separateDialCode={useSeparateDialCode || false}
                    nationalMode={useNationalMode || false}
                    onPhoneNumberChange={handlePhoneNumberChange}
                    type="number"
                    onSelectFlag={handlePhoneNumberFlagChange}
                    onlyCountries={onlyCountries}
                    preferredCountries={preferredCountries}
                    defaultCountry={country}
                    tabIndex={tabindex} 
                    onKeyDown={onKeyDown}
                    disabled={readonly}
                    placeholder="XXX-XXX-XXXX"
                />
            </div>
            <style jsx>{`
                :global(.selected-flag) {
                    display: flex !important;
                    position: relative;
                    pointer-events: none;
                    background-color: transparent !important;
                    width: 60px !important;
                    outline: none;
                    font-family: var(--primary-font) !important;
                }
                :global(.selected-flag .iti-flag) {
                    opacity: 0 !important;
                    width: 56px !important;
                    position: absolute;
                    left: 10px;
                }
                :global(.flag-container .country-list .country-name) { 
                  font-family: var(--primary-font) !important;
                  font-weight: 600 !important;
                }
                :global(.selected-flag .selected-dial-code) {
                    padding-left: 0px !important;
                    color: var(--button-secondary-text) !important;
                }
                :global(.arrow) {
                    display: none;
                }
            `}</style>
        </div>
    )

}

export default CustomPhoneNumberInputField;