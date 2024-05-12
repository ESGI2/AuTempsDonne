import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ onClose }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [amount, setAmount] = useState("");

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (stripeError) {
            setError(stripeError.message);
            return;
        }

        try {
            const response = await fetch("/votre-endpoint-de-paiement", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                    amount: amount * 100,
                }),
            });

            if (!response.ok) {
                throw new Error("Une erreur est survenue lors du traitement du paiement.");
            }

            onClose();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Montant du don</label>
                <input type="number" className="form-control" id="amount" value={amount} onChange={handleAmountChange} />
            </div>
            <CardElement />
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button type="submit" className="btn btn-primary mt-3" disabled={!stripe}>Payer</button>
        </form>
    );
};

export default CheckoutForm;
