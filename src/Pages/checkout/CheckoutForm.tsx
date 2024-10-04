import React, { useState } from 'react'
import { CreditCardIcon } from 'lucide-react'

export default function CheckoutForm() {
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('United States')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [saveInfo, setSaveInfo] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [securityCode, setSecurityCode] = useState('')
  const [nameOnCard, setNameOnCard] = useState('')
  const [useShippingAddress, setUseShippingAddress] = useState(false)

  interface OrderItem {
    id: number
    name: string
    quantity: string
    price: number
    image: string
  }
  const orderItems: OrderItem[] = [
    { id: 1, name: 'Fresho Cauliflower 1pc (approx 400 to 600g)', quantity: '12 Kg', price: 690.00, image: '/placeholder.svg?height=40&width=40' },
    { id: 2, name: 'Pomegranate - Small', quantity: '6 Kg', price: 560.00, image: '/placeholder.svg?height=40&width=40' },
  ]
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted')
  }
  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0)
  const total = subtotal // Assuming no additional fees for this example

  return (
    <div className="flex justify-center bg-gray-100 p-6">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex">
          <div className="w-2/3 p-8">
            <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
            <form onSubmit={handleSubmit}>
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

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Delivery</h3>
                <div className="mb-4">
                  <select
                    className="w-full p-2 border rounded appearance-none bg-white"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option>United States</option>
                    {/* Add more countries */}
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
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option>State</option>
                    {/* Add states */}
                  </select>
                  <input
                    type="text"
                    placeholder="ZIP code"
                    className="w-1/3 p-2 border rounded"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
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

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Shipping method</h3>
                <div className="bg-gray-100 p-4 rounded">
                  <p>Enter your shipping address to view available shipping methods.</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Payment</h3>
                <p className="text-sm text-gray-600 mb-4">All transactions are secure and encrypted.</p>
                <div className="border rounded p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Credit card</span>
                    <CreditCardIcon className="h-6 w-6 text-gray-400" />
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
                      placeholder="Expiration date (MM / YY)"
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
                    className="w-full p-2 border rounded mb-4"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                  />
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
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition duration-300"
              >
                Pay now
              </button>
            </form>
          </div>
          <div className="w-1/3 bg-gray-50 p-2">
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
                </div>
                ))}
                <div className="flex justify-between items-center text-sm mt-4">
                <span>Subtotal • {orderItems.length} items</span>
                <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                <span>Shipping</span>
                <span className="text-blue-600">Enter shipping address</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>USD ${total.toFixed(2)}</span>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

