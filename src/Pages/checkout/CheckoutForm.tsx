import React, { useState } from 'react'
import { CreditCardIcon } from 'lucide-react'

export default function CheckoutForm() {
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('Bangladesh')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [city, setCity] = useState('')
  const [division, setDivision] = useState('Dhaka')
  const [postalCode, setPostalCode] = useState('')
  const [saveInfo, setSaveInfo] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [securityCode, setSecurityCode] = useState('')
  const [nameOnCard, setNameOnCard] = useState('')
  const [useShippingAddress, setUseShippingAddress] = useState(false)
  const [shippingMethod, setShippingMethod] = useState('Standard')

  interface OrderItem {
    _id: string
    product_name: string
    quantity: number
    price: number
    image: string,
  }


  const orderItems: OrderItem[] = JSON.parse(localStorage.getItem('cart') || '[]');





  // const orderItems: OrderItem[] = [
  //   { id: 1, name: 'Fresho Cauliflower 1pc (approx 400 to 600g)', quantity: '12 Kg', price: 690.00, image: '/placeholder.svg?height=40&width=40' },
  //   { id: 2, name: 'Pomegranate - Small', quantity: '6 Kg', price: 560.00, image: '/placeholder.svg?height=40&width=40' },
  // ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0)

  // Shipping Costs
  const shippingCosts: { [key: string]: number } = {
    'Standard': 100,
    'Express': 300,
    'Same-Day': 500,
    'Cash-on-Delivery': 200
  }

  // Total Cost Calculation
  const shippingCost = shippingCosts[shippingMethod]
  const total = subtotal + shippingCost



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // console.log('Form submitted')


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
      cardNumber, 
      expirationDate, 
      securityCode, 
      nameOnCard, 
      useShippingAddress, 
      shippingMethod,
      shippingCost,
      total,
      orderItems: orderItems.map(item => ({ id: item._id, quantity: item.quantity })) 
    }


    console.log(formData);
    


  }



  return (
    <div className="flex justify-center bg-gray-100 p-6">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex">
          <div className="w-2/3 p-8">
            <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
            <form onSubmit={handleSubmit}>
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
                  <label htmlFor="newsletter">Email me with news and offers</label>
                </div>
              </div>

              {/* Delivery Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Delivery</h3>
                <div className="mb-4">
                  <select
                    className="w-full p-2 border rounded appearance-none bg-white"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option>Bangladesh</option>
                  </select>
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    placeholder="First name (optional)"
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
                    className="w-1/3 p-2 border rounded mr-2 appearance-none bg-white"
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
                  <label htmlFor="saveInfo">Save this information for next time</label>
                </div>
              </div>

              {/* Shipping Method Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Shipping method</h3>
                <div className="bg-gray-100 p-4 rounded">
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="Standard"
                      checked={shippingMethod === 'Standard'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mr-2"
                    />
                    Standard - 2-5 business days (৳100)
                  </label>
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="Express"
                      checked={shippingMethod === 'Express'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mr-2"
                    />
                    Express - 1-2 business days (৳300)
                  </label>
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="Same-Day"
                      checked={shippingMethod === 'Same-Day'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mr-2"
                    />
                    Same-Day (Dhaka) (৳500)
                  </label>
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="Cash-on-Delivery"
                      checked={shippingMethod === 'Cash-on-Delivery'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mr-2"
                    />
                    Cash on Delivery - 3-5 business days (৳200)
                  </label>
                </div>
              </div>

              {/* Payment Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Payment</h3>
                <p className="text-sm text-gray-600 mb-4">All transactions are secure and encrypted.</p>
                <div className="border rounded p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Credit Card</span>
                    <CreditCardIcon className="h-6 w-6 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Card number"
                    className="w-full p-2 border rounded mb-4"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <div className="flex mb-4">
                    <input
                      type="text"
                      placeholder="Expiration date (MM/YY)"
                      className="w-1/2 p-2 border rounded mr-2"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Security code"
                      className="w-1/2 p-2 border rounded"
                      value={securityCode}
                      onChange={(e) => setSecurityCode(e.target.value)}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Name on card"
                    className="w-full p-2 border rounded"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="useShippingAddress"
                    checked={useShippingAddress}
                    onChange={() => setUseShippingAddress(!useShippingAddress)}
                    className="mr-2"
                  />
                  <label htmlFor="useShippingAddress">Use shipping address as billing address</label>
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Pay Now</button>
            </form>
          </div>

          {/* Order Summary Section */}
          <div className="w-1/3 bg-gray-100 p-8">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            {orderItems.map((item) => (
              <div key={item._id} className="flex justify-between mb-4">
                <div>
                  <p className="font-semibold">{item.product_name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="font-semibold">৳{(item.price * item.quantity).toFixed(2) }</div>
              </div>
            ))}
            <div className="flex justify-between border-t border-gray-300 pt-4">
              <p>Subtotal</p>
              <p>৳{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>Shipping</p>
              <p>৳{shippingCost.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-4 text-lg font-semibold">
              <p>Total</p>
              <p>৳{total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
