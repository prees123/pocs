import React from "react";

const AddressDetails = ({ firstName, lastName, address, city, state, zip }) => {

    return (
        <>
            <address>
                <span>{firstName}</span>
                <span>{lastName}</span>
                <br />
                <span>{address}</span>
                <br />
                <span>{city}</span>
                <br />
                <span>{state}</span>
                <br />
                <span>{zip}</span>
            </address>
        </>
    );
};

export default AddressDetails;
