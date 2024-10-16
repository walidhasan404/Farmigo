import React, { useContext, useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const stripePromise = loadStripe(
  "pk_test_51PNslyRu20g9BDQ6EP1sOdhVVaoYB9NdGR4f910yxhq44orLZmg3DYD6zzYSI2PWcVFMyYiKtCQnbflFZa0006TX00CyIdkzAG"
);

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();


  useEffect(() => {
    setError("");
    setClientSecret("");
    axios
      .post("/payments/create-payment-intent", { price: 5 })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        setError("Failed to create payment intent.");
        console.error(err);
      });
  }, [axios]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error: paymentError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentError) {
      setError(paymentError.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError("Payment confirmation error");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user.email,
          price: paymentIntent.amount / 100,
          transactionId: paymentIntent.id,
          date: new Date(),
          status: "pending",
        };

        axiosSecure
          .post("/payments/new-collection", payment)
          .then((res) => {
            if (res.data?.paymentResult?.insertedId) {
              toast.success("Payment successful");
              navigate("/");
            }
          })
          .catch((err) => {
            setError("Failed to save payment information.");
            console.error(err);
          });
      }
    }
  };

  if (user?.isPremium)
    return (
      <div className="text-center">
        <h1 className="text-2xl">You are already a premium user</h1>

        <p className="text-sm mt-2">You will be able to pay after expiration of subscription</p>
        <p className="text-lg mt-3">Thank you for your support!</p>
        
      </div>
    );



    if(user?.isPremiumPending) {
      return (
        <div className="text-center">
          <h1 className="text-2xl">Your premium request is pending</h1>
        <p className="text-sm mt-2">Wait for Admin's Confirmation</p>
          <p className="text-lg mt-3">Thank you for your support!</p>
        
        </div>
      );
    }

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      <CardElement
        options={{
          theme: "stripe",
          style: {
            base: {
              fontSize: "16px",
              border: "1px solid orange",
              color: "gray",
              "::placeholder": {
                color: "orange",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </Button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your transaction id: {transactionId}</p>
      )}
    </form>
  );
};

const Checkout = () => (
  <div className="min-h-[70vh] ">
    <div className="max-w-lg m-auto border mt-20 p-12">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  </div>
);

export default Checkout;
