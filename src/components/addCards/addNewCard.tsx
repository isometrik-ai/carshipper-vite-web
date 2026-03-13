import { CARD, CUSTOM_LIGHT_GRAY, CUSTOM_LIGHT_GRAY_COLOR } from "@/lib/config";
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement, StripeCardNumberElementOptions } from "@stripe/stripe-js";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const CARD_ELEMENT_OPTIONS:StripeCardNumberElementOptions = {
    style: {
      base: {
        color:CUSTOM_LIGHT_GRAY, 
        fontFamily: 'var(--primary-font)', // change to custom fontFamily
        fontSize: '16px', // Change this to your desired font size
        '::placeholder': {
          color: CUSTOM_LIGHT_GRAY_COLOR, // Change this to your desired placeholder color,  if add var color code it is now working
        },
      },
      invalid: {
        color: 'var(--error-msg)', // Change this to your desired invalid input color,
        fontFamily: 'var(--primary-font)'
      },
    },
};
const CountrySelectStyles = {
  controlStyle : {
    background: 'transparent linear-gradient(180deg, var(--select-gradient-primary) 0%, var(--select-gradient-secondary) 100%) 0% 0% no-repeat padding-box',
    borderRadius: '5px',
    width: '100%',
    height: '50px',
    borderColor: 'var(--post-loads-border-color)',
    fontFamily: 'var(--primary-font)',
    fontSize: '16px',
    fontWeight: 500,
  },
  singleValueStyle: {
    fontFamily: 'var(--primary-font)',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '19.2px',
    color: 'var(--text-active-loads-primary)'
  },
  singleValueLabelStyle:{
    fontFamily: 'var(--secondary-font)',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '19.2px',
    backgroundColor: 'var(--custom-secondary-light-gray)',
    padding: '5px',
    color: 'var(--text-active-loads-primary)'
  },
  optionStyle:{
      color: 'var(--black-color)',
      backgroundColor: 'var(--white_color)',
      cursor: 'default',
      fontFamily: 'var(--primary-font)',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '19.2px',
  },
  indicatorSeparatorStyle:{
      display:'none'
  },
  selectPlaceholderStyle: {
      fontFamily: 'var(--primary-font)',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '19.2px',
      color: 'var(--neutral-badge-bg-color)'
  }
}
interface AddNewCardsSectionProps{
    isModalOpen?:boolean
    handleClose?: () => void,
    ModalContainerClassName?:string
    ModalCloseContainerClassName?:string
    handleSubmit?:Function
    containerClassName?:string
    showCloseIcon?:boolean
    isCenter?:boolean;
}

interface CardErrorProps{
  cardNumber?:string;
  cardExpiryDate?:string;
  cardCVVNumber?:string;
}

const AddNewCardsSection = (props:AddNewCardsSectionProps) => {
    const {
        isModalOpen= false,
        handleClose = () => {},
        ModalContainerClassName='',
        ModalCloseContainerClassName='',
        handleSubmit,
        containerClassName='',
        showCloseIcon =false,
        isCenter = false
    } = props;
    const stripe = useStripe();
    const elements:any = useElements();
    const [loader, handleLoader] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>("");
    const [cardErr, setCardErr] = useState<boolean>(false);
    const [cardNumber, setCardNumber] = useState<boolean>(false);
    const [date, setDate] = useState<boolean>(false);
    const [nameOnCard, setNameOnCard] = useState<string>("");
    const [cvv, setCvv] = useState<boolean>(false);
    const [cardError,setCardError] = useState<CardErrorProps>({
      cardNumber:"",
      cardExpiryDate:"",
      cardCVVNumber:""
    });
    const [country, setCountry] = useState<any>({ value: 'us', label: 'United States', subLabel : ''});
    const handleOnCloseFun =() => {
        handleClose && handleClose();
        setCardNumber(false);
        setDate(false);
        setCvv(false);
        setCardError({
          cardNumber:"",
          cardExpiryDate:"",
          cardCVVNumber:""
        })
    }
  
    const handleCardSubmit = async (event:any) => {
      handleLoader(true);
  
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event?.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      const cardElement = elements.getElement(CardNumberElement) as StripeCardElement;
      const { error, paymentMethod }:any = await stripe.createPaymentMethod({
        type: CARD as any,
        card: cardElement,
      });
  
  
      if (error) {
        handleLoader(false);
        setCardErr(true);
        setErrMsg(error?.message);
      } else {
        let { id } = paymentMethod;
        handleSubmit && handleSubmit(id, nameOnCard);
        handleLoader(false);
      }
    };
  
    const handleChange = (e:any) => {
      if (e?.complete) {
        setCardNumber(true);
        setCardError({})
      } else {
        if(e?.empty) {
          setCardError({})
        }
        if(e?.error?.code){
          setCardError({
            ...cardError,
            cardNumber:e?.error?.message
          })
        }
        setCardNumber(false);
      }
    };
    const handleChangeCvv = (e:any) => {
      if (e?.complete) {
        setCvv(true);
        setCardError({})
      } else {
        if(e?.empty) {
          setCardError({})
        }
        if(e?.error?.code){
          setCardError({
            ...cardError,
            cardCVVNumber:e?.error?.message
          })
        }
        setCvv(false);
      }
    };
  
    const handleChangeDate = (e:any) => {
      if (e?.complete) {
        setDate(true);
        setCardError({})
      } else {
        if(e?.empty) {
          setCardError({})
        }
        if(e?.error?.code){
          setCardError({
            ...cardError,
            cardExpiryDate:e?.error?.message
          })
        }
        setDate(false);
      }
    };
  
    const checkValidation = () => {
      let isFormValid = false;
      isFormValid = cardNumber && cvv && date && nameOnCard.trim() !== "";
      return isFormValid;
    };
    return(
        <>
            <div className="carWrapperC"
            >
                <div>
                  {/* {loader && (
                    <Loader />
                  )} */}
                    <div className="addNewCardContainer h-full flex flex-col justify-between bg-custom-background-primary sm:bg-custom-login-background-primary p-5"> 
                        <div className="addNewCardWrapper">
                            <div className="add_card_model_mobile">
                                <div className="col-12 py-3 flex items-center gap-[12px]">
                                  {/* <div className="block sm:hidden">
                                    <button
                                      className="h-[30px] w-[42px] bg-custom-post-load-btn backSavedCard flex items-center justify-center"
                                      onClick={handleOnCloseFun}
                                    >
                                      <ArrowLeft color="var(--white_color)" />
                                    </button>
                                  </div> */}
                                  {/* <div className="col-10 px-0">
                                    <p
                                      className="addNewCardTitle m-0 secondaryBoldWeight uppercase text-custom-text-primary">
                                      Add New Cards
                                    </p>
                                  </div> */}
                                </div>
                                <div className="m-0">
                                  <div className="cardNumberWrapper">
                                  <Label htmlFor="cardNumber" className="text-sm font-medium text-foreground">Card Number</Label>
                                    <CardNumberElement options={{ style: CARD_ELEMENT_OPTIONS?.style,
                                        placeholder: "1234 5678 9012 3456" }} className="stripe_model_input " onChange={(e) => handleChange(e)} />
                                    
                                    {cardError?.cardNumber && ( <p className="error_class m-0">{cardError?.cardNumber}</p>)}
                                  </div>
                                </div>
                                <div className="grid grid-cols-[48%_48%] grid-rows-1 gap-4 m-0 pt-3 pb-0">
                                  <div className="cardMonthWrapper">
                                  <Label htmlFor="expiry" className="text-sm font-medium text-foreground">Expiry Date</Label>
                                      <CardExpiryElement options={{ style: CARD_ELEMENT_OPTIONS?.style, placeholder: "MM / YY" }} className="model_exp" onChange={(e) => handleChangeDate(e)} />
                                      {(!date && cardError?.cardExpiryDate) && ( <p className="error_class m-0">{cardError?.cardExpiryDate}</p>)}
                                  </div>
                                  <div className="cardCvvWrapper">
                                  <Label htmlFor="cvc" className="text-sm font-medium text-foreground">CVC</Label>
                                      <CardCvcElement options={{ style: CARD_ELEMENT_OPTIONS?.style, placeholder: "123" }} className="model_exp" onChange={(e) => handleChangeCvv(e)} />
                                      {(!cvv && cardError?.cardCVVNumber) && ( <p className="error_class m-0 ">{cardError?.cardCVVNumber}</p>)}
                                  </div>
                                </div>
                                <div className="m-0">
                                  <div className="cardNumberWrapper">
                                    <Label htmlFor="cardName" className="text-sm font-medium text-foreground">Name on Card</Label>
                                    <input
                                        id="cardName"
                                        type="text"
                                        onChange={(e) => setNameOnCard(e.target.value)}
                                        placeholder="Name on Card"
                                        className="mt-1.5 w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                  </div>
                                </div>
                                <div className="selectCountryWrapper">
                                  <div className='selectCountryStructure my-4'>
                                    <div className="selectCountryContainer">
                                      {/* <CustomReactSelectDropDown
                                        mainContainerClassName="countryWrapper"
                                        customSelectControl={CountrySelectStyles.controlStyle}
                                        customSelectOptions={CountrySelectStyles.optionStyle}
                                        customSelectPlaceholder={CountrySelectStyles.selectPlaceholderStyle}
                                        optionsList={countryOptions}
                                        defaultValue={country}
                                        disabled={true}
                                        value={country}
                                        placeHolderText={locale.selectCountry}
                                        isMultiSelection={false}
                                        isSearchable={true}
                                        customSelectIndicatorSeparator={CountrySelectStyles.indicatorSeparatorStyle}
                                        customSelectSingleValue={CountrySelectStyles.singleValueStyle}
                                        customSelectSingleValueLabel={CountrySelectStyles.singleValueLabelStyle}
                                        indicatorIcon={selectDropDownIcon}
                                        indicatorWidth={13}
                                        indicatorHeight={7}
                                        indicatorAltText={locale.countryAltText}
                                        onchangeCallBack={(value:any)=>{
                                          setCountry({...value})
                                        }}
                                      /> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="saveBtnWrapper pt-5 w-full sm:w-fit">
                              {/* <button className={`saveCta ${loader || !checkValidation() ? 'update_button_model_disbale' : 'update_button_model'} ${loader ? 'cursor-not-allowed' : ''}`} onClick={handleCardSubmit} disabled={loader}>
                                Save
                              </button> */}
                                <Button
                                    type="button" 
                                    variant="default" 
                                    onClick={handleCardSubmit}
                                    disabled={loader || !checkValidation()}
                                    >
                                    Save Card
                                </Button>
                            </div>
                        </div>
                        <style>
                            {
                                `
                                .label_model_class{
                                    letter-spacing: -0.29px;
                                    color: var(--neutral-badge-bg-color);
                                    font-size: 14px;
                                    font-family: var(--primary-font);
                                }
                                .addNewCardTitle{
                                    font-size: 34px;
                                }
                                .update_button_model_disbale {
                                  color: var(--button-disabled-text-primary);
                                  font-size: 23px;
                                  background: var(--button-disabled-bg-primary);
                                  font-weight: 500 !important;
                                  border-radius: 5px;
                                  border: 1px solid var(--button-disabled-bg-primary);
                                  width: 168px;
                                }
                                .error_class {
                                  color: var(--error-msg);
                                  font-size: 14px;
                                  font-family: var(--primary-font);
                                }
                                .update_button_model {
                                  color: var(--button-primary-text);
                                  font-size: 23px;
                                  background: var(--button-primary-bg);
                                  font-weight: 500 !important;
                                  border-radius: 5px;
                                  border: 1px solid var(--button-primary-bg);
                                  width: 168px;
                                }
                                .model_exp {
                                    border: 1px solid var(--stripe-input-border-primary);
                                    border-radius:5px;
                                    font-size:18px !important;
                                    padding: 10px;
                                    color: var(--notification-text-primary) !important;
                                    padding:14px;
                                    background: var(--selection-background) !important;
                                }
                                .ElementsApp input::placeholder {
                                    color: var(--white_color) !important;
                                }
                                .stripe_model_input::placeholder {
                                    font-weight: 100 !important;
                                    font-size:18px !important;
                                    color: var(--neutral-badge-bg-color) !important;
                                }
                                .stripe_model_input:focus {
                                    outline-width: 1;
                                    outline: none;
                                    color: var(--text-active-loads-primary) !important;
                                }
                                .stripe_model_input {
                                    border: 1px solid var(--stripe-input-border-primary);
                                    border-radius:5px;
                                    font-size:18px !important;
                                    padding: 10px;
                                    color: var(--notification-text-primary) !important;
                                    padding:14px;
                                    background: var(--selection-background) !important;
                                } 
                                
                                .backSavedCard {
                                  transform: skew(-25deg);
                                  svg {
                                    transform: skew(25deg);
                                  }
                                }

                                .saveCta {
                                  padding: 8px 12px;
                                }
                                    
                                @media screen and (max-width: 640px) {
                                  .saveCta {
                                    width: 100%;
                                  }

                                  .addNewCardTitle{
                                    font-size: 22px;
                                  }
                                }
                                `
                            }
                        </style>
                </div>
            </div>
        </>
    )
}
export default AddNewCardsSection;
