'use client'

import { useState } from 'react'
import { 
  Menu, 
  Bell, 
  Search 
} from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../Authentication/AuthProvider/AuthContext'
import Sidebar from './common/Sidebar'

/* const Sidebar = ({ className = '' }: { className?: string }) => (
  <div className={`bg-indigo-800 text-white ${className}`}>
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Velzon</h2>
      <nav>
        <ul className="space-y-2">
          {[
            { icon: LayoutDashboard, text: 'Dashboard' },
            { icon: ShoppingCart, text: 'Orders' },
            { icon: Users, text: 'Customers' },
            { icon: BarChart, text: 'Analytics' },
            { icon: Settings, text: 'Settings' },
          ].map(({ icon: Icon, text }) => (
            <li key={text}>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Icon className="w-5 h-5 mr-3" />
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </div>
)
 */
export default function Dashboard() {
  const {userAuth} = useAuth()
  const profilePic = userAuth?.profile_img
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setIsSidebarOpen(false)} />
        <Sidebar className="relative w-64 h-full" />
      </div>

      {/* Desktop sidebar */}
      <Sidebar className="hidden lg:block fixed inset-y-0 left-0 w-64 overflow-y-auto" />

      {/* Main content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="ml-3 text-xl font-semibold text-gray-800">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <div className="hidden sm:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <button className="ml-4 p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <img
                className="ml-4 h-8 w-8 rounded-full"
                src={profilePic}
                alt="User avatar"
              />
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
        
          <Outlet/>
        </main>
      </div>
    </div>
  )
}