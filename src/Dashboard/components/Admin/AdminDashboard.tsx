
import { ArrowUpRight, ArrowDownRight, Calendar, PlusCircle, Activity } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', Orders: 40, Earnings: 80, Refunds: 10 },
  { month: 'Feb', Orders: 60, Earnings: 90, Refunds: 12 },
  { month: 'Mar', Orders: 50, Earnings: 70, Refunds: 8 },
  { month: 'Apr', Orders: 70, Earnings: 110, Refunds: 15 },
  { month: 'May', Orders: 60, Earnings: 80, Refunds: 18 },
  { month: 'Jun', Orders: 55, Earnings: 85, Refunds: 14 },
  { month: 'Jul', Orders: 45, Earnings: 60, Refunds: 7 },
  { month: 'Aug', Orders: 40, Earnings: 30, Refunds: 5 },
  { month: 'Sep', Orders: 65, Earnings: 90, Refunds: 8 },
  { month: 'Oct', Orders: 55, Earnings: 50, Refunds: 25 },
  { month: 'Nov', Orders: 70, Earnings: 85, Refunds: 15 },
  { month: 'Dec', Orders: 65, Earnings: 40, Refunds: 30 },
]

export default function AdminDashboard() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Good Morning, Anna!</h1>
          <p className="text-gray-600">Here's what's happening with your store today.</p>
        </header>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span>01 Jan, 2024 to 31 Jan, 2024</span>
          </div>
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Select Date
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Product
            </button>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Analytics
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'TOTAL EARNINGS', value: '$559.25k', change: '+16.24%', icon: ArrowUpRight },
            { title: 'ORDERS', value: '36,894', change: '-3.57%', icon: ArrowDownRight },
            { title: 'CUSTOMERS', value: '183.35M', change: '+29.08%', icon: ArrowUpRight },
            { title: 'MY BALANCE', value: '$165.89k', change: '+0.00%', icon: ArrowUpRight },
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-sm font-medium text-gray-500 mb-2">{item.title}</h2>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{item.value}</span>
                <span className={`flex items-center ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  <item.icon className="h-5 w-5 mr-1" />
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Revenue</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Orders" stroke="#8884d8" />
                  <Line type="monotone" dataKey="Earnings" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="Refunds" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <div>
                <span className="font-bold">7,585</span> Orders
              </div>
              <div>
                <span className="font-bold">$22.89k</span> Earnings
              </div>
              <div>
                <span className="font-bold">367</span> Refunds
              </div>
              <div>
                <span className="font-bold">18.92%</span> Conversion Ratio
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Sales by Locations</h2>
            <div className="h-64 bg-gray-200 rounded">
              {/* Placeholder for map */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Sales Map
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {['Canada', 'Greenland', 'Russia'].map((country, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${[75, 47, 82][index]}%` }}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{[75, 47, 82][index]}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Top 10 Categories</h2>
            <ul className="space-y-2">
              {[
                { name: 'Mobile & Accessories', value: 10294 },
                { name: 'Desktop', value: 6256 },
                { name: 'Electronics', value: 3479 },
                { name: 'Home & Furniture', value: 2275 },
                { name: 'Grocery', value: 1950 },
                { name: 'Fashion', value: 1582 },
                { name: 'Appliances', value: 1037 },
                { name: 'Beauty, Toys & More', value: 924 },
                { name: 'Food & Drinks', value: 701 },
                { name: 'Toys & Games', value: 239 },
              ].map((category, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{category.name}</span>
                  <span className="font-medium">{category.value.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <ul className="space-y-4">
              {[
                { title: 'products', description: 'Allow users to like products in your WooCommerce store.', date: '25 Dec, 2021' },
                { title: 'Today offers by Digitech Galaxy', description: 'Offer is valid on orders of Rs.500 or above for selected products only.', date: '12 Dec, 2021' },
                { title: 'Favorite Product', description: 'Esther James have Favorite product.', date: '25 Nov, 2021' },
              ].map((activity, index) => (
                <li key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <span className="text-xs text-gray-500">{activity.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

