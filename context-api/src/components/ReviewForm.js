import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { cartDetailsContext } from "../context/index";

import AddressDetails from "./AddressDetails";

const Review = () => {

    const appContext = useContext(cartDetailsContext);
    const { address, paymentMode } = appContext;
    var isAddressEmpty = !Object.keys(address).length;

    if (isAddressEmpty) {
        return <Redirect to="/" />;
    }

    return (
        <div className="review">
            <h2>Review:</h2>
            <div>
                <h3>Shipping address</h3>
                <AddressDetails {...address} />
                {paymentMode['checkout_payment-group'] === 'CREDIT_CARD' ? (
                    <>
                        <h3>Payment Details</h3>
                        <div>
                            <label>Card number: </label>
                            <span>{paymentMode.cardnum.replace(/\d{4}(?= \d{4})/g, "****")}</span>
                        </div>
                        <div>
                            <label>Expiry: </label>
                            <span>{paymentMode.expiry}</span>
                        </div>
                    </>
                ) : ('')}

            </div>
        </div>
    );
};

export default Review;
