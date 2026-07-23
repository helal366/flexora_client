import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const stripePromise=loadStripe(import.meta.env.VITE_STRIPE_PK)
const StripeProviderRoute = ({children}) => {
    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    );
};

export default StripeProviderRoute;