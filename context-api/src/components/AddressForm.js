import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { cartDetailsContext } from "../context/index";

const AddressForm = props => {
    let ShippingDetails = null;
    const appContext = useContext(cartDetailsContext);

    const { handleAddress, cartDetails, loading, handlePayment } = appContext;
    const mappedCartDetails = new Map(Object.entries(cartDetails.data));
    const showShippingDetails = mappedCartDetails.has(
        "applicableDeliveryModes"
    );

    const { register, errors, handleSubmit } = useForm({
        mode: "onBlur"
    });
    const onSubmit = (data) => {
        handleAddress(data);
        props.history.push("./payment");
    };

    const onChangeHandler = (paymentMode) => {
        handlePayment(paymentMode);
    };

    if (showShippingDetails) {
        ShippingDetails = mappedCartDetails
            .get("applicableDeliveryModes")
            .map(({ code, name, description, paymentMode }) => (
                <div key={code}>
                    <label htmlFor={code}>
                        <input
                            id={code}
                            name="shipping"
                            type="radio"
                            value={code}
                            ref={register({ required: true })}
                            onChange={(e) => onChangeHandler(paymentMode)}
                        />
                        <span>
                            {name} {description}
                        </span>
                    </label>
                </div>
            ));
    }

    return (
        <div>
            {loading ? (
                <h1>...fetching data</h1>
            ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2>Delivery Address</h2>
                        <div>
                            <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
                                Email
              </label>
                            <input
                                type="text"
                                name="email"
                                ref={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "invalid email address"
                                    }
                                })}
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="bill"
                                ref={register({ required: true, minLength: 4 })}
                            />
                            {errors.firstName && <p>This is required</p>}
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="luo"
                                ref={register({ required: true })}
                            />
                            {errors.lastName && <p>This is required</p>}
                        </div>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                ref={register({ required: true })}
                            />
                            {errors.address && <p>This is required</p>}
                        </div>
                        <div>
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                ref={register({ required: true })}
                            />
                            {errors.address && <p>This is required</p>}
                        </div>
                        <div>
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                ref={register({ required: true })}
                            />
                            {errors.address && <p>This is required</p>}
                        </div>
                        <div>
                            <label htmlFor="zip">Zip code</label>
                            <input
                                type="text"
                                name="zip"
                                placeholder="Zip code"
                                ref={register({ required: true })}
                            />
                            {errors.address && <p>This is required</p>}
                        </div>

                        {showShippingDetails ? (
                            <div>
                                {ShippingDetails}
                                {errors.shipping && <p>This is required</p>}
                            </div>
                        ) : (
                                <div>No shipping</div>
                            )}

                        <button type="submit">Payment</button>
                    </form>
                )}
        </div>
    );
}

export default withRouter(AddressForm);