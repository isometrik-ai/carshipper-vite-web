import { CloseNewIcon } from '@/assets/icons/close-new-icon';
import { KeyWordSearchIcon } from '@/assets/icons/key-word-search-icon';
import React, { useEffect, useState, useMemo, ReactNode, useRef } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { DEFAULT_COUNTRY_CODE } from '@/lib/config';
import { useGoogleMapsScript } from '@/hooks/use-google-place-script';

const EMPTY_SUGGESTIONS: any[] = [];

interface googleSearchBarProps{
  searchInputClassName?:string
  googleSearchBarMainContainerClassName?:string
  countryCode?:string | undefined
  getSelectedAddressDetails?:(coOrdinates:any, addressData:any, address:string) => void,
  setIsSearchAddress?: (value: boolean) => void,
  placeValue?:string | undefined;
  showSearchIcon?:boolean;
  mainContainerHeight?:string;
  mainContainerWidth?:string;
  isDisabled?:boolean;
  placeholderText?:string;
  googleSearchBarMainWrapperClassName?:string;
  callClearSuggestions?:boolean;
  getSearchedInputValue?:(searchValue:string) => void;
  AddressListContainerClassName?:string;
  hideSuggestions?:boolean;
  onFocus?:() => void;
  onBlur?:() => void;
  showSearchPointNameReactNode?:boolean;
  searchPointNameReactNode?:ReactNode;
  onKeyDown?:(e: React.KeyboardEvent<HTMLElement>) => void;
  closeIconClassName?:string;
  showNavigationIconReactNode?:ReactNode;
  clearAllValues?:() => void;
  /** When true, suggestions are restricted to cities only. When false/undefined, full address suggestions are shown. */
  restrictToCitiesOnly?: boolean;
}

export default function AddressAutocomplete(props:googleSearchBarProps) {
  const {
    searchInputClassName,
    googleSearchBarMainContainerClassName,
    countryCode = DEFAULT_COUNTRY_CODE?.toLowerCase(),
    getSelectedAddressDetails = (coOrdinates:any, addressData:any, address:string) => {},
    setIsSearchAddress = (value: boolean) => {},
    placeValue = '',
    showSearchIcon = false,
    mainContainerHeight = '',
    mainContainerWidth  = '',
    isDisabled = false,
    placeholderText = '',
    googleSearchBarMainWrapperClassName = '',
    callClearSuggestions = false,
    getSearchedInputValue = () => {},
    AddressListContainerClassName = '',
    hideSuggestions = false,
    onFocus = () => {},
    onBlur = () => {},
    showSearchPointNameReactNode = false,
    searchPointNameReactNode = '',
    onKeyDown = () => {},
    closeIconClassName = '',
    showNavigationIconReactNode = null,
    clearAllValues = () => {},
    restrictToCitiesOnly = false,
    } = {...props};
  
  const { isLoaded, loadScript } = useGoogleMapsScript();
  const [enhancedSuggestions, setEnhancedSuggestions] = useState<any[]>([]);
  const zipCache = useRef<Record<string, string>>({});
  const hasInitializedPlacesRef = useRef(false);
  
  // Memoize the request options: country restriction + address vs cities only
  const requestOptions = useMemo(() => {
    const normalizedCountryCode = (countryCode ?? DEFAULT_COUNTRY_CODE)?.toLowerCase();
    return {
      componentRestrictions: { country: normalizedCountryCode },
      types: restrictToCitiesOnly ? ['(regions)'] : ['address'],
    };
  }, [countryCode, restrictToCitiesOnly]);
  
  // Initialize the hook - it will handle the case when Google Maps isn't ready yet
  // const {
  //   ready,
  //   value,
  //   suggestions: { status, data },
  //   setValue,
  //   clearSuggestions,
  // } = isLoaded ? usePlacesAutocomplete({
  //   requestOptions,
  //   debounce: 300,
  // }) : null;

    // ✅ ALWAYS call hook (no condition)
    const places = usePlacesAutocomplete({
      requestOptions,
      debounce: 300,
      initOnMount: false,
    });

    useEffect(() => {
      if (!isLoaded || hasInitializedPlacesRef.current) return;
      places.init();
      hasInitializedPlacesRef.current = true;
    }, [isLoaded]);
  
    // ✅ Safe values
    const value = places.value || "";
    const status = isLoaded ? places.suggestions.status : "";
    const data = isLoaded ? places.suggestions.data : EMPTY_SUGGESTIONS;
    const setValue = places.setValue;
    const clearSuggestions = places.clearSuggestions;

  const [defaultAddress, setDefaultAddress] = useState<boolean>(false);

  // When restrictToCitiesOnly: filter out full-address suggestions (e.g. from paste). Keep only city-level (e.g. "City, State, Country").
  const filteredSuggestions = useMemo(() => {
    if (!restrictToCitiesOnly || !data?.length) return data ?? [];
    return data.filter(({ description }) => {
      const commaCount = (description.match(/,/g) || []).length;
      const looksLikeStreetAddress = /^\d+\s/.test(description?.trim() ?? "") || commaCount >= 3;
      return !looksLikeStreetAddress;
    });
  }, [restrictToCitiesOnly, data]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultAddress(false);
    setValue(e.target.value); // Update the search query
    setIsSearchAddress(!!e.target.value);
    getSearchedInputValue?.(e?.target?.value);
  };

  // When restrictToCitiesOnly and user pastes a full address, use only the city part for the autocomplete query so API returns city suggestions.
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (!restrictToCitiesOnly) return;
    const pasted = e.clipboardData?.getData?.("text")?.trim?.() ?? "";
    if (!pasted || pasted.length < 4) return;
    const parts = pasted.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 2) {
      const cityPart = parts.length >= 3 ? parts[parts.length - 3] : parts[0];
      if (cityPart && /^[A-Za-z\s\-']+$/.test(cityPart)) {
        e.preventDefault();
        setValue(cityPart, false);
        setDefaultAddress(false);
        setIsSearchAddress(true);
        getSearchedInputValue?.(cityPart);
      }
    }
  };

  const handleSelect = async (address: string) => {
    setValue(address, false); // Update input with selected address
    clearSuggestions();
    setDefaultAddress(true);
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      getSelectedAddressDetails({ lat, lng }, results[0], address);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const getZipFromPlaceId = async (placeId: string) => {
    if (zipCache.current[placeId]) {
      return zipCache.current[placeId];
    }
  
    try {
      const results = await getGeocode({ placeId });
      const components = results[0]?.address_components || [];
  
      const zip =
        components.find((c: any) => c.types.includes("postal_code"))
          ?.long_name || "";
  
      zipCache.current[placeId] = zip;
      return zip;
    } catch (e) {
      return "";
    }
  };
  useEffect(() => {
    const enrichSuggestions = async () => {
      const sourceData = restrictToCitiesOnly ? filteredSuggestions : data;

      if (status !== "OK" || !sourceData?.length) {
        setEnhancedSuggestions((prev) => (prev.length ? [] : prev));
        return;
      }

      // Limit to top 20 for performance
      const limited = sourceData.slice(0, 20);

      const enriched = await Promise.all(
        limited.map(async (item: any) => {
          const zip = await getZipFromPlaceId(item.place_id);
          return { ...item, zip };
        })
      );

      setEnhancedSuggestions(enriched);
    };

    enrichSuggestions();
  }, [data, restrictToCitiesOnly, status]);

  useEffect(()=>{
    if(placeValue?.length > 0){
      setValue(placeValue, true);
      // Only hide suggestions for external sync (e.g. initial load), not when placeValue mirrors user typing
      if (placeValue !== value) setDefaultAddress(true);
      setIsSearchAddress(true);
    } else {
      setValue('', true);
      setDefaultAddress(false);
      setIsSearchAddress(false);
      clearSuggestions();
    }
  },[placeValue]);

  // useEffect(()=>{
  //   if(callClearSuggestions) clearSuggestions();
  // },[callClearSuggestions])
  
  // Clear everything when country code changes
  // useEffect(() => {
  //   setValue('', false);
  //   clearSuggestions();
  //   setDefaultAddress(false);
  //   setIsSearchAddress(false);
  // }, [countryCode]);

  return (
    <>
      <div className={googleSearchBarMainContainerClassName}>
        <div className={`flex items-center border-[1px]
          border-custom-text-input-border rounded-[8px] ${googleSearchBarMainWrapperClassName}`}>
          {showSearchIcon && <div className='flex items-center justify-center w-[25px] h-[25px] ml-[15px] mt-1'>
            <KeyWordSearchIcon width={20.45} height={20} />
          </div>}
          {showSearchPointNameReactNode && <div className='searchPointNameReactNodeWrapper'>
            {searchPointNameReactNode}
          </div>}
          <div className='flex w-full items-center'>
            <input
              value={value}
              onChange={handleInput}
              onPaste={handlePaste}
              onFocus={()=>{
                onFocus();
                loadScript();
              }}
              onBlur={()=>{
                onBlur();
                // loadScript();
              }}
              onKeyDown={onKeyDown}
              placeholder={placeholderText}
              className={`p-[8px] ${searchInputClassName} outline-none`}
              style={{padding: "8px 4px", width: mainContainerWidth, height: mainContainerHeight}}
              readOnly={isDisabled}
            />
            {showNavigationIconReactNode && <span className='mr-[10px]'>
              {showNavigationIconReactNode}
            </span>}
            {value?.length > 0 && <span
            className={`mt-[10px] pr-[10px] mr-[20px] cursor-pointer ${closeIconClassName}`}
            onClick={()=>{
              setValue('', true);
              setDefaultAddress(false);
              setIsSearchAddress(false);
              clearAllValues();
            }}>
              <CloseNewIcon width={20} height={20} />

            </span>}
            </div>
          </div>
        {/* Suggestions dropdown */}
        {(status === "OK" && !defaultAddress && isLoaded) && (
          <ul style={{ listStyle: "none", padding: 0 }} className={AddressListContainerClassName}>
            {/* {(restrictToCitiesOnly ? filteredSuggestions : data).map(({ place_id, description }) => (
              <li
                key={place_id}
                onClick={() => handleSelect(description)}
                style={{ cursor: "pointer", padding: "8px", background: "var(--white-color)", margin: "4px 0"}}
              >
                {description}
              </li>
            ))} */}
            {restrictToCitiesOnly ? enhancedSuggestions.map((item: any) => {
              const { place_id, description, zip, structured_formatting } = item;

              const mainText = structured_formatting?.main_text;
              const secondaryText = structured_formatting?.secondary_text;

              return (
                <li
                  key={place_id}
                  onClick={() => handleSelect(description)}
                  style={{
                    cursor: "pointer",
                    padding: "8px",
                    background: "var(--white-color)",
                    margin: "4px 0"
                  }}
                >
                  <strong>{mainText}</strong>
                  {secondaryText && `, ${secondaryText}`}
                  {zip && ` ${zip}`}
                </li>
              );
              }) : data?.map(({ place_id, description }) => (
              <li
                key={place_id}
                onClick={() => handleSelect(description)}
                style={{ cursor: "pointer", padding: "8px", background: "var(--white-color)", margin: "4px 0"}}
              >
                {description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
