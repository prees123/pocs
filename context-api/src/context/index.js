import React, { useState, useEffect } from "react";
import axios from "axios";

const cartDetailsContext = React.createContext();

// TODO - This should come from configuration
let apiUrl = "https://api.dev02.nebula.run/gd-checkout-gateway/checkout/carts/";

const CartDetailsProvider = ({ cartId, children }) => {

    const initialState = { data: '' }

    const [cartDetails, setCartDetails] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState({});
    const [payment, setPayment] = useState({});
    const [paymentMode, setPaymentMode] = useState({});

    const fetchCartDetails = async () => {
        try {
            const result = await axios(apiUrl + cartId);
            setCartDetails(result.data);
            setLoading(false);
        } catch (e) {
            if (e) {
                console.log(e.message, "Problems occured");
            }
        }
    };

    const handleAddress = (data) => {

        setAddress(data);
    };

    const handlePayment = (data) => {
        setPayment(data);
    };

    const handleSetPaymentMode = (data) => {
        setPaymentMode(data);
    }

    useEffect(() => {
        fetchCartDetails();
    }, []);

    return (
        <cartDetailsContext.Provider
            value={{
                loading,
                cartDetails,
                handleAddress,
                address,
                handlePayment,
                payment,
                handleSetPaymentMode,
                paymentMode
            }}
        >
            {children}
        </cartDetailsContext.Provider>
    );
}

const CartDetailsConsumer = cartDetailsContext.Consumer;
export { CartDetailsProvider, CartDetailsConsumer, cartDetailsContext };
