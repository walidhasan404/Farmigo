import React, { useEffect, useState } from "react";
import { CreditCardIcon } from "lucide-react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PNslyRu20g9BDQ6EP1sOdhVVaoYB9NdGR4f910yxhq44orLZmg3DYD6zzYSI2PWcVFMyYiKtCQnbflFZa0006TX00CyIdkzAG" as string
);

import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

interface OrderItem {
  _id: string;
  product_name: string;
  quantity: number;
  price: number;
  image: string;
}

const CheckoutForm = () => {
  const [email, setEmail] = useState<string>("");
  const [country, setCountry] = useState<string>("Bangladesh");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [division, setDivision] = useState<string>("Dhaka");
  const [postalCode, setPostalCode] = useState<string>("");
  const [saveInfo, setSaveInfo] = useState<boolean>(false);
  const [useShippingAddress, setUseShippingAddress] = useState<boolean>(false);
  const [shippingMethod, setShippingMethod] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  // Fetch items from cart
  const orderItems: OrderItem[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Shipping Costs
  const shippingCosts: { [key: string]: number } = {
    Standard: 100,
    Express: 300,
    "Same-Day": 500,
    "Cash-on-Delivery": 200,
  };

  const shippingCost = shippingCosts[shippingMethod];
  const total = subtotal + shippingCost || 0;

  useEffect(() => {
    // Fetch payment intent client secret
    axios
      .post("http://localhost:3000/api/order/create-payment-intent", {
        price: total,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error("Error creating payment intent", err);
      });
  }, [total]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessMessage("");

    const formData = {
      email,
      country,
      firstName,
      lastName,
      address,
      apartment,
      city,
      division,
      postalCode,
      saveInfo,
      useShippingAddress,
      shippingMethod,
      shippingCost,
      total,
      orderItems: orderItems.map((item) => ({
        id: item._id,
        quantity: item.quantity,
      })),
    };

    console.log("Form data being sent to backend:", formData);

    if (!stripe || !elements) {
      console.error("Stripe.js has not been properly loaded.");
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      console.error("Card Element not found");
      return;
    }

    // Create a payment method using Stripe
    const { error: paymentError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentError) {
      console.error("Payment Method error:", paymentError);
      return;
    }

    console.log("Payment method successfully created:", paymentMethod);

    // Confirm the payment using the clientSecret
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email,
            name: `${firstName} ${lastName}`,
          },
        },
      });

    if (confirmError) {
      console.error("Error confirming the payment:", confirmError);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      console.log("Payment succeeded:", paymentIntent);
      setSuccessMessage(`Payment succeeded. Transaction ID: ${paymentIntent.id}`);
      localStorage.removeItem("cart");

      // Create a payment record to be sent to your backend
      const payment = {
        email,
        price: paymentIntent.amount / 100,
        transactionId: paymentIntent.id,
        date: new Date(),
        status: "pending",
      };

      // Post the payment data to the backend for storing in your database
      try {
        const paymentResponse = await axios.post(
          "http://localhost:3000/payments/new-collection",
          payment
        );
        if (paymentResponse.data?.paymentResult?.insertedId) {
          console.log("Payment successfully stored in the backend.");
        } else {
          console.error("Failed to store payment in the backend.");
        }
      } catch (err) {
        console.error("Error storing payment in the backend:", err);
      }

      // Now send the formData (order details) to your backend to create the order
      try {
        const orderResponse = await axios.post(
          "http://localhost:3000/api/order/create-checkout",
          formData,
          {
            withCredentials: true,
          }
        );
        console.log("Order created successfully:", orderResponse.data);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    } else {
      console.error("Payment failed.");
    }
  };

  return (
    <div className="flex justify-center p-6">
<<<<<<< HEAD
      <div className="w-full max-w-5xl bg-white shadow rounded-lg overflow-hidden">
        <div className="flex flex-col items-center md:items-start md:flex-row">
          <div className="w-full p-8">
=======
      <div className="w-full max-w-7xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row md:flex-row">
          <div className="lg:w-[60%] md:w-[60%] w-full lg:p-8 md:p-6 p-8">
>>>>>>> 253cee571fb00fce6b11dd70cdea879fec958f93
            <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
            <form>
              {/* Contact Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <input
                  type="email"
                  placeholder="Email or mobile phone number"
                  className="w-full p-2 border rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex items-center mt-2">
                  <input type="checkbox" id="newsletter" className="mr-2" />
                  <label htmlFor="newsletter">
                    Email me with news and offers
                  </label>
                </div>
              </div>

              {/* Delivery Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Delivery</h3>
                <div className="mb-4">
                  <select
                    className="w-full p-2 border rounded"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option>Bangladesh</option>
                  </select>
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-1/2 p-2 border rounded mr-2"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-1/2 p-2 border rounded"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-2 border rounded mb-4"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  className="w-full p-2 border rounded mb-4"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                />
                <div className="flex mb-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-1/3 p-2 border rounded mr-2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <select
                    className="w-1/3 p-2 border rounded mr-2"
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                  >
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Khulna</option>
                    <option>Rajshahi</option>
                    <option>Barishal</option>
                    <option>Sylhet</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Postal code"
                    className="w-1/3 p-2 border rounded"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    checked={saveInfo}
                    onChange={() => setSaveInfo(!saveInfo)}
                    className="mr-2"
                  />
                  <label htmlFor="saveInfo">
                    Save this information for next time
                  </label>
                </div>
              </div>

              {/* Shipping Method Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Shipping method</h3>
                <div className="bg-gray-100 p-4 rounded">
                  {Object.keys(shippingCosts).map((method) => (
                    <label key={method} className="flex items-center mb-2">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={method}
                        checked={shippingMethod === method}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="mr-2"
                      />
                      {method} - {shippingCosts[method]} ৳
                    </label>
                  ))}
                </div>
              </div>
            </form>
          </div>
<<<<<<< HEAD

          {/* Order Summary Section */}
          <div className="w-full bg-gray-100 p-8">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            {orderItems.map((item) => (
              <div key={item._id} className="flex justify-between mb-4">
                <div>
                  <p className="font-semibold">{item.product_name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
=======
          <div className="w-full lg:w-[40%] md:[40%] p-2">
            <h3 className="text-lg font-semibold mb-4">Order summary</h3>
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden">
            <div className="p-4">
                {orderItems.map((item) => (
                <div key={item.id} className="flex items-center mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
                    <div className="relative mr-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                    <span className="absolute -top-2 -right-2 bg-gray-200 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{item.id}</span>
                    </div>
                    <div className="flex-grow">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium">${item.price.toFixed(2)}</div>
>>>>>>> 253cee571fb00fce6b11dd70cdea879fec958f93
                </div>
                <div className="font-semibold">
                  ৳{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            <div className="flex justify-between border-t border-gray-300 pt-4">
              <p>Subtotal</p>
              <p>৳{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>৳{shippingCost || 0}</p>
            </div>
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>৳{total.toFixed(2)}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <CardElement className="border mt-8 p-2 rounded mb-4" />
              <p className="text-green-600 text-center">{successMessage}</p>
              <button
                // onClick={handleSubmit}
                type="submit"
                className="w-full mt-2 bg-blue-500 text-white p-2 rounded"
              >
                Pay Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => (
  <div className=" ">
    <div className=" m-auto border ">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  </div>
);

export default Checkout;
