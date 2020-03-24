import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { withRouter, Redirect } from "react-router-dom";
import { has, groupBy } from 'lodash';
import { cartDetailsContext } from "../context/index";
import { PaymentInputsContainer } from "react-payment-inputs";

import AddressDetails from "./AddressDetails";


const PaymentForm = props => {
    let creditCardOptions;
    let paymentOptions;
    const cardInitialState = { cardnum: "", expiry: "", cvv: "" };
    const assetUrl = '//assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/payment-methods/';
    const appContext = useContext(cartDetailsContext);
    const { register, handleSubmit } = useForm({
        mode: "onBlur"
    });
    const { address, payment, handleSetPaymentMode, paymentMode } = appContext;
    var isAddressEmpty = !Object.keys(address).length;
    const [creditCardFields, setCreditCardFields] = useState(cardInitialState);

    const paymentImageMap = {
        US_visa: "visa",
        US_amex: "amex",
        US_discover: "discover",
        US_master: "master",
        US_paypal: "paypal",
        US_klarna: "BosePay",
        US_paypalCredit: "paypal-credit-bose"
    };

    if (isAddressEmpty) {
        return <Redirect to='/' />
    }


    const onSubmit = (data) => {
        handleSetPaymentMode({
            ...creditCardFields,
            ...data
        });
        props.history.push("./review");
    };

    const paymentModes = groupBy(
        payment.paymentGroups,
        (group) => {
            return group.supportedPaymentModes[0].includeInGroup ? 'creditcards' : 'others';
        }
    );

    const onChangeHandler = (mode) => {
        handleSetPaymentMode({ 'checkout_payment-group': mode });
        setCreditCardFields(cardInitialState);
    };

    const handleCreditCardValues = (e) => {
        const { value, name } = e.target;
        let fields = { ...creditCardFields };
        fields[name] = value;
        setCreditCardFields(fields);
    };

    if (has(paymentModes, 'creditcards')) {
        creditCardOptions = (
            <div className="paymentgroup">
                <label>
                    <input
                        name="checkout_payment-group"
                        type="radio"
                        value="CREDIT_CARD"
                        ref={register({ required: true })}
                        onChange={(e) => onChangeHandler("CREDIT_CARD")}
                    />
                    <span htmlFor="CREDIT_CARD">
                        {paymentModes.creditcards.map(({ code, name }) => (
                            <img
                                key={code}
                                name={code}
                                alt={name}
                                src={`${assetUrl}${paymentImageMap[code]}.png`}
                            ></img>
                        ))}
                        <span>Credit Cards</span>
                    </span>
                </label>
            </div>
        );
    }

    if (has(paymentModes, "others")) {
        paymentOptions = (
            <div>
                {paymentModes.others.map(({ code, name }) => (
                    <div key={code} className="paymentgroup">
                        <label>
                            <input
                                id={code}
                                name="checkout_payment-group"
                                type="radio"
                                value={code}
                                ref={register({ required: true })}
                                onChange={(e) => onChangeHandler(code)}
                            />
                            <span htmlFor={code}>
                                <img
                                    name={code}
                                    alt={name}
                                    src={`${assetUrl}${paymentImageMap[code]}.png`}
                                ></img>
                                <span>{name}</span>
                            </span>
                        </label>
                    </div>
                ))}
            </div>
        );
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                {creditCardOptions}
                {paymentOptions}
            </div>
            {paymentMode["checkout_payment-group"] === "CREDIT_CARD" ? (
                <PaymentInputsContainer>
                    {({
                        meta,
                        getCardNumberProps,
                        getExpiryDateProps,
                        getCVCProps
                    }) => (
                            <div>
                                <input
                                    {...getCardNumberProps({
                                        onChange: handleCreditCardValues
                                    })}
                                    name="cardnum"
                                    type="text"
                                />
                                <input
                                    {...getExpiryDateProps({
                                        onChange: handleCreditCardValues
                                    })}
                                    name="expiry"
                                    type="text"
                                />
                                <input
                                    {...getCVCProps({
                                        onChange: handleCreditCardValues
                                    })}
                                    name="cvv"
                                    type="text"
                                />
                                {meta.isTouched && meta.error && (
                                    <p>Error: {meta.error}</p>
                                )}
                            </div>
                        )}
                </PaymentInputsContainer>
            ) : (
                    ""
                )}

            <h3>Billing address:</h3>
            <AddressDetails {...address} />
            <button type="submit">Review</button>
        </form>
    );
}

export default withRouter(PaymentForm);